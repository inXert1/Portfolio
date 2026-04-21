import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { buildEmailHtml, buildEmailText } from "@/lib/email-template";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ContactPayload {
  name: string;
  email: string;
  message: string;
  honeypot?: string;   // Must be empty — bots fill this
  formLoadedAt?: number; // Timestamp when form was rendered (ms)
}

// ─── In-memory rate limiter (per IP, 3 requests per 2 minutes) ────────────────

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const RATE_LIMIT_WINDOW_MS = 2 * 60 * 1000; // 2 minutes
const RATE_LIMIT_MAX = 3;
const rateLimitStore = new Map<string, RateLimitEntry>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count++;
  return false;
}

// Clean up stale entries periodically to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitStore.entries()) {
    if (now > entry.resetAt) rateLimitStore.delete(ip);
  }
}, RATE_LIMIT_WINDOW_MS);

// ─── Input sanitizer ──────────────────────────────────────────────────────────

function sanitize(value: string, maxLength: number): string {
  return value
    .replace(/<[^>]*>/g, "")       // Strip HTML tags
    .replace(/[<>'"]/g, "")        // Strip remaining dangerous chars
    .trim()
    .slice(0, maxLength);
}

// ─── Nodemailer transporter ───────────────────────────────────────────────────

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST ?? "live.smtp.mailtrap.io",
  port: Number(process.env.MAILTRAP_PORT ?? 587),
  secure: false,
  auth: {
    user: process.env.MAILTRAP_USER ?? "api",
    pass: process.env.MAILTRAP_TOKEN,
  },
});

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // ── 1. Extract client IP ──────────────────────────────────────────────────
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  // ── 2. Rate limiting ──────────────────────────────────────────────────────
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429 }
    );
  }

  // ── 3. Parse body ─────────────────────────────────────────────────────────
  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, email, message, honeypot, formLoadedAt } = body;

  // ── 4. Honeypot check (bots fill this hidden field) ───────────────────────
  if (honeypot && honeypot.trim().length > 0) {
    // Silently accept — don't tip off the bot
    return NextResponse.json({ success: true });
  }

  // ── 5. Timing check (reject submissions < 2.5 seconds after form load) ────
  if (formLoadedAt) {
    const elapsed = Date.now() - formLoadedAt;
    if (elapsed < 2500) {
      return NextResponse.json(
        { error: "Submission rejected. Please try again." },
        { status: 400 }
      );
    }
  }

  // ── 6. Validate required fields ───────────────────────────────────────────
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  // ── 7. Sanitize inputs ────────────────────────────────────────────────────
  const safeName = sanitize(name, 100);
  const safeEmail = sanitize(email, 254);
  const safeMessage = sanitize(message, 3000);

  // ── 8. Validate email format ──────────────────────────────────────────────
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(safeEmail)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  if (safeName.length < 2) {
    return NextResponse.json(
      { error: "Please enter your full name." },
      { status: 400 }
    );
  }

  if (safeMessage.length < 10) {
    return NextResponse.json(
      { error: "Message is too short. Please provide more detail." },
      { status: 400 }
    );
  }

  // ── 9. Send email ─────────────────────────────────────────────────────────
  try {
    const senderEmail = process.env.MAILTRAP_SENDER_EMAIL ?? "hello@demomailtrap.co";
    
    await transporter.sendMail({
      from: `"Portfolio Contact" <${senderEmail}>`,
      to: process.env.CONTACT_RECIPIENT ?? "vinceestander3@gmail.com",
      replyTo: `"${safeName}" <${safeEmail}>`,
      subject: `New message from ${safeName} via your portfolio`,
      html: buildEmailHtml({ senderName: safeName, senderEmail: safeEmail, message: safeMessage }),
      text: buildEmailText({ senderName: safeName, senderEmail: safeEmail, message: safeMessage }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Contact API] Failed to send email:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}

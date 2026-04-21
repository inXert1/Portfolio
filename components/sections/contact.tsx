"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Link2, Code, ArrowUpRight, Send, CheckCircle, Loader2 } from "lucide-react"
import { useToast } from "@/lib/use-toast"
import { ToastContainer } from "@/components/ui/toast"

// ─── Data ─────────────────────────────────────────────────────────────────────

const contactLinks = [
  { name: "Email", icon: Mail, value: "vinceestander3@gmail.com", href: "mailto:vinceestander3@gmail.com" },
  { name: "LinkedIn", icon: Link2, value: "linkedin.com/in/vince-gabriel1", href: "https://www.linkedin.com/in/vince-gabriel1" },
  { name: "GitHub", icon: Code, value: "github.com/inXert1", href: "https://github.com/inXert1" },
]

// ─── Types ────────────────────────────────────────────────────────────────────

type FormStatus = "idle" | "sending" | "success" | "error"

interface FormState {
  name: string
  email: string
  message: string
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ContactSection() {
  const { toasts, showToast, dismissToast } = useToast()
  const [status, setStatus] = React.useState<FormStatus>("idle")
  const [cooldownSeconds, setCooldownSeconds] = React.useState(0)
  const [form, setForm] = React.useState<FormState>({ name: "", email: "", message: "" })

  // Anti-bot: record exactly when this form was mounted to the DOM
  const formLoadedAt = React.useRef<number>(0)

  // Anti-bot: client-side cooldown timer
  const cooldownRef = React.useRef<ReturnType<typeof setInterval> | null>(null)

  // Reset the form loaded timestamp each time status returns to idle
  React.useEffect(() => {
    if (status === "idle") {
      formLoadedAt.current = Date.now()
    }
  }, [status])

  // Cleanup cooldown interval on unmount
  React.useEffect(() => {
    return () => {
      if (cooldownRef.current) clearInterval(cooldownRef.current)
    }
  }, [])

  function startCooldown(seconds: number) {
    setCooldownSeconds(seconds)
    cooldownRef.current = setInterval(() => {
      setCooldownSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(cooldownRef.current!)
          cooldownRef.current = null
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (status === "sending" || cooldownSeconds > 0) return

    // Honeypot value comes from the hidden input in the form
    const formEl = e.currentTarget
    const honeypotEl = formEl.querySelector<HTMLInputElement>('input[name="_trap"]')
    const honeypot = honeypotEl?.value ?? ""

    setStatus("sending")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          honeypot,
          formLoadedAt: formLoadedAt.current,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong.")
      }

      setStatus("success")
      showToast("success", "Message sent! I'll get back to you within 24 hours.")
      startCooldown(60)

      // Reset form after a short delay
      setTimeout(() => {
        setForm({ name: "", email: "", message: "" })
        setStatus("idle")
      }, 3500)
    } catch (err) {
      setStatus("error")
      showToast("error", err instanceof Error ? err.message : "Failed to send. Please try again.")
      setTimeout(() => setStatus("idle"), 2000)
    }
  }

  const isDisabled = status === "sending" || cooldownSeconds > 0 || status === "success"

  return (
    <>
      <section id="contact" className="min-h-screen py-32 flex flex-col items-center justify-center px-6 sm:px-12 xl:px-24 w-full">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left side: large text + contact links ── */}
          <div className="flex flex-col justify-center gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex flex-col gap-4"
            >
              <h1 className="font-syncopate text-5xl sm:text-7xl xl:text-8xl font-bold uppercase tracking-tighter leading-[0.9]">
                Let&apos;s <span className="opacity-30">Connect</span>.
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl font-light text-muted-foreground leading-relaxed max-w-sm"
            >
              Always open to discussing high-impact projects, technical leadership, or interesting engineering challenges.
            </motion.p>

            <div className="flex flex-col gap-6">
              {contactLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between p-6 border border-border rounded-2xl hover:bg-muted/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      <div className="flex flex-col">
                        <span className="font-syncopate text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                          {link.name}
                        </span>
                        <span className="text-sm font-medium">{link.value}</span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-y-1 translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Right side: Contact form ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-muted/10 p-8 sm:p-12 rounded-[2.5rem] border border-border flex flex-col gap-8 overflow-hidden relative"
          >
            {/* Header */}
            <div className="flex flex-col gap-2">
              <h2 className="font-syncopate text-xs font-bold uppercase tracking-[0.4em] text-primary">
                Send a Message
              </h2>
              <p className="text-sm text-muted-foreground">Typically responds within 24 hours.</p>
            </div>

            {/* ── Success overlay ── */}
            <AnimatePresence>
              {status === "success" && (
                <motion.div
                  key="success-overlay"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 bg-background/90 backdrop-blur-sm rounded-[2.5rem]"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                  >
                    <CheckCircle className="w-16 h-16 text-emerald-500" strokeWidth={1.5} />
                  </motion.div>
                  <div className="flex flex-col items-center gap-2 text-center px-8">
                    <p className="font-syncopate text-sm font-bold uppercase tracking-widest">
                      Message Sent!
                    </p>
                    <p className="text-sm text-muted-foreground">
                      I&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── The form ── */}
            <motion.form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
              animate={status === "error" ? { x: [0, -8, 8, -6, 6, -4, 4, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Anti-bot: visually hidden honeypot field */}
              <input
                type="text"
                name="_trap"
                tabIndex={-1}
                aria-hidden="true"
                autoComplete="off"
                style={{
                  position: "absolute",
                  left: "-9999px",
                  width: "1px",
                  height: "1px",
                  opacity: 0,
                  pointerEvents: "none",
                }}
              />

              {/* Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-name" className="font-syncopate text-[9px] font-bold uppercase tracking-widest ml-1">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  disabled={isDisabled}
                  required
                  autoComplete="name"
                  className="w-full bg-background border border-border px-6 py-4 rounded-xl focus:outline-none focus:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-email" className="font-syncopate text-[9px] font-bold uppercase tracking-widest ml-1">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  disabled={isDisabled}
                  required
                  autoComplete="email"
                  className="w-full bg-background border border-border px-6 py-4 rounded-xl focus:outline-none focus:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className="font-syncopate text-[9px] font-bold uppercase tracking-widest ml-1">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={handleChange}
                  disabled={isDisabled}
                  required
                  className="w-full bg-background border border-border px-6 py-4 rounded-xl focus:outline-none focus:border-primary transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Submit button */}
              <button
                id="contact-submit-btn"
                type="submit"
                disabled={isDisabled}
                className="mt-4 w-full py-5 bg-foreground text-background rounded-xl font-bold uppercase text-xs tracking-widest
                  hover:scale-[1.02] active:scale-[0.98] transition-all
                  disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100
                  flex items-center justify-center gap-2 cursor-pointer"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : cooldownSeconds > 0 ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Sent · Wait {cooldownSeconds}s
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </motion.form>
          </motion.div>

        </div>
      </section>

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </>
  )
}

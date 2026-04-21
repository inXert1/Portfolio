"use client"

import * as React from "react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-background">
      {/* Ambient glow blobs */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(220 70% 55%), transparent)" }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(260 60% 50%), transparent)" }}
      />

      {/* Grid overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <style>{`
        @keyframes glitch {
          0%   { transform: translate(0, 0); opacity: 1; }
          92%  { transform: translate(0, 0); opacity: 1; }
          93%  { transform: translate(-4px, 0); opacity: 0.8; }
          94%  { transform: translate(4px, 0); opacity: 0.9; }
          95%  { transform: translate(-2px, 0); opacity: 0.7; }
          96%  { transform: translate(0, 0); opacity: 1; }
          100% { transform: translate(0, 0); opacity: 1; }
        }
        .not-found-404 {
          animation: glitch 4s infinite;
        }
      `}</style>

      <div className="relative z-10 flex flex-col items-center gap-8 text-center px-6">
        {/* 404 Number */}
        <h1
          className="not-found-404 font-bold leading-none select-none"
          style={{
            fontSize: "clamp(6rem, 20vw, 14rem)",
            fontFamily: "var(--font-syncopate)",
            color: "hsl(var(--foreground))",
            letterSpacing: "-0.05em",
          }}
        >
          404
        </h1>

        {/* Divider */}
        <div className="flex items-center gap-4 w-full max-w-xs">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
            not found
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Message */}
        <div className="space-y-2 max-w-sm">
          <p className="text-foreground font-semibold text-lg">
            This page doesn&apos;t exist
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            The URL you entered has gone off the grid. Let&apos;s get you back on track.
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/"
          id="not-found-home-btn"
          className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-widest overflow-hidden transition-all duration-300"
          style={{
            background: "hsl(var(--foreground))",
            color: "hsl(var(--background))",
          }}
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: "linear-gradient(135deg, hsl(220 70% 55%), hsl(260 60% 50%))",
            }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="relative z-10 transition-transform duration-300 group-hover:-translate-x-0.5"
            aria-hidden="true"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          <span className="relative z-10">Back to Home</span>
        </Link>
      </div>
    </div>
  )
}

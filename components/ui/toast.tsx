"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle, X } from "lucide-react"
import type { Toast } from "@/lib/use-toast"

interface ToastContainerProps {
  toasts: Toast[]
  onDismiss: (id: string) => void
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div
      aria-live="polite"
      aria-label="Notifications"
      className="fixed top-6 right-6 z-[100] flex flex-col gap-4 pointer-events-none"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, x: 24, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 12, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 450, damping: 30 }}
            className="pointer-events-auto"
          >
            <div
              role="alert"
              className={`
                flex items-center gap-4 px-6 py-5 rounded-[1.25rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border backdrop-blur-xl min-w-[320px] max-w-[400px]
                ${toast.type === "success"
                  ? "bg-background/90 border-emerald-500/20"
                  : "bg-background/90 border-destructive/20"
                }
              `}
            >
              {/* Icon with background glow */}
              <div className="relative shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-muted/50 overflow-hidden">
                <div className={`absolute inset-0 blur-lg opacity-20 ${toast.type === "success" ? "bg-emerald-500" : "bg-destructive"}`} />
                {toast.type === "success" ? (
                  <CheckCircle className="w-5 h-5 text-emerald-500 relative z-10" strokeWidth={2.5} />
                ) : (
                  <XCircle className="w-5 h-5 text-destructive relative z-10" strokeWidth={2.5} />
                )}
              </div>

              {/* Content */}
              <p className="flex-1 text-sm font-medium leading-snug text-foreground">
                {toast.message}
              </p>

              {/* Dismiss */}
              <button
                onClick={() => onDismiss(toast.id)}
                aria-label="Dismiss notification"
                className="shrink-0 mt-0.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

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
      className="fixed top-24 right-6 z-50 flex flex-col gap-3 pointer-events-none"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: -24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="pointer-events-auto"
          >
            <div
              role="alert"
              className={`
                flex items-start gap-3 px-5 py-4 rounded-2xl shadow-lg border backdrop-blur-sm min-w-[280px] max-w-[360px]
                ${toast.type === "success"
                  ? "bg-background/95 border-border"
                  : "bg-background/95 border-destructive/30"
                }
              `}
            >
              {/* Icon */}
              <div className="mt-0.5 shrink-0">
                {toast.type === "success" ? (
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-destructive" />
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

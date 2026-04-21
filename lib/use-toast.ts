import { useContext } from "react"
import { ToastContext } from "@/components/providers/toast-provider"

export type ToastType = "success" | "error"

export interface Toast {
  id: string
  type: ToastType
  message: string
}

export function useToast() {
  const context = useContext(ToastContext)
  
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  
  return context
}

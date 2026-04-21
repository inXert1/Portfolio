"use client"

import * as React from "react"
import { animate } from "animejs"
import { usePathname } from "next/navigation"

export default function Template({ children }: { children: React.ReactNode }) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  React.useEffect(() => {
    if (containerRef.current) {
      animate(containerRef.current, {
        opacity: [0, 1],
        y: [20, 0],
        duration: 800,
        ease: 'outQuart',
      })
    }
  }, [pathname])

  return (
    <div ref={containerRef} className="opacity-0">
      {children}
    </div>
  )
}

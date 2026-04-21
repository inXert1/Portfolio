"use client"

import * as React from "react"
import { createTimeline } from "animejs"
import { useTheme } from "next-themes"
import Image from "next/image"

import BlackLogo from "@/assets/logo/black-logo.png"
import WhiteLogo from "@/assets/logo/white-logo.png"

export function AppLoader() {
  const [loading, setLoading] = React.useState(true)
  const [mounted, setMounted] = React.useState(false)
  const { resolvedTheme } = useTheme()
  const loaderRef = React.useRef<HTMLDivElement>(null)
  const logoRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  React.useEffect(() => {
    const loaderEl = loaderRef.current;
    const logoEl = logoRef.current;
    
    if (!mounted || !loaderEl || !logoEl) return;

    // Loading Animation Timeline
    const tl = createTimeline({
      defaults: {
        ease: 'outExpo',
        duration: 1200,
      }
    });

    tl.add(logoEl, {
      opacity: [0, 1],
      scale: [0.9, 1],
      duration: 1000,
    })
    .add(loaderEl, {
      opacity: [1, 0],
      duration: 800,
      ease: 'inOutQuad',
      onComplete: () => {
        setLoading(false)
      }
    }, '+=500') // Show logo for a little bit before fading out loader

    return () => {
      tl.revert();
    }
  }, [mounted])

  if (!loading) return null

  // Ensure hydration matches before rendering the correct logo.
  const Logo = mounted && resolvedTheme === "dark" ? WhiteLogo : BlackLogo

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
    >
      <div ref={logoRef} className="opacity-0">
         <Image 
           src={Logo} 
           alt="Loading..." 
           width={80} 
           height={80} 
           priority
           className="w-20 h-20 object-contain"
         />
      </div>
    </div>
  )
}

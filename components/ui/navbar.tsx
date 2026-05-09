"use client"

import * as React from "react"
import Image, { StaticImageData } from "next/image"
import { useTheme } from "next-themes"
import { ThemeToggle } from "./theme-toggle"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"


import BlackLogo from "@/assets/logo/black-logo.png"
import WhiteLogo from "@/assets/logo/white-logo.png"
import BlackTextLogo from "@/assets/logo/blackText-logo.png"
import WhiteTextLogo from "@/assets/logo/whiteText-logo.png"
import Link from "next/link"

const navLinks = [
  { name: "Home", href: "/#home" },
  { name: "Projects", href: "/#projects" },
  { name: "Gallery", href: "/gallery" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
]

export function Navbar() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl">
      <nav className="flex items-center justify-between px-6 py-3 bg-background/60 backdrop-blur-md rounded-full border border-border shadow-sm">
        <Link href="/#home" className="flex items-center gap-2">
          {mounted ? (
            <div className="relative w-8 h-8">
              <Image
                src={BlackLogo}
                alt="Logo"
                width={40}
                height={40}
                className="absolute inset-0 w-8 h-8 object-contain transition-opacity duration-300"
                style={{ opacity: isDark ? 0 : 1 }}
              />
              <Image
                src={WhiteLogo}
                alt="Logo"
                width={40}
                height={40}
                className="absolute inset-0 w-8 h-8 object-contain transition-opacity duration-300"
                style={{ opacity: isDark ? 1 : 0 }}
              />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
          )}
          {mounted ? (
            <div className="relative h-7.5 w-48 hidden sm:block">
              <Image
                src={BlackTextLogo}
                alt="VG Estander"
                height={32}
                unoptimized
                priority
                className="absolute inset-0 h-7.5 w-auto object-contain transition-opacity duration-300"
                style={{ opacity: isDark ? 0 : 1 }}
              />
              <Image
                src={WhiteTextLogo}
                alt="VG Estander"
                height={32}
                unoptimized
                priority
                className="absolute inset-0 h-7.5 w-auto object-contain transition-opacity duration-300"
                style={{ opacity: isDark ? 1 : 0 }}
              />
            </div>
          ) : (
            <div className="h-8 w-48 bg-muted animate-pulse hidden sm:block rounded-sm" />
          )}
        </Link>

        <div className="flex items-center gap-6">
          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="h-4 w-px bg-border hidden md:block" />
          <ThemeToggle />
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors z-50"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
            />
            
            {/* Menu Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-2/3 max-w-sm bg-background border-l border-border z-50 md:hidden p-8 flex flex-col"
            >
              <button 
                onClick={closeMenu}
                className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close menu"
              >
                <X size={24} strokeWidth={1.5} />
              </button>

              <div className="pt-16 flex flex-col h-full">
                <ul className="flex flex-col gap-8">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className="text-lg font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors block"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-auto pt-8 border-t border-border flex flex-col gap-4">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50 font-bold">
                    Quick Navigation
                  </p>
                  <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <span className="text-xs text-muted-foreground">Change Theme</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

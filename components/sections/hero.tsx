"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const staggeredVariants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
}

export function Hero() {
  return (
    <section id="home" className="flex flex-col min-h-screen pt-32 pb-16 justify-center overflow-hidden w-full relative">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full" />

      <div className="flex flex-col w-full px-6 lg:px-12 select-none justify-center h-full gap-8">
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-3 px-3 py-1 rounded-full border border-border bg-background/40 backdrop-blur-sm self-start"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
            Based in Philippines
          </span>
        </motion.div>

        {/* Massive Name Display */}
        <div className="flex flex-col w-full mt-4">
          <motion.h1
            initial="initial"
            animate="animate"
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            variants={staggeredVariants}
            className={cn(
              "font-syncopate font-bold tracking-[-0.05em] leading-[0.85] uppercase w-full max-w-full overflow-hidden text-ellipsis whitespace-nowrap",
              "bg-gradient-to-b from-foreground to-foreground/80 bg-clip-text text-transparent"
            )}
            style={{ fontSize: 'clamp(5rem, 11vw, 15rem)' }}
          >
            Vince Gabriel
          </motion.h1>
        </div>

        {/* Role & Summary */}
        <motion.div
          initial="initial"
          animate="animate"
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          variants={staggeredVariants}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8 pt-8 sm:pt-16 w-full max-w-7xl"
        >
          <p className="font-sans text-base sm:text-xl font-light text-muted-foreground leading-relaxed max-w-xl">
            <span className="font-bold text-foreground inline-block">Junior Fullstack Developer Specializing in Frontend Development</span> specializing in building high-performance multi-tenant SaaS platforms and dynamic mobile ecosystems.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <a 
              href="#projects"
              className="px-8 py-4 bg-foreground text-background rounded-full font-bold uppercase text-xs tracking-widest hover:scale-105 active:scale-95 transition-all inline-block text-center"
            >
              View Projects
            </a>
            <a 
              href="#about"
              className="px-8 py-4 border border-border rounded-full font-bold uppercase text-xs tracking-widest hover:bg-muted transition-all inline-block text-center text-foreground"
            >
              About Me
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="w-[1px] h-24 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  )
}

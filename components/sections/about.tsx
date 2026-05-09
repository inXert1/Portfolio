"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

const skills = {
  Web: ["React", "Next.js", "Vue.js", "Tailwind CSS", "TypeScript", "JavaScript"],
  Mobile: ["Flutter", "Riverpod", "Dart"],
  "Backend & DB": ["Node.js", "PostgreSQL", "Supabase", "Prisma", "Express", "SMTP", "REST API"],
  Design: ["Adobe Illustrator", "Figma", "Canva", "Adobe Photoshop"],
  Tools: ["ChatGPT", "Claude", "Gemini", "GitHub Copilot", "Google Stitch", "DeepSeek" ],
}

const experience = [
  {
    company: "Maris Joefren",
    role: "Freelance Graphic Artist",
    period: "MARCH 2026 - PRESENT",
    description: "Delivering high-quality graphic design services to the business, enhancing brand visuals and communication through multiple platforms (Facebook, TikTok Shop, Shopee) with creative design solutions.",
  },
  {
    company: "C8nnect IT Solutions",
    role: "Junior Fullstack Developer & Intern Leader",
    period: "JANUARY 2026 - APRIL 2026",
    description: "Spearheading frontend architecture and technical implementation. Managing a team of interns, providing mentorship and standardizing codebase practices.",
  },
  {
    company: "SYNTAX - STI Malolos' Official IT Organization",
    role: "Governor & External Affairs Officer",
    period: "2023 - 2024",
    description: "Elected leader for the STI Malolos' IT organization. Orchestrated events for 350+ students and facilitated external partnerships.",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="min-h-screen py-32 px-6 sm:px-12 xl:px-24 w-full">
      <div className="max-w-4xl mx-auto flex flex-col gap-24 w-full">
        {/* Intro */}
        <div className="flex flex-col gap-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="font-syncopate text-4xl sm:text-6xl font-bold uppercase tracking-tighter"
          >
            Engineering <span className="opacity-40">With</span> Purpose.
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
          >
            <div className="flex flex-col gap-6">
              <p className="font-sans text-xl sm:text-2xl font-light leading-relaxed text-foreground">
                I am <span className="font-bold">Vince Gabriel</span>, a Fullstack Developer specializing in Frontend Development and a technical leader dedicated to building digital experiences that are as scalable as they are stunning.
              </p>
              <p className="font-sans text-lg font-light text-muted-foreground leading-relaxed">
                My journey spans from academic leadership and organizing large-scale student events to pioneering frontend solutions for enterprise SaaS products. I believe in code that speaks for itself and leadership that empowers others.
              </p>
            </div>
            
            <div className="flex flex-col gap-8">
              <div className="p-8 border border-border bg-muted/20 rounded-2xl">
                <h3 className="font-syncopate text-[10px] font-bold uppercase tracking-widest text-primary mb-4">Core Philosophy</h3>
                <p className="font-sans text-sm italic text-muted-foreground leading-loose">
                  &quot;I build efficient systems by writing clear code and applying DRY principles to reduce repetition and streamline development.&quot;
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Experience */}
        <div className="flex flex-col gap-12">
          <h2 className="font-syncopate text-xs font-bold uppercase tracking-[0.4em] text-primary">Experience</h2>
          <div className="flex flex-col gap-12">
            {experience.map((exp, index) => (
              <motion.div 
                key={exp.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4"
              >
                <div className="flex flex-col">
                  <span className="font-syncopate text-[10px] font-bold uppercase tracking-widest mb-1">{exp.period}</span>
                  <span className="text-xs text-muted-foreground uppercase">{exp.company}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold uppercase tracking-tight">{exp.role}</h3>
                  <p className="text-muted-foreground font-light leading-relaxed max-w-xl">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-col gap-12">
          <h2 className="font-syncopate text-xs font-bold uppercase tracking-[0.4em] text-primary">Tech Stack</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {Object.entries(skills).map(([category, items], index) => (
              <motion.div 
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                className="p-8 border border-border rounded-2xl flex flex-col gap-6 hover:border-primary/30 transition-colors"
              >
                <h3 className="font-syncopate text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <Badge key={item} variant="outline" className="px-3 py-1 font-bold uppercase text-[9px] tracking-widest bg-background">
                      {item}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Educational/CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          className="p-8 sm:p-12 bg-foreground text-background rounded-[2rem] flex flex-col items-center gap-6 text-center"
        >
          <h2 className="font-syncopate text-xl sm:text-2xl font-bold uppercase tracking-tighter">Let&apos;s build something together.</h2>
          <p className="opacity-70 font-light max-w-md">Open for technical leadership roles and high-impact software engineering projects.</p>
          <a href="#contact" className="mt-4 px-12 py-5 bg-background text-foreground rounded-full font-bold uppercase text-[10px] tracking-[0.2em] hover:scale-105 active:scale-95 transition-all outline outline-background outline-offset-4 inline-block">
            Contact Me
          </a>
        </motion.div>
      </div>
    </section>
  )
}

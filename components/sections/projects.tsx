"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ProjectCard } from "@/components/projects/project-card"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../components/ui/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../components/ui/carousel"
import Image from "next/image"

type GalleryItem = {
  src: string
  label: string
  description: string
}

type Project = {
  title: string
  description: string
  tags: string[]
  href?: string
  github?: string
  image?: string | { light: string, dark: string }
  imageDisplay?: "cover" | "icon"
  inProgress?: boolean
  gallery?: (string | GalleryItem)[]
}

const projects: Project[] = [
  {
    title: "Sphere HR",
    description: "Led frontend and mobile development for a multi-tenant SaaS HRIS platform, architecting a robust recruitment pipeline and integrating an AI-powered ATS alongside a context-aware chatbot capable of handling natural language requests.",
    tags: ["Node.js", "PostgreSQL", "Flutter", "Riverpod", "SaaS", "TypeScript", "React.js"],
    href: "https://hris.c8nnect.com/",
    github: "",
  },
  {
    title: "rehearsAI",
    description: "An AI-driven platform for automated interview preparation and performance feedback. Built with a high-performance Vue ecosystem and integrated with LLM endpoints.",
    tags: ["Vue.js", "TypeScript", "Node.js", "AI", "Voxtral TTS", "MongoDB", "Express.js", "REST API"],
    image: { 
      light: "/rehearsai-photos/rAI-logos/rehearsAI-logo.png", 
      dark: "/rehearsai-photos/rAI-logos/rehearsAI-logo-white.png" 
    },
    imageDisplay: "icon",
    inProgress: true,
    gallery: [
      { 
        src: "/rehearsai-photos/login.png", 
        label: "Secure Access", 
        description: "Welcome back screen with social auth integration." 
      },
      { 
        src: "/rehearsai-photos/register.png", 
        label: "Join RehearsAI", 
        description: "Creating a new account to start practicing." 
      },
      { 
        src: "/rehearsai-photos/register2.png", 
        label: "Onboarding", 
        description: "Step-by-step registration flow for new users." 
      },
      { 
        src: "/rehearsai-photos/dashboard.png", 
        label: "Control Center", 
        description: "Overview of recent practice sessions and performance metrics." 
      },
      { 
        src: "/rehearsai-photos/pre-interview.png", 
        label: "Warm up", 
        description: "Configuring the AI interviewer and selecting practice topics." 
      },
      { 
        src: "/rehearsai-photos/pre-interview2.png", 
        label: "Interview Setup", 
        description: "Refining the difficulty and focus areas of the session." 
      },
      { 
        src: "/rehearsai-photos/interview.png", 
        label: "Live Practice", 
        description: "Real-time AI-driven interview session with natural language processing." 
      },
      { 
        src: "/rehearsai-photos/feedback.png", 
        label: "Performance Analysis", 
        description: "Detailed score breakdown and AI-generated feedback on answers." 
      },
      { 
        src: "/rehearsai-photos/feedback2.png", 
        label: "Insights", 
        description: "Deep dive into specific areas of improvement identified by the LLM." 
      },
      { 
        src: "/rehearsai-photos/profile1.png", 
        label: "User Profile", 
        description: "Managing account settings and personal information." 
      },
      { 
        src: "/rehearsai-photos/profile2.png", 
        label: "Progress Tracking", 
        description: "Viewing historical data and growth over time." 
      },
    ]
  },
  {
    title: "KNEAT",
    description: "High Fidelity E-commerce Website for a mock fashion brand inspired by 'Fear of God' brand. Utilized GSAP for animations and Mail.js for email functionality.",
    tags: ["React.js", "Tailwind CSS", "GSAP", "Mail.js", "JavaScript"],
    href: "https://kneatwear.netlify.app/",
    github: "https://github.com/inXert1/KNEAT",
  },
]

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null)

  return (
    <section id="projects" className="min-h-screen py-32 px-6 sm:px-12 xl:px-24 w-full">
      <div className="max-w-7xl mx-auto flex flex-col gap-16 w-full">
        <div className="flex flex-col gap-6 max-w-3xl">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="font-syncopate text-xs font-bold uppercase tracking-[0.4em] text-primary"
          >
            Selected Works
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="font-syncopate text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tighter"
          >
            Building <span className="opacity-40">Digital</span> Legacy.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground font-light leading-relaxed max-w-xl"
          >
            A curated look at my technical expertise in frontend engineering, leadership, and scalable product development.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.2 + (index * 0.1) }}
            >
              <ProjectCard 
                {...project} 
                onClick={project.gallery ? () => setSelectedProject(project) : undefined}
              />
            </motion.div>
          ))}
        </div>
        
        {/* Placeholder for more */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-20 border-t border-border flex flex-col items-center gap-8"
        >
          <p className="font-syncopate text-xs uppercase tracking-widest text-muted-foreground">More coming soon</p>
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-border" />
            ))}
          </div>
        </motion.div>
      </div>

      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="w-fit max-w-[95vw] sm:max-w-[95vw] h-[95vh] p-0 flex flex-col overflow-hidden bg-background border border-border/50 sm:rounded-2xl">
          <DialogHeader className="p-6 pb-2 shrink-0">
            <DialogTitle className="font-syncopate tracking-tight text-xl flex items-center">
              {selectedProject?.imageDisplay === 'icon' && typeof selectedProject.image === 'object' ? (
                 <div className="relative h-10 w-56 -ml-1">
                   <Image src={selectedProject.image.light} alt={selectedProject.title} fill className="object-contain dark:hidden object-left" priority />
                   <Image src={selectedProject.image.dark} alt={selectedProject.title} fill className="object-contain hidden dark:block object-left" priority />
                 </div>
              ) : (
                <span className="uppercase">{selectedProject?.title}</span>
              )}
            </DialogTitle>
            <DialogDescription className="font-sans text-muted-foreground text-left">
              Photos are only available because there is an ongoing revamp for the application.
            </DialogDescription>
          </DialogHeader>
          <div className="p-6 pt-0 flex-1 overflow-hidden min-h-0 flex flex-col items-center w-full">
            {selectedProject?.gallery && (
              <Carousel className="h-full w-full relative group [&_[data-slot=carousel-content]]:h-full mx-auto">
                <CarouselContent className="h-full">
                  {selectedProject.gallery.map((item, i) => {
                    const src = typeof item === 'string' ? item : item.src
                    const label = typeof item === 'string' ? null : item.label
                    const description = typeof item === 'string' ? null : item.description

                    return (
                      <CarouselItem key={i} className="h-full flex flex-col gap-4">
                        <div className="relative flex-1 w-full rounded-xl overflow-hidden bg-muted/10 border border-border/30">
                          <Image 
                            src={src} 
                            alt={`${selectedProject.title} screenshot ${i + 1}`} 
                            fill 
                            className="object-contain p-4" 
                            priority={i === 0} 
                          />
                        </div>
                        {(label || description) && (
                          <div className="px-2 pb-2 shrink-0 text-center sm:text-left transition-all duration-300">
                            {label && (
                              <h4 className="font-syncopate text-xs font-bold uppercase tracking-widest text-primary mb-1">
                                {label}
                              </h4>
                            )}
                            {description && (
                              <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto sm:mx-0">
                                {description}
                              </p>
                            )}
                          </div>
                        )}
                      </CarouselItem>
                    )
                  })}
                </CarouselContent>
                <CarouselPrevious className="absolute left-6 top-1/2 -translate-y-1/2 bg-background/50 backdrop-blur border-none hover:bg-background/80 transition-colors opacity-0 xl:opacity-100 group-hover:opacity-100 h-10 w-10 z-10" />
                <CarouselNext className="absolute right-6 top-1/2 -translate-y-1/2 bg-background/50 backdrop-blur border-none hover:bg-background/80 transition-colors opacity-0 xl:opacity-100 group-hover:opacity-100 h-10 w-10 z-10" />
              </Carousel>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}

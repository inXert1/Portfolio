import * as React from "react"
import { Hero } from "@/components/sections/hero"
import { ProjectsSection } from "@/components/sections/projects"
import { AboutSection } from "@/components/sections/about"
import { ContactSection } from "@/components/sections/contact"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full overflow-hidden">
      <Hero />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
    </main>
  )
}

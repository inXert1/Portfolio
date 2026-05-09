import * as React from "react"
import type { Metadata } from "next"
import { GallerySection } from "@/components/sections/gallery"

export const metadata: Metadata = {
  title: "Gallery | Vince Gabriel",
  description:
    "A curated collection of graphic design, branding, and visual storytelling work by Vince Gabriel — featuring creative partnerships with Maris Joefren and KNEAT.",
}

export default function GalleryPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full overflow-hidden">
      <GallerySection />
    </main>
  )
}

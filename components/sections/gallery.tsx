"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import {
  galleryCategories,
  getAllPhotos,
  type GalleryPhoto,
} from "@/lib/gallery-data"

type PhotoWithCategory = GalleryPhoto & { categoryId: string }

export function GallerySection() {
  const [activeFilter, setActiveFilter] = React.useState("all")
  const [lightboxPhoto, setLightboxPhoto] = React.useState<PhotoWithCategory | null>(null)
  const [lightboxIndex, setLightboxIndex] = React.useState(0)

  const allPhotos = React.useMemo(() => getAllPhotos(), [])

  const filteredPhotos = React.useMemo(() => {
    if (activeFilter === "all") return allPhotos
    return allPhotos.filter((p) => p.categoryId === activeFilter)
  }, [activeFilter, allPhotos])

  const filters = React.useMemo(
    () => [
      { id: "all", label: "All" },
      ...galleryCategories.map((c) => ({ id: c.id, label: c.label })),
    ],
    []
  )

  const openLightbox = (photo: PhotoWithCategory) => {
    const idx = filteredPhotos.findIndex((p) => p.src === photo.src)
    setLightboxIndex(idx)
    setLightboxPhoto(photo)
  }

  const navigateLightbox = (direction: "prev" | "next") => {
    const newIndex =
      direction === "next"
        ? (lightboxIndex + 1) % filteredPhotos.length
        : (lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length
    setLightboxIndex(newIndex)
    setLightboxPhoto(filteredPhotos[newIndex])
  }

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxPhoto) return
      if (e.key === "ArrowLeft") navigateLightbox("prev")
      if (e.key === "ArrowRight") navigateLightbox("next")
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxPhoto, lightboxIndex, filteredPhotos])

  return (
    <section
      id="gallery"
      className="min-h-screen py-32 px-6 sm:px-12 xl:px-24 w-full"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16 w-full">
        {/* Header */}
        <div className="flex flex-col gap-6 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="font-syncopate text-xs font-bold uppercase tracking-[0.4em] text-primary"
          >
            Visual Works
          </motion.h2>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="font-syncopate text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tighter"
          >
            Capturing <span className="opacity-40">Creative</span> Vision.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground font-light leading-relaxed max-w-xl"
          >
            A curated collection of graphic design, branding, and visual
            storytelling work across multiple creative partnerships.
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-3"
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`
                px-6 py-3 rounded-full font-bold uppercase text-[10px] tracking-[0.2em]
                transition-all duration-300 ease-out cursor-pointer
                ${
                  activeFilter === filter.id
                    ? "bg-foreground text-background scale-105"
                    : "border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                }
              `}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Photo Grid */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  opacity: { duration: 0.3, delay: index * 0.05 },
                  scale: { duration: 0.3, delay: index * 0.05 },
                  layout: { duration: 0.4 },
                }}
                className="break-inside-avoid cursor-pointer group"
                onClick={() => openLightbox(photo)}
              >
                <div className="relative overflow-hidden rounded-2xl border border-border bg-muted/10 hover:border-primary/30 transition-colors duration-300">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300 rounded-2xl" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Photo count */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-12 border-t border-border flex items-center justify-between"
        >
          <p className="font-syncopate text-xs uppercase tracking-widest text-muted-foreground">
            {filteredPhotos.length}{" "}
            {filteredPhotos.length === 1 ? "work" : "works"}
          </p>
          <div className="flex gap-2">
            {galleryCategories.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  activeFilter === "all" || activeFilter === galleryCategories[i].id
                    ? "bg-foreground/40"
                    : "bg-border"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog
        open={!!lightboxPhoto}
        onOpenChange={(open) => !open && setLightboxPhoto(null)}
      >
        <DialogContent className="max-w-[95vw] sm:max-w-[90vw] h-[95vh] p-0 flex flex-col overflow-hidden bg-background/95 backdrop-blur-xl border border-border/30 sm:rounded-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 shrink-0">
            <div className="flex items-center gap-4">
              <p className="font-syncopate text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {lightboxPhoto
                  ? galleryCategories.find(
                      (c) => c.id === lightboxPhoto.categoryId
                    )?.label
                  : ""}
              </p>
              <span className="text-[10px] text-muted-foreground/50 font-mono">
                {lightboxIndex + 1} / {filteredPhotos.length}
              </span>
            </div>
            <button
              onClick={() => setLightboxPhoto(null)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted cursor-pointer"
              aria-label="Close lightbox"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* Image */}
          <div className="flex-1 relative min-h-0 flex items-center justify-center px-4 sm:px-16 pb-4 sm:pb-6">
            <AnimatePresence mode="wait">
              {lightboxPhoto && (
                <motion.div
                  key={lightboxPhoto.src}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={lightboxPhoto.src}
                    alt={lightboxPhoto.alt}
                    fill
                    className="object-contain"
                    sizes="90vw"
                    priority
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Arrows */}
            {filteredPhotos.length > 1 && (
              <>
                <button
                  onClick={() => navigateLightbox("prev")}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/60 backdrop-blur-sm border border-border/30 text-muted-foreground hover:text-foreground hover:bg-background/80 transition-all cursor-pointer z-10"
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={20} strokeWidth={1.5} />
                </button>
                <button
                  onClick={() => navigateLightbox("next")}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/60 backdrop-blur-sm border border-border/30 text-muted-foreground hover:text-foreground hover:bg-background/80 transition-all cursor-pointer z-10"
                  aria-label="Next photo"
                >
                  <ChevronRight size={20} strokeWidth={1.5} />
                </button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}

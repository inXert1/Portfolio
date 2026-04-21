"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { ExternalLink, Code } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  href?: string
  github?: string
  image?: string | { light: string; dark: string }
  onClick?: () => void
  inProgress?: boolean
  imageDisplay?: "cover" | "icon"
}

export function ProjectCard({ 
  title, 
  description, 
  tags, 
  href, 
  github, 
  image, 
  onClick, 
  inProgress,
  imageDisplay = "cover" 
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className={cn("h-full", onClick && "cursor-pointer")}
    >
      <Card className="group relative overflow-hidden bg-background border-border hover:border-primary/50 transition-colors h-full flex flex-col">
        <CardHeader className="p-0">
          <div className="relative aspect-video overflow-hidden bg-muted">
            {image ? (
              typeof image === 'string' ? (
                <Image 
                  src={image} 
                  alt={title} 
                  fill
                  className={cn(
                    "transition-transform duration-500",
                    imageDisplay === "icon" ? "object-contain p-12 group-hover:scale-110" : "object-cover group-hover:scale-105"
                  )}
                />
              ) : (
                <>
                  <Image 
                    src={image.light} 
                    alt={title} 
                    fill
                    className={cn(
                      "transition-transform duration-500 dark:hidden",
                      imageDisplay === "icon" ? "object-contain p-12 group-hover:scale-110" : "object-cover group-hover:scale-105"
                    )}
                  />
                  <Image 
                    src={image.dark} 
                    alt={title} 
                    fill
                    className={cn(
                      "transition-transform duration-500 hidden dark:block",
                      imageDisplay === "icon" ? "object-contain p-12 group-hover:scale-110" : "object-cover group-hover:scale-105"
                    )}
                  />
                </>
              )
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted/50 group-hover:bg-muted transition-colors">
                <span className="font-syncopate text-xs opacity-20 uppercase font-bold tracking-widest">{title}</span>
              </div>
            )}
            
            {/* Overlay on hover */}
            <div className={cn(
              "absolute inset-0 bg-background/80 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
              onClick && !href && !github && "hidden" // Hide overlay if just clicking the card opens modal and there are no links
            )}>
               {/* Only show overlay if there are links to show. Although currently the whole card is clickable if onClick is passed. */}
              {(github || href) && (
                <div className="flex gap-4">
                  {github && (
                    <Link href={github} target="_blank" onClick={(e) => e.stopPropagation()} className="p-2 bg-foreground text-background rounded-full hover:scale-110 transition-transform">
                      <Code className="w-5 h-5" />
                    </Link>
                  )}
                  {href && (
                    <Link href={href} target="_blank" onClick={(e) => e.stopPropagation()} className="p-2 bg-foreground text-background rounded-full hover:scale-110 transition-transform">
                      <ExternalLink className="w-5 h-5" />
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 flex-1">
          <div className="flex justify-between items-start gap-4 mb-2">
            <CardTitle className="font-syncopate text-lg uppercase tracking-tight">{title}</CardTitle>
            {inProgress && (
              <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest text-[#FFB000] border-[#FFB000] shrink-0 mt-0.5">
                In Progress
              </Badge>
            )}
          </div>
          <CardDescription className="font-sans text-sm text-muted-foreground leading-relaxed">
            {description}
          </CardDescription>
        </CardContent>
        
        <CardFooter className="p-6 pt-0 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="px-2 py-0 text-[10px] font-bold uppercase tracking-wider bg-background border border-border">
              {tag}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </motion.div>
  )
}

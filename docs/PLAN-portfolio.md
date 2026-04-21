# Portfolio Website Implementation Plan

Goal: Develop a high-performance, professional portfolio using Next.js (App Router), Shadcn UI, and Framer Motion. The site will reflect your transition from academic leadership to a Lead Frontend Developer and Intern Leader.

Technical Specifications
Typography: Syncopate (Headings), Space Grotesk (Body).

Color Palette: \* Light: Background #FFF8F0, Primary Text #09090B.

Dark: Background #1C2120, Primary Text #FAFAFA.

Tech Stack: Next.js 14+, TypeScript, Tailwind CSS, Lucide React icons.

Proposed Changes & Content Integration
Core Foundation
[MODIFY] app/layout.tsx
Configure next-themes for system-aware dark mode.

Load Google Fonts via next/font/google:

Syncopate: weights [400, 700].

Space Grotesk: weights [300, 400, 500, 700].

Pages & Layout
[MODIFY] app/page.tsx (Home)
Hero Section: High-impact typography for "Vince Gabriel Estander."

Sub-headline: "Lead Frontend Developer & Intern Leader | Specializing in Multi-tenant SaaS & Mobile Ecosystems."

Visuals: Subtle Framer Motion staggered entrance for the name and role.

[MODIFY] app/projects/page.tsx (Projects)
The masonry grid will feature the following priority projects:

Sphere HR: A multi-tenant SaaS HRIS platform. Detail the migration to Node.js/PostgreSQL and the Flutter-based employee portal.

RehearsAI: AI-powered interview preparation platform. Highlight the React/TypeScript/Tailwind CSS engineering stack.

Beyond Food Solutions HRIS: Professional project executed during the C8nnect IT Solutions internship.

[MODIFY] app/about/page.tsx (About)
Professional Summary: Focus on the leadership of intern teams and technical oversight at C8nnect IT Solutions.

Experience & Education: \* C8nnect IT Solutions: Intern Leader & Lead Frontend Developer.

Leadership: IT Club Governor and External Affairs Officer (Event coordination for 350+ students).

Technical Skills Grid:

Web: React, Next.js, Tailwind CSS, TypeScript.

Mobile: Flutter, Riverpod.

Backend/Database: Node.js, PostgreSQL (pgAdmin), Supabase.

Design: Adobe Photoshop 2025.

Components
[NEW] components/projects/project-card.tsx
A custom card component using Shadcn UI's Card primitives.

Include hover-state overlays showing the specific tech stack used (e.g., "Flutter + Riverpod" or "Next.js + Node.js").

[NEW] components/ui/navbar.tsx
Floating glassmorphism effect.

Dynamic logo toggle: black-logo.png for light mode; white-logo.png for dark mode.

## Verification Plan

### Automated Tests

- Run `npm run lint` and `npm run build` to verify Next.js configuration and strict TypeScript errors.

### Manual Verification

- Toggle dark/light switch to visually verify #FFF8F0 and #1C2120 color variables.
- Assess responsive behavior of the large text across mobile and desktop.
- Verify smooth Framer Motion transitions across routing and hover states.

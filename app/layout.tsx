import type { Metadata } from "next";
import { Syncopate, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastProvider } from "@/components/providers/toast-provider";
import { Navbar } from "@/components/ui/navbar";
import { AppLoader } from "../components/ui/app-loader";

const syncopate = Syncopate({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-syncopate",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Vince Gabriel | Fullstack Developer",
  description: "Fullstack Developer specializing in Frontend Development, UI/UX, and AI Integration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        syncopate.variable,
        inter.variable,
        "font-sans"
      )}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <ToastProvider>
            <AppLoader />
            <Navbar />
            <main className="flex-1 w-full max-w-none">
              {children}
            </main>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

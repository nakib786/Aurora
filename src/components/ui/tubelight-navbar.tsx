"use client"

import React, { useEffect, useState } from "react"
import { motion } from '../animations/MotionComponents'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isMobile, setIsMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Update active tab based on current URL pathname
  useEffect(() => {
    const matchingItem = items.find(item => {
      // Handle special case for root path
      if (pathname === '/' && item.url === '/') {
        return true;
      }
      // Handle other paths (checking if pathname starts with item.url)
      return pathname.startsWith(item.url) && item.url !== '/';
    })
    
    if (matchingItem) {
      setActiveTab(matchingItem.name)
    }
  }, [pathname, items])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-1/2 -translate-x-1/2 z-30 mb-6 w-auto max-w-[95vw]",
        "md:static md:transform-none md:mb-0 md:pt-0 md:w-auto md:max-w-none",
        className,
      )}
    >
      <div className={cn(
        "flex items-center transition-all duration-300",
        "gap-1 sm:gap-2",
        // Mobile (always has background)
        isMobile ? "bg-background/5 border border-border backdrop-blur-lg py-2 px-4 rounded-full shadow-lg" :
        // Desktop (background only when scrolled)
        scrolled ? "bg-transparent py-1 px-1 rounded-full" : "py-1 px-1 rounded-full"
      )}>
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer transition-colors",
                scrolled ? "text-foreground/80 hover:text-primary" : "text-white/90 hover:text-white",
                isActive && scrolled && "bg-white/10 text-primary",
                isActive && !scrolled && "text-white",
                isMobile 
                  ? "px-2 py-2 rounded-full flex items-center justify-center"
                  : "text-sm font-semibold px-4 sm:px-6 py-2 rounded-full"
              )}
            >
              <span className={cn(
                "transition-opacity duration-300",
                isMobile ? "hidden" : "inline"
              )}>
                {item.name}
              </span>
              <span className={cn(
                "transition-opacity duration-300",
                isMobile ? "inline" : "md:hidden"
              )}>
                <Icon size={isMobile ? 20 : 18} strokeWidth={isMobile ? 2 : 2.5} />
              </span>
              
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className={cn(
                    "absolute inset-0 w-full rounded-full -z-10",
                    isMobile && "bg-primary/10",
                    !isMobile && scrolled && "bg-white/10",
                    !isMobile && !scrolled && "bg-white/20"
                  )}
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className={cn(
                    "absolute left-1/2 -translate-x-1/2 rounded-t-full",
                    isMobile ? "w-5 h-1 -top-1 bg-primary" : 
                    scrolled ? "w-8 h-1 -top-[0.5rem] bg-primary" : "w-8 h-1 -top-[0.5rem] bg-white"
                  )}>
                    <div className={cn(
                      "absolute w-12 h-6 rounded-full blur-md -top-2 -left-2",
                      scrolled ? "bg-primary/20" : "bg-white/30"
                    )} />
                    <div className={cn(
                      "absolute w-8 h-6 rounded-full blur-md -top-1",
                      scrolled ? "bg-primary/20" : "bg-white/30"
                    )} />
                    <div className={cn(
                      "absolute w-4 h-4 rounded-full blur-sm top-0 left-2",
                      scrolled ? "bg-primary/20" : "bg-white/30"
                    )} />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
} 
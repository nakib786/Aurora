"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
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
        "gap-1 sm:gap-2 bg-background/5 border border-border backdrop-blur-lg",
        "rounded-full shadow-lg", 
        isMobile ? "py-2 px-4" : "py-1 px-1"
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
                "text-foreground/80 hover:text-primary",
                isActive && "bg-muted text-primary",
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
                    "absolute inset-0 w-full bg-primary/5 rounded-full -z-10",
                    isMobile && "bg-primary/10"
                  )}
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className={cn(
                    "absolute left-1/2 -translate-x-1/2 bg-primary rounded-t-full",
                    isMobile 
                      ? "w-5 h-1 -top-1" 
                      : "w-8 h-1 -top-2"
                  )}>
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
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
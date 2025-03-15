"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

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
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(items[0].name)
//   const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
    //   setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-2 sm:pt-6",
        className,
      )}
    >
      <div className="flex items-center gap-1 bg-background/5 border border-border bg-white py-1 px-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <div
              key={item.name}
              onClick={() => {
                setActiveTab(item.name)
                router.replace(window.location.pathname.startsWith("/dashboard/") ? item.url : `dashboard/${item.url}`)
              }}
              className={cn(
                "relative cursor-pointer font-semibold px-4 py-2 rounded-full transition-colors",
                "text-foreground/80 hover:text-accent",
                isActive && "bg-muted text-accent",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden flex-col justify-center items-center text-center">
                <Icon size={20} strokeWidth={2} className={cn("mx-auto", isActive && "text-accent")} />
                <p className="text-[10px] md:text-xs">{item.name}</p>
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-accent/10 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-accent rounded-t-full">
                    <div className="absolute w-12 h-6 bg-accent/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-accent/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-accent/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  Dumbbell, 
  History, 
  Settings, 
  LogOut, 
  User,
  Menu,
  X,
  BookOpen
} from "lucide-react"
import { useState } from "react"

const navItems = [
  { href: "/", label: "Workout", icon: Dumbbell },
  { href: "/library", label: "Library", icon: BookOpen },
  { href: "/history", label: "History", icon: History },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function Navigation() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <span className="text-2xl">🏋️</span>
            <span className="hidden sm:inline bg-gradient-to-r from-[#FF33AD] to-[#CC007A] bg-clip-text text-transparent">
              Kettlebell
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    isActive
                      ? "bg-[#FF0099]/10 text-[#FF0099]"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-2">
            {session?.user ? (
              <div className="hidden md:flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <User className="w-4 h-4" />
                  <span className="max-w-[120px] truncate">
                    {session.user.name || session.user.email}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signOut()}
                  className="text-zinc-400 hover:text-zinc-100"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-zinc-800 animate-slide-up">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                    isActive
                      ? "bg-[#FF0099]/10 text-[#FF0099]"
                        : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                )
              })}
              
              <div className="my-2 border-t border-zinc-800" />
              
              {session?.user ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-400">
                    <User className="w-5 h-5" />
                    <span className="truncate">
                      {session.user.name || session.user.email}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      signOut()
                      setMobileMenuOpen(false)
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-all"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 mx-4 py-3 rounded-lg text-sm font-medium bg-[#FF0099] text-white hover:bg-[#FF33AD] transition-all"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}


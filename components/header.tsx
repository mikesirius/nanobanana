"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

type UserInfo = {
  id: string
  email?: string | null
  name?: string | null
  avatar_url?: string | null
} | null

export default function Header({ user }: { user?: UserInfo }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍌</span>
            <span className="font-bold text-xl text-gray-900">Nano Banana</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition">
              Features
            </a>
            <a href="#showcase" className="text-gray-600 hover:text-gray-900 transition">
              Showcase
            </a>
            <a href="#reviews" className="text-gray-600 hover:text-gray-900 transition">
              Reviews
            </a>
            <a href="#faq" className="text-gray-600 hover:text-gray-900 transition">
              FAQ
            </a>
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-2 pr-2">
                  {user.avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={user.avatar_url} alt="avatar" className="w-8 h-8 rounded-full" />
                  ) : (
                    <span className="w-8 h-8 rounded-full bg-gray-200 inline-flex items-center justify-center">👤</span>
                  )}
                  <span className="text-sm text-gray-700 max-w-[180px] truncate">{user.name || user.email || "User"}</span>
                </div>
                <form action="/auth/signout" method="post">
                  <Button variant="outline" type="submit">Sign Out</Button>
                </form>
              </>
            ) : (
              <a href="/auth/github">
                <Button variant="outline">Sign In</Button>
              </a>
            )}
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">Launch Now</Button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden" aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 space-y-3">
            <a href="#features" className="block text-gray-600 hover:text-gray-900">
              Features
            </a>
            <a href="#showcase" className="block text-gray-600 hover:text-gray-900">
              Showcase
            </a>
            <a href="#reviews" className="block text-gray-600 hover:text-gray-900">
              Reviews
            </a>
            <a href="#faq" className="block text-gray-600 hover:text-gray-900">
              FAQ
            </a>
            <div className="flex gap-2 pt-2">
              {user ? (
                <form action="/auth/signout" method="post">
                  <Button variant="outline" size="sm" type="submit">Sign Out</Button>
                </form>
              ) : (
                <a href="/auth/github">
                  <Button variant="outline" size="sm">Sign In</Button>
                </a>
              )}
              <Button size="sm" className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">Launch Now</Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

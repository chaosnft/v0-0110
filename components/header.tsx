"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function Header({ scrolled }: { scrolled: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Image src="/logo.png" alt="0110 Capital" width={90} height={30} priority />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-12 items-center">
          <Link href="#about" className="text-sm font-medium hover:opacity-60 transition-opacity">
            ABOUT
          </Link>
          <Link href="#portfolio" className="text-sm font-medium hover:opacity-60 transition-opacity">
            PORTFOLIO
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:opacity-60 transition-opacity">
            CONTACT
          </Link>
          <Link href="#contact" className="px-6 py-2 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors">
            GET IN TOUCH
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="flex flex-col gap-4 p-6">
            <Link href="#about" className="text-sm font-medium">
              ABOUT
            </Link>
            <Link href="#portfolio" className="text-sm font-medium">
              PORTFOLIO
            </Link>
            <Link href="#contact" className="text-sm font-medium">
              CONTACT
            </Link>
            <Link href="#contact" className="w-full px-6 py-2 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors block text-center">
              GET IN TOUCH
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
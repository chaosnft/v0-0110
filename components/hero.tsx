"use client"

import { useEffect, useState } from "react"

export default function Hero() {
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      setOpacity(Math.max(1 - scrolled / 400, 0.3))
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>

      {/* Scroll effect content */}
      <div className="relative z-10 text-center max-w-3xl px-6 transition-opacity duration-300" style={{ opacity }}>
        <div className="inline-block mb-6 px-4 py-2 bg-black text-white text-xs tracking-widest font-semibold">
          INVESTMENT MANAGEMENT
        </div>
        <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">Strategic Capital Growth</h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          We identify and nurture exceptional opportunities across emerging markets and innovative sectors.
        </p>
        <button className="px-8 py-3 bg-black text-white text-sm font-semibold hover:bg-gray-800 transition-colors">
          EXPLORE PORTFOLIO
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
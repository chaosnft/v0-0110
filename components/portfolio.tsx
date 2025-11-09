"use client"

import { useEffect, useRef, useState } from "react"

const portfolioItems = [
  { id: 1, name: "TechVenture Co", category: "Technology", value: "$2.3B" },
  { id: 2, name: "GreenEnergy Inc", category: "Sustainability", value: "$1.8B" },
  { id: 3, name: "FinanceFlow", category: "FinTech", value: "$1.5B" },
  { id: 4, name: "HealthTech Labs", category: "Healthcare", value: "$950M" },
  { id: 5, name: "NextGen AI", category: "AI & ML", value: "$1.2B" },
  { id: 6, name: "Global Logistics", category: "Supply Chain", value: "$1.1B" },
]

export default function Portfolio() {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="portfolio" className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="text-sm tracking-widest font-semibold text-gray-600 mb-4">OUR PORTFOLIO</div>
          <h2 className="text-5xl font-bold mb-4">Portfolio Companies</h2>
          <p className="text-xl text-gray-600">Strategic investments across high-growth sectors</p>
        </div>

        {/* Grid of portfolio items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`p-8 bg-white border border-gray-200 cursor-pointer transition-all duration-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              } ${hoveredId === item.id ? "shadow-xl border-black" : "shadow-sm"}`}
              style={{
                transitionDelay: isVisible ? `${item.id * 100}ms` : "0ms",
              }}
            >
              {/* Logo placeholder */}
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-black transition-colors">
                <div className="text-xs font-bold text-gray-400 text-center px-2">{item.name.substring(0, 2)}</div>
              </div>

              <h3 className="text-xl font-bold mb-2">{item.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{item.category}</p>

              {/* Valuation badge */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                <span className="text-black opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

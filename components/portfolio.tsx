"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const portfolioItems = [
  { id: 1, name: "Moon Pay", category: "Technology", value: "$2.3B", logo: "/logos/1.png" },
  { id: 2, name: "Spechify", category: "EdTech", value: "$1.8B", logo: "/logos/2.png" },
  { id: 3, name: "Shopify", category: "Technology", value: "$1.5B", logo: "/logos/3.png" },
  { id: 4, name: "Coinzone", category: "Media", value: "$950M", logo: "/logos/4.png" },
  { id: 5, name: "Google Cloud", category: "Technology", value: "$1.2B", logo: "/logos/5.png" },
  { id: 6, name: "Like4Like", category: "Communication", value: "$1.1B", logo: "/logos/6.png" },
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
          <h2 className="text-5xl font-bold mb-4">Portfolio</h2>
          <p className="text-xl text-gray-600">Strategic investments across high-growth sectors.</p>
        </div>

        {/* Grid of portfolio items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`p-8 bg-white border border-gray-200 cursor-pointer transition-all duration-300 group ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              } ${hoveredId === item.id ? "shadow-xl border-black" : "shadow-sm"}`}
              style={{
                transitionDelay: isVisible ? `${item.id * 100}ms` : "0ms",
              }}
            >
              {/* Logo Image */}
              <div className="mb-4">
                <Image
                  src={item.logo}
                  alt={`${item.name} Logo`}
                  width={64}
                  height={64}
                  className="rounded-lg transition-all duration-300 "
                />
              </div>

              <h3 className="text-xl font-bold mb-2">{item.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{item.category}</p>

              {/* Valuation badge */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-black opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
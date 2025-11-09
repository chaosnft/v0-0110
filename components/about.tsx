"use client"

import { useEffect, useRef, useState } from "react"

export default function About() {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

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
    <section id="about" className="py-24 px-6 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="mb-4 text-sm tracking-widest font-semibold text-gray-600">WHO WE ARE</div>
            <h2 className="text-5xl font-bold mb-6 leading-tight">Precision Investment Strategy</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              With over two decades of market expertise, we transform strategic capital allocation into sustainable
              growth.
            </p>
            <ul className="space-y-4">
              {["Deep market analysis", "Long-term vision", "Diversified portfolio"].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-black font-bold">→</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right visual */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-100 rounded-lg flex items-center justify-center text-gray-400">
              <div className="text-center">
                <div className="text-5xl font-bold opacity-20 mb-4">$</div>
                <p className="text-sm">Visual Asset</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

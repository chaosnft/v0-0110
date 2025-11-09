"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { useFrame } from "@react-three/fiber"
import {
  OrbitControls,
  Sphere,
  MeshDistortMaterial,
  useTexture, // 1. Import useTexture
} from "@react-three/drei"
import * as THREE from "three"
// Đã gỡ bỏ gsap và ScrollTrigger để tránh lỗi build

function Globe({ isVisible }) {
  const meshRef = useRef()
  const dotsGroupRef = useRef()

  // 2. Tải texture bản đồ Trái Đất
  // (Chúng ta sử dụng một texture 2K tiêu chuẩn từ ví dụ của three.js)
  const [earthTexture] = useTexture([
    "https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg",
  ])

  // Auto rotation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5 // Continuous rotation
    }

    // Animate dots moving from point A to B on sphere surface
    if (dotsGroupRef.current) {
      const time = state.clock.elapsedTime
      dotsGroupRef.current.children.forEach((dot, index) => {
        if (dot.geometry) {
          const positions = dot.geometry.attributes.position.array
          const numDots = positions.length / 3
          for (let i = 0; i < numDots; i++) {
            const progress = (time * (0.2 + index * 0.01) + i * 0.1) % 1 // Speed and offset for each dot
            const startLat = (index / 5) * Math.PI - Math.PI / 2 // Random start latitude
            const startLng = i * (Math.PI * 2 / numDots) // Random start longitude
            const endLat = -startLat // Opposite for movement
            const endLng = startLng + Math.PI // 180 degrees away

            // Interpolate along great circle arc (path on the surface)
            const lat = startLat + (endLat - startLat) * progress
            const lng = startLng + (endLng - startLng) * progress

            // --- Bouncing effect ---
            const bounceProgress = Math.sin(progress * Math.PI)
            const baseRadius = 1.01 // Bán kính cơ bản (sát bề mặt)
            const maxBounceHeight = 0.2 // Chiều cao nảy tối đa
            const radius = baseRadius + bounceProgress * maxBounceHeight
            // --- End Bouncing ---

            positions[i * 3] = Math.cos(lng) * Math.cos(lat) * radius // X
            positions[i * 3 + 1] = Math.sin(lat) * radius // Y
            positions[i * 3 + 2] = Math.sin(lng) * Math.cos(lat) * radius // Z
          }
          dot.geometry.attributes.position.needsUpdate = true
        }
      })
    }
  })

  // Create dots geometry
  const createDots = (count) => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = 0
      positions[i * 3 + 1] = 0
      positions[i * 3 + 2] = 0
    }
    return positions
  }

  const dotGroups = [
    createDots(20),
    createDots(15),
    createDots(10),
    createDots(25),
    createDots(30),
  ]

  return (
    <group>
      {/* 3. Thay thế Wireframe bằng Globe có Texture */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} /> {/* Hình cầu mượt hơn */}
        <meshStandardMaterial
          map={earthTexture} // Áp dụng texture
          metalness={0.2} // Giảm độ chói kim loại
          roughness={0.7} // Tăng độ nhám
        />
      </mesh>

      {/* Dots group - like moving balls */}
      <group ref={dotsGroupRef}>
        {dotGroups.map((positions, i) => (
          <points key={i}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={positions.length / 3}
                array={positions}
                itemSize={3}
              />
            </bufferGeometry>
            <pointsMaterial
              color="#000000" // Black dots (balls)
              size={0.02} // Size like small balls
              transparent
              opacity={0.8}
              sizeAttenuation
            />
          </points>
        ))}
      </group>

      {/* Optional: Subtle glow/distort for depth */}
      <Sphere args={[1.02, 32, 32]} scale={[1, 1, 1]}>
        <MeshDistortMaterial
          color="#f0f0f0"
          transparent
          opacity={0.1}
          distort={0.4}
          speed={2}
        />
      </Sphere>
    </group>
  )
}

export default function About() {
  const sectionRef = useRef(null)
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  // (Đã gỡ bỏ useEffect của GSAP)
  // Hoạt ảnh được xử lý bằng CSS transition của Tailwind

  return (
    <section id="about" className="py-24 px-6 bg-white" ref={sectionRef}>
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

          {/* Right visual: Globe */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <div className="aspect-square rounded-lg overflow-hidden">
              <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                style={{ background: "transparent" }}
              >
                <ambientLight intensity={1.0} /> {/* Tăng cường độ ánh sáng môi trường */}
                <pointLight position={[10, 10, 10]} intensity={0.5} /> {/* Giảm point light một chút */}
                <Globe isVisible={isVisible} />
                <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
              </Canvas>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
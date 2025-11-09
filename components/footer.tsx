"use client"

import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          {/* Left: About/Logo */}
          <div className="flex-1">
            <Image src="/logo-white.png" alt="0110 Capital" width={90} height={30} className="mb-4" />
            <p className="text-gray-400 text-sm leading-relaxed">
              Strategic investment management for exceptional opportunities. <strong>Demo simulation only.</strong>
            </p>
          </div>

          {/* Right: COMPANY and CONNECT */}
          <div className="flex flex-col sm:flex-row gap-12 md:gap-16 lg:gap-24 flex-1 justify-end">
            {/* COMPANY */}
            <div className="min-w-0">
              <h4 className="font-semibold mb-4 text-sm">COMPANY</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Leadership
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            {/* CONNECT */}
            <section id="contact" className="min-w-0">
              <h4 className="font-semibold mb-4 text-sm">CONNECT</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="https://x.com/0110capital_" target='_blank' className="text-gray-400 hover:text-white transition-colors">
                    Twitter
                  </Link>
                </li>
              </ul>
              <p className="text-gray-400 text-sm mt-4">
                Contact: <a href="mailto:contact@0110.com" className="hover:text-white transition-colors">support@0110.com</a>
              </p>
            </section>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          {/* Bottom footer */}
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© {currentYear} 0110 Capital. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
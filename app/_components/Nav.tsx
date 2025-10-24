"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

const nav = [
  { href: "/", label: "Start" },
  { href: "/biznes", label: "Biznes" },
  { href: "/osobiste", label: "Osobiste" },
  { href: "/narzedzia", label: "Narzędzia" },
  { href: "/zarabianie", label: "Zarabianie" },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold">AI w Praktyce</Link>

        {/* desktop */}
        <ul className="hidden md:flex gap-4 text-sm">
          {nav.map(i => {
            const active = pathname === i.href
            return (
              <li key={i.href}>
                <Link
                  href={i.href}
                  className={"px-2 py-1 rounded " + (active ? "bg-gray-900 text-white" : "hover:bg-gray-100")}
                >
                  {i.label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* mobile toggle */}
        <button
          onClick={() => setOpen(v => !v)}
          className="md:hidden inline-flex items-center rounded px-3 py-2 border"
          aria-label="Menu"
        >
          ☰
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <ul className="mx-auto max-w-5xl px-4 py-2 space-y-1">
            {nav.map(i => {
              const active = pathname === i.href
              return (
                <li key={i.href}>
                  <Link
                    href={i.href}
                    className={"block px-2 py-2 rounded " + (active ? "bg-gray-900 text-white" : "hover:bg-gray-100")}
                  >
                    {i.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </nav>
  )
}

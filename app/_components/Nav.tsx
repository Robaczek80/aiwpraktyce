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
      <div className="container py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold">AI w Praktyce</Link>

        <ul className="hidden md:flex gap-1 text-sm">
          {nav.map(i => {
            const active = pathname === i.href
            return (
              <li key={i.href}>
                <Link href={i.href} className={"btn-ghost " + (active ? "bg-gray-900 text-white hover:bg-gray-900" : "")}>
                  {i.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <button onClick={() => setOpen(v => !v)} className="md:hidden btn-ghost" aria-label="Menu">☰</button>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white">
          <ul className="container py-2 space-y-1">
            {nav.map(i => {
              const active = pathname === i.href
              return (
                <li key={i.href}>
                  <Link href={i.href} className={"block btn-ghost " + (active ? "bg-gray-900 text-white hover:bg-gray-900" : "")}>
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

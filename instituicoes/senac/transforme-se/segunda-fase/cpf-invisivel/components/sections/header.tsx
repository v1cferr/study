"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Seguranca", href: "#seguranca" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSignup = () => {
    document.getElementById("cadastro")?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-background/10" 
        : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="/" className="font-display text-xl font-bold flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold text-sm">CP</span>
            </div>
            <span><span className="text-primary">CPF</span> Invisivel</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-full hover:bg-secondary/50 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Entrar
            </Button>
            <Button 
              size="sm" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-md shadow-primary/20"
              onClick={scrollToSignup}
            >
              Comecar gratis
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-secondary/50 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu with slide animation */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${
        isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
      }`}>
        <div className="bg-background/95 backdrop-blur-xl border-b border-border/50 px-4 py-6 space-y-2">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="block py-3 px-4 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-xl transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            <Button variant="outline" className="w-full bg-transparent">
              Entrar
            </Button>
            <Button 
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={scrollToSignup}
            >
              Comecar gratis
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

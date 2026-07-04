import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { PenTool, Users, Chrome as Home, Menu, X } from 'lucide-react'
import { useState } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/characters', label: 'Characters', icon: Users },
    { path: '/stories', label: 'Stories', icon: PenTool },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-cream-50/95 backdrop-blur-sm border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cream-400 to-rose-400 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <PenTool className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <span className="font-serif text-2xl font-semibold text-ink-900 tracking-tight">
                velvette
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-ink-900 text-cream-50'
                        : 'text-ink-600 hover:text-ink-900 hover:bg-cream-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-ink-600 hover:text-ink-900 hover:bg-cream-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-cream-200 bg-cream-50 animate-fade-in">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive(item.path)
                        ? 'bg-ink-900 text-cream-50'
                        : 'text-ink-600 hover:text-ink-900 hover:bg-cream-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </nav>
        )}
      </header>

      {/* Main content */}
      <main className="pt-16 min-h-screen">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-ink-900 text-cream-100 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cream-400 to-rose-400 flex items-center justify-center">
                <PenTool className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif text-lg">velvette</span>
            </div>
            <p className="text-ink-400 text-sm">
              A personal writing haven where characters meet.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

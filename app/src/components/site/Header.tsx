import { useEffect, useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { BrandLockup } from './Logo'
import ThemeToggle from './ThemeToggle'
import { NAV } from '@/lib/content'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-border shadow-soft' : 'bg-transparent'
      }`}
    >
      <div className="container-site flex h-[68px] items-center justify-between gap-4">
        <a href="#top" className="flex shrink-0 items-center" aria-label="TIM — на главную">
          <BrandLockup />
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Основная навигация">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-full px-3.5 py-2 text-[14.5px] font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden items-center gap-1.5 whitespace-nowrap rounded-full border border-brand/40 bg-brand-soft px-4 py-2 text-[14.5px] font-semibold text-brand-strong transition-all hover:bg-brand hover:text-white sm:inline-flex"
          >
            Запросить демо
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`glass overflow-hidden border-b border-border transition-all duration-300 lg:hidden ${
          open ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="container-site flex flex-col gap-1 py-4" aria-label="Мобильная навигация">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 text-[15px] font-medium text-foreground/85 transition-colors hover:bg-muted"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-brand px-4 py-2.5 text-[15px] font-semibold text-white"
          >
            Запросить демо
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </nav>
      </div>
    </header>
  )
}

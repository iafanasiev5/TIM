import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

function getInitial(): boolean {
  if (typeof window === 'undefined') return false
  const param = new URLSearchParams(window.location.search).get('theme')
  if (param) return param === 'dark'
  const saved = localStorage.getItem('t1m-theme')
  if (saved) return saved === 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function useTheme() {
  const [dark, setDark] = useState<boolean>(getInitial)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', dark)
    localStorage.setItem('t1m-theme', dark ? 'dark' : 'light')
  }, [dark])

  return { dark, toggle: () => setDark((d) => !d) }
}

export default function ThemeToggle() {
  const { dark, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Включить светлую тему' : 'Включить тёмную тему'}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted"
    >
      <Sun className={`h-[18px] w-[18px] transition-all ${dark ? 'scale-0 -rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'} absolute`} />
      <Moon className={`h-[18px] w-[18px] transition-all ${dark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 rotate-90 opacity-0'} absolute`} />
    </button>
  )
}

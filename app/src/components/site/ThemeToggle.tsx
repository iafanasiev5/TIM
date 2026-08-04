import { useEffect, useState } from 'react'
import { Moon, Palette, Sun } from 'lucide-react'

type ThemeMode = 'mixed' | 'light' | 'dark'

const MODES: Array<{
  value: ThemeMode
  label: string
  Icon: typeof Palette
}> = [
  { value: 'mixed', label: 'Разнообразие', Icon: Palette },
  { value: 'light', label: 'Светлая тема', Icon: Sun },
  { value: 'dark', label: 'Тёмная тема', Icon: Moon },
]

function isThemeMode(value: string | null): value is ThemeMode {
  return value === 'mixed' || value === 'light' || value === 'dark'
}

function getInitial(): ThemeMode {
  if (typeof window === 'undefined') return 'mixed'
  const param = new URLSearchParams(window.location.search).get('theme')
  if (isThemeMode(param)) return param
  const saved = localStorage.getItem('t1m-theme')
  if (isThemeMode(saved)) return saved
  return 'mixed'
}

function useTheme() {
  const [mode, setMode] = useState<ThemeMode>(getInitial)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', mode === 'dark')
    root.classList.toggle('mixed', mode === 'mixed')
    root.style.colorScheme = mode === 'dark' ? 'dark' : 'light'
    localStorage.setItem('t1m-theme', mode)
  }, [mode])

  return { mode, setMode }
}

export default function ThemeToggle() {
  const { mode, setMode } = useTheme()
  return (
    <div
      className="flex h-9 items-center rounded-full border border-border bg-card p-0.5 shadow-xs"
      role="group"
      aria-label="Тема оформления"
    >
      {MODES.map(({ value, label, Icon }) => {
        const active = mode === value
        return (
          <button
            key={value}
            type="button"
            onClick={() => setMode(value)}
            aria-label={label}
            aria-pressed={active}
            title={label}
            className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${
              active
                ? 'bg-brand text-white shadow-soft'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <Icon className="h-4 w-4" />
          </button>
        )
      })}
    </div>
  )
}

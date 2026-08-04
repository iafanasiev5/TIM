import { useState } from 'react'
import { X, ArrowRight } from 'lucide-react'
import { WIDGET } from '@/lib/content'

/** Дружелюбный смайл-логотип TIM: скруглённый квадрат с градиентом,
 *  тёмная мордочка (глаза + улыбка + антенна) и подпись TIM с голубой M */
function TimSmile({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <defs>
        <linearGradient id="timBadge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#33C3FF" />
          <stop offset="1" stopColor="#0077E0" />
        </linearGradient>
      </defs>
      {/* антенна */}
      <line x1="32" y1="2.5" x2="32" y2="9" stroke="#33C3FF" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="32" cy="2.6" r="2.6" fill="#82CFFF" />
      {/* корпус */}
      <rect x="5" y="9" width="54" height="54" rx="15" fill="url(#timBadge)" />
      <rect x="5" y="9" width="54" height="54" rx="15" fill="white" opacity="0.06" />
      {/* глаза */}
      <circle cx="23.5" cy="31" r="4" fill="#0A1633" />
      <circle cx="40.5" cy="31" r="4" fill="#0A1633" />
      <circle cx="24.9" cy="29.6" r="1.3" fill="white" opacity="0.9" />
      <circle cx="41.9" cy="29.6" r="1.3" fill="white" opacity="0.9" />
      {/* улыбка */}
      <path d="M23 41.5 Q32 50 41 41.5" stroke="#0A1633" strokeWidth="3.4" strokeLinecap="round" fill="none" />
    </svg>
  )
}

export default function ChatWidget() {
  const [open, setOpen] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches,
  )

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Открыть виджет ТИМ"
        className="group fixed bottom-5 right-5 z-50 flex h-[54px] w-[54px] items-center justify-center rounded-full shadow-lift transition-transform duration-300 hover:scale-105"
      >
        <TimSmile size={54} />
      </button>
    )
  }

  return (
    <aside
      className="animate-fade-up fixed bottom-5 right-5 z-50 w-[340px] max-w-[calc(100vw-40px)] overflow-hidden rounded-[24px] border border-white/10 bg-navy text-white shadow-lift dark:border-slate-200 dark:bg-white dark:text-slate-900"
      role="complementary"
      aria-label="Виджет консультанта ТИМ"
    >
      {/* мягкое свечение */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/25 blur-2xl dark:bg-brand/15" aria-hidden />

      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Закрыть виджет"
        className="absolute right-3.5 top-3.5 z-10 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white dark:text-slate-400 dark:hover:bg-slate-100 dark:hover:text-slate-900"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="relative flex items-center gap-4 p-5 pr-11">
        <span className="shrink-0 animate-float">
          <TimSmile size={58} />
        </span>
        <div className="min-w-0">
          <div className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-sky-300 dark:text-brand">
            {WIDGET.eyebrow}
          </div>
          <div className="mt-1 text-[19px] font-bold leading-tight tracking-tight">
            {WIDGET.title}
          </div>
          <div className="mt-0.5 text-[13px] leading-snug text-white/60 dark:text-slate-500">
            {WIDGET.text}
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 px-5 py-3.5 dark:border-slate-200">
        <a
          href="#contact"
          className="group inline-flex items-center gap-2 text-[14px] font-semibold text-sky-300 transition-colors hover:text-sky-200 dark:text-brand dark:hover:text-brand-strong"
        >
          {WIDGET.cta}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </aside>
  )
}

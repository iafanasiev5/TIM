import { BRAND } from '@/lib/content'

export default function Logo() {
  // SVG обрезаны под контент: viewBox 104.8 105.9 1102.9 178.2 (≈6.19:1).
  // Светлая тема — тёмный логотип, тёмная — белый. Фон прозрачный.
  // Высота 32px: при шапке 68px сверху и снизу остаётся ≈18px.
  return (
    <a href="#top" className="flex h-[32px] shrink-0 items-center" aria-label="Т1 Иннотех — на главную">
      <img
        src="/logo-t1-innotech.svg"
        alt="Т1 Иннотех"
        width={198}
        height={32}
        className="h-[32px] w-[198px] shrink-0 dark:hidden"
      />
      <img
        src="/logo-t1-innotech-white.svg"
        alt="Т1 Иннотех"
        width={198}
        height={32}
        className="hidden h-[32px] w-[198px] shrink-0 dark:block"
      />
    </a>
  )
}

export function T1mMark({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center bg-gradient-to-br from-brand to-brand-strong font-bold tracking-tight text-white ${className}`}
      style={{ borderRadius: 8 }}
      aria-hidden
    >
      TI<span style={{ color: '#B6E3FF' }}>M</span>
    </span>
  )
}

/** Фирменный локап: значок TIM в квадратике + надпись в 2 строки (шапка и футер) */
export function BrandLockup({ badgeClass = 'h-9 w-9 text-[12px]', textClass = '' }: { badgeClass?: string; textClass?: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2.5">
      <T1mMark className={badgeClass} />
      <span className={`text-[14.5px] font-bold leading-[1.15] tracking-tight ${textClass}`}>
        {BRAND.line1}
        <br />
        {BRAND.line2}
      </span>
    </span>
  )
}

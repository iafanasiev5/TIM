import { MessageSquare, LayoutGrid, BarChart3, FileText, Database, Settings, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react'
import { HERO } from '@/lib/content'
import { T1mMark } from './Logo'
import { useRevealRoot } from '@/hooks/useReveal'

function HeroChart() {
  const { months, values, chartLabel, chartTitle } = HERO.chat
  const W = 560
  const H = 220
  const padX = 28
  const top = 18
  const bottom = 34
  const innerH = H - top - bottom
  const step = (W - padX * 2) / (values.length - 1)

  const pts = values.map((v, i) => ({
    x: padX + i * step,
    y: top + innerH * (1 - v / 100),
    v,
  }))

  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
  const area = `${line} L${pts[pts.length - 1].x},${H - bottom} L${pts[0].x},${H - bottom} Z`

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="mb-1 flex items-start justify-between">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{chartLabel}</div>
          <div className="mt-1 text-[15px] font-semibold md:text-base">{chartTitle}</div>
        </div>
        <div className="flex gap-1 pt-1">
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 w-full" role="img" aria-label={chartTitle}>
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--brand))" stopOpacity="0.22" />
            <stop offset="100%" stopColor="hsl(var(--brand))" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--brand))" stopOpacity="0.28" />
            <stop offset="100%" stopColor="hsl(var(--brand))" stopOpacity="0.06" />
          </linearGradient>
        </defs>

        {[0, 50, 100].map((g) => {
          const y = top + innerH * (1 - g / 100)
          return (
            <g key={g}>
              <line x1={padX} x2={W - padX} y1={y} y2={y} stroke="hsl(var(--border))" strokeWidth="1" />
              <text x={padX - 8} y={y + 4} textAnchor="end" fontSize="11" fill="hsl(var(--muted-foreground))">
                {g}
              </text>
            </g>
          )
        })}

        {pts.map((p, i) => (
          <rect
            key={i}
            className="chart-bar"
            style={{ animationDelay: `${0.15 + i * 0.09}s` }}
            x={p.x - 22}
            y={p.y + 8}
            width="44"
            height={Math.max(H - bottom - p.y - 8, 4)}
            rx="8"
            fill="url(#barFill)"
          />
        ))}

        <path d={area} fill="url(#areaFill)" />
        <path d={line} fill="none" stroke="hsl(var(--brand))" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="chart-line" />

        {pts.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="7" fill="hsl(var(--brand))" opacity="0.18" />
            <circle cx={p.x} cy={p.y} r="4" fill="hsl(var(--card))" stroke="hsl(var(--brand))" strokeWidth="2.5" />
            <text x={p.x} y={H - 10} textAnchor="middle" fontSize="12" fill="hsl(var(--muted-foreground))">
              {months[i]}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

function ProductMock() {
  const { chat } = HERO
  return (
    <div className="animate-float relative">
      {/* glow */}
      <div className="absolute -inset-8 -z-10 rounded-[40px] bg-gradient-to-br from-brand/25 via-brand/5 to-transparent blur-2xl" aria-hidden />

      <div className="flex overflow-hidden rounded-[28px] border border-border bg-card/90 shadow-lift backdrop-blur">
        {/* side rail */}
        <div className="hidden w-[64px] flex-col items-center gap-5 border-r border-border bg-muted/40 py-5 sm:flex">
          <T1mMark className="h-9 w-9 text-[13px]" />
          <MessageSquare className="h-5 w-5 text-brand" />
          <LayoutGrid className="h-5 w-5 text-muted-foreground" />
          <BarChart3 className="h-5 w-5 text-muted-foreground" />
          <FileText className="h-5 w-5 text-muted-foreground" />
          <Database className="h-5 w-5 text-muted-foreground" />
          <Settings className="mt-auto h-5 w-5 text-muted-foreground" />
        </div>

        <div className="flex-1 p-4 md:p-5">
          {/* question */}
          <div className="flex items-start gap-3 rounded-2xl border border-border bg-muted/50 p-4">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-card shadow-xs">
              <MessageSquare className="h-4 w-4 text-brand" />
            </span>
            <p className="text-[14.5px] font-semibold leading-snug md:text-[15.5px]">{chat.question}</p>
            <Sparkles className="ml-auto mt-1 h-4 w-4 shrink-0 text-brand pulse-dot" />
          </div>

          <div className="mt-4">
            <HeroChart />
          </div>

          {/* insight */}
          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-brand/25 bg-brand-soft p-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-card shadow-xs">
              <ShieldCheck className="h-5 w-5 text-brand" />
            </span>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{chat.insightLabel}</div>
              <p className="mt-0.5 text-[14.5px] font-bold leading-snug text-brand-strong">{chat.insight}</p>
            </div>
          </div>

          {/* badges */}
          <div className="mt-4 grid grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-card">
            {chat.badges.map((b) => (
              <div key={b.label} className="flex items-center gap-2 px-3 py-3 md:px-4">
                <ShieldCheck className="h-4 w-4 shrink-0 text-brand" />
                <div className="min-w-0">
                  <div className="truncate text-[12.5px] font-semibold">{b.label}</div>
                  <div className="flex items-center gap-1 text-[11.5px] text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {b.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const ref = useRevealRoot<HTMLElement>()
  return (
    <section id="top" ref={ref} className="relative overflow-hidden pb-20 pt-[120px] md:pb-28 md:pt-[160px] 2xl:pb-24 2xl:pt-48">
      {/* background */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-x-0 top-0 h-[640px] bg-gradient-to-b from-brand-soft via-background to-background" />
        <div
          className="absolute inset-0 opacity-[0.5] dark:opacity-[0.25]"
          style={{
            backgroundImage: 'radial-gradient(hsl(var(--brand) / 0.18) 1px, transparent 1px)',
            backgroundSize: '26px 26px',
            maskImage: 'linear-gradient(to bottom, black 0%, transparent 70%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="container-site grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div>
          <div className="reveal inline-flex flex-wrap items-center gap-x-3.5 gap-y-1 text-[13px] font-bold uppercase tracking-[0.18em] text-brand">
            {HERO.eyebrow.split(' • ').map((w) => (
              <span key={w} className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
                {w}
              </span>
            ))}
          </div>

          <div
            className="reveal mt-6 select-none bg-gradient-to-br from-brand to-brand-strong bg-clip-text text-[92px] font-extrabold leading-[0.85] tracking-[-0.04em] text-transparent md:text-[150px]"
            style={{ transitionDelay: '80ms' }}
            aria-hidden
          >
            TIM
          </div>

          <h1 className="reveal h2 mt-6 max-w-[620px]" style={{ transitionDelay: '160ms' }}>
            {HERO.title}
          </h1>

          <p className="reveal lead mt-6 max-w-[520px]" style={{ transitionDelay: '240ms' }}>
            {HERO.subtitle}
          </p>

          <div className="reveal mt-9 flex flex-wrap items-center gap-3.5" style={{ transitionDelay: '320ms' }}>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-[15.5px] font-semibold text-white shadow-lift transition-all hover:bg-brand-strong"
            >
              {HERO.primaryCta}
              <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#scenarios"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-[15.5px] font-semibold transition-colors hover:bg-muted"
            >
              {HERO.secondaryCta}
            </a>
          </div>
        </div>

        <div className="reveal" style={{ transitionDelay: '200ms' }}>
          <ProductMock />
        </div>
      </div>
    </section>
  )
}

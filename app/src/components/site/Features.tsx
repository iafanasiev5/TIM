import {
  FileSearch, ShieldCheck, Table2, LineChart, Code2, Sparkles, AppWindow, Database, Brain,
} from 'lucide-react'
import { FEATURES } from '@/lib/content'
import { useRevealRoot } from '@/hooks/useReveal'

const ICONS: Record<string, typeof FileSearch> = {
  docs: FileSearch,
  roles: ShieldCheck,
  tables: Table2,
  dashboards: LineChart,
  nl2sql: Code2,
  insights: Sparkles,
  'single-window': AppWindow,
  sources: Database,
  memory: Brain,
}

/** Маленькие абстрактные UI-иллюстрации для карточек */
function MiniViz({ id }: { id: string }) {
  const bar = 'rounded-full bg-brand/70'
  const soft = 'rounded-md bg-brand/15'
  switch (id) {
    case 'docs':
      return (
        <div className="flex h-full flex-col gap-2 p-3">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-2.5 py-1.5">
            <FileSearch className="h-3 w-3 text-brand" />
            <span className="h-1.5 w-24 rounded-full bg-muted-foreground/25" />
          </div>
          <div className="flex flex-1 gap-2">
            <div className="flex-1 space-y-1.5 rounded-lg bg-card p-2 shadow-xs">
              <span className={`block h-1.5 w-4/5 ${soft}`} />
              <span className={`block h-1.5 w-full ${soft}`} />
              <span className={`block h-1.5 w-3/5 ${soft}`} />
            </div>
            <div className="flex-1 space-y-1.5 rounded-lg bg-card p-2 shadow-xs">
              <span className={`block h-1.5 w-full ${soft}`} />
              <span className={`block h-1.5 w-2/3 ${soft}`} />
              <span className={`block h-1.5 w-4/5 ${soft}`} />
            </div>
          </div>
          <div className="self-start rounded-md bg-brand-soft px-2 py-1 text-[9px] font-bold text-brand-strong">Ответ сформирован · 96%</div>
        </div>
      )
    case 'roles':
      return (
        <div className="relative flex h-full items-center justify-center p-3">
          <div className="absolute left-3 top-3 space-y-1.5">
            <span className="block rounded-md bg-card px-2 py-1 text-[9px] font-semibold shadow-xs">Аналитик</span>
            <span className="block rounded-md bg-card px-2 py-1 text-[9px] font-semibold shadow-xs">Финансы · ЦФО 04</span>
          </div>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand shadow-lift">
            <ShieldCheck className="h-6 w-6 text-white" />
          </span>
          <span className="absolute bottom-3 right-3 flex items-center gap-1 text-[9px] font-semibold text-emerald-600 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Доступ разрешён
          </span>
        </div>
      )
    case 'tables':
      return (
        <div className="flex h-full flex-col justify-center gap-1.5 p-3">
          <div className="grid grid-cols-4 gap-1.5">
            {['', 'План', 'Факт', 'Δ'].map((h, i) => (
              <span key={i} className={`rounded-md px-1.5 py-1 text-center text-[8.5px] font-bold text-white ${i === 0 ? 'bg-transparent' : 'bg-brand/80'}`}>{h}</span>
            ))}
          </div>
          {[0, 1, 2].map((r) => (
            <div key={r} className="grid grid-cols-4 gap-1.5">
              <span className={`h-4 ${soft}`} />
              <span className={`h-4 ${soft}`} />
              <span className={`h-4 ${soft}`} />
              <span className={`h-4 rounded-md ${r === 1 ? 'bg-rose-400/30' : 'bg-emerald-400/30'}`} />
            </div>
          ))}
        </div>
      )
    case 'dashboards':
      return (
        <div className="flex h-full items-end gap-2 p-3">
          {[40, 62, 50, 78, 66, 88].map((h, i) => (
            <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-brand/25 to-brand/70" style={{ height: `${h}%` }} />
          ))}
          <svg viewBox="0 0 100 40" className="absolute inset-x-3 top-3 w-[calc(100%-24px)]" preserveAspectRatio="none" aria-hidden>
            <polyline points="0,30 20,18 40,24 60,10 80,16 100,6" fill="none" stroke="hsl(var(--brand))" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      )
    case 'nl2sql':
      return (
        <div className="flex h-full flex-col justify-center gap-1.5 rounded-xl p-3 font-mono text-[9.5px] leading-relaxed">
          <div className="text-[8.5px] font-sans font-bold uppercase tracking-wider text-muted-foreground">Естественный язык → SQL</div>
          <div className="rounded-lg bg-navy p-2.5 text-sky-300">
            <span className="text-fuchsia-400">SELECT</span> region, <span className="text-fuchsia-400">SUM</span>(revenue)
            <br />
            <span className="text-fuchsia-400">FROM</span> mart.sales
            <br />
            <span className="text-fuchsia-400">GROUP BY</span> region
          </div>
          <span className="flex items-center gap-1 text-[8.5px] font-sans font-semibold text-emerald-600 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> SQL готов · 12 строк
          </span>
        </div>
      )
    case 'insights':
      return (
        <div className="flex h-full items-center gap-3 p-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-indigo-500 text-[11px] font-bold text-white shadow-lift">AI</span>
          <div className="flex-1 space-y-1.5">
            <span className="block text-[9px] font-bold">Рост формируют 3 фактора</span>
            {['Контракты +5,1%', 'Спрос +3,8%', 'Курс +2,4%'].map((t) => (
              <span key={t} className="block rounded-md bg-card px-2 py-0.5 text-[8.5px] font-medium shadow-xs">{t}</span>
            ))}
          </div>
        </div>
      )
    case 'single-window':
      return (
        <div className="flex h-full gap-2 p-3">
          <div className="w-8 space-y-1.5 rounded-lg bg-card p-1.5 shadow-xs">
            <span className={`block h-1.5 w-full ${bar} opacity-60`} />
            <span className={`block h-1.5 w-full ${soft}`} />
            <span className={`block h-1.5 w-full ${soft}`} />
          </div>
          <div className="flex-1 space-y-2">
            <div className="rounded-lg bg-card px-2.5 py-1.5 text-[9px] font-semibold shadow-xs">Почему выросли затраты?</div>
            <div className="flex items-end gap-1.5 rounded-lg bg-card p-2 shadow-xs">
              {[45, 70, 55, 85].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm bg-brand/60" style={{ height: 8 + h / 4 }} />
              ))}
            </div>
            <span className="inline-block rounded-md bg-brand px-2 py-0.5 text-[8px] font-bold text-white">единый контекст</span>
          </div>
        </div>
      )
    case 'sources':
      return (
        <div className="flex h-full items-center justify-between gap-2 p-3">
          <div className="grid grid-cols-2 gap-1.5">
            {['Power BI', 'DWH', 'Oracle', 'Snowflake'].map((s) => (
              <span key={s} className="rounded-md bg-card px-2 py-1 text-[8.5px] font-semibold shadow-xs">{s}</span>
            ))}
          </div>
          <svg width="34" height="40" aria-hidden>
            <path d="M4 10 C 20 10, 14 20, 30 20 M4 30 C 20 30, 14 20, 30 20" stroke="hsl(var(--brand) / 0.5)" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
          </svg>
          <span className="flex h-10 w-10 items-center justify-center bg-brand text-[10px] font-bold text-white shadow-lift" style={{ borderRadius: 8 }}>TI<span style={{ color: '#B6E3FF' }}>M</span></span>
        </div>
      )
    case 'memory':
      return (
        <div className="flex h-full items-center justify-center gap-2 p-3">
          <div className="space-y-1.5">
            <span className="block rounded-lg bg-card px-2.5 py-1.5 text-[8.5px] font-semibold shadow-xs">Сессия · текущий анализ</span>
            <span className="block rounded-lg bg-card px-2.5 py-1.5 text-[8.5px] font-semibold shadow-xs">Бизнес-контекст · термины</span>
          </div>
          <svg width="26" height="20" aria-hidden>
            <path d="M2 10 H 24" stroke="hsl(var(--brand) / 0.5)" strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>
          <span className="rounded-xl border border-brand/40 bg-brand-soft px-3 py-2 text-[9px] font-bold text-brand-strong">Память · фильтры + метрики</span>
        </div>
      )
    default:
      return null
  }
}

export default function Features() {
  const ref = useRevealRoot<HTMLElement>()
  return (
    <section id="features" ref={ref} className="scroll-mt-20 bg-muted/40 py-20 md:py-28 dark:bg-muted/5">
      <div className="container-site">
        <div className="reveal eyebrow">{FEATURES.eyebrow}</div>
        <h2 className="reveal h2 mt-5 max-w-[900px]" style={{ transitionDelay: '80ms' }}>
          {FEATURES.title}
        </h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.items.map((f, i) => {
            const Icon = ICONS[f.id] ?? Sparkles
            return (
              <article
                key={f.id}
                className="reveal group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                style={{ transitionDelay: `${(i % 3) * 90}ms` }}
              >
                <div className="relative h-[120px] overflow-hidden rounded-2xl bg-muted/60 dark:bg-muted/20">
                  <MiniViz id={f.id} />
                </div>
                <div className="mt-5 flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <div>
                    <h3 className="card-title">{f.title}</h3>
                    <p className="card-text mt-2">{f.text}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <p className="reveal mx-auto mt-9 max-w-[560px] text-center text-[13.5px] leading-relaxed text-muted-foreground">
          {FEATURES.note}
        </p>
      </div>
    </section>
  )
}

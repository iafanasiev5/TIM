import { EFFECTS } from '@/lib/content'
import { useRevealRoot } from '@/hooks/useReveal'

export default function Effects() {
  const ref = useRevealRoot<HTMLElement>()
  return (
    <section id="effects" ref={ref} className="scroll-mt-20 bg-muted/40 py-20 md:py-28 dark:bg-muted/5">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="reveal eyebrow">{EFFECTS.eyebrow}</div>
            <h2 className="reveal h2 mt-5 max-w-[720px]" style={{ transitionDelay: '80ms' }}>{EFFECTS.title}</h2>
          </div>
          <p className="reveal lead max-w-[400px]" style={{ transitionDelay: '140ms' }}>{EFFECTS.lead}</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EFFECTS.items.map((e, i) => (
            <article
              key={e.title}
              className="reveal group flex flex-col rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              style={{ transitionDelay: `${(i % 3) * 90}ms` }}
            >
              <span className="bg-gradient-to-br from-brand to-brand-strong bg-clip-text text-[34px] font-normal leading-none tracking-tight text-transparent md:text-[38px]">
                {e.stat}
              </span>
              <h3 className="card-title mt-5">{e.title}</h3>
              <p className="card-text mt-2.5">{e.text}</p>
            </article>
          ))}
        </div>

        {/* KPI band */}
        <div className="reveal mt-8 flex flex-col items-start gap-6 rounded-3xl border border-brand/20 bg-brand-soft px-7 py-7 md:flex-row md:items-center md:gap-10 md:px-9">
          <span className="shrink-0 text-[12px] font-bold uppercase tracking-[0.16em] text-brand-strong">{EFFECTS.kpiLabel}</span>
          <div className="grid flex-1 gap-6 sm:grid-cols-3 md:gap-8">
            {EFFECTS.kpis.map((k) => (
              <div key={k.value + k.text} className="flex items-center gap-4">
                <span className="shrink-0 text-[30px] font-normal tabular-nums tracking-tight text-brand md:text-[34px]">{k.value}</span>
                <span className="max-w-[190px] text-[13px] font-medium leading-snug text-foreground/70">{k.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

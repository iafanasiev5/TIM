import { ArrowRight, Database, BarChart3, BookOpen, ShieldCheck, Cpu, Settings2 } from 'lucide-react'
import { ARCHITECTURE } from '@/lib/content'
import { T1mMark } from './Logo'
import { useRevealRoot } from '@/hooks/useReveal'

const SOURCE_ICONS = [Database, BarChart3, BookOpen]

function FlowArrow() {
  return (
    <div className="flex items-center justify-center lg:h-full" aria-hidden>
      <ArrowRight className="h-6 w-6 rotate-90 text-brand/60 lg:rotate-0" />
    </div>
  )
}

export default function Architecture() {
  const ref = useRevealRoot<HTMLElement>()
  const { flow, deploy } = ARCHITECTURE
  return (
    <section id="architecture" ref={ref} className="scroll-mt-20 bg-muted/40 py-20 md:py-28 dark:bg-muted/5">
      <div className="container-site">
        <div className="reveal eyebrow">{ARCHITECTURE.eyebrow}</div>
        <h2 className="reveal h2 mt-5 max-w-[880px] whitespace-pre-line" style={{ transitionDelay: '80ms' }}>
          {ARCHITECTURE.title}
        </h2>

        {/* Flow diagram */}
        <div className="reveal mt-12 rounded-[28px] border border-border bg-card p-6 shadow-soft md:p-9" style={{ transitionDelay: '140ms' }}>
          <div className="grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1.1fr_auto_1.2fr_auto_1.15fr]">
            {/* Entry */}
            <div className="flex flex-col items-center justify-center gap-2.5 rounded-2xl border border-border bg-muted/40 p-6 text-center dark:bg-muted/15">
              <T1mMark className="h-12 w-12 text-[15px] shadow-lift" />
              <div className="text-[17px] font-bold">{flow.entry.title}</div>
            </div>
            <FlowArrow />

            {/* Orchestrator */}
            <div className="flex flex-col justify-center rounded-2xl border border-border bg-muted/40 p-6 dark:bg-muted/15">
              <div className="text-center text-[10.5px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{flow.orchestrator.label}</div>
              <div className="mt-1 text-center text-[20px] font-extrabold">{flow.orchestrator.title}</div>
              <div className="mt-4 flex justify-center gap-2">
                {flow.orchestrator.chips.map((c) => (
                  <span key={c} className="rounded-lg border border-border bg-card px-3 py-1.5 text-[12px] font-semibold text-muted-foreground">{c}</span>
                ))}
              </div>
            </div>
            <FlowArrow />

            {/* Middle stack */}
            <div className="flex flex-col gap-3">
              <div className="flex-1 rounded-2xl border border-border bg-muted/40 p-5 dark:bg-muted/15">
                <div className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  <Cpu className="h-3.5 w-3.5 text-brand" /> {flow.middle[0].label}
                </div>
                <div className="mt-1.5 text-[16.5px] font-bold">{flow.middle[0].title}</div>
                <div className="text-[12.5px] text-muted-foreground">{flow.middle[0].text}</div>
              </div>
              <div className="flex-1 rounded-2xl border border-border bg-muted/40 p-5 dark:bg-muted/15">
                <div className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  <Settings2 className="h-3.5 w-3.5 text-brand" /> {flow.middle[1].label}
                </div>
                <div className="mt-1.5 text-[15px] font-bold leading-snug">{flow.middle[1].title}</div>
              </div>
            </div>
            <FlowArrow />

            {/* Sources */}
            <div className="flex flex-col gap-3">
              {flow.sources.map((s, i) => {
                const Icon = SOURCE_ICONS[i]
                return (
                  <div key={s.title} className="flex flex-1 items-center gap-3.5 rounded-2xl border border-border bg-muted/40 px-5 py-4 dark:bg-muted/15">
                    <Icon className="h-5 w-5 shrink-0 text-brand" />
                    <div>
                      <div className="text-[14.5px] font-bold">{s.title}</div>
                      <div className="text-[11.5px] leading-snug text-muted-foreground">{s.text}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Guardrails */}
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-2xl border border-brand/35 bg-transparent px-5 py-3.5">
            <span className="flex items-center gap-2 text-[13.5px] font-bold text-brand-strong">
              <ShieldCheck className="h-[18px] w-[18px]" /> {flow.guardrails}
            </span>
            <span className="text-[12.5px] text-foreground/60">{flow.guardrailsText}</span>
          </div>
        </div>

        {/* Deploy */}
        <div className="reveal mt-8 rounded-[28px] border border-border bg-card p-6 shadow-soft md:p-9" style={{ transitionDelay: '200ms' }}>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.4fr]">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-strong">{deploy.label}</div>
              <h3 className="mt-4 text-[24px] font-bold leading-tight md:text-[28px]">{deploy.title}</h3>
              <p className="card-text mt-4 max-w-[420px]">{deploy.lead}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {deploy.steps.map((s) => (
                <div key={s.num} className="rounded-2xl border border-border bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift">
                  <span className="text-[13px] font-extrabold tabular-nums text-brand">{s.num}</span>
                  <h4 className="mt-2 text-[16px] font-bold">{s.title}</h4>
                  <p className="card-text mt-1.5 !text-[13.5px]">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-7 flex items-start gap-3 border-t border-border pt-5">
            <Settings2 className="mt-0.5 h-[18px] w-[18px] shrink-0 text-muted-foreground" />
            <p className="text-[13px] leading-relaxed text-muted-foreground">{deploy.footnote}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

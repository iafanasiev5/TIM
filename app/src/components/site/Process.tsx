import { Plug, CheckCheck, Layers, MessageCircle, LineChart, FileCheck } from 'lucide-react'
import { PROCESS } from '@/lib/content'
import { useRevealRoot } from '@/hooks/useReveal'

const STEP_ICONS = [Plug, CheckCheck, Layers, MessageCircle, LineChart, FileCheck]

export default function Process() {
  const ref = useRevealRoot<HTMLElement>()
  return (
    <section id="process" ref={ref} className="scroll-mt-20 py-20 md:py-28">
      <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="reveal eyebrow">{PROCESS.eyebrow}</div>
          <h2 className="reveal h2 mt-5" style={{ transitionDelay: '80ms' }}>{PROCESS.title}</h2>
          <p className="reveal lead mt-6 max-w-[480px]" style={{ transitionDelay: '160ms' }}>{PROCESS.lead}</p>
        </div>

        <ol className="relative">
          <div className="absolute bottom-8 left-[27px] top-8 w-px bg-gradient-to-b from-brand/10 via-brand/35 to-brand/10" aria-hidden />
          {PROCESS.steps.map((s, i) => {
            const Icon = STEP_ICONS[i]
            return (
              <li key={s.num} className="reveal group relative flex gap-5 pb-4 last:pb-0" style={{ transitionDelay: `${i * 70}ms` }}>
                <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-brand/25 bg-card shadow-soft transition-all duration-300 group-hover:border-brand group-hover:bg-brand group-hover:shadow-lift">
                  <Icon className="h-6 w-6 text-brand transition-colors group-hover:text-white" />
                </span>
                <div className="flex-1 rounded-2xl border border-transparent p-4 transition-all duration-300 group-hover:border-border group-hover:bg-card group-hover:shadow-soft">
                  <div className="flex items-baseline gap-3">
                    <span className="text-[13px] font-extrabold tabular-nums text-brand">{s.num}</span>
                    <h3 className="card-title">{s.title}</h3>
                  </div>
                  <p className="card-text mt-1.5 pl-[38px]">{s.text}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

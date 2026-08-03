import { Users, Vault, FileWarning, Route, ScrollText, BadgeCheck, ShieldCheck } from 'lucide-react'
import { SECURITY } from '@/lib/content'
import { useRevealRoot } from '@/hooks/useReveal'

const ICONS = [Users, Vault, FileWarning, Route, ScrollText, BadgeCheck]

export default function Security() {
  const ref = useRevealRoot<HTMLElement>()
  return (
    <section id="security" ref={ref} className="scroll-mt-20 py-20 md:py-28">
      <div className="container-site grid gap-12 lg:grid-cols-[0.85fr_1.3fr] lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="reveal eyebrow">{SECURITY.eyebrow}</div>
          <h2 className="reveal h2 mt-5" style={{ transitionDelay: '80ms' }}>{SECURITY.title}</h2>
          <p className="reveal lead mt-6 max-w-[460px]" style={{ transitionDelay: '160ms' }}>{SECURITY.lead}</p>

          <div className="reveal mt-8 flex items-start gap-4 rounded-3xl bg-navy p-6 text-white shadow-lift md:p-7" style={{ transitionDelay: '240ms' }}>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-400/20">
              <ShieldCheck className="h-6 w-6 text-sky-300" />
            </span>
            <div>
              <div className="text-[16px] font-bold">{SECURITY.hitl.title}</div>
              <p className="mt-2 text-[14px] leading-relaxed text-white/65">{SECURITY.hitl.text}</p>
            </div>
          </div>
        </div>

        <div>
          <div className="grid gap-5 sm:grid-cols-2">
            {SECURITY.items.map((s, i) => {
              const Icon = ICONS[i]
              return (
                <article
                  key={s.title}
                  className="reveal group rounded-3xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift"
                  style={{ transitionDelay: `${(i % 2) * 90}ms` }}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <Icon className="h-[22px] w-[22px]" />
                  </span>
                  <h3 className="card-title mt-4">{s.title}</h3>
                  <p className="card-text mt-2">{s.text}</p>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

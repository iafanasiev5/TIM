import { useState } from 'react'
import { Check, ArrowRight, Quote } from 'lucide-react'
import { ROLES } from '@/lib/content'
import { T1mMark } from './Logo'
import { useRevealRoot } from '@/hooks/useReveal'

const INITIAL_ROLE = Math.max(ROLES.items.findIndex((role) => role.id === 'po'), 0)

export default function Roles() {
  const ref = useRevealRoot<HTMLElement>()
  const [active, setActive] = useState(INITIAL_ROLE)
  const role = ROLES.items[active]

  return (
    <section id="roles" ref={ref} className="mixed-dark scroll-mt-20 bg-background py-20 text-foreground dark:bg-navy dark:text-white md:py-28">
      <div className="container-site">
        <div className="reveal eyebrow !text-brand dark:!text-sky-400">{ROLES.eyebrow}</div>
        <h2 className="reveal h2 mt-5 max-w-[980px]" style={{ transitionDelay: '80ms' }}>
          {ROLES.title}
        </h2>

        {/* Tabs */}
        <div className="reveal mt-10 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7" role="tablist" aria-label="Роли" style={{ transitionDelay: '140ms' }}>
          {ROLES.items.map((r, i) => (
            <button
              key={r.id}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`min-h-[62px] w-full rounded-2xl border px-4 py-3.5 text-left text-[14px] font-semibold leading-tight transition-all duration-200 ${
                i === active
                  ? 'border-brand/50 bg-brand-soft text-brand-strong shadow-soft dark:border-sky-400/60 dark:bg-sky-400/15 dark:text-white dark:shadow-[0_0_0_1px_rgba(56,189,248,0.25),0_10px_30px_-12px_rgba(56,189,248,0.4)]'
                  : 'border-border bg-card text-muted-foreground hover:border-brand/30 hover:text-foreground dark:border-white/10 dark:bg-white/[0.04] dark:text-white/60 dark:hover:border-white/25 dark:hover:text-white'
              }`}
            >
              {r.tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div key={role.id} className="animate-fade-up mt-6 grid gap-5 lg:grid-cols-3">
          {/* Задача роли */}
          <div className="rounded-3xl border border-border bg-card p-7 shadow-soft dark:border-white/10 dark:bg-white/[0.045] dark:shadow-none">
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand dark:text-sky-400">Задача роли</div>
            <h3 className="mt-4 text-[26px] font-bold leading-tight">{role.name}</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground dark:text-white/65">{role.task}</p>
            <figure className="mt-7 rounded-2xl border-l-[3px] border-brand bg-muted/50 p-5 dark:border-sky-400 dark:bg-white/[0.05]">
              <Quote className="h-4 w-4 text-brand dark:text-sky-400" />
              <blockquote className="mt-2 text-[15px] font-medium leading-relaxed text-foreground dark:text-white/90">{role.quote}</blockquote>
            </figure>
          </div>

          {/* TIM в работе */}
          <div className="relative overflow-hidden rounded-3xl border border-brand/25 bg-gradient-to-br from-brand-soft to-transparent p-7 dark:border-sky-400/25 dark:from-sky-400/[0.14]">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-sky-400/20 blur-3xl" aria-hidden />
            <div className="flex items-center gap-3">
              <T1mMark className="h-11 w-11 text-[14px] shadow-lift" />
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand dark:text-sky-300">TIM в работе</div>
            </div>
            <p className="mt-6 text-[18px] font-medium leading-relaxed text-foreground dark:text-white/90 md:text-[19px]">{role.work}</p>
          </div>

          {/* Рабочий результат */}
          <div className="rounded-3xl border border-border bg-card p-7 shadow-soft dark:border-white/10 dark:bg-white/[0.045] dark:shadow-none">
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand dark:text-sky-400">Рабочий результат</div>
            <h3 className="mt-4 text-[22px] font-bold leading-snug">{role.resultTitle}</h3>
            <ul className="mt-6 space-y-3.5">
              {role.results.map((r) => (
                <li key={r} className="flex items-center gap-3 text-[15px] font-medium text-foreground/85 dark:text-white/85">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-soft dark:bg-sky-400/20">
                    <Check className="h-3.5 w-3.5 text-brand dark:text-sky-300" />
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Process */}
        <div key={`${role.id}-process`} className="animate-fade-up mt-5 rounded-3xl border border-border bg-card p-6 shadow-soft dark:border-white/10 dark:bg-white/[0.045] dark:shadow-none md:p-8" style={{ animationDelay: '90ms' }}>
          <div className="relative grid gap-6 md:grid-cols-5 md:gap-0">
            {/* connector line (desktop) */}
            <div className="absolute left-0 right-0 top-[22px] hidden h-px bg-gradient-to-r from-sky-400/10 via-sky-400/40 to-sky-400/10 md:block" aria-hidden />
            {role.process.map((step, i) => (
              <div key={step} className="relative flex items-start gap-4 md:flex-col md:gap-0 md:px-4 md:first:pl-0 md:last:pr-0">
                <div className="flex items-center gap-3 md:w-full">
                  <span
                    className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border text-[13px] font-bold transition-colors ${
                      i === role.process.length - 1
                        ? 'border-sky-400 bg-sky-400 text-navy shadow-[0_8px_24px_-6px_rgba(56,189,248,0.6)]'
                        : 'border-brand/40 bg-card text-brand dark:border-sky-400/40 dark:bg-navy dark:text-sky-300'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {i < role.process.length - 1 && (
                    <ArrowRight className="h-4 w-4 shrink-0 text-sky-400/50 md:ml-auto" aria-hidden />
                  )}
                </div>
                <p className="pt-1 text-[15px] font-semibold leading-snug text-foreground/90 dark:text-white/90 md:pt-4">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

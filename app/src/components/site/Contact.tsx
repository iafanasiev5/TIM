import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import { CONTACT } from '@/lib/content'
import { T1mMark } from './Logo'
import { useRevealRoot } from '@/hooks/useReveal'

export default function Contact() {
  const ref = useRevealRoot<HTMLElement>()
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [contact, setContact] = useState('')
  const f = CONTACT.form

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Запрос демо TIM — ${company || name || 'новая заявка'}`)
    const body = encodeURIComponent(
      `Имя: ${name}\nКомпания: ${company}\nКонтакт: ${contact}\n\nИнтересует: демонстрация продукта, архитектурная сессия, дизайн пилота.`,
    )
    window.location.href = `mailto:${f.email}?subject=${subject}&body=${body}`
  }

  const inputCls =
    'w-full rounded-2xl border border-border bg-muted/40 px-[18px] py-3.5 text-[15px] outline-none transition-all placeholder:text-muted-foreground/60 focus:border-brand focus:bg-card focus:ring-4 focus:ring-brand/15 dark:bg-muted/10'

  return (
    <section id="contact" ref={ref} className="scroll-mt-20 py-20 md:py-28">
      <div className="container-site grid items-start gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <div className="reveal eyebrow">{CONTACT.eyebrow}</div>
          <h2 className="reveal h2 mt-5 max-w-[560px]" style={{ transitionDelay: '80ms' }}>{CONTACT.title}</h2>
          <p className="reveal lead mt-6 max-w-[460px]" style={{ transitionDelay: '160ms' }}>{CONTACT.lead}</p>
          <div className="reveal mt-8 flex flex-wrap gap-2.5" style={{ transitionDelay: '240ms' }}>
            {CONTACT.chips.map((c, i) => (
              <span key={c} className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-4 py-2.5 text-[14px] font-semibold shadow-xs">
                <span className="text-[12px] font-extrabold tabular-nums text-brand">{String(i + 1).padStart(2, '0')}</span>
                {c}
              </span>
            ))}
          </div>
        </div>

        <form onSubmit={submit} className="reveal rounded-[28px] border border-border bg-card p-7 shadow-lift md:p-9" style={{ transitionDelay: '160ms' }}>
          <div className="flex items-center gap-3.5 border-b border-border pb-6">
            <T1mMark className="h-11 w-11 text-[14px] shadow-soft" />
            <span className="text-[19px] font-bold">{f.title}</span>
          </div>

          <label className="mt-6 block">
            <span className="mb-2 block text-[13.5px] font-bold">{f.name}</span>
            <input className={inputCls} placeholder={f.namePlaceholder} value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label className="mt-5 block">
            <span className="mb-2 block text-[13.5px] font-bold">{f.company}</span>
            <input className={inputCls} placeholder={f.companyPlaceholder} value={company} onChange={(e) => setCompany(e.target.value)} />
          </label>
          <label className="mt-5 block">
            <span className="mb-2 block text-[13.5px] font-bold">{f.contact}</span>
            <input className={inputCls} placeholder={f.contactPlaceholder} value={contact} onChange={(e) => setContact(e.target.value)} required />
          </label>

          <button
            type="submit"
            className="group mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand to-brand-strong py-4 text-[16px] font-bold text-white shadow-lift transition-all hover:opacity-95 hover:shadow-[0_24px_50px_-18px_hsl(var(--brand)/0.6)]"
          >
            {f.button}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
          <p className="mt-4 text-center text-[12px] leading-relaxed text-muted-foreground">{f.note}</p>
        </form>
      </div>
    </section>
  )
}

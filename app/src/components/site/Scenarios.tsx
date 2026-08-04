import { useState } from 'react'
import type { ComponentType } from 'react'
import { ShieldCheck, FileText, LayoutGrid, FileBarChart, ArrowLeft, AlertTriangle, TrendingUp, CircleCheck } from 'lucide-react'
import { SCENARIOS } from '@/lib/content'
import { T1mMark } from './Logo'
import { useRevealRoot } from '@/hooks/useReveal'

/* ─────────────── Панели результатов для каждого сценария ─────────────── */

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border bg-muted/40 p-4 dark:bg-muted/15">
      <div className="text-[24px] font-extrabold text-brand">{value}</div>
      <div className="mt-1 text-[12px] font-medium text-muted-foreground">{label}</div>
    </div>
  )
}

function QaPanel() {
  const sources = [
    { name: 'Регламент договорной работы', meta: 'раздел 4.2', v: 98 },
    { name: 'Матрица полномочий', meta: 'строка 18', v: 96 },
    { name: 'Положение об инвесткомитете', meta: 'пункт 3.1', v: 91 },
    { name: 'Закупочная политика', meta: 'раздел 7', v: 84 },
  ]
  return (
    <>
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft">
          <ShieldCheck className="h-5 w-5 text-brand" />
        </span>
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Аналитический вывод</div>
          <p className="mt-1.5 text-[16px] font-bold leading-snug md:text-[18px]">
            Договор проходит юридическую, финансовую и закупочную проверки. Для суммы свыше 10 млн рублей дополнительно требуется согласование инвестиционного комитета.
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <StatCard value="4" label="источника в ответе" />
        <StatCard value="96%" label="уверенность ответа" />
        <StatCard value="8 сек" label="время поиска" />
      </div>

      <div className="mt-6 rounded-2xl border border-border p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[15px] font-bold">Релевантность найденных источников</div>
            <div className="mt-0.5 text-[12.5px] text-muted-foreground">Ответ собран из четырёх документов с указанием точных разделов.</div>
          </div>
          <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-bold text-brand-strong">1 / 5</span>
        </div>
        <div className="mt-5 space-y-4">
          {sources.map((s) => (
            <div key={s.name}>
              <div className="mb-1.5 flex items-baseline justify-between gap-3">
                <span className="text-[13.5px] font-semibold">{s.name}</span>
                <span className="text-[13px] font-bold text-brand">{s.v}%</span>
              </div>
              <div className="text-[11.5px] text-muted-foreground">{s.meta}</div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-gradient-to-r from-brand to-brand-strong transition-all duration-700" style={{ width: `${s.v}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-[13.5px] font-semibold transition-colors hover:bg-muted">
          <LayoutGrid className="h-4 w-4 text-brand" /> Добавить в дашборд
        </button>
        <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-[13.5px] font-semibold transition-colors hover:bg-muted">
          <FileBarChart className="h-4 w-4 text-brand" /> Сформировать сводку
        </button>
      </div>
    </>
  )
}

function PlanFactPanel() {
  const rows = [
    { name: 'Маркетинг', plan: 24.1, fact: 26.8 },
    { name: 'ИТ', plan: 31.4, fact: 30.2 },
    { name: 'Продажи', plan: 45.0, fact: 47.6 },
  ]
  const totalP = rows.reduce((s, r) => s + r.plan, 0)
  const totalF = rows.reduce((s, r) => s + r.fact, 0)
  const delta = (f: number, p: number) => Math.round(((f - p) / p) * 100)
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">План–факт · июль</div>
          <p className="mt-1.5 text-[16px] font-bold md:text-[18px]">Факт выше плана на 4,1% — основной вклад дают продажи и маркетинг.</p>
        </div>
        <span className="hidden rounded-full bg-emerald-500/15 px-3 py-1 text-[12px] font-bold text-emerald-600 sm:block dark:text-emerald-400">+4,8% к плану</span>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-[14px]">
          <thead>
            <tr className="bg-brand text-left text-white">
              <th className="px-4 py-2.5 font-semibold">ЦФО</th>
              <th className="px-4 py-2.5 text-right font-semibold">План</th>
              <th className="px-4 py-2.5 text-right font-semibold">Факт</th>
              <th className="px-4 py-2.5 text-right font-semibold">Δ</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="border-t border-border">
                <td className="px-4 py-3 font-medium">{r.name}</td>
                <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">{r.plan.toFixed(1)}</td>
                <td className="px-4 py-3 text-right tabular-nums font-semibold">{r.fact.toFixed(1)}</td>
                <td className={`px-4 py-3 text-right font-bold tabular-nums ${delta(r.fact, r.plan) >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'}`}>
                  {delta(r.fact, r.plan) >= 0 ? '+' : ''}{delta(r.fact, r.plan)}%
                </td>
              </tr>
            ))}
            <tr className="border-t border-border bg-muted/40 font-bold dark:bg-muted/15">
              <td className="px-4 py-3">Итого</td>
              <td className="px-4 py-3 text-right tabular-nums">{totalP.toFixed(1)}</td>
              <td className="px-4 py-3 text-right tabular-nums">{totalF.toFixed(1)}</td>
              <td className="px-4 py-3 text-right tabular-nums text-brand">+{Math.round(((totalF - totalP) / totalP) * 1000) / 10}%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex items-start gap-3 rounded-2xl border border-brand/25 bg-brand-soft p-4">
        <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
        <p className="text-[13.5px] leading-relaxed">
          <span className="font-bold">Факторный разбор:</span> +1,9 п.п. — новые контракты в «Продажах», +1,4 п.п. — сезонный спрос, −0,6 п.п. — отставание ИТ.
        </p>
      </div>
    </>
  )
}

function WhatIfPanel() {
  const [conv, setConv] = useState(2)
  const [check, setCheck] = useState(0)
  const effect = Math.min(conv * 4.1 + check * 0.55, 24)
  const mlrd = (520 * (1 + effect / 100)).toFixed(0)
  return (
    <>
      <div>
        <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Сценарный анализ</div>
        <p className="mt-1.5 text-[16px] font-bold md:text-[18px]">Двигайте параметры — TIM пересчитает прогноз выручки на год.</p>
      </div>

      <div className="mt-6 space-y-5 rounded-2xl border border-border p-5">
        {[
          { label: 'Рост конверсии', unit: 'п.п.', min: 0, max: 5, step: 0.5, val: conv, set: setConv },
          { label: 'Рост среднего чека', unit: '%', min: 0, max: 10, step: 1, val: check, set: setCheck },
        ].map((s) => (
          <div key={s.label}>
            <div className="mb-2 flex items-center justify-between text-[13.5px]">
              <span className="font-semibold">{s.label}</span>
              <span className="rounded-lg bg-brand-soft px-2.5 py-1 font-bold tabular-nums text-brand-strong">+{s.val} {s.unit}</span>
            </div>
            <input
              type="range"
              min={s.min}
              max={s.max}
              step={s.step}
              value={s.val}
              onChange={(e) => s.set(Number(e.target.value))}
              className="w-full accent-[hsl(var(--brand))]"
              aria-label={s.label}
            />
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-border bg-muted/40 p-4 dark:bg-muted/15">
          <div className="text-[12px] font-medium text-muted-foreground">Базовый прогноз</div>
          <div className="mt-1 text-[22px] font-extrabold tabular-nums">520 млн ₽</div>
        </div>
        <div className="rounded-2xl border border-brand/30 bg-brand-soft p-4">
          <div className="text-[12px] font-medium text-brand-strong">Сценарий what-if</div>
          <div className="mt-1 text-[22px] font-extrabold tabular-nums text-brand-strong">{mlrd} млн ₽ <span className="text-[14px]">+{effect.toFixed(1)}%</span></div>
        </div>
      </div>
      <p className="mt-4 text-[12.5px] leading-relaxed text-muted-foreground">
        Расчёт опирается на драйверы модели Revenue; ограничения и допущения сохраняются рядом с выводом.
      </p>
    </>
  )
}

const DRILL_LEVELS = [
  { name: 'Компания', bars: [['Север', 34], ['Центр', 58], ['Юг', 26], ['Восток', 41]] as [string, number][] },
  { name: 'Регион «Центр»', bars: [['Москва', 64], ['Тула', 31], ['Рязань', 22], ['Тверь', 28]] as [string, number][] },
  { name: 'Москва · статьи затрат', bars: [['Аренда', 46], ['ФОТ', 38], ['Логистика', 24], ['Подряд', 18]] as [string, number][] },
]

function DrillPanel() {
  const [level, setLevel] = useState(0)
  const cur = DRILL_LEVELS[level]
  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Drill down / Drill up</div>
          <p className="mt-1.5 text-[16px] font-bold md:text-[18px]">Рост затрат на 12% — спускайтесь по уровням, чтобы найти причину.</p>
        </div>
        {level > 0 && (
          <button onClick={() => setLevel((l) => l - 1)} className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-[12.5px] font-semibold transition-colors hover:bg-muted">
            <ArrowLeft className="h-3.5 w-3.5" /> Drill up
          </button>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-1.5 text-[12.5px] font-semibold">
        {DRILL_LEVELS.slice(0, level + 1).map((l, i) => (
          <span key={l.name} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-muted-foreground">→</span>}
            <span className={i === level ? 'rounded-lg bg-brand px-2.5 py-1 text-white' : 'rounded-lg bg-muted px-2.5 py-1 text-muted-foreground'}>{l.name}</span>
          </span>
        ))}
      </div>

      <div key={level} className="animate-fade-up mt-6 space-y-4">
        {cur.bars.map(([name, v]) => (
          <button
            key={name}
            onClick={() => level < DRILL_LEVELS.length - 1 && setLevel((l) => l + 1)}
            className={`group block w-full text-left ${level < DRILL_LEVELS.length - 1 ? 'cursor-pointer' : 'cursor-default'}`}
          >
            <div className="mb-1.5 flex items-baseline justify-between">
              <span className="text-[13.5px] font-semibold group-hover:text-brand">{name}</span>
              <span className="text-[13px] font-bold tabular-nums text-brand">{v}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-gradient-to-r from-brand/70 to-brand transition-all duration-700 group-hover:from-brand group-hover:to-brand-strong" style={{ width: `${v}%` }} />
            </div>
          </button>
        ))}
      </div>

      <div className="mt-5 flex items-start gap-3 rounded-2xl border border-brand/25 bg-brand-soft p-4">
        <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
        <p className="text-[13.5px] leading-relaxed">
          <span className="font-bold">Причина найдена:</span> 46% прироста даёт аренда нового офиса в Москве — детализация до договора доступна на следующем уровне.
        </p>
      </div>
    </>
  )
}

function AutoPanel() {
  const anomalies = [
    { title: 'Возвраты выросли в 2,3 раза', meta: 'Категория «Электроника» · 3 дня подряд', level: 'Высокий приоритет', danger: true },
    { title: 'Средний чек ниже нормы на 9%', meta: 'Канал «Маркетплейсы» · неделя 30', level: 'Средний приоритет', danger: false },
    { title: 'Срок поставки вышел за порог', meta: 'Склад «Юг» · SLA 96% → 88%', level: 'Средний приоритет', danger: false },
  ]
  return (
    <>
      <div>
        <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Автоматический анализ</div>
        <p className="mt-1.5 text-[16px] font-bold md:text-[18px]">TIM проверил метрики за неделю и нашёл 3 аномалии, требующие внимания.</p>
      </div>

      <div className="mt-6 space-y-3">
        {anomalies.map((a) => (
          <div key={a.title} className={`flex items-start gap-3.5 rounded-2xl border p-4 ${a.danger ? 'border-rose-400/40 bg-rose-500/[0.07]' : 'border-border bg-muted/30 dark:bg-muted/10'}`}>
            <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${a.danger ? 'bg-rose-500/15 text-rose-500' : 'bg-amber-500/15 text-amber-500'}`}>
              <AlertTriangle className="h-[18px] w-[18px]" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[14.5px] font-bold">{a.title}</div>
              <div className="mt-0.5 text-[12.5px] text-muted-foreground">{a.meta}</div>
            </div>
            <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10.5px] font-bold ${a.danger ? 'bg-rose-500/15 text-rose-500' : 'bg-amber-500/15 text-amber-600 dark:text-amber-400'}`}>{a.level}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-start gap-3 rounded-2xl border border-brand/25 bg-brand-soft p-4">
        <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
        <p className="text-[13.5px] leading-relaxed">
          <span className="font-bold">Рекомендуемые шаги:</span> проверить партию поставок «Электроники», пересчитать ценовую политику маркетплейсов, запросить комментарий логистики склада «Юг».
        </p>
      </div>
    </>
  )
}

/* ─────────────────────────── Секция ─────────────────────────── */

const PANELS: Record<string, ComponentType> = {
  qa: QaPanel,
  planfact: PlanFactPanel,
  whatif: WhatIfPanel,
  drill: DrillPanel,
  auto: AutoPanel,
}

export default function Scenarios() {
  const ref = useRevealRoot<HTMLElement>()
  const [active, setActive] = useState(0)
  const scenario = SCENARIOS.items[active]
  const Panel = PANELS[scenario.id]

  return (
    <section id="scenarios" ref={ref} className="scroll-mt-20 bg-background py-20 text-foreground dark:bg-navy dark:text-white md:py-28">
      <div className="container-site">
        <div>
          <div className="reveal eyebrow !text-brand dark:!text-sky-400">{SCENARIOS.eyebrow}</div>
          <h2 className="reveal h2 mt-5" style={{ transitionDelay: '80ms' }}>{SCENARIOS.title}</h2>
        </div>

        {/* Tabs */}
        <div className="rail reveal mt-10 flex gap-2.5 overflow-x-auto pb-1" role="tablist" aria-label="Сценарии" style={{ transitionDelay: '180ms' }}>
          {SCENARIOS.items.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`flex shrink-0 items-center gap-2.5 rounded-2xl border px-4 py-3 text-[14px] font-semibold transition-all duration-200 ${
                i === active
                  ? 'border-brand/50 bg-brand-soft text-brand-strong shadow-soft dark:border-sky-400/60 dark:bg-sky-400/15 dark:text-white dark:shadow-[0_0_0_1px_rgba(56,189,248,0.25)]'
                  : 'border-border bg-card text-muted-foreground hover:border-brand/30 hover:text-foreground dark:border-white/10 dark:bg-white/[0.04] dark:text-white/55 dark:hover:border-white/25 dark:hover:text-white'
              }`}
            >
              <span className={`text-[12px] font-bold ${i === active ? 'text-brand dark:text-sky-300' : 'text-muted-foreground/70 dark:text-white/35'}`}>{s.num}</span>
              {s.tab}
            </button>
          ))}
        </div>

        {/* Body */}
        <div key={scenario.id} className="animate-fade-up mt-6 grid gap-5 lg:grid-cols-[0.9fr_1.4fr]">
          {/* Left: query + steps */}
          <div className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-soft dark:border-white/10 dark:bg-white/[0.045] dark:shadow-none md:p-8">
            <div className="flex items-start gap-4">
              <T1mMark className="h-12 w-12 shrink-0 text-[15px] shadow-lift" />
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand dark:text-sky-400">Запрос пользователя</div>
                <p className="mt-2 text-[19px] font-bold leading-snug md:text-[21px]">{scenario.query}</p>
              </div>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 self-start rounded-xl border border-border bg-muted/50 px-3.5 py-2.5 text-[12.5px] font-medium text-muted-foreground dark:border-white/10 dark:bg-white/[0.05] dark:text-white/75">
              <FileText className="h-4 w-4 text-brand dark:text-sky-400" />
              {scenario.source}
            </div>

            <div className="mt-auto space-y-3 pt-8">
              {scenario.steps.map((st) => (
                <div key={st.title} className="flex items-center gap-3.5 rounded-2xl border-l-[3px] border-brand bg-muted/50 px-4 py-3 dark:border-sky-400 dark:bg-white/[0.05]">
                  <CircleCheck className="h-[18px] w-[18px] shrink-0 text-brand dark:text-sky-300" />
                  <div>
                    <div className="text-[14px] font-bold">{st.title}</div>
                    <div className="text-[12.5px] text-muted-foreground dark:text-white/55">{st.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: result panel */}
          <div className="rounded-3xl bg-card p-6 text-card-foreground shadow-lift md:p-8">
            <Panel />
          </div>
        </div>

        <p className="mt-8 text-center text-[12.5px] text-muted-foreground dark:text-white/40">{SCENARIOS.disclaimer}</p>
      </div>
    </section>
  )
}

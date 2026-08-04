import { ArrowUp } from 'lucide-react'
import { FOOTER, NAV } from '@/lib/content'
import { BrandLockup } from './Logo'

export default function Footer() {
  return (
    <footer className="mixed-dark border-t border-border bg-muted/40 py-12 dark:bg-muted/5">
      <div className="container-site">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <BrandLockup badgeClass="h-10 w-10 text-[13px]" textClass="text-[16px]" />

          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Навигация в подвале">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-[13.5px] font-medium text-muted-foreground transition-colors hover:text-foreground">
                {n.label}
              </a>
            ))}
          </nav>

          <a
            href="#top"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-[13.5px] font-semibold shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-soft"
          >
            {FOOTER.top}
            <ArrowUp className="h-4 w-4 text-brand" />
          </a>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-[12.5px] text-muted-foreground md:flex-row md:items-center">
          <span>{FOOTER.tagline}</span>
          <span>© {new Date().getFullYear()} Т1 Иннотех</span>
        </div>
      </div>
    </footer>
  )
}

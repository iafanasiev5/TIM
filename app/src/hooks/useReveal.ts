import { useEffect, useRef } from 'react'

/**
 * Добавляет класс .is-visible всем потомкам с классом .reveal,
 * когда они попадают во вьюпорт.
 */
export function useRevealRoot<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const targets = root.querySelectorAll<HTMLElement>('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    targets.forEach((t) => io.observe(t))

    // Страховка: если observer по какой-то причине не сработал —
    // показываем всё через 1.6 c, чтобы контент никогда не оставался скрытым.
    const fallback = window.setTimeout(() => {
      targets.forEach((t) => t.classList.add('is-visible'))
    }, 1600)

    return () => {
      io.disconnect()
      window.clearTimeout(fallback)
    }
  }, [])

  return ref
}

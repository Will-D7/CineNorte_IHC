import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--foam)] px-4 backdrop-blur-lg">
      <nav className="page-wrap flex items-center gap-3 py-3 sm:py-4">
        <h2 className="m-0 flex-shrink-0 text-base font-semibold tracking-tight">
          <Link to="/" className="inline-flex items-center gap-2 no-underline">
            <img
              src="/images/CineNorteLogo.svg"
              alt="Cine Norte"
              className="h-12 w-12 flex-shrink-0"
            />
            <span className="text-lg font-extrabold tracking-tight text-[var(--sea-ink)] sm:text-xl">
              Cine Norte
            </span>
          </Link>
        </h2>

        <div className="ml-auto flex items-center gap-4">
          <div className="hidden items-center gap-4 text-sm font-semibold sm:flex">
            <Link
              to="/"
              className="text-[var(--sea-ink-soft)] transition hover:text-[var(--sea-ink)]"
              activeProps={{ className: 'text-[var(--lagoon)]' }}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-[var(--sea-ink-soft)] transition hover:text-[var(--sea-ink)]"
              activeProps={{ className: 'text-[var(--lagoon)]' }}
            >
              About
            </Link>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center justify-center rounded-xl p-2 text-[var(--sea-ink)] transition hover:bg-[var(--link-bg-hover)] sm:hidden"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div className="border-t border-[var(--line)] pb-3 sm:hidden">
          <div className="page-wrap flex flex-col gap-1 pt-2 text-sm font-semibold">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]"
              activeProps={{
                className: 'rounded-lg px-3 py-2 text-[var(--lagoon)]',
              }}
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]"
              activeProps={{
                className: 'rounded-lg px-3 py-2 text-[var(--lagoon)]',
              }}
            >
              About
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

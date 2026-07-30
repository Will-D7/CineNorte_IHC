import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Search, SlidersHorizontal } from 'lucide-react'

export const Route = createFileRoute('/')({ component: App })

const FILTERS = ['Hoy', 'Mañana', 'Acción', 'Familiar']

const MOVIES = [
  {
    title: 'Toy Story',
    genre: 'Dibujo animado · 2D',
    times: '18:30 / 22:00 / 20:00',
    image: '/images/toy-story.jpg',
  },
  {
    title: 'Risas en Familia',
    genre: 'Pelicula comedia · 2D',
    times: '18:30 / 22:00 / 20:00',
    image: '/images/risas-en-familia.jpg',
  },
  {
    title: 'Hoppers',
    genre: 'Dibujo animado · 2D',
    times: '18:30 / 22:00 / 20:00',
    image: '/images/hoppers.jpg',
  },
]

function App() {
  const [activeFilter, setActiveFilter] = useState(FILTERS[0])

  return (
    <main className="page-wrap px-4 pb-8 pt-6">
      <div className="relative mb-4 flex items-center gap-2">
        <Search
          size={18}
          className="pointer-events-none absolute left-4 text-[var(--sea-ink-soft)]"
        />
        <input
          type="search"
          placeholder="Buscar pelicula"
          className="w-full rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] py-2.5 pl-11 pr-11 text-sm text-[var(--sea-ink)] placeholder:text-[var(--sea-ink-soft)] outline-none transition focus:border-[var(--lagoon)]"
        />
        <button
          type="button"
          className="absolute right-2 inline-flex items-center justify-center rounded-full p-2 text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]"
          aria-label="Filtros avanzados"
        >
          <SlidersHorizontal size={18} />
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((filter) => {
          const isActive = filter === activeFilter
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={
                isActive
                  ? 'rounded-full bg-[var(--lagoon)] px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(37,99,235,0.28)] transition'
                  : 'rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-4 py-2 text-sm font-semibold text-[var(--sea-ink)] transition hover:border-[var(--lagoon)]'
              }
            >
              {filter}
            </button>
          )
        })}
      </div>

      <section className="flex flex-col gap-4">
        {MOVIES.map((movie) => (
          <article
            key={movie.title}
            className="flex items-center gap-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3 shadow-[0_8px_22px_rgba(30,58,95,0.08)]"
          >
            <img
              src={movie.image}
              alt={movie.title}
              className="h-20 w-16 flex-shrink-0 rounded-xl object-cover"
            />
            <div className="min-w-0 flex-1">
              <h2 className="m-0 truncate text-base font-semibold text-[var(--sea-ink)]">
                {movie.title}
              </h2>
              <p className="m-0 mt-0.5 truncate text-sm text-[var(--sea-ink-soft)]">
                {movie.genre}
              </p>
              <p className="m-0 mt-1 truncate text-xs text-[var(--sea-ink-soft)]">
                {movie.times}
              </p>
            </div>
            <button
              type="button"
              className="flex-shrink-0 rounded-full bg-[var(--lagoon)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[var(--lagoon-deep)]"
            >
              Ver
            </button>
          </article>
        ))}
      </section>
    </main>
  )
}

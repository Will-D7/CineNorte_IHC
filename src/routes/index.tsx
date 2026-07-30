import { useEffect, useMemo, useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import { bannerMovies, movies } from '../types/movies'

export const Route = createFileRoute('/')({ component: App })

const ALL_FILTER = 'Todos'

function BannerCarousel() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % bannerMovies.length)
    }, 5000)
    return () => clearInterval(id)
  }, [index])

  const goTo = (i: number) =>
    setIndex((i + bannerMovies.length) % bannerMovies.length)

  return (
    <div className="relative mb-4 overflow-hidden rounded-2xl">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {bannerMovies.map((movie) => (
          <div key={movie.id} className="relative w-full flex-shrink-0">
            <img
              src={movie.banner}
              alt={movie.title}
              className="h-56 w-full object-cover sm:h-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4">
              <p className="m-0 text-lg font-bold text-white sm:text-xl">
                {movie.title}
              </p>
              <p className="m-0 text-xs text-white/85 sm:text-sm">
                {movie.genres.join(', ')} — en cartelera
              </p>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => goTo(index - 1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/35 p-1.5 text-white transition hover:bg-black/55"
        aria-label="Banner anterior"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        onClick={() => goTo(index + 1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/35 p-1.5 text-white transition hover:bg-black/55"
        aria-label="Banner siguiente"
      >
        <ChevronRight size={18} />
      </button>
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
        {bannerMovies.map((movie, i) => (
          <button
            key={movie.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ir al banner ${i + 1}`}
            className={
              i === index
                ? 'h-1.5 w-4 rounded-full bg-white transition-all'
                : 'h-1.5 w-1.5 rounded-full bg-white/50 transition-all'
            }
          />
        ))}
      </div>
    </div>
  )
}

function App() {
  const filters = useMemo(() => {
    const genreSet = new Set<string>()
    movies.forEach((movie) => {
      movie.genres.forEach((genre) => genreSet.add(genre))
    })
    return [ALL_FILTER, ...Array.from(genreSet)]
  }, [])

  const [activeFilter, setActiveFilter] = useState(ALL_FILTER)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredMovies = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return movies.filter((movie) => {
      const matchesFilter =
        activeFilter === ALL_FILTER || movie.genres.includes(activeFilter)
      const matchesSearch =
        normalizedSearch === '' ||
        movie.title.toLowerCase().includes(normalizedSearch)

      return matchesFilter && matchesSearch
    })
  }, [activeFilter, searchTerm])

  return (
    <main className="page-wrap px-4 pb-8 pt-6">
      <BannerCarousel />

      <div className="relative mb-4 flex items-center gap-2">
        <Search
          size={18}
          className="pointer-events-none absolute left-4 text-[var(--sea-ink-soft)]"
        />
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar pelicula"
          className="w-full rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] py-2.5 pl-11 pr-11 text-sm text-[var(--sea-ink)] placeholder:text-[var(--sea-ink-soft)] outline-none transition focus:border-[var(--lagoon)]"
        />
        {searchTerm ? (
          <button
            type="button"
            onClick={() => setSearchTerm('')}
            className="absolute right-2 inline-flex items-center justify-center rounded-full p-2 text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]"
            aria-label="Limpiar búsqueda"
          >
            <X size={18} />
          </button>
        ) : (
          <button
            type="button"
            className="absolute right-2 inline-flex items-center justify-center rounded-full p-2 text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]"
            aria-label="Filtros avanzados"
          >
            <SlidersHorizontal size={18} />
          </button>
        )}
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((filter) => {
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
        {filteredMovies.length === 0 ? (
          <p className="m-0 py-8 text-center text-sm text-[var(--sea-ink-soft)]">
            No encontramos películas con esos filtros.
          </p>
        ) : (
          filteredMovies.map((movie) => (
            <Link
              key={movie.id}
              to="/detail/$movieId"
              params={{ movieId: movie.id }}
              className="flex items-center gap-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3 no-underline shadow-[0_8px_22px_rgba(30,58,95,0.08)]"
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="h-20 w-16 flex-shrink-0 rounded-xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <h2 className="m-0 truncate text-base font-semibold text-[var(--sea-ink)]">
                  {movie.title}
                </h2>
                <p className="m-0 mt-0.5 truncate text-sm text-[var(--sea-ink-soft)]">
                  {movie.genres.join(', ')}
                </p>
                <p className="m-0 mt-1 truncate text-xs text-[var(--sea-ink-soft)]">
                  {movie.times.join(' / ')}
                </p>
              </div>
              <span className="flex-shrink-0 rounded-full bg-[var(--lagoon)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[var(--lagoon-deep)]">
                Ver
              </span>
            </Link>
          ))
        )}
      </section>
    </main>
  )
}

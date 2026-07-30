import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
} from 'lucide-react'

export const Route = createFileRoute('/')({ component: App })

const FILTERS = ['Hoy', 'Mañana', 'Acción', 'Familiar']

const BANNERS = [
  {
    title: 'Spider-Man',
    subtitle: 'En cartelera — funciones todos los días',
    image: '/images/spiderman_banner.jpg',
  },
  {
    title: 'Toy Story 5',
    subtitle: 'Disney · Pixar — en cartelera',
    image: '/images/ToyStoryBanner.jpg',
  },
  {
    title: 'Minions',
    subtitle: 'En cartelera',
    image: '/images/MinionsBanner.jpg',
  },
  {
    title: 'Moana',
    subtitle: 'Disney — en cartelera',
    image: '/images/MoanaBanner.jpg',
  },
]

const MOVIES = [
  {
    title: 'Toy Story 5',
    genre: 'Dibujo animado · 2D',
    times: '18:30 / 22:00 / 20:00',
    image: '/images/ToyStory5Poster.jpg',
  },
  {
    title: 'Spider-Man',
    genre: 'Acción · 2D',
    times: '17:00 / 19:45 / 22:15',
    image: '/images/spidermanPoster.jpg',
  },
  // {
  //   title: 'Duna',
  //   genre: 'Ciencia ficción · 2D',
  //   times: '16:00 / 19:00 / 22:00',
  //   image: '/images/DunaPoster.jpg',
  // },
  {
    title: 'Minions',
    genre: 'Dibujo animado · 2D',
    times: '15:30 / 17:45 / 20:00',
    image: '/images/MinionsPoster.jpg',
  },
  {
    title: 'Moana',
    genre: 'Dibujo animado · 2D',
    times: '17:15 / 19:30 / 21:45',
    image: '/images/MoanaPoster.jpg',
  },
  {
    title: 'El Gran Viaje',
    genre: 'Aventura · 2D',
    times: '18:00 / 20:30',
    image: '/images/ElGranViajePoster.jpg',
  },
  {
    title: 'La Odisea',
    genre: 'Drama · 2D',
    times: '19:00 / 21:30',
    image: '/images/laOdiseaPoster.jpg',
  },
]

function BannerCarousel() {
  const [index, setIndex] = useState(0)

  // Se reinicia cada vez que "index" cambia (automático o manual), así un
  // clic en las flechas o los puntos siempre reinicia el conteo de 5s en
  // vez de sumarse al ciclo automático que ya estaba corriendo.
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % BANNERS.length)
    }, 5000)
    return () => clearInterval(id)
  }, [index])

  const goTo = (i: number) => setIndex((i + BANNERS.length) % BANNERS.length)

  return (
    <div className="relative mb-4 overflow-hidden rounded-2xl">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {BANNERS.map((banner) => (
          <div key={banner.title} className="relative w-full flex-shrink-0">
            <img
              src={banner.image}
              alt={banner.title}
              className="h-56 w-full object-cover sm:h-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4">
              <p className="m-0 text-lg font-bold text-white sm:text-xl">
                {banner.title}
              </p>
              <p className="m-0 text-xs text-white/85 sm:text-sm">
                {banner.subtitle}
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
        {BANNERS.map((banner, i) => (
          <button
            key={banner.title}
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
  const [activeFilter, setActiveFilter] = useState(FILTERS[0])

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

import { createFileRoute, Link } from '@tanstack/react-router'
import { useMemo, useRef, useState } from 'react'
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Clock,
  ShieldCheck,
} from 'lucide-react'
import { formatDuration, getMovieById } from '../types/movies'

export const Route = createFileRoute('/detail/$movieId')({
  component: RouteComponent,
})

type DayOption = {
  key: string
  weekday: string
  dayNumber: string
  month: string
  isToday: boolean
}

function buildDayOptions(daysAhead = 7): DayOption[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return Array.from({ length: daysAhead }, (_, i) => {
    const date = new Date(today)
    date.setDate(today.getDate() + i)

    const weekday = date.toLocaleDateString('es-ES', { weekday: 'long' })
    const month = date
      .toLocaleDateString('es-ES', { month: 'short' })
      .replace('.', '')

    return {
      key: date.toISOString().slice(0, 10),
      weekday: weekday.charAt(0).toUpperCase() + weekday.slice(1),
      dayNumber: date.getDate().toString().padStart(2, '0'),
      month: month.charAt(0).toUpperCase() + month.slice(1),
      isToday: i === 0,
    }
  })
}

function RouteComponent() {
  const { movieId } = Route.useParams()
  const movie = getMovieById(movieId)

  const dayOptions = useMemo(() => buildDayOptions(), [])
  const [selectedDay, setSelectedDay] = useState<string>(
    dayOptions[0]?.key ?? '',
  )
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollDays = (direction: 'left' | 'right') => {
    scrollRef.current?.scrollBy({
      left: direction === 'left' ? -160 : 160,
      behavior: 'smooth',
    })
  }

  const handleSelectDay = (dayKey: string) => {
    setSelectedDay(dayKey)
    setSelectedTime(null)
  }

  if (!movie) {
    return (
      <main className="page-wrap px-4 py-10 text-center">
        <p className="text-base text-[var(--sea-ink-soft)]">
          No encontramos esa película.
        </p>
        <Link
          to="/"
          className="mt-4 inline-block text-sm font-semibold text-[var(--lagoon)] no-underline"
        >
          Volver al inicio
        </Link>
      </main>
    )
  }

  return (
    <main className="pb-10">
      <div className="relative">
        <img
          src={movie.banner ?? movie.poster}
          alt={movie.title}
          className="h-64 w-full object-cover sm:h-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--foam)] via-black/20 to-black/40" />

        <Link
          to="/"
          className="absolute left-4 top-4 inline-flex items-center justify-center rounded-full bg-black/40 p-2 text-white no-underline transition hover:bg-black/60"
          aria-label="Volver"
        >
          <ArrowLeft size={20} />
        </Link>

        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="m-0 text-2xl font-bold text-white sm:text-3xl">
            {movie.title}
          </h1>
        </div>
      </div>

      <div className="page-wrap px-4 pt-5">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-xs font-semibold text-[var(--sea-ink)]">
            <Clock size={14} />
            {formatDuration(movie.durationMinutes)}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-xs font-semibold text-[var(--sea-ink)]">
            <ShieldCheck size={14} />
            {movie.rating}
          </span>
          {movie.genres.map((genre) => (
            <span
              key={genre}
              className="rounded-full bg-[var(--lagoon)]/10 px-3 py-1.5 text-xs font-semibold text-[var(--lagoon-deep)]"
            >
              {genre}
            </span>
          ))}
        </div>

        <section className="mb-6">
          <h2 className="mb-2 text-base font-semibold text-[var(--sea-ink)]">
            Sinopsis
          </h2>
          <p className="m-0 text-sm leading-relaxed text-[var(--sea-ink-soft)]">
            {movie.synopsis}
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mb-3 text-base font-semibold text-[var(--sea-ink)]">
            Días
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollDays('left')}
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-[var(--chip-line)] bg-[var(--surface)] text-[var(--sea-ink)] transition hover:border-[var(--lagoon)] hover:text-[var(--lagoon)]"
              aria-label="Días anteriores"
            >
              <ChevronLeft size={18} />
            </button>

            <div
              ref={scrollRef}
              className="flex flex-1 gap-2 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {dayOptions.map((day) => {
                const isSelected = day.key === selectedDay
                return (
                  <button
                    key={day.key}
                    type="button"
                    onClick={() => handleSelectDay(day.key)}
                    className={`flex flex-shrink-0 flex-col items-center rounded-2xl border px-3 py-2 transition ${
                      isSelected
                        ? 'border-[var(--lagoon)] bg-[var(--lagoon)]/10'
                        : 'border-[var(--chip-line)] bg-[var(--surface)] hover:border-[var(--lagoon)]'
                    }`}
                  >
                    <span
                      className={`text-[11px] font-medium ${
                        isSelected
                          ? 'text-[var(--lagoon)]'
                          : 'text-[var(--sea-ink-soft)]'
                      }`}
                    >
                      {day.weekday}
                    </span>
                    <span
                      className={`text-xl font-bold leading-tight ${
                        isSelected
                          ? 'text-[var(--lagoon)]'
                          : 'text-[var(--sea-ink)]'
                      }`}
                    >
                      {day.dayNumber}
                    </span>
                    <span
                      className={`text-[11px] font-medium ${
                        isSelected
                          ? 'text-[var(--lagoon)]'
                          : 'text-[var(--sea-ink-soft)]'
                      }`}
                    >
                      {day.month}
                    </span>
                  </button>
                )
              })}
            </div>

            <button
              type="button"
              onClick={() => scrollDays('right')}
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-[var(--chip-line)] bg-[var(--surface)] text-[var(--sea-ink)] transition hover:border-[var(--lagoon)] hover:text-[var(--lagoon)]"
              aria-label="Días siguientes"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-[var(--sea-ink)]">
            Horarios
          </h2>
          <div className="flex flex-wrap gap-2">
            {movie.times.map((time) => {
              const isSelected = time === selectedTime
              return (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    isSelected
                      ? 'border-[var(--lagoon)] bg-[var(--lagoon)] text-white'
                      : 'border-[var(--chip-line)] bg-[var(--surface)] text-[var(--sea-ink)] hover:border-[var(--lagoon)] hover:text-[var(--lagoon)]'
                  }`}
                >
                  {time}
                </button>
              )
            })}
          </div>
        </section>

        <button
          type="button"
          disabled={!selectedTime}
          className="mt-8 w-full rounded-full bg-[var(--lagoon)] py-3 text-sm font-semibold text-white transition hover:bg-[var(--lagoon-deep)] disabled:cursor-not-allowed disabled:bg-[var(--chip-line)] disabled:text-[var(--sea-ink-soft)] disabled:hover:bg-[var(--chip-line)]"
        >
          Continuar
        </button>
      </div>
    </main>
  )
}

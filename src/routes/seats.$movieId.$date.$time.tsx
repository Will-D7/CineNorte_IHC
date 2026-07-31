import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, Clock, CalendarDays } from 'lucide-react'
import { useState } from 'react'
import { getMovieById } from '../types/movies'
import { SeatMap } from '../components/SeatMap'
import type { Seat } from '../components/SeatMap'
import { SeatLegend } from '../components/SeatLegend'

export const Route = createFileRoute('/seats/$movieId/$date/$time')({
  component: SeatsPage,
})

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

const COLS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function generateSeats(): Seat[] {
  return ROWS.flatMap((row) =>
    COLS.map((number) => {
      const random = Math.random()

      let status: Seat['status'] = 'available'

      if (random < 0.12) {
        status = 'occupied'
      } else if (random < 0.18) {
        status = 'reserved'
      }

      return {
        id: `${row}${number}`,
        row,
        number,
        status,
      }
    }),
  )
}

function SeatsPage() {
  const navigate = useNavigate()

  const { movieId, date, time } = Route.useParams()

  const movie = getMovieById(movieId)

  const [seats] = useState<Seat[]>(generateSeats)

  const [selectedSeats, setSelectedSeats] = useState<string[]>([])

  const total = selectedSeats.length * (movie?.price ?? 0)

  function handleSeatClick(seat: Seat) {
    if (seat.status !== 'available') {
      return
    }

    setSelectedSeats((current) => {
      if (current.includes(seat.id)) {
        return current.filter((id) => id !== seat.id)
      }

      if (current.length >= 4) {
        return current
      }

      return [...current, seat.id]
    })
  }

  if (!movie) {
    return (
      <main className="page-wrap px-4 py-10">
        <p className="text-[var(--sea-ink-soft)]">Película no encontrada</p>
      </main>
    )
  }

  return (
    <main className="page-wrap px-4 py-6">
      {/* Regresar */}

      <button
        onClick={() =>
          navigate({
            to: '/detail/$movieId',
            params: {
              movieId,
            },
          })
        }
        className="
          mb-6
          flex
          items-center
          gap-2
          text-sm
          text-[var(--sea-ink)]
        "
      >
        <ArrowLeft size={18} />
        Volver
      </button>

      {/* Información de la función */}

      <section
        className="
          rounded-2xl
          bg-[var(--surface)]
          p-4
          border
          border-[var(--line)]
        "
      >
        <h1
          className="
            text-xl
            font-bold
            text-[var(--sea-ink)]
          "
        >
          {movie.title}
        </h1>

        <div
          className="
            mt-3
            flex
            flex-wrap
            gap-4
            text-sm
            text-[var(--sea-ink-soft)]
          "
        >
          <span className="flex items-center gap-2">
            <CalendarDays size={15} />
            {date}
          </span>

          <span className="flex items-center gap-2">
            <Clock size={15} />
            {time}
          </span>
        </div>
      </section>

      <h2
        className="
          mt-8
          text-center
          font-semibold
          text-[var(--sea-ink)]
        "
      >
        Selecciona tus asientos
      </h2>

      <p
        className="
          mt-2
          text-center
          text-sm
          text-[var(--sea-ink-soft)]
        "
      >
        Máximo 4 entradas por compra
      </p>

      {/* Mapa de asientos */}

      <SeatMap
        seats={seats}
        selectedSeats={selectedSeats}
        onSelectSeat={handleSeatClick}
      />

      <SeatLegend />

      {/* Resumen */}

      <section
        className="
          mt-8
          rounded-2xl
          border
          border-[var(--line)]
          p-4
        "
      >
        <h3
          className="
            font-semibold
            text-[var(--sea-ink)]
          "
        >
          Resumen
        </h3>

        <p className="mt-3 text-sm">
          Asientos:{' '}
          {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Ninguno'}
        </p>

        <p className="mt-3 font-bold">Total: {total} Bs.</p>
      </section>

      <button
        disabled={selectedSeats.length === 0}
        className="
          mt-6
          w-full
          rounded-full
          py-3
          font-semibold
          text-white
          bg-[var(--lagoon)]
          transition
          disabled:cursor-not-allowed
          disabled:bg-[var(--chip-line)]
          disabled:text-[var(--sea-ink-soft)]
        "
      >
        Continuar al pago
      </button>
    </main>
  )
}

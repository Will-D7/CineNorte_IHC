import { useMemo } from 'react'

export type SeatStatus = 'available' | 'occupied' | 'reserved'

export interface Seat {
  id: string
  row: string
  number: number
  status: SeatStatus
}

interface SeatMapProps {
  seats: Seat[]
  selectedSeats: string[]
  onSelectSeat: (seat: Seat) => void
}

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

export function SeatMap({ seats, selectedSeats, onSelectSeat }: SeatMapProps) {
  const seatRows = useMemo(() => {
    return ROWS.map((row) => seats.filter((seat) => seat.row === row))
  }, [seats])

  return (
    <div className="mt-10 space-y-4">
      {/* Pantalla */}

      <div
        className="
        mx-auto mb-10
        w-72 rounded-b-full
        bg-[var(--lagoon)]
        py-3
        text-center
        text-sm
        font-semibold
        text-white
      "
      >
        PANTALLA
      </div>

      {seatRows.map((rowSeats, index) => (
        <div
          key={ROWS[index]}
          className="
            flex
            items-center
            justify-center
            gap-3
          "
        >
          <span className="w-5 text-sm font-semibold">{ROWS[index]}</span>

          <div
            className="
            grid
            grid-cols-10
            gap-2
          "
          >
            {rowSeats.map((seat) => {
              const isSelected = selectedSeats.includes(seat.id)

              return (
                <button
                  key={seat.id}
                  disabled={
                    seat.status === 'occupied' || seat.status === 'reserved'
                  }
                  onClick={() => onSelectSeat(seat)}
                  className={`
                    h-8
                    w-8
                    rounded-md
                    border
                    transition

                    ${
                      isSelected
                        ? 'bg-[var(--lagoon)] text-white'
                        : seat.status === 'occupied'
                          ? 'bg-gray-400 cursor-not-allowed'
                          : seat.status === 'reserved'
                            ? 'bg-yellow-400 cursor-not-allowed'
                            : 'bg-[var(--surface)] hover:border-[var(--lagoon)]'
                    }
                  `}
                />
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

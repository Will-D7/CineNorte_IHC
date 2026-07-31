const items = [
  {
    color: 'bg-[var(--surface)]',
    label: 'Disponible',
  },
  {
    color: 'bg-[var(--lagoon)]',
    label: 'Seleccionado',
  },
  {
    color: 'bg-gray-400',
    label: 'Ocupado',
  },
  {
    color: 'bg-yellow-400',
    label: 'Reservado',
  },
]

export function SeatLegend() {
  return (
    <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <span
            className={`
              h-5 w-5 rounded border
              ${item.color}
            `}
          />

          {item.label}
        </div>
      ))}
    </div>
  )
}

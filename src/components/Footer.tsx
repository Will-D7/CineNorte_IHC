import { MapPin, Phone, Globe } from 'lucide-react'

const CINEMA_ADDRESS =
  'Av. Dorbigny esq. Av. Melchor Pérez de Olguín, Cochabamba, Bolivia'

const CINEMA_MAPS_URL =
  'https://www.bing.com/maps/default.aspx?v=2&pc=FACEBK&mid=8100&where1=Av.%20Dorbigny%20Esquina%20Av.%20Melchor%20P%C3%A9rez%20de%20Olguin%2C%20Cochabamba%2C%20Bolivia%2C%20S%2FN&FORM=FBKPL1&mkt=es-ES'

const CINEMA_PHONE = '+591 61618942'
const CINEMA_PHONE_HREF = 'tel:+59161618942'

const CINEMA_WEBSITE = 'cinenortesrl.com'
const CINEMA_WEBSITE_URL = 'https://www.cinenortesrl.com/'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-20 border-t border-[var(--line)] px-4 pb-10 pt-12 text-[var(--sea-ink-soft)]">
      <div className="page-wrap grid grid-cols-1 gap-10 text-center sm:grid-cols-3 sm:text-left">
        <div>
          <div className="mb-4 flex items-center justify-center gap-3 sm:justify-start">
            <img
              src="/images/CineNorteLogo.svg"
              alt="Cine Norte"
              className="h-14 w-auto"
            />

            <h2 className="text-lg font-bold text-[var(--sea-ink)]">
              Cine Norte
            </h2>
          </div>

          <p className="max-w-xs text-sm leading-relaxed">
            Disfruta de los mejores estrenos cinematográficos en Cochabamba.
            Vive la experiencia del cine con nosotros.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold text-[var(--sea-ink)]">
            Contacto
          </h3>

          <a
            href={CINEMA_MAPS_URL}
            target="_blank"
            rel="noreferrer"
            className="mb-3 flex items-start justify-center gap-2 text-sm no-underline transition hover:text-[var(--sea-ink)] sm:justify-start"
          >
            <MapPin size={16} className="mt-1 flex-shrink-0" />
            <span>{CINEMA_ADDRESS}</span>
          </a>

          <a
            href={CINEMA_PHONE_HREF}
            className="flex items-center justify-center gap-2 text-sm no-underline transition hover:text-[var(--sea-ink)] sm:justify-start"
          >
            <Phone size={16} />
            <span>{CINEMA_PHONE}</span>
          </a>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold text-[var(--sea-ink)]">
            Enlaces
          </h3>

          <a
            href={CINEMA_WEBSITE_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 text-sm no-underline transition hover:text-[var(--sea-ink)] sm:justify-start"
          >
            <Globe size={16} />
            <span>{CINEMA_WEBSITE}</span>
          </a>
        </div>
      </div>

      <div className="page-wrap mt-10 flex flex-col items-center justify-between gap-3 border-t border-[var(--line)] pt-6 text-center sm:flex-row sm:text-left">
        <p className="m-0 text-sm">
          © {year} Cine Norte. Todos los derechos reservados.
        </p>

        <p className="island-kicker m-0">Cochabamba, Bolivia</p>
      </div>
    </footer>
  )
}

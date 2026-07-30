import moviesData from '../data/movies.json'

export type Movie = {
  id: string
  title: string
  genres: string[]
  durationMinutes: number
  rating: string
  synopsis: string
  poster: string
  banner: string | null
  times: string[]
}

export const movies: Movie[] = moviesData

/** Solo las películas que tienen imagen de banner, para el carrusel. */
export const bannerMovies = movies.filter(
  (movie): movie is Movie & { banner: string } => movie.banner !== null,
)

export function getMovieById(id: string): Movie | undefined {
  return movies.find((movie) => movie.id === id)
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const remaining = minutes % 60
  if (hours === 0) return `${remaining} min.`
  if (remaining === 0) return `${hours}h`
  return `${hours}h ${remaining}min`
}

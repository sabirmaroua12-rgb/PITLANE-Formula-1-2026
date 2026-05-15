import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'

interface AppContextValue {
  favorites: string[]
  watched: string[]
  isFavorite: (id: string) => boolean
  isWatched: (id: string) => boolean
  toggleFavorite: (id: string) => void
  toggleWatched: (id: string) => void
}

const AppContext = createContext<AppContextValue | null>(null)

const LS_FAV = 'pitlane_favorites'
const LS_WATCHED = 'pitlane_watched'

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(() =>
    load<string[]>(LS_FAV, [])
  )
  const [watched, setWatched] = useState<string[]>(() =>
    load<string[]>(LS_WATCHED, [])
  )

  useEffect(() => {
    localStorage.setItem(LS_FAV, JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem(LS_WATCHED, JSON.stringify(watched))
  }, [watched])

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  )

  const isWatched = useCallback(
    (id: string) => watched.includes(id),
    [watched]
  )

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }, [])

  const toggleWatched = useCallback((id: string) => {
    setWatched((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }, [])

  return (
    <AppContext.Provider
      value={{ favorites, watched, isFavorite, isWatched, toggleFavorite, toggleWatched }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}

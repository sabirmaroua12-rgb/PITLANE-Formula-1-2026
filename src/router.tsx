import { createBrowserRouter } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import PaddockPage from './pages/PaddockPage'
import CalendarPage from './pages/CalendarPage'
import RaceDetailPage from './pages/RaceDetailPage'
import GaragePage from './pages/GaragePage'
import SeasonPage from './pages/SeasonPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <PaddockPage /> },
      { path: 'calendrier', element: <CalendarPage /> },
      { path: 'calendrier/:raceId', element: <RaceDetailPage /> },
      { path: 'mongarage', element: <GaragePage /> },
      { path: 'masaison', element: <SeasonPage /> },
    ],
  },
])

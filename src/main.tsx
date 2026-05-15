import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import { useGSAP } from '@gsap/react'
import { router } from './router'
import './index.css'

// Register GSAP plugins once at the app entry point
gsap.registerPlugin(ScrollTrigger, Flip, useGSAP)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)

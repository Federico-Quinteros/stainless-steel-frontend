'use client'

import { useState, useEffect } from 'react'

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Inicializa al cargar
    checkMobile()

    // Escucha cambios de tamaño
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}

export default useIsMobile;
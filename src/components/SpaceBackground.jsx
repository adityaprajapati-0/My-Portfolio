import React, { useEffect, useRef } from 'react'

const COLORS = ['#ffffff', '#cce5ff', '#ffe0cc', '#ffd6e7']

export default function SpaceBackground() {
  const canvasRef = useRef(null)
  const starsRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const scrollRef = useRef(0)
  const frameRef = useRef(0)

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    const STAR_COUNT = isMobile ? 400 : 1200

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d') 
    let w = window.innerWidth
    let h = window.innerHeight

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w
      canvas.height = h
    }
    resize()
    window.addEventListener('resize', resize)

    // Initialize stars
    starsRef.current = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * w - w / 2,
      y: Math.random() * h - h / 2,
      z: Math.random() * 1000 + 1,
      size: Math.random() * 1.5 + 0.3,
      speed: Math.random() * 0.3 + 0.05,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      twinkle: Math.random() * Math.PI * 2,
    }))

    const handleMouse = (e) => {
      mouseRef.current.x = (e.clientX / w - 0.5) * 2
      mouseRef.current.y = (e.clientY / h - 0.5) * 2
    }

    const handleScroll = () => {
      scrollRef.current = window.scrollY
    }

    window.addEventListener('mousemove', handleMouse)
    window.addEventListener('scroll', handleScroll, { passive: true })

    const animate = () => {
      ctx.clearRect(0, 0, w, h)

      const mx = mouseRef.current.x * 30
      const my = mouseRef.current.y * 30
      const scrollOffset = scrollRef.current * 0.15

      for (let i = 0; i < starsRef.current.length; i++) {
        const star = starsRef.current[i]
        
        // Move star towards viewer
        star.z -= star.speed * 2
        star.twinkle += 0.02

        if (star.z <= 0) {
          star.z = 1000
          star.x = Math.random() * w - w / 2
          star.y = Math.random() * h - h / 2
        }

        // Project 3D to 2D with perspective
        const perspective = 600 / star.z
        const sx = star.x * perspective + w / 2 + mx * (star.z / 1000)
        const sy = star.y * perspective + h / 2 + my * (star.z / 1000) - scrollOffset * star.speed

        // Skip off-screen stars
        const radius = star.size * perspective
        if (sx < -10 || sx > w + 10 || sy < -10 || sy > h + 10) continue

        const twinkleAlpha = 0.5 + 0.5 * Math.sin(star.twinkle)
        const depthAlpha = Math.min(1, (1000 - star.z) / 600)
        const alpha = twinkleAlpha * depthAlpha

        ctx.beginPath()
        ctx.arc(sx, sy, Math.max(0.3, radius), 0, Math.PI * 2)
        ctx.fillStyle = star.color
        ctx.globalAlpha = alpha
        ctx.fill()
      }
      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}

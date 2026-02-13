import React, { useRef, useEffect } from 'react'

const REVIEWS_TOP = [
  { name: "John Smith", role: "CEO @ TechFlow", content: "Exceptional quality and attention to detail. The 3D models were exactly what we needed." },
  { name: "Sarah Chen", role: "Art Director", content: "Working with Aditya was a breeze. Extremely creative and delivered ahead of schedule." },
  { name: "Mike Ross", role: "Founder @ LegalTech", content: "The fullstack implementation was robust and scalable. Highly recommended for complex projects." },
  { name: "Elena K.", role: "Product Manager", content: "Stunning visuals and smooth interactions. Our conversion rates improved significantly." },
]

const REVIEWS_BOTTOM = [
  { name: "David G.", role: "Indie Dev", content: "The AI integration was seamless. A true expert in modern web technologies." },
  { name: "Lila Vance", role: "Creative Lead", content: "Transformed our vision into a digital masterpiece. The design is simply breathtaking." },
  { name: "Robert J.", role: "Marketing Head", content: "Professional, communicative, and talented. One of the best developers I've worked with." },
  { name: "Aria Thorne", role: "Studio Owner", content: "The level of craftsmanship in the 3D work is unmatched. Truly cinematic quality." },
]

export default function Reviews() {
  const containerRef = useRef(null)

  useEffect(() => {
    let ticking = false
    let isVisible = false

    const updateStyles = () => {
      if (!containerRef.current || !isVisible) {
        ticking = false
        return
      }

      const rect = containerRef.current.getBoundingClientRect()
      const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)))
      
      // Strip 1: Moves RIGHT (-300 to 300)
      const x1 = -300 + (600 * scrollProgress)
      // Strip 2: Moves LEFT (300 to -300)
      const x2 = 300 - (600 * scrollProgress)

      containerRef.current.style.setProperty('--review-x1', `${x1}px`)
      containerRef.current.style.setProperty('--review-x2', `${x2}px`)
      
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateStyles)
        ticking = true
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        if (isVisible) {
          window.addEventListener('scroll', onScroll, { passive: true })
          onScroll()
        } else {
          window.removeEventListener('scroll', onScroll)
        }
      },
      { threshold: 0.05 }
    )

    if (containerRef.current) observer.observe(containerRef.current)

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <section className="reviews-section" ref={containerRef} id="reviews">
      <div className="reviews-inner">
        <h2 className="section-heading">CLIENTS SAY</h2>
        
        <div className="reviews-strips">
          {/* Tilted UP Stripe (Moves Right) */}
          <div className="reviews-strip strip-up">
            <div className="reviews-track" style={{ transform: 'translateX(var(--review-x1, 0))' }}>
              {[...REVIEWS_TOP, ...REVIEWS_TOP].map((review, i) => (
                <div key={i} className="review-card">
                  <p className="review-content">"{review.content}"</p>
                  <div className="review-footer">
                    <span className="review-name">{review.name}</span>
                    <span className="review-role">{review.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tilted DOWN Stripe (Moves Left) */}
          <div className="reviews-strip strip-down">
            <div className="reviews-track" style={{ transform: 'translateX(var(--review-x2, 0))' }}>
              {[...REVIEWS_BOTTOM, ...REVIEWS_BOTTOM].map((review, i) => (
                <div key={i} className="review-card">
                  <p className="review-content">"{review.content}"</p>
                  <div className="review-footer">
                    <span className="review-name">{review.name}</span>
                    <span className="review-role">{review.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

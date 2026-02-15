import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const TECH_ITEMS = [
  'React', 'Node.js', 'Python', 'JavaScript', 'TypeScript',
  'Java', 'C++', 'Three.js', 'WebSocket', 'Flask',
  'HTML5', 'CSS3', 'MongoDB', 'PostgreSQL', 'Figma',
]

const BENTO_IMAGES = [
  { src: '/artwork/artwork 1.jpg', alt: 'Artwork 1' },
  { src: '/artwork/artwork 2.jpg', alt: 'Artwork 2' },
  { src: '/artwork/artwork 3.jpg', alt: 'Artwork 3' },
  { src: '/artwork/artwork 4.jpg', alt: 'Artwork 4' },
  { src: '/artwork/artwork 5.jpg', alt: 'Artwork 5' },
  { src: '/artwork/artwork 6.jpg', alt: 'Artwork 6' },
  { src: '/artwork/artwork 1.jpg', alt: 'Artwork 1 Alt' },
  { src: '/artwork/artwork 2.jpg', alt: 'Artwork 2 Alt' },
]

export default function ScrollBundles() {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  // Smooth the scroll progress for buttery movement (matching Reviews component)
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100,
    restDelta: 0.001
  })

  // Transforms for the strips (reduced range for smoother mobile experience)
  const x1 = useTransform(smoothProgress, [0, 1], [-200, 200])
  const x2 = useTransform(smoothProgress, [0, 1], [200, -200])

  // Build repeated items for continuous feel
  const techRow = [...TECH_ITEMS, ...TECH_ITEMS, ...TECH_ITEMS, ...TECH_ITEMS]
  const imgRow1 = [...BENTO_IMAGES.slice(0, 4), ...BENTO_IMAGES.slice(0, 4), ...BENTO_IMAGES.slice(0, 4)]

  return (
    <section className="tilted-strips-section" ref={sectionRef}>
      {/* Strip 1: Tech text items — tilted, moves right on scroll */}
      <div className="tilted-strip strip-1" style={{ transform: 'rotate(-3deg) scale(1.08)' }}>
        <motion.div
          className="tilted-strip-track"
          style={{ x: x1 }}
        >
          {techRow.map((name, i) => (
            <span className="strip-text-item" key={`t1-${i}`}>{name}</span>
          ))}
        </motion.div>
      </div>

      {/* Strip 2: Image items — tilted opposite, moves left on scroll */}
      <div className="tilted-strip strip-2" style={{ transform: 'rotate(2.5deg) scale(1.08)' }}>
        <motion.div
          className="tilted-strip-track"
          style={{ x: x2 }}
        >
          {imgRow1.map((item, i) => (
            <div className="strip-img-item" key={`s2-${i}`}>
              <img src={item.src} alt={item.alt} loading="lazy" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

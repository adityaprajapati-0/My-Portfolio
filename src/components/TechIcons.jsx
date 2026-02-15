import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const TECH_ICONS = [
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'Three.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg' },
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
]

export default function TechIcons() {
  const containerRef = useRef(null)
  // Repeat icons 10 times to ensure complete coverage
  const repeatedIcons = [
    ...TECH_ICONS, ...TECH_ICONS, ...TECH_ICONS, ...TECH_ICONS, ...TECH_ICONS,
    ...TECH_ICONS, ...TECH_ICONS, ...TECH_ICONS, ...TECH_ICONS, ...TECH_ICONS
  ]

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Smooth scroll progress (matching Reviews component)
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100,
    restDelta: 0.001
  })

  // Horizontal movement based on scroll - starting from left to avoid initial gaps
  const x = useTransform(smoothProgress, [0, 1], [-600, 0])

  return (
    <div className="tech-icons-strip-wrapper" ref={containerRef}>
      <div className="tech-icons-marquee">
        <motion.div 
          className="tech-icons-track"
          style={{ x }}
        >
          {repeatedIcons.map((tech, index) => (
            <motion.div 
              key={`${tech.name}-${index}`} 
              className="tech-icon-item"
              initial={{ rotate: -2 }}
              animate={{ 
                rotate: [-2, 2, -2],
                y: [0, -5, 0]
              }}
              transition={{
                duration: 5 + (index % 3),
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <img src={tech.icon} alt={tech.name} className="tech-icon-img" />
              <span className="tech-icon-name">{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

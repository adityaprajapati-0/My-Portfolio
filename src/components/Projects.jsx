import React, { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useLenis } from '@studio-freight/react-lenis'
import HollowText from './HollowText'

const TECH_MAP = {
  'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'Flask': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
  'HTML5': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  'CSS3': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  'Tailwind': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  'Three.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg',
  'MySQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  'Express': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  'Mediapipe': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/mediapipe.svg', // Correct Mediapipe icon
  'AI': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/openai.svg', // Representative icon
}

const PROJECTS = [
  {
    number: '01',
    name: 'NeoLearn',
    subtitle: 'Interactive Learning Platform',
    tech: ['React', 'Three.js', 'Node.js', 'Express'],
    image: '/projects/Neolearn.png',
    link: 'https://adixdd-neurolearn.netlify.app/',
    description: 'An interactive platform bridging the gap between theory and practical problem-solving through structured DSA practice and coding challenges.',
  },
  {
    number: '02',
    name: 'SignSense AI',
    subtitle: 'Computer Vision Application',
    tech: ['Python', 'Flask', 'HTML5', 'CSS3', 'JavaScript'],
    image: '/projects/SignSense Ai.png',
    link: 'https://adixdd-signsense-ai.netlify.app/',
    description: 'An accessibility-focused AI platform enabling real-time hand sign interpretation using computer vision and machine learning.',
  },
  {
    number: '03',
    name: 'Snake Game',
    subtitle: 'Classic Arcade Reimagined',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    image: '/projects/Snake Game.png',
    link: 'https://adixdd-snakegame.netlify.app/',
    description: 'A classic arcade experience featuring real-time movement, collision detection, and score tracking with a responsive UI.',
  },
  {
    number: '04',
    name: 'Musify',
    subtitle: 'High-Performance Music Streaming',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Node.js'],
    image: '/projects/Musify.png',
    link: 'https://adixdd-musify.netlify.app/',
    description: 'An AI-integrated judge that evaluates your singing against a selected song and provides actionable feedback to help you improve.',
  },
]

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [hoveredProject, setHoveredProject] = useState(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1, margin: "0px 0px -100px 0px" })
  const lenis = useLenis()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    if (selectedProject) {
      if (lenis) lenis.stop()
      document.body.style.overflow = 'hidden'
    } else {
      if (lenis) lenis.start()
      document.body.style.overflow = 'unset'
    }
    return () => {
      if (lenis) lenis.start()
      document.body.style.overflow = 'unset'
    }
  }, [selectedProject, lenis])

  // ... (rest of component)

  const closeModal = () => setSelectedProject(null)

  return (
    <section className="projects-redesign section-wrapper" id="projects" ref={sectionRef}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <HollowText>Projects</HollowText>

        <div className="projects-list">
          {PROJECTS.map((project) => (
            <motion.div
              key={project.name}
              className="project-item"
              variants={itemVariants}
              onMouseEnter={() => setHoveredProject(project)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-item-content">
                <div className="project-item-info">
                  <h3 className="project-item-title">{project.name}</h3>
                  <div className="project-item-tech-preview">
                    {project.tech.slice(0, 4).map((t) => (
                      <span key={t} className="tech-tag-mini">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="project-item-action">
                  <span className="read-more">Read More <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Floating Preview (Besides the Cursor) */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            className="floating-preview"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: mousePos.x + 40,
              y: mousePos.y - 150 
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', damping: 30, stiffness: 250, mass: 0.5 }}
            style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              pointerEvents: 'none', 
              zIndex: 99999 
            }}
          >
            <img src={hoveredProject.image} alt={hoveredProject.name} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Detail Modal */}
      {/* Project Detail Modal */}
      {selectedProject && createPortal(
        <AnimatePresence mode="wait">
          <motion.div 
            key="modal-overlay"
            className="project-modal-overlay" 
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="project-modal-content"
              key="modal-content"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close-btn" onClick={closeModal}>✕</button>
              
              <div className="modal-body">
                <div className="modal-image-container">
                  <img src={selectedProject.image} alt={selectedProject.name} />
                </div>
                
                <div className="modal-details">
                  <h2 className="modal-title">{selectedProject.name}</h2>
                  <p className="modal-description">{selectedProject.description}</p>
                  
                  <div className="modal-tech-stack">
                    <h4 className="tech-label">Tech Stack</h4>
                    <div className="tech-icons-grid">
                      {selectedProject.tech.map((t) => (
                        <div key={t} className="modal-tech-icon-item" title={t}>
                          {TECH_MAP[t] ? (
                            <img src={TECH_MAP[t]} alt={t} className="modal-tech-icon" />
                          ) : (
                            <span className="tech-icon-pill">{t}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="modal-actions">
                    <a 
                      href={selectedProject.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="modal-preview-btn"
                    >
                      Live Preview <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </section>
  )
}

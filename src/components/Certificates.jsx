import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import HollowText from './HollowText'

const CERTIFICATES = [
  { title: 'Google Analytics', issuer: 'Google', icon: '📊', img: '/certificates/analytics.jpeg', date: 'Oct 2023', skills: 'Data analysis, Reporting' },
  { title: 'Google Cybersecurity', issuer: 'Google', icon: '🔒', img: '/certificates/cybersecurity.jpeg', date: 'Nov 2023', skills: 'Network Security, Python' },
  { title: 'Google Cloud', issuer: 'Google', icon: '☁️', img: '/certificates/cloud.jpeg', date: 'Dec 2023', skills: 'Cloud Infrastructure, Kubernetes' },
  { title: 'Ghar Bazaar', issuer: 'Real Estate Platform', icon: '🏠', img: '/certificates/gharbazaar.jpeg', isVertical: true, date: 'Jan 2024', skills: 'Web Development, Branding' },
]

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null)
  const items = [...CERTIFICATES, ...CERTIFICATES, ...CERTIFICATES, ...CERTIFICATES]
  
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100,
    restDelta: 0.001
  })

  const x = useTransform(smoothProgress, [0, 1], [0, -1200])

  return (
    <section className="certificates section-wrapper" id="certificates" ref={containerRef}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <HollowText>Certificates</HollowText>
      </motion.div>

      <motion.div 
        className="cert-marquee"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2 }}
      >
        <motion.div className="cert-track" style={{ x }}>
          {items.map((cert, i) => (
            <div 
              className="cert-card" 
              key={`cert-${i}`}
              onClick={() => setSelectedCert(cert)}
            >
              <div className="cert-card-inner">
                <span className="cert-icon">{cert.icon}</span>
                <div className="cert-info">
                  <span className="cert-title">{cert.title}</span>
                  <div className="cert-meta">
                    <span className="cert-issuer">{cert.issuer}</span>
                    <span className="cert-dot">•</span>
                    <span className="cert-date">{cert.date}</span>
                  </div>
                  <div className="cert-skills">
                    {cert.skills.split(',').map(skill => (
                      <span key={skill} className="cert-tag">{skill.trim()}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div 
            className="cert-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
          >
            <motion.div 
              className={`cert-modal-content ${selectedCert.isVertical ? 'is-vertical' : ''}`}
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="cert-close" onClick={() => setSelectedCert(null)}>×</button>
              <div className="cert-modal-body">
                <div className="cert-modal-img-container">
                  <img src={selectedCert.img} alt={selectedCert.title} className="cert-modal-img" />
                </div>
                <div className="cert-modal-details">
                  <h3 className="cert-modal-title">{selectedCert.title}</h3>
                  <p className="cert-modal-issuer">Issued by {selectedCert.issuer}</p>
                  <p className="cert-modal-desc">This certificate verifies the successful completion of all requirements for {selectedCert.title}, demonstrating proficiency and dedication to excellence in the field.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

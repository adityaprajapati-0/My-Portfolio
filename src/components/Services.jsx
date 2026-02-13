import React, { useRef, useEffect, useState } from 'react'
import HollowText from './HollowText'

const SERVICES = [
  {
    number: '01',
    title: 'GRAPHIC DESIGN',
    desc: 'Impactful visual storytelling through brand identity, logo design, and marketing collateral that captures your unique vision.',
  },
  {
    number: '02',
    title: 'WEB DESIGN',
    desc: 'High-quality, photorealistic renders that showcase designs with realistic lighting, textures, and shadows.',
  },
  {
    number: '03',
    title: 'FULLSTACK DEVELOPMENT',
    desc: 'End-to-end solutions from pixel-perfect frontends to scalable backend architectures and database design.',
  },
  {
    number: '04',
    title: 'AI INTEGRATIONS',
    desc: 'Embedding intelligent features — from computer vision to natural language processing — into modern applications.',
  },
]

export default function Services() {
  const sectionRef = useRef(null)
  const [itemVisibility, setItemVisibility] = useState(SERVICES.map(() => false))

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index)
          if (entry.isIntersecting) {
            setItemVisibility((prev) => {
              const next = [...prev]
              next[index] = true
              return next
            })
          }
        })
      },
      { threshold: 0.2 }
    )

    const items = sectionRef.current?.querySelectorAll('.service-item-white')
    items?.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="services-white" id="services" ref={sectionRef}>
      <div className="services-white-inner">
        <h2 className="services-white-heading">SERVICES</h2>

        <div className="services-white-list">
          {SERVICES.map((s, i) => (
            <div
              key={s.number}
              className={`service-item-white ${itemVisibility[i] ? 'visible' : ''}`}
              data-index={i}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="service-item-white-header">
                <span className="service-white-number">{s.number}</span>
                <span className="service-white-title">{s.title}</span>
              </div>
              <p className="service-white-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

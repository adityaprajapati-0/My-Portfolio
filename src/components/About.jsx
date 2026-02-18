import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import HollowText from './HollowText'

const ABOUT_TEXT = `I am Aditya Prajapati (adixdd), Tech Lead at GharBazaar.in and a Fullstack Developer specializing in high-fidelity digital experiences. 

Focused on premium design and maximum web optimization, I strive to create extraordinary digital solutions.`

export default function About() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { amount: 0.3, margin: "0px 0px -100px 0px" })

  // Elements exactly as in the reference image
  const decorativeElements = [
    { 
      id: 'chrome-blob', 
      side: 'left', 
      top: '10%', 
      xIn: '-60%', // More to the side (was -40%)
      xOut: '-120%', 
      delay: 0, 
      type: 'chrome-blob' 
    },
    { 
      id: 'blue-crystal', 
      side: 'right', 
      top: '15%', 
      xIn: '60%', // More to the side (was 40%)
      xOut: '120%', 
      delay: 0.2, 
      type: 'blue-crystal' 
    },
    { 
      id: 'red-blob', 
      side: 'left', 
      top: '75%', 
      xIn: '-55%', // More to the side (was -30%)
      xOut: '-110%', 
      delay: 0.4, 
      type: 'red-glossy' 
    },
    { 
      id: 'purple-flower', 
      side: 'right', 
      top: '65%', 
      xIn: '60%', // More to the side (was 40%)
      xOut: '120%', 
      delay: 0.3, 
      type: 'purple-flower' 
    },
  ]

  return (
    <section className="about section-wrapper" id="about" ref={containerRef} style={{ overflow: 'hidden', position: 'relative' }}>
      <div className="about-inner">
        
        {/* Animated Side Elements - Exactly like reference */}
        {decorativeElements.map((el) => {
          const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
          const mobileScale = isMobile ? 1.1 : 1;
          const rotationAngle = el.side === 'left' ? -25 : 25;

          return (
            <motion.div
              key={el.id}
              initial={{ 
                x: el.side === 'left' ? '-150%' : '150%', 
                opacity: 0,
                rotate: rotationAngle,
                scale: mobileScale * 0.8
              }}
              animate={isInView ? { 
                x: el.xIn, 
                opacity: 1,
                rotate: 0,
                scale: mobileScale
              } : { 
                x: el.side === 'left' ? '-150%' : '150%', 
                opacity: 0,
                rotate: rotationAngle,
                scale: mobileScale * 0.8
              }}
              transition={{ 
                duration: 1.8, 
                delay: el.delay, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              className="about-side-element-fixed"
              style={{ 
                top: el.top, 
                [el.side]: '0',
                position: 'absolute',
                zIndex: 1,
                pointerEvents: 'none'
              }}
            >
              <HighFidelityObject type={el.type} />
            </motion.div>
          );
        })}

        <HollowText>About Me</HollowText>

        <div className="about-text-center">
          <p className="about-text" style={{ whiteSpace: 'pre-line' }}>
            {ABOUT_TEXT}
          </p>
          <button className="cta-button" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Contact Me
          </button>
        </div>
      </div>
    </section>
  )
}

function HighFidelityObject({ type }) {
  const imageMap = {
    'chrome-blob': '/About/spaceship-removebg-preview.png',
    'blue-crystal': '/About/planet-removebg-preview.png',
    'purple-flower': '/About/satlellite-removebg-preview.png',
    'red-glossy': '/About/astraunaut-removebg-preview.png'
  }

  const animationMap = {
    'chrome-blob': {
      animate: { y: [0, -15, 0] },
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    },
    'blue-crystal': {
      animate: { rotate: [0, 360] },
      transition: { duration: 40, repeat: Infinity, ease: "linear" }
    },
    'purple-flower': {
      animate: { rotate: [0, 10, -10, 0] },
      transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
    },
    'red-glossy': {
      animate: { rotate: [0, 5, -5, 0], y: [0, -8, 0] },
      transition: { 
        rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }, 
        y: { duration: 5, repeat: Infinity, ease: "easeInOut" } 
      }
    }
  }

  const sizeMap = {
    'chrome-blob': 520,      // Increased from 400
    'blue-crystal': 520,     // Increased from 400
    'purple-flower': 500,    // Increased from 380
    'red-glossy': 500        // Increased from 380
  }

  const imageSrc = imageMap[type]
  const animation = animationMap[type]
  const size = sizeMap[type]

  if (!imageSrc) return null

  return (
    <motion.img 
      src={imageSrc}
      alt={type}
      width={size}
      height={size}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        objectFit: 'contain',
        pointerEvents: 'none',
        userSelect: 'none',
        filter: 'brightness(0.85) saturate(0.8) contrast(1.1)',
        opacity: 0.95
      }}
      {...animation}
    />
  )
}

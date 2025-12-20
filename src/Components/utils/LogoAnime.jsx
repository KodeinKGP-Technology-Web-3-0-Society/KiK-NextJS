'use client'

import { motion } from 'framer-motion'

export default function LogoAnime() {
  return (
    <div
      style={{
        position: 'absolute',
        right: '6%',
        top: '12%',
        width: 420,
        height: 420,
        pointerEvents: 'none',
        zIndex: 5,
      }}
    >
      {/* ICON — growIn */}
      <motion.img
        src="https://snackthis-userdata.s3-eu-west-1.amazonaws.com/83cfec1d-d71b-4f7d-ab7c-08c902f61faf.png"
        alt="icon"
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: 0.5, opacity:1 }}
        transition={{
          delay: 1,          // 2640ms
          duration: 1.524,      // growIn duration
          ease: [0.2, 0.0, 0.2, 1], // slowdown:standard
        }}
        style={{
          position: 'absolute',
          left: 142.5,
          top: 62.5,
          width: 175,
          height: 175,
          transformOrigin: 'center center',
        }}
      />

      {/* TEXT / LOGO — opacity + rotate */}
      <motion.img
        src="https://userdata.jttr.video/0vtn5knLqLRCOjJLqK3n9.png"
        alt="logo-text"
        initial={{ opacity: 0, rotate: -90 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{
          opacity: {
            delay: 2,      // 3164ms
            duration: 0.19,
            ease: 'linear',
          },
          rotate: {
            delay: 3.164,
            duration: 2.38,    // 5544 - 3164
            ease: [0.4, 0.0, 0.2, 1], // smooth:standard
          },
        }}
        style={{
          position: 'absolute',
          left: 120,
          top: 40,
          width: 220,
          height: 'auto',
          transformOrigin: 'center center',
        }}
      />
    </div>
  )
}

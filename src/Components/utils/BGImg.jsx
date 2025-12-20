'use client'

import { motion } from 'framer-motion'

export default function JitterLikeReveal() {
  return (
    <div
      style={{
        width: 499,
        height: 748.8,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* MASK WRAPPER */}
      <motion.div
        initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        transition={{
          duration: 1.5, // 1000ms (maskRevealIn)
          delay: 0.75,
          ease: [0.4, 0.0, 0.2, 1], // smooth:standard approximation
        }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* IMAGE SLIDE */}
        <motion.img
          src="https://userdata.jttr.video/-meT9eZtwfg7WDqI97ZMc.jpeg"
          alt=""
          initial={{ y: 500 }}
          animate={{ y: 0 }}
          transition={{
            duration: 0.8, // 800ms (slideIn)
            ease: [0.2, 0.0, 0.2, 1], // slowdown approximation
          }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            mixBlendMode: 'lighten',
          }}
        />
      </motion.div>
    </div>
  )
}
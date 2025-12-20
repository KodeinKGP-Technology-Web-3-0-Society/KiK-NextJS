'use client'

import { motion } from 'framer-motion'
import BubbleText from "./BubbleText";

export default function Welcome() {
  return (
    <>
      <motion.img
        src="https://userdata.jttr.video/jza47yy2oO1ACDtQ4G1HK.png"
        alt="welcome"
        initial={{
          filter: 'blur(20px)',
          opacity: 1,
        }}
        animate={{
          filter: 'blur(0px)',
          opacity: 1,
        }}
        transition={{
          delay: 0.25,        // 2000ms
          duration: 1,     // 3000 - 2000
          ease: [0.2, 0.0, 0.2, 1], // slowdown:standard
        }}
        style={{
          position: 'absolute',
          left: 77,
          top: 212,
          width: 342,
          height: 'auto',
          zIndex: 4,
          pointerEvents: 'none',
        }}
        className="absolute left-1/2 -translate-x-1/8 sm:left-0 sm:translate-x-0"
      />
      <div className='absolute left-22 top-85'>
        <BubbleText />
      </div>
    </>
  )
}

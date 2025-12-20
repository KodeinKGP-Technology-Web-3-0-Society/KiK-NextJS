'use client'

import { motion } from 'framer-motion'

export default function RoboAnime() {
  return (
    <motion.img
      src="https://snackthis-userdata.s3-eu-west-1.amazonaws.com/e1c6911c-1e42-483f-80ac-d4f47d7eacf1.png"
      alt="robo"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: [0, 0.5, 0, 1],
      }}
      transition={{
        times: [
          0,
          1524 / 4572,  // end of phase 1
          3048 / 4572,  // end of phase 2
          1,
        ],
        delay: 3.164,   // 3164ms
        duration: 4.572, // 7736 - 3164
        ease: 'linear',
      }}
      style={{
        position: 'absolute',
        right: '2%',
        top: '14%',
        width: 400,
        height: 'auto',
        zIndex: 3,
        pointerEvents: 'none',
      }}
    />
  )
}

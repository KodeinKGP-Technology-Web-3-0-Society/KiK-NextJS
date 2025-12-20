'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function OurWorksCard() {
  const router = useRouter();
  return (
      <motion.img
        src="https://userdata.jttr.video/U2J4yS7zwOAmmyMqKO_ny.png"
        alt="our-works-card"
        initial={{
          x: -150, // slideIn from left → right
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        transition={{
          delay: 3.98,     // 3980ms
          duration: 0.5,   // 4480 - 3980
          ease: [0.4, 0.0, 1, 1], // accelerate:standard approximation
        }}
        style={{
          position: 'absolute',
          left: 38,
          top: 361,
          width: 448,
          height: 'auto',
          zIndex: 4,
        }}
        className="
        absolute
        left-1/2 -translate-x-1/8
        sm:left-0 sm:translate-x-0
        hover:scale-102 cursor-pointer
      "
        onClick={()=>router.push('/articles')}
      />
  )
}

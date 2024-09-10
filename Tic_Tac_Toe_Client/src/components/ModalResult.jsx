import React, { useEffect } from 'react'
import { animate, motion, stagger, transform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { duration } from '@mui/material'
const variants = {
  hidden: {
    opacity: 0,
    scaleX: 0,
    scaleY: 0
  },
  visible: {
    opacity: 1,
    scaleX: 1,
    scaleY: 1,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.3
    }
  }
}

const children = {
  hidden: {
    opacity: 0,
    scale: 2,
    rotate: 0
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0
  }
}
const children1 = {
  hidden: {
    opacity: 1,
    scale: 0,
    rotate: -180
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.5
    }
  }
}

function ModalResult ({ won, userN }) {
  const result = () => {
    if (won === -1) {
      return 'GAME DRAW'
    } else if (won === userN) {
      return 'YOU WON'
    } else {
      return 'OPPONENT WON'
    }
  }
useEffect(()=>{
    console.log(userN);
},[userN])
  return (
    <div className='fixed inset-0 bg-[#0008] flex justify-center'>
      <motion.div
        variants={variants}
        animate={'visible'}
        initial={'hidden'}
        className={`w-1/2 h-1/2 rounded-xl bg-yellow-100 self-center ${
          won === userN
            ? 'text-green-500'
            : won === -1
            ? 'text-black'
            : 'text-red-600'
        } text-8xl text-center flex flex-col justify-center`}
      >
        <motion.img
          variants={children}
          src='/Logo.png'
          className='w-1/4 h-1/3 self-center rounded-xl mb-16'
          alt=''
        />
        <motion.div variants={children} className='self-center'>
          {result()}
        </motion.div>
        <motion.img
          variants={children1}
          className='self-center text-white w-[100px] h-[100px]'
          src='/Reload.png'
          onClick={() => window.location.reload()}
        ></motion.img>
      </motion.div>
    </div>
  )
}

export default ModalResult

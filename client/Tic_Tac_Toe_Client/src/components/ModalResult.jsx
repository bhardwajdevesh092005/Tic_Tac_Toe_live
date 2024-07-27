import React from 'react'
import { animate, motion, stagger } from 'framer-motion'

const variants = {
    hidden: {
        opacity: 0, scaleX: 0, scaleY: 0
    },
    visible: {
        opacity: 1,
        scaleX: 1,
        scaleY: 1,
        transition: {
            delayChildren: 0.4,
            staggerChildren: 0.3,
        }
    }
}

const children = {
    hidden: {
        opacity: 0, scale: 2, rotate: 0,
    },
    visible: {
        opacity: 1, scale: 1, rotate: 0
    }
}

function ModalResult({ won }) {
    const result = ()=>{
        if(won === -1){
            return "GAME DRAW";
        }else if(won === 1){
            return "YOU WON";
        }else{
            return "YOU LOOSE";
        }
    }
    return (
        <div className='fixed inset-0 bg-[#0008] flex justify-center'>
            <motion.div variants={variants} animate={"visible"} initial={"hidden"} className={`w-1/2 h-1/2 rounded-xl bg-yellow-100 self-center ${(won === 1)? "text-green-500" : (won === 2?"text-red-600":"text-black")} text-8xl text-center flex flex-col justify-center`}>
                <motion.img variants={children} src="/Logo.png" className='w-1/4 h-1/3 self-center rounded-xl mb-16' alt="" />  
                <motion.div variants={children} className='self-center'>{result()}</motion.div>
            </motion.div>
        </div>
    )
}

export default ModalResult
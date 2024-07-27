import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'
import ModalResult from '../ModalResult';
import CircularProgress from '@mui/material/CircularProgress';
function Play() {
    const navigator = useNavigate();
    const state = useSelector((state) => state.status);
    const [cur_user, setCurUser] = useState(1);
    const [time, setTime] = useState(20);
    const [border, setBorder] = useState(`2px solid rgb(${255 * time / 10},${255 * (10 - time) / 10},0)`);
    const [gameState, setGameState] = useState([-1, -1, -1, -1, -1, -1, -1, -1, -1])
    const [bg_resource, setBgResource] = useState(new Array(gameState.length).fill(""));
    const [won, setWon] = useState(-1);
    const [decide, setDecide] = useState(false);
    const win_states = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    const [text_color, setTextColor] = useState(`rgb(${String((255 * (20 - time)) / 20)},${String((255 * time) / 20)},0)`)
    const handleGame = (index) => {
        setGameState((prev) => (prev.map((elem, index1) => (index === index1 ? ((cur_user === 1) ? 1 : 2) : elem))))
        setCurUser((prev) => (prev === 1 ? 2 : 1))
        setTime(20);
        console.log(gameState);
    }
    useEffect(() => {
        setBgResource((prev) => (prev.map((elem, index) => {
            if (gameState[index] === -1) {
                return null;
            } else if (gameState[index] === 1) {
                return "/X.png";
            } else {
                return "/O.png";
            }
        })))
    }, [gameState])
    useEffect(() => {
        win_states.map((elem) => {
            if (gameState[elem[0]] === gameState[elem[1]] && gameState[elem[1]] === gameState[elem[2]] && gameState[elem[0]] !== -1) {
                setWon((gameState[elem[0]] === 2) ? 1 : 2);
                setDecide(true);
            }
        })
        let test = false;
        if (!decide) {
            for (let i = 0; i < 9; i++) {
                if (gameState[i] === -1) {
                    test = true;
                    break;
                }
            }
            if (test === false) {
                setDecide(true);
                setWon(-1);
            }
        }
    }, [gameState])
    useEffect(() => {
        if (state) {
            navigator("/");
        }
    }, [state]);
    useEffect(() => {
        setInterval(() => {
            if (time <= 0) {
                setTime(20);
            }
            setTime(prev => prev - 1)

        }, 1000);
    }, [setTime])
    useEffect(() => {
        if (time <= 0) {
            setTime(20);
            if (cur_user == 1) {
                setCurUser(2);
            } else {
                setCurUser(1);
            }
        }
        setBorder(`2px solid rgb(${String((255 * (20 - time)) / 20)},${String((255 * time) / 20)},0)`);
        setTextColor(`rgb(${String((255 * (20 - time)) / 20)},${String((255 * time) / 20)},0)`);
    }, [time]);
    return (
        <div className='w-screen h-screen text-white flex flex-col justify-center align-middle bg-black'>
            {decide && <ModalResult won={won} />}
            <img src="/Logo.png" className='w-[200px] h-1/7 self-center rounded-xl mt-2' alt="" />
            <div className={`w-1/2 ${!decide ? "flex" : "hidden"}  self-center justify-between mt-4`}>
                <div style={{ border: `${cur_user === 1 ? border : ""}` }} className={`border-2 w-fit p-2 text-3xl rounded-xl`}>Player 1</div>
                <div style={{ color: `${text_color}` }} className={`align-middle self-center text-5xl `}><CircularProgress className='w-[100px]' value={100 * (time) / 20} variant='determinate' /></div>
                <div style={{ border: `${cur_user === 2 ? border : ""}` }} className={`border-2 w-fit p-2 text-3xl rounded-xl`}>Player 2</div>
            </div>
            <div className='w-full h-full flex justify-center'>
                <div className='w-1/3 h-3/4  bg-blue-600 my-10 grid grid-rows-3 grid-cols-3 gap-2 p-2 rounded-2xl'>
                    {gameState.map((val, index) => (<div onClick={() => handleGame(index)} key={index} className={`col-span-1 row-span-1 bg-blue-900 rounded-xl p-2 ${gameState[index] === -1 ? "pointer-events-auto" : "pointer-events-none"}`}>{gameState[index] !== -1 && <motion.img initial={{ scale: 2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} src={bg_resource[index]} alt='' className='w-full h-full' />}</div>))}
                </div>
            </div>
        </div>
    )
}

export default Play
import React, { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import ModalResult from '../ModalResult'
import CircularProgress from '@mui/material/CircularProgress'
import { io } from 'socket.io-client'
import { useParams } from 'react-router-dom'
import { set } from 'react-hook-form'
function Play () {
  const { name } = useParams()
  const [cur_user, setCurUser] = useState(1)
  const [user_n, setUserN] = useState(-1)
  const [isActive, setIsActive] = useState(true)
  const [opp_name, setOppName] = useState('')
  const [time, setTime] = useState(20)
  const [border, setBorder] = useState(
    `2px solid rgb(${(255 * time) / 10},${(255 * (10 - time)) / 10},0)`
  )
  const [gameState, setGameState] = useState([
    -1, -1, -1, -1, -1, -1, -1, -1, -1
  ])
  const [bg_resource, setBgResource] = useState(
    new Array(9).fill('')
  )
  const [won, setWon] = useState(-1)
  const [decide, setDecide] = useState(-1);
  const win_states = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  const [text_color, setTextColor] = useState(
    `rgb(${String((255 * (20 - time)) / 20)},${String((255 * time) / 20)},0)`
  )
  const socket = useMemo(
    () =>
      io('http://localhost:4000', {
        withCredentials: true
      }),
    []
  )

  useEffect(()=>{
    socket.emit('user_name',name);
  })

  useEffect(() => {
    socket.on('joined-as-fir', async args => {
      if (args === socket.id) {
        setUserN(1)
        setTime(20);
        console.log('joined as first user');
      }
    })
    socket.on('joined-as-sec', async (args )=> {
      if (socket.id === args) {
        console.log('Joined as second player')
        setUserN(2)
        setIsActive(false); 
      }
      setDecide(0);
      setTime(20);
    })
    socket.on('opp_name',async (args)=>{
      setOppName(args);
    })
    socket.on('rec-game-change',async (args)=>{
      setGameState((prev)=>(
        prev.map((elem,index1)=>((args === index1)?cur_user:elem))
      ));
      setIsActive(true);
      if(cur_user === 2){
        setCurUser(1);
      }else{
        setCurUser(2);
      }
    })
  })

  const check_draw = ()=>{
    for(let i = 0;i<9;i++){
      if(gameState[i] == -1){
        return false;
      }
    }
    return true;
  }

  const bg_provider = (cell_state)=>{
    if(cell_state === 1){
      return '/X.png'
    }else{
      return '/O.png'
    }
  }

  useEffect(()=>{
    win_states.map((state)=>{
      if(gameState[state[0]] === gameState[state[1]]&&gameState[state[1]] === gameState[state[2]]&& gameState[state[0]] !== -1){
        setWon(gameState[state[0]]);
        setDecide(1);
      }
    })
    if(check_draw()&&decide === 0){
      setDecide(1);
      console.log(check_draw())
    }
    setBgResource(prev=>prev.map((el,index)=>(bg_provider(gameState[index]))))
  },[gameState])

  const handleGame = (index)=>{
    setGameState((prev)=>(
      prev.map((elem,index1)=>((index === index1)?cur_user:elem))
    ));
    setCurUser((prev)=>(prev === 2)?1:2);
    setIsActive(false);
    socket.emit('game-change',index);
  }
  useEffect(()=>{console.log(cur_user)},[cur_user])

  useEffect(()=>{
    const intervalId = setInterval(() => {
      setTime(prev=>prev-1);
    }, 1000)
    return ()=>clearInterval(intervalId);
  })

  useEffect(()=>{
    if(time<=0){
      setTime(20);
      setCurUser(cur_user === 1?2:1);
      setIsActive((prev)=>!prev);
    }
    setBorder(`2px solid rgb(${(255 * (10 - time)) / 10},${(255 * time) / 10},0)`)
  },[time])

  return (
    <div className='w-screen h-screen text-white flex flex-col justify-center align-middle bg-black'>
      {decide === -1 ? (
        <div className='fixed inset-0 w-screen h-screen text-center justify-center flex flex-col bg-[#000000b0] text-9xl'>
          Waiting
        </div>
      ) : (
        decide == 1 && <ModalResult won={won} userN={user_n} />
      )}
      <img
        src='/Logo.png'
        className='w-[200px] h-1/7 self-center rounded-xl mt-2'
        alt=''
      />
      <div
        className={`w-1/2 ${
          !decide ? 'flex' : 'hidden'
        }  self-center justify-between mt-4`}
      >
        <div
          style={{ border: `${cur_user === user_n ? border : ''}` }}
          className={`border-2 p-2 text-3xl rounded-xl w-1/3 text-center`}
        >
          {name}
        </div>
        <div
          style={{ color: `${text_color}` }}
          className={`align-middle self-center flex justify-center text-5xl w-1/3 `}
        >
          <CircularProgress
            className='w-[100px]'
            value={(100 * time) / 20}
            variant='determinate'
          />
        </div>
        <div
          style={{ border: `${cur_user !== user_n ? border : ''}` }}
          className={`border-2 p-2 text-3xl rounded-xl w-1/3 text-center`}
        >
          {opp_name}
        </div>
      </div>
      <div className={`w-full h-full flex justify-center `}>
        <div className='w-1/3 h-3/4  bg-blue-600 my-10 grid grid-rows-3 grid-cols-3 gap-2 p-2 rounded-2xl'>
          {gameState.map((val, index) => (
            <div
              onClick={() => handleGame(index)}
              key={index}
              className={`col-span-1 row-span-1 bg-blue-900 rounded-xl p-2 ${
                isActive ? 'pointer-events-auto' : 'pointer-events-none'
              } `}
            >
              {gameState[index] !== -1 && (
                <motion.img
                  initial={{ scale: 2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  src={bg_resource[index]}
                  alt=''
                  className={`w-full h-full ${
                    gameState[index] === -1
                      ? 'pointer-events-auto'
                      : 'pointer-events-none'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Play
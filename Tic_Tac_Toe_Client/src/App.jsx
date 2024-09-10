import './App.css'
import {useState} from 'react'
import Btn from './components/Buttons/Btn'
function App() {
    const [name,setName] = useState("");
    return (
        <div className='w-full h-full flex flex-col justify-center align-middle text-white'>
            <div className='w-screen flex justify-center'>
            <img src="/Logo.png" alt="" className='w-1/2 self-center rounded-xl shadow-xl shadow-gray-700 mx-4' />
            <div className='w-fit self-center mx-10 space-y-3 justify-center align-middle'>
            <input type="text" name="" id="name" placeHolder="Your Name" onChange = {(e)=>{setName(e.target.value)}} className="text-2xl w-[300px] flex flex-col rounded-xl py-1 justify-center text-black border-4 border-violet-500"/>
            <Btn name = {"Play"} className={'py-1 w-fit'} username={name}/>
            </div>
            </div>
        </div>
    )
}

export default App

import './App.css'
import { useSelector } from 'react-redux'
import Btn from './components/Buttons/Btn';
import LogoutBtn from './components/Buttons/LogoutBtn';

function App() {
    const state = useSelector((state) => state);
    return (
        <div className='w-full h-full flex flex-col justify-center align-middle text-white'>
            {
                (state.status&&<div className='self-center mb-12 text-6xl font-extrabold'>Hello, Devesh!!</div>)
            }
            <div className='w-screen flex justify-center'>
            <img src="/Logo.png" alt="" className='w-1/2 self-center rounded-xl shadow-xl shadow-gray-700 mx-4' />
            <div className='self-center ml-12'>
                {state.status ? <div className='flex flex-col w-fit gap-4'><Btn name="Play" navigate='play' className='py-1' /> <LogoutBtn /></div> : <div className='flex flex-col gap-4'><Btn name={'signup'} className='py-1' navigate='signup' /> <Btn name={"login"} className='py-1' navigate='login' /></div>}
            </div>
            </div>
        </div>
    )
}

export default App

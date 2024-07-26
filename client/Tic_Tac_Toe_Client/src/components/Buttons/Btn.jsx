import React from 'react'
import { useNavigate } from 'react-router-dom'
function Btn({name,className="",navigate = ""}) {
    const navigator = useNavigate();
    return (
        <div className={`w-fit bg-gradient-to-r from-blue-500 to-purple-500 flex justify-center text-xl px-1 rounded-full ${className}`}>
            <button onClick={() => {navigator(`/${navigate}`)}} className='border-4 border-black py-1 px-16 rounded-full'>{name?.toUpperCase()}</button>
        </div>
    )
}
export default Btn
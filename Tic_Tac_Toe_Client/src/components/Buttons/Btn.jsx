import React from 'react'
function Btn({name,className="",username=""}){
    return (
        <div className='w-ful self-center flex justify-center'>
        <div className={`w-fit bg-gradient-to-r from-blue-500 to-purple-500 flex justify-center self-center text-xl px-1 rounded-full ${className}`}>
            <button  className='border-4 w-fit border-black py-1 px-16 rounded-full hover:border-white'><a href={`/play/${username}`}>{name?.toUpperCase()}</a></button>
        </div>
        </div>
    )
}
export default Btn
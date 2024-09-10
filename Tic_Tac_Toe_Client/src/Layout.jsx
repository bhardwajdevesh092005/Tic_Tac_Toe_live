import React from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {
    return (
        <div className='bg-black w-screen h-screen'>
            <Outlet />
        </div>
    )
}

export default Layout
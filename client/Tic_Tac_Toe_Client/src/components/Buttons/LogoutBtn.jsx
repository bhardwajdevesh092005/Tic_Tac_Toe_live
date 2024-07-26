import React from 'react'
import {AuthServiceProvider} from '../../appwriteAuth'
import { useDispatch } from 'react-redux'
import { logout } from '../../Store/authSlice'
import { useNavigate } from 'react-router-dom'
import Btn from './Btn'
function LogoutBtn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = ()=>{
        AuthServiceProvider.logout().then(()=>{
            dispatch(logout());
            navigate("/");
        })
    }
    return (
        <div onClick={handleLogout}>
            <Btn name={"logout"} className='py-1 px-2'/>
        </div>
    )
}

export default LogoutBtn
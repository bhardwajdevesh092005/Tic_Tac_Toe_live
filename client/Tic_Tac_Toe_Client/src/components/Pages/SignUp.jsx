import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthServiceProvider } from '../../appwriteAuth'
import { useDispatch } from 'react-redux';
import { login } from '../../Store/authSlice';
import { useNavigate } from 'react-router-dom';
function SignUp() {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const handleLogin = (data) => {
        console.log(data);
        try {
            const session = AuthServiceProvider.signup(data);
            dispatch(login(session));
            navigator("/")
        } catch (error) {
            setError(error.message);
        }
    }
    return (
        <div className='w-full h-full flex text-white justify-center'>
            <div className='w-1/2 h-1/2 shadow-lg  shadow-inherit self-center bg-gradient-to-bl from-yellow-400 to-blue-600 flex flex-col rounded-xl'>
                <img src="/Logo.png" alt="" className='w-1/6 self-center my-4 rounded-xl' />
                <div className='self-center text-2xl'>Login Into Your Account</div>
                <div className='self-center flex flex-col space-y-5 justify-center h-full'>
                    <div className='flex space-x-5'>
                        <label htmlFor='0'>FullName</label>
                        <input type="text" name="" id="0" className='self-center text-white border-2 border-black rounded-lg bg-transparent text-xl' {...register("name")} />
                    </div>
                    <div className='flex space-x-5'>
                        <label htmlFor='1'>Email Id</label><input type="text" name="" id="1" className='self-center text-white border-2 border-black rounded-lg bg-transparent text-xl' {...register("email")} />
                    </div>
                    <div className='flex space-x-5'>
                        <label htmlFor='2'>Password</label><input type="password" name="" id="2" className='self-center text-white border-2 border-black rounded-lg bg-transparent text-xl' {...register("password")} />
                    </div>
                </div>
                <button className='mb-12 text-3xl animate-pulse bg-gradient-to-bl from-yellow-400 to to-blue-400 w-fit self-center rounded-xl p-2' onClick={handleSubmit(handleLogin)}>Submit</button>
                <div className='self-center mb-10'>{error}</div>
            </div>
        </div>
    )
}

export default SignUp
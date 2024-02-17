import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        photo: ""
    });
    const navigate = useNavigate();
    const handleSubmit = () => {
        alert('successfully sumitted ...');
    }

    return (
        <>
            <div className="outer grid grid-cols-12 py-14">
                <div className="container shadow-md shadow-slate-600 col-start-5 col-span-6 w-fit p-5 ">
                    <div className="header flex flex-col mb-5 ">
                        <div className='mx-auto font-bold text-xl'>Sign Up</div>
                        <div className='text-sm text-gray-500 text-center'>Enter your information to create an acocunt</div>
                    </div>
                    <div className="container mx-10">
                        <div className="form flex flex-col gap-y-4 ">

                            <div className='username'>
                                <label className='font-bold' htmlFor="username">username</label>
                                <input className='p-1 h-7 text-sm w-3/5 mx-3 bg-white border border-black focus:outline-slate-700 rounded-md' type="text" name='username' value={data.username} autoComplete='off'
                                    onChange={(e) => {
                                        setData({
                                            ...data,
                                            username: e.target.value
                                        })
                                    }}
                                    placeholder='johny100'
                                />
                            </div>
                            <div className='email'>
                                <label className='font-bold' htmlFor="email">email</label>
                                <input className='p-1 h-7 text-sm w-3/5 mx-11 bg-white border border-black focus:outline-slate-700 rounded-md' type="email" name='email' value={data.email} autoComplete='off'
                                    onChange={(e) => {
                                        setData({
                                            ...data,
                                            email: e.target.value
                                        })
                                    }}
                                    placeholder='johny100@123'
                                />
                            </div>
                            <div className='password'>
                                <label className='font-bold' htmlFor="password">password</label>
                                <input className='p-1 h-7 text-sm w-3/5 mx-4 bg-white border border-black focus:outline-slate-700 rounded-md' type="password" name='password' value={data.password} autoComplete='off'
                                    onChange={(e) => {
                                        setData({
                                            ...data,
                                            password: e.target.value
                                        })
                                    }}
                                    placeholder='••••••••••••••••'

                                />
                            </div>
                            <div className='photo'>
                                <label className='font-bold' htmlFor="photo">photo</label>
                                <input className='p-1 h-7 text-sm w-3/5 mx-10 bg-white border border-black focus:outline-slate-700 rounded-md' type='file' name='photo' value={data.photo} autoComplete='off'
                                    onChange={(e) => {
                                        setData({
                                            ...data,
                                            photo: e.target.value
                                        })
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <div>
                            <button onClick={handleSubmit} className='signup bg-slate-700 text-white rounded-md p-1 w-3/4 mt-4 hover:bg-slate-800 mx-12'>sign up</button>
                        </div>
                        <div>
                            <h1 className='signin mt-2 text-center'>Already have an acocunt ? <button className='underline hover:text-blue-500' onClick={() => {
                                navigate('/Login')
                            }}> Login</button></h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = async () => {
        const response = await fetch('http://localhost:8000/api/user/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            console.log(response);
            toast.error("login failed ...", {
                position: "top-center"
            })
            return;
        }

        setData({
            email: "",
            password: "",
        })

        const userData = await response.json();
        console.log(userData);

        // set the user token in local-storage ....
        const token = userData.token;
        localStorage.setItem('token', token);

        toast.success("login successfull ...", {
            position: "top-center"
        });

        navigate('/');
    }

    const navigate = useNavigate();

    return (
        <>
            <div className="outer grid grid-cols-12 py-14">
                <div className="container shadow-md shadow-slate-600 col-start-5 col-span-6 w-fit p-5 hover:transition-all hover:shadow-lg hover:shadow-slate-700">
                    <div className="header flex flex-col mb-5">
                        <div className='mx-auto font-bold text-xl'>Login</div>
                        <div className='text-sm text-gray-500'>Enter your credential to access your acocunt</div>
                    </div>
                    <div className="form flex flex-col gap-y-4">
                        <div className='email'>
                            <label className='font-bold' htmlFor="email">email</label>
                            <input className='p-1 h-7 text-sm w-3/5 mx-9 bg-white border border-black focus:outline-blue-300 rounded-md' type="text" name='email' value={data.email} autoComplete='off'
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        email: e.target.value
                                    })
                                }}
                                placeholder='johny100'
                            />
                        </div>
                        <div className='password'>
                            <label className='font-bold' htmlFor="password">password</label>
                            <input className='p-1 h-7 text-sm w-3/5 mx-3 bg-white border border-black focus:outline-blue-300 rounded-md' type="password" name='password' value={data.password} autoComplete='off'
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        password: e.target.value
                                    })
                                }}
                                placeholder='••••••••••••••••'

                            />
                        </div>
                    </div>
                    <div className="footer">
                        <div>
                            <button onClick={handleSubmit} className='signup bg-slate-700 text-white rounded-md p-1 w-full mt-4 hover:bg-slate-800'>login</button>
                        </div>
                        <div>
                            <h1 className='signin mt-2 mx-5'>didn't have an acocunt ? <button className='underline hover:text-blue-500' onClick={() => {
                                navigate('/Signup')
                            }}>SignUp</button></h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
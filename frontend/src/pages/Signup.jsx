import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        picture: ""
    });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const postDetails = async (pics) => {
        if (pics == undefined) {
            setLoading(true);
            return;
        }

        const formData = new FormData();
        formData.append('file', pics);
        formData.append('upload_preset', 'chat-com app');
        formData.append('cloud_name', 'dyfvoiwhn');

        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/dyfvoiwhn/image/upload', {
                method: "post",
                body: formData
            })
            const res = await response.json();
            // console.log(res.url.toString());
            setData({
                ...data,
                picture: res.url.toString()
            })

            setLoading(false);
        } catch (e) {
            console.log('error in upload image : ', e);
        }

    }

    const handleSubmit = async () => {
        // alert('successfully sumitted ...');
        try {
            const response = await fetch('http://localhost:8000/api/user/signup', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                console.log(response);
                toast.error("registration failed ...", {
                    position: "top-center"
                })
                return;
            }

            setData({
                username: "",
                email: "",
                password: "",
                picture: ""
            })

            const userData = await response.json();
            // console.log(userData);

            // set the user token in local-storage ....
            const token = userData.token;
            localStorage.setItem('token', token);

            toast.success("registration successfull ...", {
                position: "top-center"
            });

            navigate('/');

        } catch (e) {
            console.log(`error in signup : `);
        }
    }

    return (
        <>
            <div className="outer grid grid-cols-12 py-14">
                <div className="container shadow-md shadow-slate-600 col-start-5 col-span-6 w-fit p-5 hover:transition-all hover:shadow-lg hover:shadow-slate-700">
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
                                <input className='p-1 h-7 text-sm w-3/5 mx-10 bg-white border border-black focus:outline-slate-700 rounded-md' type='file' autoComplete='off'
                                    // onChange={(e) => {
                                    //     setData({
                                    //         ...data,
                                    //         photo: e.target.files[0]
                                    //     })
                                    // }}
                                    onChange={(e) => postDetails(e.target.files[0])}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <div>
                            {
                                data.picture == "" ? <>
                                <button className='signup bg-slate-500 text-white rounded-md p-1 w-3/4 mt-4 mx-12 hover:cursor-not-allowed hover:bg-slate-600' disabled>sign up</button>
                                </> :
                                    <>
                                        <button onClick={handleSubmit} className='signup bg-slate-700 text-white rounded-md p-1 w-3/4 mt-4 hover:bg-slate-800 mx-12 hover:cursor-pointer'>sign up</button>
                                    </>
                            }
                            {/* <button onClick={handleSubmit} className='signup bg-slate-700 text-white rounded-md p-1 w-3/4 mt-4 hover:bg-slate-800 mx-12 hover:cursor-pointer'>sign up</button> */}
                        </div>
                        <div>
                            <h1 className='signin mt-2 text-center'>Already have an acocunt ? <button className='underline hover:text-blue-500' onClick={() => {
                                navigate('/Login')
                            }}> {data.photo}</button></h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup
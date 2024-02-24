import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { chatAtom } from '../store/chatAtom';
import { IoSearch } from "react-icons/io5";

const Navbar = () => {
    const [user, setUser] = useRecoilState(chatAtom);

    useEffect(() => {
        console.log('user : ', user);

    })
    return (
        <>
            <div className="outer p-3">
                <div className="container flex justify-between rounded-md shadow shadow-slate-600 bg-slate-600 text-white">
                    <div className="left border border-white rounded-md flex gap-1 my-1 p-1 mx-1">


                        <div>
                            <IoSearch className='mt-2'/>
                        </div>
                        <div className='mt-0'>
                            <input type="text" className='bg-slate-600 px-2 text-sm p-1 focus:outline-none' placeholder='search user'/>
                        </div>
                        <div>
                            <button className='p-1 bg-green-600 rounded-md ml-1 hover:bg-green-500 px-2'>search</button>
                        </div>


                    </div>
                    <div className="middle">
                        <h1 className='mt-2 font-bold text-lg'>Chat-Com</h1>
                    </div>
                    <div className="right flex gap-5 mr-5">
                        <div><h1 className='mt-3 font-bold '>{user?.username}</h1></div>
                        <div className='mt-1'>
                            <img className='w-10 h-10 rounded-full' src={user?.imgUrl} alt="dp" height={30} width={30} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
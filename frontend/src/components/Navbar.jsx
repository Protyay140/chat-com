import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { chatAtom } from '../store/chatAtom';
import { IoSearch } from "react-icons/io5";
import SideBar from './SideBar';
import { Box, Button, Text, Tooltip } from '@chakra-ui/react';

const Navbar = () => {
    const [user, setUser] = useRecoilState(chatAtom);

    const [search, SetSearch] = useState();
    const [searchResult, SetSearchResult] = useState();
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();

    useEffect(() => {
        console.log('user : ', user);

    })
    return (
        <>
            <div className="outer p-3">
                <div className="container flex justify-between rounded-md shadow shadow-slate-600 bg-slate-600 text-white">
                    <div className="left border border-white rounded-md flex gap-1 my-1 p-1 mx-1">


                        {/* <div>
                            <IoSearch className='mt-2'/>
                        </div>
                        <div className='mt-0'>
                            <input type="text" className='bg-slate-600 px-2 text-sm p-1 focus:outline-none' placeholder='search user'/>
                        </div>
                        <div>
                            <button className='p-1 bg-green-600 rounded-md ml-1 hover:bg-green-500 px-2'>search</button>
                        </div> */}

                        <Tooltip hasArrow label='search user ' className='w-56 mt-2 text-center'>
                            <div className='flex'>
                                <div>
                                    <IoSearch className='mt-2' />
                                </div>
                                <div className='mt-0'>
                                    <input type="text" className='bg-slate-600 px-2 text-sm p-1 focus:outline-none' placeholder='search user' />
                                </div>
                                <div>
                                    <button className='p-1 bg-green-600 rounded-md ml-1 hover:bg-green-500 px-2'>search</button>
                                </div>
                            </div>

                        </Tooltip>

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


            {/* // we will use now the chakra ui animation framework ............. */}


            {/* <Box className='flex justify-between p-3 border border-red-500'>
                <Tooltip hasArrow label='Search User' bg='gray.300' color='black'>
                    <Button>button</Button>
                </Tooltip>

                <Text>
                    <h1>Chat-Com</h1>
                </Text>
            </Box> */}

        </>
    )
}

export default Navbar
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { chatAtom, myChatsAtom, selectedChatAtom } from '../store/chatAtom';
import { IoSearch } from "react-icons/io5";
import SideBar from './SideBar';
import { toast } from 'react-toastify';
import { Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuItem, MenuList, Text, Tooltip } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/hooks';
import { BsSearchHeartFill } from "react-icons/bs";
import { ImSpinner6 } from "react-icons/im";

const Navbar = () => {
    const [user, setUser] = useRecoilState(chatAtom);
    const [selectedChat , setSelectedChat] = useRecoilState(selectedChatAtom);
    const [myAllChats , setMyAllChats] = useRecoilState(myChatsAtom);

    const [search, SetSearch] = useState("");
    const [searchResult, SetSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const navigate = useNavigate();
    useEffect(() => {

    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser({
            isLoggedIn: false
        });
        toast.success("user is successfully logged out ", {
            position: "top-center"
        })
        navigate('/login');
    }

    useEffect(() => {
        const func = async () => {
            const data = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8000/api/user?search=${search}`, {
                method: 'GET',
                headers: {
                    "authorization": `Bearer ${data}`
                }
            });

            const resResult = await response.json();

            // console.log(resResult.users);
            SetSearchResult(resResult.users);
        }

        func();

        // console.log(myAllChats);
    }, [])

    const handleSearch = async () => {
        // if (!search) {
        //     toast.error('enter a valid name to search ', {
        //         position: "top-center"
        //     })
        // }

        try {
            const data = localStorage.getItem('token');
            setLoading(true);
            const response = await fetch(`http://localhost:8000/api/user?search=${search}`, {
                method: 'GET',
                headers: {
                    "authorization": `Bearer ${data}`
                }
            });

            const resResult = await response.json();

            console.log(resResult.users);
            setLoading(false);
            SetSearchResult(resResult.users);

        } catch (e) {
            console.log(`error in fetching the data : ${e}`);
        }
    }

    const accessChat = async(userId) => {
        console.log(`access chat of : ${userId}`);
        try {
            const data = localStorage.getItem('token');
            setLoading(true);
            const response = await fetch(`http://localhost:8000/api/chat/SingleChat`, {
                method: 'POST',
                headers: {
                    'Content-Type' : "application/json",
                    "authorization": `Bearer ${data}`
                },
                body : JSON.stringify({userId})
            });

            const resResult = await response.json();
            setLoading(false);

            console.log(resResult);
            
            if(!myAllChats.find((c)=>c._id == resResult._id)) setMyAllChats([resResult , ...myAllChats]);


            setSelectedChat(resResult);
            onClose();

            // console.log(resResult);
        } catch (e) {
            console.log(`error in accessing the chat ... : ${e}`);
        }
    }

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
                            <div className='flex' onClick={onOpen}>
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

                        {/* <div className='mt-1'>
                            <img className='w-10 h-10 rounded-full' src={user?.imgUrl} alt="dp" height={30} width={30} />
                        </div> */}


                        <Menu>
                            <MenuButton >
                                {/* Your Cats */}
                                <div className='mt-1'>
                                    <img className='w-10 h-10 rounded-full' src={user?.imgUrl} alt="dp" height={30} width={30} />
                                </div>
                            </MenuButton>
                            <MenuList >
                                <MenuItem ><div className=' w-full text-center bg-slate-600 text-white font-bold p-1 hover:bg-slate-700' onClick={handleLogout}>Logout</div></MenuItem>
                            </MenuList>
                        </Menu>

                    </div>
                </div>
            </div>


            <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent className='ml-2 mt-3 bottom-3'>
                    {/* <DrawerHeader>search user</DrawerHeader> */}
                    <DrawerBody>
                        <div className='flex flex-col gap-y-3'>
                            <div className='flex gap-2 mb-4'>
                                <Input variant='outline' placeholder='search'
                                    value={search}
                                    onChange={(e) => {
                                        SetSearch(e.target.value)
                                    }}
                                />

                                <BsSearchHeartFill className='mt-2 text-2xl hover:cursor-pointer text-slate-600 hover:text-slate-800' onClick={handleSearch} />
                            </div>
                            <div className='mt-20'>
                                {loading ? <>
                                    {/* <h1>loading</h1> */}
                                    <ImSpinner6 className='animate-spin text-5xl mx-auto' />
                                </> :
                                    <>
                                        {
                                            searchResult.map((user, key) => {
                                                return (
                                                    // lets create a card ............
                                                    <div key={user._id} className='shadow shadow-slate-400 p-2 my-2 flex justify-between'>
                                                        <div className=''>
                                                            <img className='w-10 h-10 rounded-full' src={user?.picture} alt="dp" height={30} width={30} />
                                                        </div>
                                                        <div className='mt-1 font-bold'>{user.username}</div>
                                                        <div className='mt-1'>
                                                            <button className='bg-green-600 hover:bg-green-700 text-white p-1 rounded-md px-3 font-bold'
                                                                onClick={() => {
                                                                    accessChat(user._id)
                                                                }}>
                                                                chat
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </>}
                            </div>
                        </div>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

        </>
    )
}

export default Navbar
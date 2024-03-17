import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { chatAtom, myChatsAtom, selectedChatAtom } from '../store/chatAtom';
import { ImSpinner6 } from "react-icons/im";
import { IoCreateOutline } from "react-icons/io5";
import GroupChatModel from './GroupChatModel';

const LeftBar = () => {
    const [myAllChats, setMyAllChats] = useRecoilState(myChatsAtom);
    const [selectedChat, setSelectedChat] = useRecoilState(selectedChatAtom);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useRecoilState(chatAtom);

    const fetchChats = async () => {
        try {
            const data = localStorage.getItem('token');
            setLoading(true);
            const response = await fetch(`http://localhost:8000/api/chat/accessChat`, {
                method: 'GET',
                headers: {
                    "authorization": `Bearer ${data}`
                },
            });

            const resResult = await response.json();


            // console.log(resResult.response);
            setLoading(false);
            setMyAllChats(resResult.response);

        } catch (e) {
            console.log(`error in fetching my chat : ${e}`);
        }
    }

    useEffect(() => {
        fetchChats();
        console.log("user is leftBar : ", user);
    }, []);

    return (
        <>
            <div className='shadow shadow-slate-500 rounded-md p-6 mb-1 flex flex-col justify-between w-2/5 hidden md:block'>
                <div className='flex justify-between mb-3'>
                    <div className='flex justify-around gap-28  '>
                        <div className='font-bold text-xl '>Chats</div>
                        <GroupChatModel>
                            <button className='flex gap-1 p-1 '>
                                <div className='mt-2'>
                                    <IoCreateOutline />
                                </div>
                                <div className='text-xl'>create group</div>
                            </button>
                        </GroupChatModel>
                    </div>
                    <div>

                    </div>
                </div>
                <div>
                    {
                        myAllChats ? <>
                            {
                                myAllChats.map((chat, key) => {
                                    return (
                                        <div key={chat._id} className='mb-3 md:ml-14 '>
                                            <button className={`p-1 rounded-sm shadow shadow-slate-500 flex justify-between w-52 px-3 ${selectedChat._id == chat._id ? 'bg-green-600 text-white' : ''}`}
                                                onClick={() => {
                                                    setSelectedChat(chat);
                                                }}
                                            >
                                                <div className=''>


                                                    {chat.users ? <>

                                                        {chat.users[1].username == user.username ? <>
                                                            <img className='w-10 h-10 rounded-full' src={chat.users[0].picture} alt="dp" height={30} width={30} />
                                                        </> : <>
                                                            <img className='w-10 h-10 rounded-full' src={chat.users[1].picture} alt="dp" height={30} width={30} />
                                                        </>}

                                                    </> : <></>}


                                                </div>
                                                <div className='mt-2'>{
                                                    !chat.isGroupChat ?
                                                        <>
                                                            {chat.users ? <>
                                                                {
                                                                    chat.users[1].username == user.username ? <>
                                                                        {chat.users[0].username}
                                                                    </> : <>
                                                                        {chat.users[1].username}
                                                                    </>
                                                                }
                                                            </> : <></>}
                                                        </> :
                                                        <>
                                                            {chat.chatName}
                                                        </>
                                                }
                                                </div>
                                            </button>
                                        </div>
                                    )
                                })
                            }
                        </> :
                            <>
                                <ImSpinner6 className='animate-spin text-5xl mx-auto' />
                            </>
                    }
                </div>
                <div className='mt-28 text-center'>
                    @copyright by <span className='font-bold'> protyay </span>
                </div>
            </div>

        </>
    )
}

export default LeftBar
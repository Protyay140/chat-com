import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { chatAtom, selectedChatAtom } from '../store/chatAtom'
import { IoIosLock } from "react-icons/io";
import { AlertTitle, FormControl, Input } from '@chakra-ui/react';
import { IoSendSharp } from "react-icons/io5";
import { io } from 'socket.io-client'
import ShowGroupMembers from './ShowGroupMembers';


var socket, realTimeChat;
const ENDPOINT = "http://localhost:8000";

const OneToOneChat = () => {

    const [selectedChat, setSelectedChat] = useRecoilState(selectedChatAtom);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useRecoilState(chatAtom);
    const [loading, setLoading] = useState(false);
    const [socketConnected, setSocketConnected] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // const socket = io("http://localhost:5173");


    const fetchMessages = async () => {
        try {
            const token = localStorage.getItem('token');
            const result = await fetch(`http://localhost:8000/api/message/${selectedChat._id}`, {
                method: "GET",
                headers: { "authorization": `Bearer ${token}` }
            })

            const data = await result.json();

            // console.log(data.messages);
            setMessages(data.messages);


            socket.emit('chat-room', selectedChat._id);
        } catch (e) {
            console.log(`error in fetching all the messages of a chat : ${e}`);
        }
    }


    useEffect(() => {
        // socket = io(ENDPOINT);
        // console.log("user in socket : ", user);
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on('connected', () => {
            setSocketConnected(true);
            // console.log("user is connected : ", socket.id);
        })


    }, [user.isLoggedIn]);

    useEffect(() => {
        // console.log("selected chat : ", selectedChat);
        fetchMessages();
        realTimeChat = selectedChat;
        console.log("selected chat fuckkkkkkkk : ", selectedChat?.groupAdmin?.username);
    }, [selectedChat])

    useEffect(() => {
        socket.on("message received", (newMessage) => {
            if (!realTimeChat || selectedChat._id != newMessage.chat._id) {
                //notification message ....
            } else {
                console.log("received message : ", newMessage);
                setMessages([...messages, newMessage]);
            }
            // console.log("real time chat : ",realTimeChat);
            // setMessages([...messages, newMessage]);
        })
    });

    const sendMessage = async () => {

        // alert('message sent');

        try {
            const token = localStorage.getItem('token');
            const result = await fetch('http://localhost:8000/api/message', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    content: message,
                    chatId: selectedChat._id,
                })
            })
            setMessage("");
            const data = await result.json();
            // console.log(data);
            setMessages([...messages, data]);

            socket.emit('NewMessage', data);
        } catch (e) {
            console.log(`error in sending the new message : ${e}`);
        }

    }


    const handleShowMessage = () => {
        console.log("show messages : ", messages[0].chat?.users);
    }

    return (
        <>
            {
                Object.keys(selectedChat).length === 0 ? <>
                    <div className=' align-middle m-20 mt-44'>
                        <div className='text-4xl text-center'>📳 Feel free to chat and enjoy 📳 </div>
                        <div className='ml-64 flex gap-2'>
                            <div className='mt-1'><IoIosLock /></div>
                            <div>end-to-end encrypted</div>
                        </div>
                    </div>
                </> : <>
                    <div className='mx-auto flex gap-3'>
                        <h1 className='font-bold my-2'>
                            {
                                selectedChat.isGroupChat ? <>
                                    {selectedChat.chatName}
                                </> : <>
                                    {
                                        selectedChat.users ? <>
                                            {
                                                selectedChat.users[0].username == user.username ? <>
                                                    {selectedChat.users[1].username}
                                                </> : <>
                                                    {selectedChat.users[0].username}
                                                </>
                                            }
                                        </> :
                                            <></>
                                    }
                                </>
                            }
                        </h1>
                        {
                            selectedChat.isGroupChat ? <>
                                <div className='my-1'>
                                    <ShowGroupMembers

                                    >

                                    </ShowGroupMembers>
                                </div>
                            </> : <>

                            </>
                        }

                    </div>
                    <div className='bg-slate-300 overflow-y-auto max-h-96 h-full flex flex-col p-1' style={{ scrollbarWidth: 'thin', scrollbarColor: 'transparent transparent' }}>
                        {
                            messages &&
                            messages.map((m, i) => {
                                return (
                                    <div key={m._id}>
                                        {
                                            m.sender?.username == user.username ? <>

                                                <div key={m._id} className='w-fit mb-2 text-white  ml-auto flex gap-1'>
                                                    <div className='text-black border h-10 w-10 rounded-full text-center bg-slate-800'>
                                                        {/* <h1 className='mt-2 font-bold text-white'>{m.sender?.username && m.sender.username.charAt(0).toUpperCase()}</h1> */}
                                                        {/* <img src={user?.imgUrl} alt="error" className='rounded-full'/> */}
                                                        <img className='w-10 h-10 rounded-full' src={user?.imgUrl} alt="dp" height={30} width={30} />
                                                    </div>
                                                    <div className='bg-green-700 p-1 rounded-md'>{m.content}</div>
                                                </div>

                                            </> :
                                                <>
                                                    <div key={m._id} className=' w-fit  mb-2 text-white gap-1 flex'>
                                                        <div className='text-black  rounded-full text-center '>
                                                            {/* <h1 className='mt-2 font-bold text-white'>{m.sender?.username && m.sender.username.charAt(0).toUpperCase()}</h1> */}
                                                            {/* <img src={m.sender?.picture} alt="error" className='rounded-full' /> */}
                                                            <img className='w-10 h-10 rounded-full' src={m.sender?.picture} alt="dp" height={30} width={30} />
                                                        </div>

                                                        <div className='bg-sky-500 p-1 rounded-md'>{m.content}</div>
                                                    </div>
                                                </>
                                        }

                                    </div>
                                )
                            })
                        }
                    </div>


                    {
                        ((selectedChat?.chatName == 'admin' && user?.username == 'protyay140') || (selectedChat?.chatName != 'admin')) ?
                            <>
                                <div className='m-1 flex gap-2'>
                                    <div className='w-full'><input type="text" className='p-2 w-full border border-slate-600 rounded-md focus:outline-slate-600' onKeyDown={(e) => {
                                        if (e.key == 'Enter') {
                                            sendMessage();
                                        }
                                    }}
                                        value={message}
                                        onChange={(e) => {
                                            setMessage(e.target.value)
                                        }}
                                        placeholder='Type a message . . . . . . . . . .'
                                    /></div>
                                    <div className='text-3xl mt-1 hover:text-slate-700 hover:cursor-pointer' onClick={sendMessage}><IoSendSharp /></div>
                                </div>
                            </> :
                            <>

                            </>
                    }


                </>
            }
        </>
    )
}

export default OneToOneChat
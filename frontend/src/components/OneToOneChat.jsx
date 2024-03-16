import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { chatAtom, selectedChatAtom } from '../store/chatAtom'
import { IoIosLock } from "react-icons/io";
import { AlertTitle, FormControl, Input } from '@chakra-ui/react';
import { IoSendSharp } from "react-icons/io5";
import { io } from 'socket.io-client'


var socket, realTimeChat;
const ENDPOINT = "http://localhost:8000";

const OneToOneChat = () => {

    const [selectedChat, setSelectedChat] = useRecoilState(selectedChatAtom);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useRecoilState(chatAtom);
    const [loading, setLoading] = useState(false);
    const [socketConnected, setSocketConnected] = useState(false);

    // const socket = io("http://localhost:5173");


    const fetchMessages = async () => {
        try {
            const token = localStorage.getItem('token');
            const result = await fetch(`http://localhost:8000/api/message/${selectedChat._id}`, {
                method: "GET",
                headers: { "authorization": `Bearer ${token}` }
            })

            const data = await result.json();

            console.log(data.messages);
            setMessages(data.messages);


            socket.emit('chat-room', selectedChat._id);
        } catch (e) {
            console.log(`error in fetching all the messages of a chat : ${e}`);
        }
    }


    useEffect(() => {
        // socket = io(ENDPOINT);
        console.log("user in socket : ", user);
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on('connected', () => {
            setSocketConnected(true);
            console.log("user is connected : ", socket.id);
        })
        

    }, [user.isLoggedIn]);

    useEffect(() => {
        // console.log("selected chat : ", selectedChat);
        fetchMessages();
        realTimeChat = selectedChat;
    }, [selectedChat])

    useEffect(() => {
        socket.on('message received', (newMessage) => {
            if (!realTimeChat || selectedChat._id == newMessage.chat._id) {
                //notification message ....
            } else {
                console.log("received message : ",newMessage);
                setMessages([...messages, newMessage]);
            }
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
                    <div className='mx-auto'>
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
                    </div>
                    <div className='bg-slate-300 overflow-y-auto max-h-96 h-full flex flex-col p-1' style={{ scrollbarWidth: 'thin', scrollbarColor: 'transparent transparent' }}>
                        {
                            messages &&
                            messages.map((m, i) => {
                                return (
                                    <div key={m._id}>
                                        {
                                            m.sender?.username == user.username ? <>
                                                <div key={m._id} className=' w-fit bg-green-700 mb-2 text-white p-1 rounded-md ml-auto'>
                                                    {m.content}
                                                </div>
                                            </> :
                                                <>
                                                    <div key={m._id} className=' w-fit bg-sky-500 mb-2 text-white p-1 rounded-md'>
                                                        {m.content}
                                                    </div>
                                                </>
                                        }

                                    </div>
                                )
                            })
                        }
                    </div>
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
                </>
            }
        </>
    )
}

export default OneToOneChat
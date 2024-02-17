import React, { useEffect, useState } from 'react'

const Chat = () => {

    const [chat, setchat] = useState([]);

    const handleChat = async () => {
        const response = await fetch('http://localhost:3000/api/chats');
        const data = await response.json();

        console.log(data.chats);
        setchat(data.chats);
    }

    useEffect(() => {
        handleChat();
    }, []);

    return (
        <>
            {chat.map((c)=>(
                    <div key={c._id}>{c.chatName}</div>
            ))}
        </>
    )
}

export default Chat
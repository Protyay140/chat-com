import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Chat = () => {
    const [chat, setchat] = useState([]);

    const navigate = useNavigate();
    useEffect(()=>{
        const data = localStorage.getItem('token');

        if(!data){
            navigate('/Login');
        }
    },[navigate]);

    const handleLogout = ()=>{
        localStorage.removeItem('token');
    }

    return (
        <>
            <div>
                <h1>hi there</h1>
                <button onClick={handleLogout}>logout</button>
            </div>
        </>
    )
}

export default Chat
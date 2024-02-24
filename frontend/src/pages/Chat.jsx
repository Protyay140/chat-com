import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { chatState } from '../Context/ChatProvider';
import { useRecoilState } from 'recoil';
import { chatAtom } from '../store/chatAtom';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';

const Chat = () => {
    const [user, setUser] = useRecoilState(chatAtom);
    const [chat, setchat] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {
        console.log("user logged in ? : ", user.isLoggedIn);

        const checkToken = async () => {
            const data = localStorage.getItem('token');
            if (!data) {
                navigate('/Login');
            } else {
                const response = await fetch('http://localhost:8000/api/user/me', {
                    method: 'GET',
                    headers: {
                        "authorization": `Bearer ${data}`
                    }
                });
                const userDataInfo = await response.json();
                // console.log("userData : ", userDataInfo.MyAccount);
                const userData = userDataInfo.MyAccount;
                const { username, email, picture } = userData;

                setUser({
                    isLoggedIn : true,
                    username : username,
                    email : email,
                    imgUrl : picture
                })
            }
        };
        checkToken();

        const handleStorageChange = () => {
            checkToken();
        };

        window.addEventListener('storage', handleStorageChange);

    }, [user.isLoggedIn]);
    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser({
            isLoggedIn: false
        });
        toast.success("user is successfully logged out ", {
            position: "top-center"
        })

    }

    return (
        <>
            <div>
                <Navbar />
            </div>
        </>
    )
}

export default Chat
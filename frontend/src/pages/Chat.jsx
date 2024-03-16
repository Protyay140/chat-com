import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { chatState } from '../Context/ChatProvider';
import { useRecoilState } from 'recoil';
import { chatAtom } from '../store/chatAtom';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import LeftBar from '../components/LeftBar';
import RightBar from '../components/RightBar';
import { Box } from '@chakra-ui/react';

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
                const { username, email, picture , _id} = userData;

                setUser({
                    isLoggedIn: true,
                    username: username,
                    email: email,
                    imgUrl: picture,
                    id : _id
                })
            }
        };
        checkToken();

        const handleStorageChange = () => {
            checkToken();
        };

        // window.addEventListener('storage', handleStorageChange);
        // return () => {
        //     window.removeEventListener('storage', handleStorageChange);
        // };
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

            <Box className='flex justify-between px-4 gap-2'>
                <LeftBar />
                <RightBar />
            </Box>

        </>
    )
}

export default Chat
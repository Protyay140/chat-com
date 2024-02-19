import React, { useEffect } from 'react'
import Signup from './Signup'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="outer grid grid-cols-12 py-28">
        <div className="container shadow-md shadow-green-600 col-start-4 col-span-6 w-fit p-5 hover:transition-all hover:shadow-lg hover:shadow-green-700">
          
          <div className="header">
            <h1 className='text-center font-bold'>😘 CHAT-COM 😘</h1>
          </div>
          <div className="content">
            <p className='text-sm first-letter:text-3xl'>Welcome to CHAT-COM ! Simplify your conversations with our intuitive chat application. Connect with friends, share moments, and stay in the loop effortlessly. Sign up now and start chatting instantly. Your conversations, your way!</p>
          </div>
          <div className="logo flex justify-around">
            <div className="left">
              <button className='p-3 px-5 bg-green-500 text-white mt-28 rounded-md hover:transition-colors hover:bg-green-600' onClick={()=>{navigate('/chats')}}>Get Started</button>
            </div>
            <div className="right">
              <img src="pic.svg" alt="error" srcSet="" height={200} width={200}/>
            </div>
          </div>
          <div>
            <h1 className='text-center text-sm mt-5'>@Copyright - designed by <span className='font-bold'>Protyay Ray</span></h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
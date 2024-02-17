import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Signup from './pages/Signup'
import Login from './pages/Login'

function App() {

  return (
    <>
      <BrowserRouter >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/chats' element={<Chat />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

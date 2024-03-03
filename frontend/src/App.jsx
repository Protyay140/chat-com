import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatProvider from './Context/ChatProvider'
import MainApp from './components/MainApp'
import { RecoilRoot } from 'recoil'
import { ChakraProvider } from '@chakra-ui/react'

function App() {

  return (
    <>
      <RecoilRoot >
        <ChakraProvider>
          <MainApp />
        </ChakraProvider>
      </RecoilRoot>
    </>
  )
}

export default App

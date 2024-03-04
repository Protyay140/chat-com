import React from 'react'
import { useRecoilState } from 'recoil'
import { selectedChatAtom } from '../store/chatAtom'
import OneToOneChat from './OneToOneChat';

const RightBar = () => {
  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatAtom);
  return (
    <>
      <div className='shadow shadow-slate-500 w-full flex flex-col rounded-md '>
          <OneToOneChat />
      </div>
    </>
  )
}

export default RightBar
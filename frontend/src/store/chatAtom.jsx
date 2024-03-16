import {atom } from 'recoil'

export const chatAtom = atom({
    key : "chatAtom",
    default : {
        isLoggedIn : false,
        username : "",
        email : "",
        imgUrl : "",
        id:""
    }
})

export const myChatsAtom = atom({
    key : 'myChatsAtom',
    default : [{}]
})

export const selectedChatAtom = atom({
    key : 'selectedChatAtom',
    default : {}
})
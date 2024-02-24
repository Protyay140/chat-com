import {atom } from 'recoil'

export const chatAtom = atom({
    key : "chatAtom",
    default : {
        isLoggedIn : false,
        username : "",
        email : "",
        imgUrl : ""
    }
})
import { Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { chatAtom, myChatsAtom } from '../store/chatAtom';
import { BsSearchHeartFill } from "react-icons/bs";
import { ImSpinner6 } from "react-icons/im";
import axios from 'axios';
const GroupChatModel = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const [user, setUser] = useRecoilState(chatAtom);
    const [mychats,setMychats] = useRecoilState(myChatsAtom);

    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) {
            // setSearchResult("");
            return;
        }

        try {
            setLoading(true);
            const data = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8000/api/user?search=${search}`, {
                method: 'GET',
                headers: {
                    "authorization": `Bearer ${data}`
                }
            });

            const resResult = await response.json();
            setSearchResult(resResult.users);
            setLoading(false);
            console.log("hello : ", resResult.users);

        } catch (error) {
            console.log("erorr in groupchat modal : ", error);
        }
    }

    const createGroup = async() => {
        if(!groupChatName || !selectedUsers){
            return;
        }

        try {
            setLoading(true);
            console.log("group chatname : ",groupChatName);
            console.log("userlist : ",selectedUsers);
            // const data = localStorage.getItem('token');
            // const response = await fetch(`http://localhost:8000/api/chat/GroupChat`, {
            //     method: 'POST',
            //     headers: {
            //         "authorization": `Bearer ${data}`
            //     },
            //     body : JSON.stringify({
            //         name : groupChatName,
            //         users : selectedUsers.map(u=>u._id),
            //     })
            // });


            // const result = await response.json();
            // console.log("create chat : ",result);
            // // setMychats([])
            // setLoading(false);
            // onClose();
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              };
            const { data } = await axios.post(
                `http://localhost:8000/api/chat/GroupChat`,
                {
                  name: groupChatName,
                  users: JSON.stringify(selectedUsers.map((u) => u._id)),
                },
                config
              );
              setMychats([data, ...mychats]);
              setLoading(false);
              onClose();
        } catch (e) {
            console.log('error in creating group : ',e);
        }
    }

    const hadnleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
            return;
        }

        setSelectedUsers([...selectedUsers, userToAdd]);
    }
    // useEffect(()=>{
    //     console.log("searchResult : ",);
    // })

    return (
        <>
            <Button onClick={onOpen}>{children}</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>create group chat</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody className='mx-auto'>

                        {/* <form action="">
                            <div><input type="text" className='border p-2 ' value={groupChatName} onChange={(e) => setGroupChatName(e.target.value)} placeholder='chatname' /></div>
                            <div ><input type="text" className='border p-2 mt-2' placeholder='add user'
                                onChange={(e) => {
                                    handleSearch(e.target.value);
                                }}
                            /></div>
                        </form> */}
                        <FormControl>

                            <Input
                                placeholder='chat name'
                                mb={2}
                                onChange={(e) => setGroupChatName(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <div className='flex gap-1'>
                                <Input
                                    placeholder='add user'
                                    mb={2}
                                    onChange={(e) => handleSearch(e.target.value)} />
                                {/* <div>
                                    <BsSearchHeartFill className='mt-2 text-2xl hover:cursor-pointer text-slate-600 hover:text-slate-800' onClick={handleSearch} />
                                </div> */}
                            </div>
                        </FormControl>

                        <div className='flex gap-1 rounded-md'>
                            {
                                selectedUsers.map(u => {
                                    return (
                                        <div key={u._id}>
                                            <div className='p-1 px-2 bg-green-400 rounded-md '>{u.username}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {
                            loading ? <div>
                                <ImSpinner6 className='animate-spin text-5xl mx-auto' />
                            </div> :
                                <div>
                                    {searchResult?.slice(0, 4).map((u) => {
                                        return (

                                            <div key={u._id} className='mt-2'>
                                                <button className='bg-slate-400 p-2 rounded-md w-full hover:bg-slate-500' onClick={() => hadnleGroup(u)}>{u.username}</button>
                                            </div>

                                        )
                                    })}
                                </div>
                        }
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={createGroup}>
                            create
                        </Button>
                        {/* <Button variant='ghost'>Secondary Action</Button> */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default GroupChatModel
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { selectedChatAtom } from '../store/chatAtom'
import { useRecoilState } from 'recoil'

const ShowGroupMembers = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [selectedChat,setSelectedChat] = useRecoilState(selectedChatAtom);

    useEffect(()=>{
        console.log("show messages : ",selectedChat?.users);
    })

    return (
        <>
            <Button onClick={onOpen}>members</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>group members</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody className='flex flex-col align-middle mx-auto gap-1 w-fit'>
                        {
                            selectedChat?.users?.map((u)=>{
                                return (
                                    <div key={u._id} className='bg-purple-500 p-2 rounded-md text-white'>
                                        
                                        {u.username}
                                    </div>
                                )
                            })
                        }
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        {/* <Button variant='ghost'>Secondary Action</Button> */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ShowGroupMembers
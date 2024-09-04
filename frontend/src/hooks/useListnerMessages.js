import React, { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useGetConversation from '../zustand/useGetConversation'
import notificationSound from '../assets/sounds/notification.mp3'

const useListnerMessages = () => {
 const {socket} = useSocketContext()
 const {messages,setMessages} = useGetConversation()

 useEffect(() => {
   socket?.on("newMessage",(newMessage)=>{
    newMessage.shouldShake = true;
    const sound = new Audio(notificationSound)
    sound.play();
    setMessages([...messages,newMessage])
   })

   return () => socket?.off("newMessage")
 }, [socket,setMessages,messages])
 
}

export default useListnerMessages
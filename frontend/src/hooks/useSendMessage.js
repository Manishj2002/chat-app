import React, { useState } from 'react'
import useGetConversation from '../zustand/useGetConversation'
import {toast} from 'react-hot-toast'
const useSendMessage = () => {
  const [loading, setloading] = useState(false)
  const {selectedConversation,messages,setMessages} = useGetConversation()


  const sendMessage = async (message) =>{
    setloading(true)
    try {
        const res = await fetch(`/api/message/send/${selectedConversation._id}`, {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({message})
        });

        let data = await res.json()
        if (data.error) {
            throw new Error(data.error)
        }

        setMessages([...messages,data])
    } catch (error) {
        toast.error(error.message)
    }finally{
        setloading(false)
    }
  }
  return {sendMessage,loading}
}

export default useSendMessage
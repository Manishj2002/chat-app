import React, { useEffect, useState } from 'react'
import useGetConversation from '../zustand/useGetConversation'
import {toast} from 'react-hot-toast'
const useGetMessage = () => {
  const [loading, setloading] = useState(false)
  const {selectedConversation,messages,setMessages} = useGetConversation()


 useEffect(() => {
    const getMessage = async () =>{
        setloading(true)
        try {
            const res = await fetch(`/api/message/${selectedConversation._id}`);
    
            let data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }
           setMessages(data)
        } catch (error) {
            toast.error(error.message)
        }finally{
            setloading(false)
        }
      }
       if(selectedConversation?._id)  getMessage()
 }, [selectedConversation?._id,setMessages])
 
  return {messages,loading}
}

export default useGetMessage;
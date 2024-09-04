import { useState } from "react"
import { toast } from 'react-hot-toast'
import { useAuthContext } from "../context/AuthContext"


const useLogin = () => {
    const [loading, setLoading] = useState(false)
   const {setAuthUser} = useAuthContext()
    const login = async (username,password) => {
        let success = errorHandler(username,password)
        if (!success) return false;

        setLoading(true)
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({username,password})
            });

            let data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }

          localStorage.setItem('chat-user',JSON.stringify(data))
           setAuthUser(data)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return {loading,login}
}

export default useLogin


function errorHandler(username,password) {
    if ( !username || !password ) {
        toast.error('all field must be fill')
    }

    return true;
}
import { useState } from "react"
import { toast } from 'react-hot-toast'
import { useAuthContext } from "../context/AuthContext"


const useSignup = () => {
    const [loading, setLoading] = useState(false)
   const {setAuthUser} = useAuthContext()
    const signup = async ({ fullname, username, password, confirmPassword, gender }) => {
        let success = errorHandler({ fullname, username, password, confirmPassword, gender })
        if (!success) return false;

        setLoading(true)
        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ fullname, username, password, confirmPassword, gender })
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
    return {loading,signup}
}

export default useSignup


function errorHandler({ fullname, username, password, confirmPassword, gender }) {
    if (!fullname || !username || !password || !confirmPassword || !gender) {
        toast.error('all field must be fill')
    }
    if (password !== confirmPassword) {
        toast.error('password is not matching')
    }
    if (password.length < 6) {
        toast.error('password must contain 6 letter')

    }

    return true;
}
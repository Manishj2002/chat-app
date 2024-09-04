import { IoSearchSharp } from "react-icons/io5";
import useGetConversation from "../../zustand/useGetConversation";
import { useState } from "react";
import useConversation from "../../hooks/useConversation";
import toast from "react-hot-toast";

const SearchInput = () => {
	const [search, setSearch] = useState('')
	const {setSelectedConversation} = useGetConversation()
	const {conversations} = useConversation()

	const handleSubmit = (e)=>{
		e.preventDefault()
		if (!search) return;
		if (search.length <3) {
			return toast.error('search term must be at least 3 characters long')
		}

		const conversation = conversations.find((e)=>e.fullname.toLowerCase().includes(search.toLowerCase()))
		if (conversation) {
			setSelectedConversation(conversation)
			setSearch('')
		}else return toast.error('no user exist')
	}
	return (
		<form className='flex items-center gap-2' onSubmit={handleSubmit}>
			<input type='text' placeholder='Search…' className='input input-bordered rounded-full' value={search} onChange={(e)=>setSearch(e.target.value)}/>

			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
				<IoSearchSharp className='w-6 h-6 outline-none' />
			</button>
		</form>
	);
};
export default SearchInput;
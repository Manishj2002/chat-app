import { useEffect, useRef } from "react";
import useGetMessage from "../../hooks/useGetMessage";
import MessageSkelaton from "../skelatons/MessageSkelaton";
import Message from "./Message";
import useListnerMessages from "../../hooks/useListnerMessages";

const Messages = () => {
	const {messages,loading} = useGetMessage()
	useListnerMessages()
	const lastMessageRef = useRef()

	useEffect(() => {
	  setTimeout(() => {
		lastMessageRef.current?.scrollIntoView({behavior:"smooth"})
	  }, 100);
	}, [messages])
	
	return (
		<div className='px-4 flex-1 overflow-auto'>
			{!loading && messages.length > 0 && messages.map((message)=>(
				<div key={message._id} ref={lastMessageRef}>
					<Message  message={message}/>
				</div>
			))}
            {loading && [...Array(3)].map((_,idx)=> <MessageSkelaton key={idx}/>)}
			{!loading && messages.length === 0 && (
				<p className="text-center">Send a message to start conversation</p>
			)}
		</div>
	);
};
export default Messages;
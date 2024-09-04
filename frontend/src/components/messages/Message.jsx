import { extractTime } from "../../../utils/extract";
import { useAuthContext } from "../../context/AuthContext";
import useGetConversation from "../../zustand/useGetConversation";

const Message = ({message}) => {
   const {authUser} = useAuthContext()
   const {selectedConversation} = useGetConversation()
   const fromMe = message.senderId === authUser._id
   const chatClassName = fromMe? 'chat-end':'chat-start'
   const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic
   const bubbleBg = fromMe ? 'bg-blue-500' : '';
  const formattedTime = extractTime(message.createdAt)
  const shakeClass = message.shouldShake ? "shake" : ""
	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBg} ${shakeClass}  pb-2`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
};
export default Message;
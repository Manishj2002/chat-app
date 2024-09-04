import React, { useEffect } from 'react';
import { TiMessages } from 'react-icons/ti';
import { useAuthContext } from '../../context/AuthContext';
import useGetConversation from '../../zustand/useGetConversation'
import Messages from './Messages'; // Assuming Messages component is imported correctly
import MessageInput from './MessageInput'; // Assuming MessageInput component is imported correctly
import { useGroupContext } from '../../context/GroupContext'; // Import GroupContext for managing group state

const MessageContainer = () => {
  const { authUser } = useAuthContext()
  const { selectedConversation, setSelectedConversation } = useGetConversation();
  const { selectedGroup } = useGroupContext(); // Get selected group from context

  useEffect(() => {
    setSelectedConversation(null); // Reset selected conversation when component mounts
  }, [setSelectedConversation]);
  
  

  return (
    <div className='md:min-w-[450px] flex flex-col'>
      {!selectedConversation ? (
        <NoChatSelected authUser={authUser} />
      ) : (
        <>
          {/* Header */}
          <div className='bg-slate-500 px-4 py-2 mb-2 flex items-center'>
            <span className='label-text text-gray-200'>To:</span>
            <span className='text-gray-900 font-bold ml-2'>{selectedConversation ? selectedConversation.fullname : selectedGroup.name}</span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;


const NoChatSelected = () =>{
 const {authUser}= useAuthContext()
	return (
		<div className="flex items-center justify-center w-full h-full">
			<div className="px-4 text-center sm:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
				<p>welcome 👋 {authUser.fullname}</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center'/>
			</div>
		</div>
	)
}
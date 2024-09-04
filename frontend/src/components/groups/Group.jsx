import React from 'react';
import { useGroupContext } from '../../context/GroupContext';
import { useSocketContext } from '../../context/SocketContext';

const Group = ({ group }) => {
  const { selectedGroup, setSelectedGroup } = useGroupContext();
  const { onlineUsers } = useSocketContext();
  const isSelected = selectedGroup?._id === group._id;
  const isOnline = group.members.some(member => onlineUsers.includes(member._id));

  return (
    <div
      className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${isSelected ? 'bg-sky-500' : ''}`}
      onClick={() => setSelectedGroup(group)}
    >
      <div className={`avatar ${isOnline ? "online" : ""}`}>
        <div className='w-12 rounded-full'>
          <img src={group.profilePic} alt='group avatar' />
        </div>
      </div>

      <div className='flex flex-col flex-1'>
        <div className='flex gap-3 justify-between'>
          <p className='font-bold text-gray-200'>{group.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Group;

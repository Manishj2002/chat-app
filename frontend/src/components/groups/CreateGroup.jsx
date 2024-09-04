import React, { useState } from 'react';
import { useGroupContext } from '../../context/GroupContext';
import { toast } from 'react-hot-toast';

const CreateGroup = () => {
  const [name, setName] = useState('');
  const { setGroups } = useGroupContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, members: [] }),
      });
      const data = await response.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        setGroups((prevGroups) => [...prevGroups, data]);
        setName('');
        toast.success('Group created successfully');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex gap-2 items-center'>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Group name'
        className='input input-bordered'
      />
      <button type='submit' className='btn btn-primary'>Create</button>
    </form>
  );
};

export default CreateGroup;

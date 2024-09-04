import React from 'react';
import { useGroupContext } from '../../context/GroupContext';
import Group from './Group';

const GroupList = () => {
  const { groups } = useGroupContext();

  return (
    <div>
      {groups.map((group, idx) => (
        <Group key={group._id} group={group} lastIdx={idx === groups.length - 1} />
      ))}
    </div>
  );
};

export default GroupList;

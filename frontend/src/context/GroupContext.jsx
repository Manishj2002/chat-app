import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const GroupContext = createContext();

export const useGroupContext = () => {
    return useContext(GroupContext);
};

export const GroupContextProvider = ({ children }) => {
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await fetch('/api/groups');
                const data = await response.json();
                if (data.error) {
                    toast.error(data.error);
                } else {
                    setGroups(data);
                }
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchGroups();
    }, []);

    return (
        <GroupContext.Provider value={{ groups, selectedGroup, setSelectedGroup, setGroups }}>
            {children}
        </GroupContext.Provider>
    );
};

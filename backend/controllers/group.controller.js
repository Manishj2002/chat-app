import Group from '../models/group.model.js';
import Message from '../models/message.model.js'; // Assuming you have a Message model

// Create a new group
export const createGroup = async (req, res) => {
    const { name, members } = req.body;
    try {
        const group = new Group({ name, members });
        await group.save();
        res.status(201).json(group);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all groups for a user
export const getUserGroups = async (req, res) => {
    const { userId } = req.params;
    try {
        const groups = await Group.find({ members: userId }).populate('members', 'username');
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a message to a group
export const addGroupMessage = async (req, res) => {
    const { groupId } = req.params;
    const { message } = req.body;
    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        const newMessage = new Message(message);
        await newMessage.save();

        group.messages.push(newMessage);
        await group.save();

        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

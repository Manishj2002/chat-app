import express from 'express';
import { createGroup, getUserGroups, addGroupMessage } from '../controllers/group.controller.js';

const router = express.Router();

// Create a new group
router.post('/', createGroup);

// Get all groups for a user
router.get('/:userId', getUserGroups);

// Add a message to a group
router.post('/:groupId/messages', addGroupMessage);

export default router;

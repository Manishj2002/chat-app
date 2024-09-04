import { Server } from "socket.io";
import http from 'http';
import express from 'express';
import Group from '../models/group.model.js'; // Import Group model
import Message from '../models/message.model.js'; // Import Message model

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"]
    }
});

export const getReceiveSocketId = (receiveId) => {
    return userSocketMap[receiveId];
};

const userSocketMap = {};

io.on('connection', (socket) => {
    console.log("a user is connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId !== "undefined") userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

   
    socket.on('joinGroup', (groupId) => {
        socket.join(groupId);
        console.log(`User ${socket.id} joined group ${groupId}`);
    });

    // Handle group messaging
    socket.on('groupMessage', async ({ groupId, message }) => {
        try {
            const group = await Group.findById(groupId);
            if (group) {
                const newMessage = new Message(message);
                await newMessage.save();

                group.messages.push(newMessage);
                await group.save();

                io.to(groupId).emit('newGroupMessage', newMessage);
            }
        } catch (error) {
            console.error(error);
        }
    });

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { app, io, server };

import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiveSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js";
export const sendMessage = async (req,res)=>{
    try {
        let {message} = req.body;
        let {id:receiverId} = req.params;
        let senderId = req.user._id


        let conversation = await Conversation.findOne({
            participants:{$all: [senderId,receiverId]}
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants:[senderId,receiverId],

            })
        }

        let newMessage = await Message.create({
            senderId,
            receiverId,
            message,
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }

        // await conversation.save()
        // await newMessage.save()


        await Promise.all([conversation.save(),newMessage.save()])

        const recieveSocketId = getReceiveSocketId(receiverId)

        if (recieveSocketId) {
            io.to(recieveSocketId).emit("newMessage",newMessage)
            
        }

        res.status(201).json(newMessage)

        
    } catch (error) {
        console.log("error in send message controller",error.message)
        res.status(501).json({error:"internal server error"})
    }
}

export const getMessage = async (req,res)=>{
    try {
        let {id:UserToChatId} = req.params;
        let senderId = req.user._id


        const conversation = await Conversation.findOne({
            participants:{$all: [senderId,UserToChatId]}
        }).populate('messages')

        if (!conversation) return res.status(401).json([])

        const messages = conversation.messages
        

        res.status(201).json(messages)

        
    } catch (error) {
        console.log("error in get message controller",error.message)
        res.status(501).json({error:"internal server error"})
    }
}


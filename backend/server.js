import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/messagee.route.js';
import userRoutes from './routes/user.route.js';
import connectToMongoDb from './db/connectToMongoDb.js';
import cookieParser from 'cookie-parser';
import { app, server } from './socket/socket.js';
import path from 'path'
dotenv.config();

const PORT = process.env.PORT || 5000;


const __dirname = path.resolve()

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/users', userRoutes);

app.use(express.static(path.join(__dirname,"/frontend/dist")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})

server.listen(PORT, function () {
    connectToMongoDb();
    console.log(`server listening on port ${PORT}`);
});

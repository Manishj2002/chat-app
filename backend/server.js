import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/messagee.route.js';
import userRoutes from './routes/user.route.js';
import connectToMongoDb from './db/connectToMongoDb.js';
import cookieParser from 'cookie-parser';
import { app, server } from './socket/socket.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('/',(req,res)=>{
//     res.send('hello')
// })

app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/users', userRoutes);

server.listen(PORT, function () {
    connectToMongoDb();
    console.log(`server listening on port ${PORT}`);
});

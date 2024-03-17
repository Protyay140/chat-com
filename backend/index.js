const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const colors = require('colors');
const { chats } = require('./data/data');
const userRouter = require('./routes/userRouter');
const chatRouter = require('./routes/chatRouter');
const messageRouter = require('./routes/messageRouter');
const connectDB = require('./db');
const { createServer } = require('http');
const { Server } = require('socket.io');

app.use(cors());
connectDB();

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
    },
});

app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRouter);

app.get('/', (req, res) => {
    return res.status(200).json({
        msg: "hi there ...",
    })
})

app.get('/api/chats', (req, res) => {
    return res.status(200).json({
        chats
    })
})

const port = 8000;
server.listen(port, () => {
    console.log(`server is running on port ${port}`.yellow.bold);
})

// const io = require('socket.io')(server, {
//     pingTimeout: 60000,
//     cors: {
//         origin: "http://localhost:5173",
//     },
// })

io.on("connection", (socket) => {
    console.log(`successfully connected to socket.io`);
    // console.log("user : ",socket.id);
    // socket.broadcast.emit('welcome',"welcome to our service 4");
    socket.on('setup', (userData) => {
        socket.join(userData.id);
        console.log("fuckkkkkkkkkkkkkk", userData.id);
        console.log("user in socket : ", userData);
        socket.emit('user is connected ...');
    })


    socket.on('chat-room', (room) => {
        socket.join(room);
        console.log('user joined room', room);
    })

    socket.on("NewMessage", (newMessage) => {
        var chat = newMessage.chat;

        if (!chat.users) return console.log(`no users found`);
        console.log("user chat : ", chat);
        console.log("sender : ", newMessage.sender);
        chat.users.forEach((user) => {
            if (user._id == newMessage.sender._id) return;

            socket.in(user._id).emit("message received", newMessage);
        });
    })


    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });
})
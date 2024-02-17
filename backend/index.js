const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const colors = require('colors');
const { chats } = require('./data/data');
const connectDB = require('./db');

connectDB();
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    return res.status(200).json({
        msg : "hi there ...",
    })    
})

app.get('/api/chats',(req,res)=>{
    return res.status(200).json({
        chats
    })    
})

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`.yellow.bold);
})
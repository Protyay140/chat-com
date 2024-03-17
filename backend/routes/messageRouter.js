const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const Message = require('../models/messageModel');
const User = require('../models/userModel');
const Chat = require('../models/chatModel');
const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
        return res.status(400).json({
            msg: "Invalid data passed into the request ..."
        })
    }

    const newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId
    }
    // console.log(req.user.user_id);
    try {
        // var message = await Message.create(newMessage);
        // message = await message.populate('sender','username picture').execPopulate();
        // message = await message.populate('chat').execPopulate();
        // message = await User.populate(message,{
        //     path : 'chat.users',
        //     select : 'username picture email'
        // })


        // await Chat.findByIdAndUpdate(req.body.chatId,{
        //     currentMessage : req.body.message
        // })

        // res.status(200).json({
        //     message
        // })

        var message = await Message.create(newMessage);

        message = await message.populate("sender", "username picture");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: "chat.users",
            select: "username picture email",
        });

        await Chat.findByIdAndUpdate(req.body.chatId, { currentMessage: message });

        res.json(message);

    } catch (e) {
        console.log(`error in creating the one to one message : ${e}`);
    }

})


router.get('/:chatId', authMiddleware, async (req, res) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId }).populate("sender")
            .populate('chat')

        res.status(200).json({
            messages
        })
    } catch (e) {
        console.log(`error in fetching all messages of a particular chat`)
    }
})

module.exports = router;
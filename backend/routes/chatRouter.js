const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const Chat = require('../models/chatModel');
const User = require('../models/userModel');
const router = express.Router();


//api end points for one to one chat .............. 
router.post('/SingleChat', authMiddleware, async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        console.log("plz provide the another person's id for one to one chat ...");
        return res.sendStatus(400);
    }

    var singleChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],
    })
        .populate("users", "-password")
        .populate("currentMessage");

    singleChat = await User.populate(singleChat, {
        path: "currentMessage.sender",
        select: "username picture email",
    });

    if (singleChat.length > 0) {
        res.send(singleChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        };

        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                "users",
                "-password"
            );
            res.status(200).json(FullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
});

router.get('/accessChat', authMiddleware, async (req, res) => {
    try {
        const response = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("currentMessage")
            .sort({
                updated: -1
            })

        return res.status(200).json({
            response
        })
    } catch (e) {
        console.log(`error in fetching chat : ${e}`);
    }
})


// creating group chat .....
router.post('/GroupChat', authMiddleware, async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).json({
            msg: "group name and user list must be needed ..."
        })
    }

    var users = JSON.parse(req.body.users);

    if (users.length < 2) {
        return res.status(400).json({
            msg: "group should consist atleast 3 members",
        })
    }

    users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        })

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(200).json(fullGroupChat);

    } catch (e) {
        console.log(`error in creating the group : ${e}`);
    }
})

router.put('/renameGroup', authMiddleware, async (req, res) => {
    const { chatname, chatId } = req.body;
    if (!chatname && !chatId) {
        return res.status(400).json({
            msg: "chatname and chatId both must be requered ...",
        })
    }

    try {
        const result = await Chat.findOneAndUpdate(
            {
                _id: chatId,
                isGroupChat: true
            },
            {
                chatName: chatname
            },
            {
                new: true
            }
        ).populate("users", "-password").populate("groupAdmin", "-password");

        if (!result) {
            return res.status(400).json({
                msg: "chat not found ..."
            })
        }

        return res.status(200).json({
            result
        })

    } catch (e) {
        console.log(`group rename error : ${e}`);
    }
})

router.put('/addToGroup', authMiddleware, async (req, res) => {
    try {
        const { chatId, userId } = req.body;

        if(!chatId && !userId){
            return res.status(400).json({
                msg : "chat id and user id both must be needed ...",
            })
        }

        const result = await Chat.findOneAndUpdate({
            isGroupChat : true,
            _id : chatId,
        },{
            $push : {
                users : userId 
            }
        },{
            new : true
        }).populate("users","-password").populate("currentMessage")

        if(!result){
            return res.status(400).json({
                msg : " group chat or user is not found ..... "
            })
        }

        return res.status(200).json({
            result
        })

    } catch (e) {
        console.log(`error in adding a member to the group : ${e}`)
    }
})

router.put('/removeFromGroup', authMiddleware, async (req, res) => {
    try {
        const {chatId , userId} = req.body;

        if(!chatId && !userId){
            return res.status(400).json({
                msg : "group chat name and userid is needed ...",
            })
        }

        const result = await Chat.findOneAndUpdate({
            _id : chatId,
            isGroupChat : true,
        },{
            $pull : {
                users : userId
            }
        },{
            new : true,
        }).populate("users","-password").populate("currentMessage");

        if(!result){
            return res.status(400).json({
                msg : "chat not found ..."
            })
        }

        return res.status(200).json({
            result
        })

    } catch (e) {
        console.log('error in removing a member form the group ')
    }
})

module.exports = router;
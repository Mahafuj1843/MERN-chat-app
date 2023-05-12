import mongoose from "mongoose";
import Chat from "../models/Chat.js";
import User from "../models/User.js";
import { createError } from "../utils/error.js";

export const accessChat = async (req, res, next) => {
    const { userId } = req.body

    let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user.id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],
    }).populate("users", "-password").populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "firstname lastname photo email",
    });

    if (isChat.length > 0) {
        res.status(200).send(isChat[0]);
    } else {
        let chatData = {
            chatName: "sender",
            users: [req.user.id, userId],
        };

        try {
            const createdChat = await Chat.create(chatData);
            const chat = await Chat.findOne({ _id: createdChat._id }).populate(
                "users",
                "-password"
            );
            res.status(200).json(chat);
        } catch (error) {
            next(error)
        }
    }
}

export const fetchChat = async (req, res, next) => {
    try {
        let results = Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage.sender")
            .sort({ updatedAt: -1 })
        
     results = await User.populate(results, {
            path: "latestMessage.sender",
            select: "firstname lastname photo",
        });
        res.status(200).send(results)
    } catch (error) {
        next(error)
    }
}

export const createGroupChat = async (req, res, next) => {
    if (!req.body.name || !req.body.members) {
        return next(createError(401, "Please fill the all requried fields."));
    }

    let members = JSON.parse(req.body.members)

    if (members.length < 2) {
        return next(createError(400, "More than 2 member required to create a group chat."))
    }

    members.push(req.user.id)

    try {
        const createGroupChat = await Chat.create({
            chatName: req.body.name,
            users: members,
            isGroupChat: true,
            groupAdmin: req.user.id
        });

        const fullGroupChat = await Chat.findOne({ _id: createGroupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(200).json(fullGroupChat);
    } catch (error) {
        next(error)
    }
}

export const renameGroup = async (req, res, next) =>{
    const { chatId, groupName }= req.body

    const updatedChat = await Chat.findByIdAndUpdate( chatId,
        {
          chatName: groupName,
        },
        {
          new: true,
        }
    ).populate("users", "-password").populate("groupAdmin", "-password")

    if (!updatedChat) {
        return next(createError(404, "Chat Not Found"))
    } else {
        res.status(200).send(updatedChat);
    }
}

export const addToGroup = async (req, res, next) =>{
    let olduser = await Chat.findById(req.body.chatId, { users: 1 })
    let members = JSON.parse(req.body.members)
    members = [ ...olduser.users, ...members ]

    const addMember = await Chat.findByIdAndUpdate( req.body.chatId,
        {
          users: members
        },
        {
          new: true,
        }
    ).populate("users", "-password").populate("groupAdmin", "-password");
    
    if (!addMember) {
        return next(createError(404, "Chat Not Found"))
    } else {
        res.status(200).send(addMember);
    }
}

export const removeFromGroup = async (req, res, next) =>{
    const { chatId, userId } = req.body

	const removeMember = await Chat.findByIdAndUpdate( chatId,
        {
          $pull: { users: userId },
        },
        {
          new: true,
        }
    	).populate("users", "-password").populate("groupAdmin", "-password");
    
    	if (!removeMember) {
        return next(createError(404, "Chat Not Found"))
    	} else {
        res.status(200).send(removeMember);
    	}
}



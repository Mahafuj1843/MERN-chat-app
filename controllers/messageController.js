import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import { createError } from "../utils/error.js";

export const sendMessage = async (req, res, next) =>{
    const { content, chatId } = req.body;

  if (!content || !chatId) {
    return next(createError(400, "Something wents wrong."))
  }

  let newMsg = {
    sender: req.user.id,
    content: content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMsg);

    message = await message.populate("sender", "firstname lastname photo").populate("chat")
    message = await User.populate(message, {
      path: "chat.users",
      select: "firstname lastname photo email",
    });

    await Chat.findByIdAndUpdate(chatId, { latestMessage: message })
    res.status(200).send(message);
  } catch (error) {
    next(error)
  }
}

export const fetchAllMsg = async (req, res, next) =>{
    try {
        const msg = await Message.find({ chat: req.params.chatId })
                    .populate("sender", "firstname lastname photo email").populate("chat")

        res.status(200).send(msg);
    } catch (error) {
        next(error)
    }
}
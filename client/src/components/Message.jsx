import React from 'react'
import ReactScrollableFeed from 'react-scrollable-feed'
import { getUserDetails } from '../helper/sessionHelper'
import { useSelector } from 'react-redux';
import moment from "moment/moment"
import Typing from '../assets/animation/Typing';


const Message = ({ messages, isTyping, typingUser }) => {
    const onlineUsers = useSelector((state) => state.setting.onlineUsers)
    
    const isPlaceDate = (messages, i) => {
        if (i = 0 || moment((messages[i]?.createdAt)).diff(messages[i - 1]?.createdAt, 'days'))
            return true
    }

    const isSenderSingleMsg = (messages, msg, i) => {
        return (
            ((i === 0 && msg.sender._id !== messages[i + 1]?.sender._id)
                ||
                (i === messages.length - 1 && msg.sender._id !== messages[i - 1]?.sender._id) ||
                (msg.sender._id !== messages[i - 1]?.sender._id && msg.sender._id !== messages[i + 1]?.sender._id))
        )
    }

    const isSamesenderUpperMsg = (messages, msg, i) => {
        return (
            ((i === 0 && msg.sender._id === messages[i + 1]?.sender._id)
                ||
                (msg.sender._id !== messages[i - 1]?.sender._id && msg.sender._id === messages[i + 1]?.sender._id))
        )
    }

    const isSamesenderLowerMsg = (messages, msg, i) => {
        return (
            ((i === messages.length - 1 && msg.sender._id === messages[i - 1]?.sender._id)
                ||
                (msg.sender._id === messages[i - 1]?.sender._id && msg.sender._id !== messages[i + 1]?.sender._id))
        )
    }

    const isMyMsg = (msg) => {
        return msg.sender._id === getUserDetails()._id
    }

    return (
        <ReactScrollableFeed className='py-4 ps-3 pe-5 md:ps-5 md:pe-7 xl:pe-12 mt-auto'>

            {
                messages?.map((msg, i) => {
                    return (
                        <div>
                            {
                                isPlaceDate(messages, i) &&
                                <div className="flex justify-center my-2">
                                    <span className="px-2 py-1 bg-gray-300 font-medium text-gray-600 rounded-md text-sm">{moment(messages[i]?.createdAt).format('MMMM Do YYYY')}</span>
                                </div>
                            }
                            <div key={i} className={`mt-0.5 max-full flex`}>
                                {
                                    isMyMsg(msg) ?
                                        (
                                            <div className="flex w-full space-x-3 max-w-sm ml-auto justify-end">
                                                {
                                                    isSenderSingleMsg(messages, msg, i) || 
                                                        (isPlaceDate(messages, i) && isPlaceDate(messages, i + 1)) ||
                                                          (isPlaceDate(messages, i) && msg.sender._id!==messages[i+1].sender._id) ?
                                                        (
                                                            <div className="bg-[#0C7075] text-white p-2 mt-1 ml-24 md:ml-0 rounded-l-[20px] rounded-r-[20px]">
                                                                <p className="text-sm font-normal px-1 md:px-3">{msg.content}</p>
                                                            </div>
                                                        ) : isSamesenderUpperMsg(messages, msg, i) ?
                                                            (
                                                                <div className="bg-[#0C7075] mt-1 text-white p-2 ml-24 md:ml-0 rounded-tr-[20px] rounded-br-md rounded-l-[20px]">
                                                                    <p className="text-sm font-normal px-1 md:px-3">{msg.content}</p>
                                                                </div>
                                                            ) : isSamesenderLowerMsg(messages, msg, i) ?
                                                                (
                                                                    <div className="bg-[#0C7075] text-white p-2 ml-24 md:ml-0 rounded-l-[20px] rounded-br-[20px] rounded-tr-md">
                                                                        <p className="text-sm font-normal px-1 md:px-3">{msg.content}</p>
                                                                    </div>
                                                                ) : (
                                                                    <div className="bg-[#0C7075] text-white p-2 ml-24 md:ml-0 rounded-l-[20px] rounded-r-md">
                                                                        <p className="text-sm font-normal px-1 md:px-3">{msg.content}</p>
                                                                    </div>
                                                                )
                                                }
                                            </div>
                                        ) : isSenderSingleMsg(messages, msg, i) || 
                                                (isPlaceDate(messages, i) && isPlaceDate(messages, i + 1)) ||
                                                    (isPlaceDate(messages, i) && msg.sender._id!==messages[i+1].sender._id)?
                                            (
                                                <div className='flex max-w-sm space-x-3 mt-3 mr-24 md:mr-12'>
                                                    <div className="flex-shrink-0 h-8 w-8 rounded-full mt-auto relative">
                                                        <img className="object-cover w-8 h-8 rounded-full" src={msg.sender.photo} alt="Sender pic" />
                                                        {
                                                            onlineUsers.find((u) => u.userId === msg.sender._id)
                                                            &&
                                                            <span className="h-2 w-2 rounded-full bg-emerald-500 absolute right-0.5 ring-2 ring-gray-300 bottom-0"></span>
                                                        }
                                                    </div>
                                                    <div>
                                                        {
                                                            msg.chat.isGroupChat &&
                                                            <span className="pl-2 text-sm text-gray-700">{msg.sender.firstname}</span>
                                                        }
                                                        <div className="bg-gray-300 p-2 rounded-r-[20px] rounded-l-[20px]">
                                                            <p className="text-sm px-3">{msg.content}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : isSamesenderUpperMsg(messages, msg, i) ?
                                                (
                                                    <div className="flex w-full ml-[44px] space-x-3 max-w-[339px] mt-3 mr-24 md:mr-12">
                                                        <div>
                                                            {
                                                                msg.chat.isGroupChat &&
                                                                <span className="pl-2 text-sm text-gray-700">{msg.sender.firstname}</span>
                                                            }
                                                            <div className="bg-gray-300 p-2 rounded-tl-[20px] rounded-bl-md rounded-r-[20px]">
                                                                <p className="text-sm px-3">{msg.content}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : isSamesenderLowerMsg(messages, msg, i) ?
                                                    (
                                                        <div className="mt-px max-w-sm mr-24 md:mr-12">
                                                            <div className='flex w-full space-x-3'>
                                                                <div className="flex-shrink-0 h-8 w-8 mt-auto rounded-full relative">
                                                                    <img className="object-cover w-8 h-8 rounded-full" src={msg.sender.photo} alt="Sender pic" />
                                                                    {
                                                                        onlineUsers.find((u) => u.userId === msg.sender._id)
                                                                        &&
                                                                        <span className="h-2 w-2 rounded-full bg-emerald-500 absolute right-0.5 ring-2 ring-gray-300 bottom-0"></span>
                                                                    }
                                                                </div>
                                                                <div className="bg-gray-300 p-2 rounded-r-[20px] rounded-bl-[20px] rounded-tl-md">
                                                                    <p className="text-sm px-3">{msg.content}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="flex w-full mt-px ml-[44px] space-x-3 max-w-[339px] mr-24 md:mr-12">
                                                            <div>
                                                                <div className="bg-gray-300 p-2 rounded-r-[20px] rounded-l-md">
                                                                    <p className="text-sm px-3">{msg.content}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )

                                }
                            </div>
                        </div>
                    )
                })
            }
            {
                isTyping ?
                    <div className='flex w-full space-x-3 mt-4'>
                        <div className="flex-shrink-0 h-8 w-8 mr-1 rounded-full mt-auto relative">
                            <img className="object-cover w-8 h-8 rounded-full" src={typingUser.photo} alt="User pic" />
                            <span className="h-2 w-2 rounded-full bg-emerald-500 absolute right-0.5 ring-1 ring-gray-300 bottom-0"></span>
                        </div>
                        <div>
                        <Typing />
                        </div>
                    </div>
                    : <></>
            }
        </ReactScrollableFeed >
    )
}

export default Message
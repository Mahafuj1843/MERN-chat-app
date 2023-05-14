import React from 'react'
import ReactScrollableFeed from 'react-scrollable-feed'
import { getUserDetails } from '../helper/sessionHelper'
import Lottie from "react-lottie";
import animationData from "../assets/animation/typing.json";
import { useSelector } from 'react-redux';
import moment from "moment/moment"

const Message = ({ messages, isTyping, typingUser }) => {
    const onlineUsers = useSelector((state) => state.setting.onlineUsers)
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

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
                                <div class="flex justify-center my-2">
                                    <span class="px-2 py-1 bg-gray-300 font-medium text-gray-600 rounded-md text-sm">{moment(messages[i]?.createdAt).format('MMMM Do YYYY')}</span>
                                </div>
                            }
                            <div key={i} class={`mt-0.5 max-full flex`}>
                                {
                                    isMyMsg(msg) ?
                                        (
                                            <div class="flex w-full space-x-3 max-w-sm ml-auto justify-end">
                                                {
                                                    isSenderSingleMsg(messages, msg, i) ?
                                                        (
                                                            <div class="bg-[#0C7075] text-white p-2 mt-1 rounded-l-[20px] rounded-r-[20px]">
                                                                <p class="text-sm font-normal px-1 md:px-3">{msg.content}</p>
                                                            </div>
                                                        ) : isSamesenderUpperMsg(messages, msg, i) ?
                                                            (
                                                                <div class="bg-[#0C7075] mt-1 text-white p-2 rounded-tr-[20px] rounded-br-md rounded-l-[20px]">
                                                                    <p class="text-sm font-normal px-1 md:px-3">{msg.content}</p>
                                                                </div>
                                                            ) : isSamesenderLowerMsg(messages, msg, i) ?
                                                                (
                                                                    <div class="bg-[#0C7075] text-white p-2 rounded-l-[20px] rounded-br-[20px] rounded-tr-md">
                                                                        <p class="text-sm font-normal px-1 md:px-3">{msg.content}</p>
                                                                    </div>
                                                                ) : (
                                                                    <div class="bg-[#0C7075] text-white p-2 rounded-l-[20px] rounded-r-[20px]">
                                                                        <p class="text-sm font-normal px-1 md:px-3">{msg.content}</p>
                                                                    </div>
                                                                )
                                                }
                                            </div>
                                        ) : isSenderSingleMsg(messages, msg, i) ?
                                            (
                                                <div className='flex w-full space-x-3 mt-1'>
                                                    <div class="flex-shrink-0 h-8 w-8 rounded-full mt-auto relative">
                                                        <img class="object-cover w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100" alt="" />
                                                        {
                                                            onlineUsers.find((u) => u.userId === msg.sender._id)
                                                            &&
                                                            <span class="h-2 w-2 rounded-full bg-emerald-500 absolute right-0.5 ring-2 ring-white bottom-0"></span>
                                                        }
                                                    </div>
                                                    <div>
                                                        {
                                                            msg.chat.isGroupChat &&
                                                            <span class="pl-2 text-sm text-gray-700">{msg.sender.firstname}</span>
                                                        }
                                                        <div class="bg-gray-300 p-2 rounded-r-[20px] rounded-l-[20px]">
                                                            <p class="text-sm px-3">{msg.content}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : isSamesenderUpperMsg(messages, msg, i) ?
                                                (
                                                    <div class="flex w-full ml-[44px] space-x-3 max-w-[339px] mt-1">
                                                        <div>
                                                            {
                                                                msg.chat.isGroupChat &&
                                                                <span class="pl-2 text-sm text-gray-700">{msg.sender.firstname}</span>
                                                            }
                                                            <div class="bg-gray-300 p-2 rounded-tl-[20px] rounded-bl-md rounded-r-[20px]">
                                                                <p class="text-sm px-3">{msg.content}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : isSamesenderLowerMsg(messages, msg, i) ?
                                                    (
                                                        <div class="mt-px max-w-sm mr-12">
                                                            <div className='flex w-full space-x-3'>
                                                                <div class="flex-shrink-0 h-8 w-8 mt-auto rounded-full relative">
                                                                    <img class="object-cover w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100" alt="" />
                                                                    {
                                                                        onlineUsers.find((u) => u.userId === msg.sender._id)
                                                                        &&
                                                                        <span class="h-2 w-2 rounded-full bg-emerald-500 absolute right-0.5 ring-2 ring-white bottom-0"></span>
                                                                    }
                                                                </div>
                                                                <div>
                                                                    <div class="bg-gray-300 p-2 rounded-r-[20px] rounded-bl-[20px] rounded-tl-md">
                                                                        <p class="text-sm px-3">{msg.content}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div class="flex w-full mt-px ml-[44px] space-x-3 max-w-[339px]">
                                                            <div>
                                                                <div class="bg-gray-300 p-2 rounded-r-[20px] rounded-l-md">
                                                                    <p class="text-sm px-3">{msg.content}</p>
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
                        <div class="flex-shrink-0 h-8 w-8 rounded-full mt-auto relative">
                            <img class="object-cover w-8 h-8 rounded-full" src={typingUser.photo} /*src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100"*/ alt="" />
                            <span class="h-2 w-2 rounded-full bg-emerald-500 absolute right-0.5 ring-1 ring-white bottom-0"></span>
                        </div>
                        <div>
                            <Lottie
                                options={defaultOptions}
                                width={70}
                                height={30}
                                className='mt-0.5'
                                style={{ marginLeft: 0 }}
                            />
                        </div>
                    </div>
                    : <></>
            }
        </ReactScrollableFeed >
    )
}

export default Message
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { ErrorToast, IsEmpty } from '../helper/formHelper'
import BG from '../assets/images/bg-chat.png'
import Message from './Message'
import { useSelector } from 'react-redux'
import { getUserDetails } from '../helper/sessionHelper'
import MessageFetchingLoader from './loading/MessageFetchingLoader'
import { fetchAllMessagesRequest, sentMessageRequest } from '../apiRequest/messageRequest'
import io from "socket.io-client";
import store from '../redux/store/store'
import { setSelectUser, setSingleMessage } from '../redux/state/chatSlice'
import { myChatRequest } from '../apiRequest/chatRequset'
import { setNotification, setOnlineUsers } from '../redux/state/settingSlice'
import { getOnline, getSender } from '../helper/logic'


const ENDPOINT = "http://localhost:8100"
export var socket, selectedChatCompare

const ChatBox = ({ dispatch }) => {
    const renderRun = useRef(false)
    const [loading, setLoading] = useState(false)
    const [socketConnected, setSocketConnected] = useState(false)
    const [typing, setTyping] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    let [typingUser, setTypingUser] = useState()
    let [message, setMessage] = useState('')
    const selectUser = useSelector((state) => state.chat.selectUser)
    const allMessage = useSelector((state) => state.chat.allMessages)
    const notifications = useSelector((state) => state.setting.notifications)
    const onlineUsers = useSelector((state) => state.setting.onlineUsers)

    const onTyping = (e) => {
        setMessage(e.target.value)

        if (!socketConnected) return;

        if (!typing) {
            setTyping(true);
            socket.emit("typing", selectUser._id, getUserDetails());
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", selectUser._id);
                setTyping(false);
            }
        }, timerLength)
    }

    const onSentMessage = async () => {
        socket.emit('stop typing', selectUser._id)
        if (IsEmpty(message)) {
            ErrorToast('Please write a message.')
        } else {
            await sentMessageRequest(message, selectUser._id)
            setMessage('')
        }
    }
    const onSent = async (e) => {
        if (e.key === 'Enter') {
            await onSentMessage()
        }
    }

    const fetchAllMessage = async () => {
        if (!selectUser) return
        else {
            setLoading(true)
            await fetchAllMessagesRequest(selectUser._id)
            setLoading(false)
            socket.emit('join chat', selectUser._id)
        }
    }

    useEffect(() => {
        socket = io(ENDPOINT)
        socket.emit("setup", getUserDetails())
        socket.on("getUsers", (users) => {
            store.dispatch(setOnlineUsers(users))
        })
        socket.on("connected", () => setSocketConnected(true))
        socket.on('typing', (user) => {
            setIsTyping(true)
            setTypingUser(user)
        })
        socket.on('stop typing', () => setIsTyping(false))
    }, [])

    useEffect(() => {
        fetchAllMessage()
        selectedChatCompare = selectUser
    }, [selectUser])

    useEffect(() => {
        if (renderRun.current === false) {
            socket.on("msg recieved", (newMsgRecieved) => {
                if (!selectedChatCompare || selectedChatCompare._id !== newMsgRecieved.chat._id) {
                    if (!notifications.includes(newMsgRecieved)) {
                        store.dispatch(setNotification(newMsgRecieved))
                        myChatRequest()
                    }
                } else {
                    store.dispatch(setSingleMessage(newMsgRecieved))
                }
            })
            return () => { renderRun.current = true }
        }
    }, [])

    return (
        <Fragment>
            {
                selectUser &&
                <div class="flex flex-col bg-white overflow-hidden w-full md:w-2/3 flex-grow"
                    style={{ backgroundImage: BG }}>
                    <div class="flex justify-between bg-white px-2 lg:px-4 py-2 border-b-2">
                        <div class="flex flex-none space-x-3 items-center">
                            <svg onClick={() => store.dispatch(setSelectUser(null))} className='p-1 rounded-full lg:hidden block' xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" id="back-arrow">
                                <path fill="none" d="M0 0h24v24H0V0z"></path>
                                <path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"></path>
                            </svg>
                            <div class="relative m-0">
                                <img class={`${selectUser.isGroupChat && 'bg-gray-300'} object-cover w-12 h-12 rounded-full`}
                                    src={`${selectUser.isGroupChat ?
                                        "https://cdn4.iconfinder.com/data/icons/internet-and-social-networking/32/i22_internet-512.png"
                                        :
                                        "https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                                        }`} 
                                alt="Chat image" />
                                {/* <img class="object-cover w-12 h-12 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" alt="" /> */}
                                {
                                    getOnline(selectUser, onlineUsers, getUserDetails()) &&
                                    <span class="h-3 w-3 rounded-full bg-emerald-500 absolute right-0.5 ring-2 ring-white -bottom-0.5"></span>
                                }
                            </div>
                            <div class="flex flex-col">
                                <span class="font-bold text-black">
                                    {selectUser.isGroupChat ?
                                        selectUser.chatName : getSender(selectUser?.users, getUserDetails()).firstname + ' ' + getSender(selectUser?.users, getUserDetails()).lastname //getSender(selectUser.users, getUserDetails())//
                                    }
                                </span>
                                <span class={`${selectUser.isGroupChat && 'hidden'} text-sm text-[#777e83]`}>
                                    {
                                        getOnline(selectUser, onlineUsers, getUserDetails()) ?
                                            'Active Now'
                                            :
                                            'last seen 19/05/2022 at 03:56 pm'
                                    }
                                </span>
                            </div>
                        </div>
                        <div class="flex flex-none items-center space-x-4 md:space-x-6 lg:space-x-8">
                            <svg viewBox="0 0 24 24" width="24" height="24" class="">
                                <path fill="text-gary-700"
                                    d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z">
                                </path>
                            </svg>
                            <svg onClick={() => dispatch({ type: 'SHOWGI' })} viewBox="0 0 24 24" width="24" height="24">
                                <path fill="text-gary-700"
                                    d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z">
                                </path>
                            </svg>
                        </div>
                    </div>
                    {
                        loading ?
                            <MessageFetchingLoader />
                            :
                            <div class="flex flex-col w-full max-h-auto relative bg-black-rgba scroller overflow-x-hidden overflow-y-auto flex-grow">
                                <Message messages={allMessage} isTyping={isTyping} typingUser={typingUser} />

                            </div>
                    }
                    <div class="flex space-x-2 items-center bg-white px-3 lg:px-6 py-2 border">
                        <div class="flex space-x-2 lg:space-x-4 cursor-pointer">
                            <svg viewBox="0 0 24 24" width="24" height="24" class="ekdr8vow dhq51u3o">
                                <path fill="text-gary-700"
                                    d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z">
                                </path>
                            </svg>
                            <svg viewBox="0 0 24 24" width="24" height="24" class="">
                                <path fill="text-gary-700"
                                    d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z">
                                </path>
                            </svg>
                            <svg viewBox="0 0 24 24" width="24" height="24" class="cursor-pointer">
                                <path fill="text-gary-700"
                                    d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2z">
                                </path>
                            </svg>
                        </div>
                        <div class="flex flex-grow items-center space-x-3 lg:space-x-4 ">
                            <input onChange={onTyping} onKeyDown={onSent} value={message} type="text"
                                class="focus:outline-none bg-gray-200 w-full text-gray-500 p-3 rounded-lg text-sm"
                                placeholder="Type a message" />
                            <svg onClick={onSentMessage} className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 64 64" style={{ isolation: "isolate" }} id="send"><defs><clipPath id="a"><rect width="64" height="64"></rect></clipPath></defs><g clip-path="url(#a)">
                                <path fill="text-gary-700"
                                    d=" M 8.216 36.338 L 26.885 32.604 C 28.552 32.271 28.552 31.729 26.885 31.396 L 8.216 27.662 C 7.104 27.44 6.021 26.356 5.799 25.245 L 2.065 6.576 C 1.731 4.908 2.714 4.133 4.259 4.846 L 61.228 31.139 C 62.257 31.614 62.257 32.386 61.228 32.861 L 4.259 59.154 C 2.714 59.867 1.731 59.092 2.065 57.424 L 5.799 38.755 C 6.021 37.644 7.104 36.56 8.216 36.338 Z "></path></g>
                            </svg>
                        </div>
                    </div>
                </div>
            }
        </Fragment>
    )
}

export default ChatBox

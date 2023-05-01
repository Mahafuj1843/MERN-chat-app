import React, { Fragment } from 'react'
import MyChat from '../components/MyChat'
import ChatBox from '../components/ChatBox'
import Header from '../components/Header'

const ChatPage = () => {
    return (
        <Fragment>
            <Header />
            <div class="bg-[#111b21] flex items-center justify-center h-screen overflow-y-hidden py-2" style={{height: "90vh"}}>
                <div class="flex h-full w-full overflow-y-hidden">
                    <MyChat />
                    <ChatBox />
                </div>
            </div>
        </Fragment>
    )
}

export default ChatPage

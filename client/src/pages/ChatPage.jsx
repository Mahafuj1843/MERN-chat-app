import React, { Fragment, useEffect, useReducer } from 'react'
import MyChat from '../components/MyChat'
import ChatBox from '../components/ChatBox'
import Header from '../components/Header'
import { myChatRequest } from '../apiRequest/chatRequset'
import { useSelector } from 'react-redux'
import ChatUserSearch from '../components/drawer/ChatUserSearch'
import GrpUserSearch from '../components/drawer/GrpUserSearch'
import GroupInfo from '../components/drawer/GroupInfo'

const drawer = (state, action) =>{
    switch(action.type){
      case 'SHOW':
        return {show: true};
      case 'HIDE':
        return {show: false};
      case 'SHOWGUS':
        return {showGUS: true};
      case 'HIDEGUS':
        return {showGUS: false};
      case 'SHOWGI':
        return {showGI: true};
      case 'HIDEGI':
        return {showGI: false};
      default:
        return state;
    }
  }

const ChatPage = () => {
    const [state, dispatch] = useReducer(drawer, { show: false, showGUS: false , showGI: false})
    const myChats = useSelector((state)=>state.chat.myChats)
    const newMsg = useSelector((state) => state.chat.newMessage)
    const allMessages = useSelector((state)=>state.chat.allMessages)

    useEffect(()=>{
      myChatRequest()
    }, [newMsg, allMessages])

    return (
        <Fragment className='relative'>
            <ChatUserSearch state={state} dispatch={dispatch}/>
            <GrpUserSearch state={state} dispatch={dispatch}/>
            <GroupInfo state={state} dispatch={dispatch}/>
            <Header />
            <div class="bg-white flex items-center justify-center h-screen overflow-y-hidden" style={{height: "90vh"}}>
                <div class="flex h-full w-full overflow-y-hidden">
                    <MyChat myChats={myChats} dispatch={dispatch}/>
                    <ChatBox dispatch={dispatch} />
                </div>
            </div>
        </Fragment>
    )
}

export default ChatPage

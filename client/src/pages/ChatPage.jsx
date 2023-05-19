import React, { Fragment, useEffect, useReducer } from 'react'
import MyChat from '../components/MyChat'
import ChatBox  from '../components/ChatBox'
import Header from '../components/Header'
import { myChatRequest } from '../apiRequest/chatRequset'
import { useSelector } from 'react-redux'
import ChatUserSearch from '../components/drawer/ChatUserSearch'
import GrpUserSearch from '../components/drawer/GrpUserSearch'
import GroupInfo from '../components/drawer/GroupInfo'

const drawer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return { show: true };
    case 'HIDE':
      return { show: false };
    case 'SHOWGUS':
      return { showGUS: true };
    case 'HIDEGUS':
      return { showGUS: false };
    case 'SHOWGI':
      return { showGI: true };
    case 'HIDEGI':
      return { showGI: false };
    default:
      return state;
  }
}

const ChatPage = () => {
  const [state, dispatch] = useReducer(drawer, { show: false, showGUS: false, showGI: false })
  const myChats = useSelector((state) => state.chat.myChats)
  const newMsg = useSelector((state) => state.chat.newMessage)
  const allMessages = useSelector((state) => state.chat.allMessages)
  const selectUser = useSelector((state) => state.chat.selectUser)

  useEffect(() => {
    myChatRequest()
  }, [newMsg, allMessages])

  return (
    <Fragment className='relative h-screen'>
      <ChatUserSearch state={state} dispatch={dispatch} />
      <GrpUserSearch state={state} dispatch={dispatch} />
      <GroupInfo state={state} dispatch={dispatch} />
      <Header />
      <div className="w-full h-[89.5vh] overflow-hidden">
        <div className="flex justify-start items-center bg-white w-full h-full">
          <div className={`${selectUser ? 'hidden lg:block' : 'block'} bg-white w-full lg:w-1/3 h-full`}>
            <MyChat myChats={myChats} dispatch={dispatch}/>
          </div>
          <div className={`${selectUser ? 'block' : 'hidden lg:block'} bg-white w-full lg:w-2/3 h-full`}>
            <ChatBox dispatch={dispatch} />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default ChatPage

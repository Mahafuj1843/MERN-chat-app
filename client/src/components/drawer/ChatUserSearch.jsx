import React, { Fragment, useEffect, useRef, useState } from 'react'
import UserSearchLoadings from '../loading/UserSearchLoadings'
import { ErrorToast, IsEmpty } from '../../helper/formHelper'
import { searchUserRequest } from '../../apiRequest/authRequest'
import { useSelector } from 'react-redux'
import store from '../../redux/store/store'
import { setsearchUsers } from '../../redux/state/chatSlice'
import { accessChatRequest } from '../../apiRequest/chatRequset'

const ChatUserSearch = ({ state, dispatch }) => {
  const [loading, setLoading] = useState(false)
  const { show } = state
  let search = useRef()
  const searchUsers = useSelector((state) => state.chat.searchUsers)
  const onlineUsers = useSelector((state) => state.setting.onlineUsers)

  useEffect(() => {
    if (!show) {
      search.value = ''
    }
    store.dispatch(setsearchUsers([]))
  }, [show])

  const onHandleSearch = async () => {
    if (IsEmpty(search.value)) {
      ErrorToast("Search field empty.")
    } else {
      setLoading(true)
      await searchUserRequest(search.value)
      setLoading(false)
    }
  }

  const accessChat = async (userId) => {
    if (await accessChatRequest(userId))
      dispatch({ type: 'HIDE' })
  }
  
  return (
    <Fragment >
      <aside className="fixed h-full w-full z-50 left-0 top-0 transition duration-300 ease-in-out" style={{ display: show ? 'block' : 'none' }}>
        <div onClick={() => dispatch({ type: 'HIDE' })} className="fixed h-full w-full left-0 top-0 bg-black bg-opacity-50 z-[-1]"></div>
        <div className="fixed h-full w-3/4 md:w-2/6 xl:w-1/5 left-0 top-0 bg-white  shadow-lg pt-8 p-x2 transition duration-700 ease-in-out" style={{ left: show ? '0%' : '100%' }}>
          <h2 className="px-5 text-lg font-medium text-gray-800 ">Search Users</h2 >
          <div className="flex gap-2 my-4 px-5">
            <input ref={(i) => search = i} type="search" id="search" className="bg-gray-50 border border-[#0C7075] text-gray-900 text-sm rounded-lg focus:ring-[#0C7075] focus:border-[#15848a] block w-full p-2.5 " au placeholder="e.g. Jhon" required />
            <button onClick={onHandleSearch} className='py-2 px-3 rounded-md bg-[#0C7075] hover:bg-[#0e484b]'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" id="search">
                <path fill="white" d="M3.624,15a8.03,8.03,0,0,0,10.619.659l5.318,5.318a1,1,0,0,0,1.414-1.414l-5.318-5.318A8.04,8.04,0,0,0,3.624,3.624,8.042,8.042,0,0,0,3.624,15Zm1.414-9.96a6.043,6.043,0,1,1-1.77,4.274A6,6,0,0,1,5.038,5.038Z"></path>
              </svg>
            </button>
          </div> 
          {loading ?
            <UserSearchLoadings />
            :
            <div className="mt-6 space-y-1 h-4/5 overflow-y-auto border-t">
              {
                searchUsers?.map((user, i) => {
                  return (
                    <button key={i} onClick={accessChat.bind(this, user._id)} className="flex items-center w-full px-5 py-2 transition-colors duration-200  gap-x-2 hover:bg-gray-100 focus:outline-none">
                      <div className="relative">
                        <img className="object-cover w-11 h-11 rounded-full" src={user.photo} alt="" />
                        {
                          onlineUsers.find((u) => u.userId === user._id) &&
                          <span className="h-3 w-3 rounded-full bg-emerald-500 absolute right-0.5 ring-1 ring-white bottom-0"></span>
                        }
                      </div>
                      <div className="text-left rtl:text-right space-y-1">
                        <h1 className="text-sm font-medium text-gray-700 capitalize ">{user.firstname + " " + user.lastname}</h1>

                        <p className="text-xs text-gray-500 ">{user.email}</p>
                      </div>
                    </button>
                  )
                })
              }
            </div>
          }
        </div>
      </aside>
    </Fragment>
  )
}

export default ChatUserSearch

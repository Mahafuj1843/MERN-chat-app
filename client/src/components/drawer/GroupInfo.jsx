import React, { useRef, useState } from 'react'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { getUserDetails } from '../../helper/sessionHelper'
import logingIcon from '../../assets/images/Dual Ring-1s-200px.svg'
import { ErrorToast, IsEmpty } from '../../helper/formHelper'
import { addToGroupRequest, removeFromGroupRequest, renameGroupRequest } from '../../apiRequest/chatRequset'
import { searchUserRequest } from '../../apiRequest/authRequest'
import store from '../../redux/store/store'
import { removeSelectForGrp, setEmpty, setSelectForGrp } from '../../redux/state/chatSlice'
import { useEffect } from 'react'
import { DeleteAlert } from '../../helper/alert'
import { getOnline, getSender } from '../../helper/logic'

const GroupInfo = ({ state, dispatch }) => {
  const { showGI } = state
  let grpName, search = useRef()
  const [loading, setLoading] = useState(false)
  const [loadings, setLoadings] = useState(false)
  const [show, setShow] = useState(false)
  const selectUser = useSelector((state) => state.chat.selectUser)
  const searchUsers = useSelector((state) => state.chat.searchUsers)
  const selectForGrp = useSelector((state) => state.chat.selectForGrp)
  const onlineUsers = useSelector((state) => state.setting.onlineUsers)

  const onUpdate = async () => {
    if (IsEmpty(grpName.value)) {
      ErrorToast('Group name requried.')
    } else {
      setLoading(true)
      await renameGroupRequest(grpName.value, selectUser._id)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!show) {
      store.dispatch(setEmpty())
      search.value = ''
    }
  }, [show])

  const onSearch = async () => {
    setLoading(true)
    await searchUserRequest(search.value)
    setLoading(false)
  }

  const onAddtoGrp = (user) => {
    if (selectForGrp.find((u) => u._id === user._id)) {
      store.dispatch(removeSelectForGrp(user))
    } else {
      store.dispatch(setSelectForGrp(user))
    }
  }

  const onAddtoGroup = async () => {
    if (IsEmpty(selectForGrp)) {
      ErrorToast('Please select a user.')
    } else {
      setLoadings(true)
      if (await addToGroupRequest(selectUser._id, selectForGrp)) {
        setLoadings(false)
        store.dispatch(setEmpty())
      } else {
        setLoadings(false)
      }
    }
  }
  const onLeaveGrp = async (user) => {
    let result = await DeleteAlert(`Exit '${selectUser?.chatName}' group?`);
    if (result.isConfirmed) {
      if (await removeFromGroupRequest(selectUser._id, user))
        dispatch({ type: 'HIDEGI' })
    }
  }

  const onRemove = async (user) => {
    let result = await DeleteAlert(`Remove ${user.firstname} from the '${selectUser?.chatName}' group?`);
    if (result.isConfirmed) {
      await removeFromGroupRequest(selectUser._id, user)
    }
  }
  
  return (
    <Fragment >
      <aside className="fixed h-screen w-full z-50 left-0 top-0 transition duration-300 ease-in-out" style={{ display: showGI ? 'block' : 'none' }}>
        <div onClick={() => dispatch({ type: 'HIDEGI' })} className="fixed h-full w-full left-0 top-0 bg-black bg-opacity-50 z-[-1]"></div>
        {
          selectUser?.users?.length > 0 &&
          <div className="fixed h-full w-5/6 md:w-3/6 lg:w-2/6 xl:w-1/4 right-0 top-0 bg-white shadow-lg pt-8 pb-4 transition duration-700 ease-in-out" style={{ right: showGI ? '0%' : '100%' }}>
            <div className='px-3 md:px-5 flex justify-between item-center'>
              <h2 className="text-lg font-medium text-gray-800">Info</h2 >
              {
                selectUser?.groupAdmin?._id === getUserDetails()._id &&
                <div className="dropdown dropdown-end cursor-pointer">
                  <svg onClick={() => setShow(!show)} tabIndex={0} viewBox="0 0 24 24" width="24" height="24">
                    <path fill="text-gary-700"
                      d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z">
                    </path>
                  </svg>
                  <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-[#ffff] text-black rounded-box w-52">
                    <li><label htmlFor="my-modal-AddP" className='hover:bg-gray-200'>Add participants</label></li>
                    <li><label htmlFor="my-modal-GrpRemane" className='hover:bg-gray-200'>Change subject</label></li>
                    <li className="tooltip tooltip-left" data-tip="under development">
                      <label className='hover:bg-gray-200'>Group settigs</label>
                    </li>
                  </ul>
                </div>
              }
            </div>
            <div className='flex flex-col h-full text-center space-y-2'>
              <div className="w-full relative flex item-center justify-center">
                <div className="relative">
                  <img className={`${selectUser.isGroupChat && 'bg-gray-300'} object-cover w-24 h-24 rounded-full`}
                    src={`${selectUser.isGroupChat ?
                      selectUser.grpPhoto
                      :
                      getSender(selectUser.users, getUserDetails()).photo
                      }`} 
                  alt="Chat pic" />
                  {
                    selectUser && getOnline(selectUser, onlineUsers, getUserDetails())
                    &&
                    <span className="h-4 w-4 rounded-full bg-emerald-500 absolute right-1 ring-2 ring-white bottom-1"></span>
                  }
                </div>
              </div>
              <div className='text-black px-3 md:px-5 pb-2 border-b'>
                <h1 className='text-lg font-semibold'>{selectUser.isGroupChat ?
                  selectUser.chatName : getSender(selectUser.users, getUserDetails()).firstname + ' ' + getSender(selectUser.users, getUserDetails()).lastname
                }
                </h1>
                {selectUser.isGroupChat ?
                  <p className='text-sm'>Group &middot; {selectUser.users.length} participants</p>
                  :
                  getSender(selectUser.users, getUserDetails()).email
                }
              </div>
              {selectUser?.isGroupChat &&
                <div className='flex flex-col gap-2 max-[360px]:h-[67%] max-[389px]:h-[65%] max-[450px]:h-[75%] max-[820px]:h-[80%] max-[1024px]:h-[62%] xl:h-[65%]'>
                  <div className='w-full px-3 md:px-5 flex justify-between'>
                    <span className='text-sm'>{selectUser.users.length} participants</span>
                    <svg viewBox="0 0 24 24" width="24" height="24" className="">
                      <path fill="text-gary-700"
                        d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z">
                      </path>
                    </svg>
                  </div>
                  {
                    selectUser.users &&
                    <div className="mt-3 space-y-1 h-full overflow-y-auto z-50">
                      {
                        selectUser.users?.map((user, i) => {
                          return (
                            <div key={i} className="flex items-center w-full px-3 md:px-5 py-2 transition-colors duration-200  gap-x-1 md:gap-x-2 hover:bg-gray-100 focus:outline-none">
                              <div className="relative w-14">
                                <img className="object-cover w-10 md:w-11 h-10 md:h-11 rounded-full" src={user.photo} alt="User pic" />
                                {
                                  onlineUsers.find((u) => u.userId === user._id)
                                  &&
                                  <span className="h-3 w-3 rounded-full bg-emerald-500 absolute right-0.5 ring-2 ring-white bottom-0"></span>
                                }
                              </div>
                              <div className='w-full h-full flex justify-between item-center'>
                                <div className="text-left rtl:text-right space-y-1 w-2/3 truncate">
                                  <h1 className="text-sm font-semibold text-gray-700 truncate capitalize ">{user.firstname + ' ' + user.lastname}</h1>
                                  <p className="text-xs text-gray-500  truncate ">{user.email}</p>
                                </div>
                                {
                                  user._id === selectUser.groupAdmin._id
                                  &&
                                  <span className="inline-flex items-center h-4 rounded-md bg-[#afd8da] px-1 md:px-2 py-1 text-xs font-medium text-[#0C7075] ring-1 ring-inset ring-[#2b9fa5]">Admin</span>
                                }
                                {
                                  user._id !== selectUser.groupAdmin._id && selectUser.groupAdmin._id === getUserDetails()._id &&
                                  <div className="my-auto dropdown dropdown-left">
                                    <svg tabIndex={0} className='my-auto cursor-pointer' viewBox="0 0 24 24" width="20" height="20">
                                      <path fill="text-gary-700"
                                        d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z">
                                      </path>
                                    </svg>
                                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-[#ffff] text-black rounded-box w-52">
                                      <li className="tooltip tooltip-top" data-tip="under development">
                                        <label className='hover:bg-gray-200'>Make group admin</label>
                                      </li>
                                      <li><label onClick={onRemove.bind(this, user)} className='hover:bg-gray-200'>Remove {user.firstname}</label></li>
                                    </ul>
                                  </div>
                                }
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  }
                  <button onClick={onLeaveGrp.bind(this, getUserDetails())} className='flex item-center gap-3 btn bg-[#0C7075] hover:bg-[#0d5053] mx-5'>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 64 64" id="logout"><path fill="white" d="M53.22 43.92c-1.73 0-3.13 1.41-3.13 3.13l-.07 10.68-36.79-.07.07-51.39 36.79.07v10.6c0 1.73 1.4 3.14 3.13 3.14s3.14-1.41 3.14-3.14V5.85c0-3.23-2.63-5.85-5.85-5.85h-37.7C9.57 0 6.95 2.62 6.95 5.85v52.3c0 3.23 2.62 5.85 5.85 5.85h37.7c3.22 0 5.85-2.62 5.85-5.85V47.06c0-1.73-1.41-3.14-3.13-3.14z"></path><path fill="white" d="M56.49 30.98 40.44 20.36c-.38-.25-.86-.27-1.26-.05-.4.21-.64.62-.64 1.08v4.24H16.4a.49.49 0 0 0-.49.49v11.76c0 .27.22.49.49.49h22.14v4.25c0 .45.24.86.64 1.08.19.1.39.14.59.14.23 0 .47-.06.67-.2L56.5 33.02c.34-.22.55-.61.55-1.02s-.22-.8-.56-1.02z"></path></svg>
                    </span>
                    <span className='capitalize'>Exit group</span>
                  </button>
                </div>
              }
            </div>
          </div>
        }
      </aside>

      {/* Group Rename */}
      <input type="checkbox" id="my-modal-GrpRemane" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="my-modal-GrpRemane" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="text-lg font-bold">Change subject</h3>
          <div className='flex my-4 px-0 md:px-5 justify-center gap-3'>
            <div className='w-2/3'>
              <input ref={(i) => grpName = i} defaultValue={selectUser?.chatName} type="text" name="grpName" id="grpName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Group Name" required="" />
            </div>
            <button onClick={onUpdate} className='flex gap-1 item-center bg-[#0C7075] text-white rounded-md px-3 py-2'>
              {loading && <img className='w-6 h-6' src={logingIcon} alt="" srcset="" />}
              Update
            </button>
          </div>
        </div>
      </div>

      {/* Add participants */}
      <input type="checkbox" id="my-modal-AddP" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label onClick={() => setShow(!show)} htmlFor="my-modal-AddP" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="absolute left-4 top-3 text-lg font-bold pb-4">Add participant</h3>
          <div className='mt-8 mx-0 md:mx-4'>
            <div className="flex space-x-1 md:space-x-2 items-center px-1 md:px-4 pb-2">
              <div className="flex-grow h-10 flex items-center space-x-2 bg-gray-200 py-1 px-4 rounded-md">
                <svg viewBox="0 0 24 24" width="32" height="32" className="cursor-pointer">
                  <path fill="text-gray-700"
                    d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z">
                  </path>
                </svg>
                <input onChange={onSearch} type="search" ref={(i) => search = i} className="focus:outline-none bg-gray-200 w-full text-gray-500 text-md"
                  placeholder="Search..." />
              </div>
            </div>
            <div className="mt-2 mx-5 flex gap-2 h-fit border-y overflow-x-auto">
              {
                selectForGrp?.map((user, i) => {
                  return (
                    <button key={i} onClick={onAddtoGrp.bind(this, user)} className="flex flex-col w-fit py-2 transition-colors duration-200  gap-x-2 focus:outline-none">
                      <div className="relative px-1">
                        <img className="object-cover w-11 h-11 rounded-full" src={user.photo} alt="User pic" />
                        <span className="h-4 w-4 flex item-center justify-center rounded-full bg-gray-500 absolute right-0.5 ring-1 ring-white bottom-0">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="close"><path fill="white" d="M7 18a1 1 0 0 1-.707-1.707l10-10a1 1 0 0 1 1.414 1.414l-10 10A.997.997 0 0 1 7 18Z"></path><path fill="white" d="M17 18a.997.997 0 0 1-.707-.293l-10-10a1 1 0 0 1 1.414-1.414l10 10A1 1 0 0 1 17 18Z"></path></svg>
                        </span>
                      </div>
                      <div className="text-left rtl:text-right w-14">
                        <p className="text-sm truncate text-gray-700 capitalize ">{user.firstname + " " + user.lastname}</p>
                      </div>
                    </button>
                  )
                })
              }
            </div>
            {loading ?
              <div classNameName='flex items-center bg-gray-200 justify-center w-full px-5 py-2'>
                <img src={logingIcon} className='h-10 w-10' alt="" srcset="" />
              </div>
              :
              (<div className="mt-3 mx-1 md:mx-5 space-y-1 h-64 overflow-y-auto">
                {
                  searchUsers?.map((user, i) => {
                    return (
                      selectUser?.users?.find((u) => u._id === user._id) ?
                        (
                          <button key={i} disabled className="flex items-center w-full px-1 md:px-5 py-2 transition-colors duration-200 bg-gray-100  gap-x-2 focus:outline-none">
                            <div className="relative px-1">
                              <img className="object-cover w-11 h-11 rounded-full" src={user.photo} alt="User pic" />
                              <span className="h-4 w-4 flex item-center justify-center rounded-full bg-gray-500 absolute right-0.5 ring-1 ring-white bottom-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" id="done"><path fill="none" d="M0 0h24v24H0V0z"></path><path fill="white" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
                              </span>
                            </div>
                            <div className="text-left rtl:text-right space-y-1">
                              <h1 className="text-sm font-medium text-gray-700 capitalize ">{user.firstname + " " + user.lastname}</h1>

                              <p className="text-xs text-gray-500 ">Already member of the group.</p>
                            </div>
                          </button>
                        ) : (
                          <button key={i} onClick={onAddtoGrp.bind(this, user)} className="flex items-center w-full px-1 md:px-5 py-2 transition-colors duration-200 bg-gray-100  gap-x-2 focus:outline-none">
                            <div className="relative px-1">
                              <img className="object-cover w-11 h-11 rounded-full" src={user.photo} alt="User pic" />
                              <span className={`${selectForGrp.find((u) => u._id === user._id) ? 'h-4 w-4 bg-gray-600 right-0.5 ring-1 ring-white bottom-0' : onlineUsers.find((u) => u.userId === user._id) ? 'h-3 w-3 bg-emerald-500 right-0.5 ring-1 ring-white bottom-0' : 'hidden'} flex item-center justify-center rounded-full absolute right-0.5 ring-1 ring-white bottom-0`}>
                                {
                                  selectForGrp.some((u) => u._id === user._id) ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" id="done"><path fill="none" d="M0 0h24v24H0V0z"></path><path fill="white" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
                                    :
                                    ""
                                }
                              </span>
                            </div>
                            <div className="text-left rtl:text-right space-y-1">
                              <h1 className="text-sm font-medium text-gray-700 capitalize ">{user.firstname + " " + user.lastname}</h1>

                              <p className="text-xs text-gray-500 ">{user.email}</p>
                            </div>
                          </button>
                        )
                    )
                  })
                }
              </div>)
            }
          </div>
          {
            selectForGrp?.length > 0 &&
            <button onClick={onAddtoGroup} className='z-50 p-3 md:p-4 text-md text-white rounded-full absolute right-7 md:right-16 bottom-7 bg-[#0C7075] hover:bg-[#0d4447]'>
              {
                loadings ?
                  <img src={logingIcon} className='h-10 w-10' alt="" srcset="" />
                  :
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" id="done"><path fill="none" d="M0 0h24v24H0V0z"></path><path fill="white" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path>
                  </svg>
              }
            </button>
          }
        </div>
      </div>
    </Fragment>
  )
}

export default GroupInfo
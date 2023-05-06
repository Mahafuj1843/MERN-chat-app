import React, { useRef, useState } from 'react'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { getUserDetails } from '../../helper/sessionHelper'
import logingIcon from '../../assets/images/Dual Ring-1s-200px.svg'
import { ErrorToast, IsEmpty } from '../../helper/formHelper'
import { renameGroupRequest } from '../../apiRequest/chatRequset'

const GroupInfo = ({ state, dispatch }) => {
  const { showGI } = state
  let grpName = useRef()
  const [loading, setLoading] = useState(false)
  const selectUser = useSelector((state) => state.chat.selectUser)

  const getSender = (users, loggedUser) => {
    return users[0]._id === loggedUser._id ? `${users[1].firstname} ${users[1].lastname}` : `${users[0].firstname} ${users[0].lastname}`
  }
  const getSenderemail = (users, loggedUser) => {
    return users[0]._id === loggedUser._id ? `${users[1].email}` : `${users[0].email}`
  }

  const onUpdate = async () =>{
    if(IsEmpty(grpName.value)){
      ErrorToast('Group name requried.')
    }else{
      setLoading(true)
      await renameGroupRequest(grpName.value, selectUser._id)
      setLoading(false)
    }
  }

  return (
    <Fragment >
      <aside class="fixed h-full w-full z-50 left-0 top-0 transition duration-300 ease-in-out font-mono" style={{ display: showGI ? 'block' : 'none' }}>
        <div onClick={() => dispatch({ type: 'HIDEGI' })} class="fixed h-full w-full left-0 top-0 bg-black bg-opacity-50 z-[-1]"></div>
        <div class="fixed h-full w-1/2 sm:w-72 right-0 top-0 bg-white shadow-lg pt-8 p-x2 transition duration-700 ease-in-out" style={{ right: showGI ? '0%' : '100%' }}>
          <div className='px-5 flex justify-between item-center'>
            <h2 class="text-lg font-medium text-gray-800 dark:text-white">Info</h2 >
            <div className="dropdown dropdown-end cursor-pointer">
              <svg tabIndex={0} viewBox="0 0 24 24" width="24" height="24">
                <path fill="text-gary-700"
                  d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z">
                </path>
              </svg>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-[#ffff] text-black rounded-box w-52">
                <li><label /*onClick={onProfile} htmlFor="my-modal-3"*/ className='hover:bg-gray-200'>Add participants</label></li>
                <li><label htmlFor="my-modal-GrpRemane" className='hover:bg-gray-200'>Change subject</label></li>
                <li><label /*onClick={Logout}*/ className='hover:bg-gray-200'>Group settigs</label></li>
              </ul>
            </div>
          </div>
          {
            selectUser &&
            <div className='flex flex-col h-full text-center space-y-2'>
              <div class="w-full relative flex item-center justify-center">
                <div class="relative">
                  <img class="object-cover w-24 h-24 rounded-full" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100" alt="" />
                  <span class="h-4 w-4 rounded-full bg-emerald-500 absolute right-1 ring-1 ring-white bottom-1"></span>
                </div>

              </div>
              <div className='text-black px-5 pb-2 border-b'>
                <h1 className='text-lg font-semibold'>{selectUser.isGroupChat ?
                  selectUser.chatName : getSender(selectUser.users, getUserDetails())
                }
                </h1>
                {selectUser.isGroupChat ?
                  <p className='text-sm'>Group &middot; {selectUser.users.length} participants</p>
                  :
                  getSenderemail(selectUser.users, getUserDetails())
                }
              </div>
              {selectUser.isGroupChat &&
                <div className='flex flex-col space-y-2 h-2/3'>
                  <div className='w-full px-5 flex justify-between'>
                    <span className='text-sm'>{selectUser.users.length} participants</span>
                    <svg viewBox="0 0 24 24" width="24" height="24" class="">
                      <path fill="text-gary-700"
                        d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z">
                      </path>
                    </svg>
                  </div>
                  {
                    selectUser.users &&
                    <div class="mt-3 space-y-1 h-full overflow-y-auto">
                      {
                        selectUser.users?.map((user, i) => {
                          return (
                            <div key={i} class="flex items-center w-full px-5 py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none">
                              <img class="object-cover w-11 h-11 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&h=880&q=80" alt="" />

                              <div className='w-full h-full flex justify-between item-center'>
                                <div class="text-left rtl:text-right space-y-1 w-2/3 truncate">
                                  <h1 class="text-sm font-semibold text-gray-700 truncate capitalize dark:text-white">{user.firstname + ' ' + user.lastname}</h1>
                                  <p class="text-xs text-gray-500 dark:text-gray-400 truncate ">{user.email}</p>
                                </div>
                                {
                                  user._id === selectUser.groupAdmin._id &&
                                  <span class="inline-flex items-center h-5 rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">Admin</span>
                                }
                                {
                                  user._id !== selectUser.groupAdmin._id && selectUser.groupAdmin._id === getUserDetails()._id &&
                                  <div className="my-auto dropdown dropdown-end">
                                    <svg tabIndex={0} className='my-auto cursor-pointer' viewBox="0 0 24 24" width="20" height="20">
                                      <path fill="text-gary-700"
                                        d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z">
                                      </path>
                                    </svg>
                                    <ul tabIndex={0} className="z-50 dropdown-content menu p-2 shadow bg-[#ffff] text-black rounded-box w-52">
                                      <li><label className='hover:bg-gray-200'>Make group admin</label></li>
                                      <li><label className='hover:bg-gray-200'>Remove {user.firstname}</label></li>
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
                  <button className='flex item-center gap-2 btn btn-primary mx-5'>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 64 64" id="logout"><path fill="white" d="M53.22 43.92c-1.73 0-3.13 1.41-3.13 3.13l-.07 10.68-36.79-.07.07-51.39 36.79.07v10.6c0 1.73 1.4 3.14 3.13 3.14s3.14-1.41 3.14-3.14V5.85c0-3.23-2.63-5.85-5.85-5.85h-37.7C9.57 0 6.95 2.62 6.95 5.85v52.3c0 3.23 2.62 5.85 5.85 5.85h37.7c3.22 0 5.85-2.62 5.85-5.85V47.06c0-1.73-1.41-3.14-3.13-3.14z"></path><path fill="white" d="M56.49 30.98 40.44 20.36c-.38-.25-.86-.27-1.26-.05-.4.21-.64.62-.64 1.08v4.24H16.4a.49.49 0 0 0-.49.49v11.76c0 .27.22.49.49.49h22.14v4.25c0 .45.24.86.64 1.08.19.1.39.14.59.14.23 0 .47-.06.67-.2L56.5 33.02c.34-.22.55-.61.55-1.02s-.22-.8-.56-1.02z"></path></svg>
                    </span>
                    <span className='capitalize'>Exit group</span>
                  </button>
                </div>
              }
            </div>
          }
        </div>
      </aside>

      {/* Group Rename */}
      <input type="checkbox" id="my-modal-GrpRemane" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="my-modal-GrpRemane" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="text-lg font-bold">Change subject</h3>
          <div className='flex my-4 px-5 justify-center gap-3'>
            <div className='w-2/3'>
              <input ref={(i) => grpName = i} defaultValue={selectUser.chatName} type="text" name="grpName" id="grpName" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Group Name" required="" />
            </div>
            <button onClick={onUpdate} className='flex gap-1 item-center btn-primary rounded-md px-3 py-2'>
              {loading && <img className='w-6 h-6' src={logingIcon} alt="" srcset="" />}
              Update
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default GroupInfo
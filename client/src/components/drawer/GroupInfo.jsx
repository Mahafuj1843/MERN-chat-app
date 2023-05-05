import React from 'react'
import { Fragment } from 'react'

const GroupInfo = ({ state, dispatch }) => {
    const { showGI } = state
  return (
    <Fragment >
      <aside class="fixed h-full w-full z-50 left-0 top-0 transition duration-300 ease-in-out" style={{ display: showGI ? 'block' : 'none' }}>
        <div onClick={() => dispatch({ type: 'HIDEGI' })} class="fixed h-full w-full left-0 top-0 bg-black bg-opacity-50 z-[-1]"></div>
        <div class="fixed h-full w-1/2 sm:w-72 right-0 top-0 bg-white shadow-lg pt-8 p-x2 transition duration-700 ease-in-out" style={{ right: showGI ? '0%' : '100%' }}>
          <h2 class="px-5 text-lg font-medium text-gray-800 dark:text-white">Info</h2 >
          <div class="w-full flex flex-col item-center justify-center">
                      <div class="relative">
                        <img class="object-cover w-24 h-24 rounded-full" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100" alt="" />
                        <span class="h-4 w-4 rounded-full bg-emerald-500 absolute right-1 ring-1 ring-white bottom-1"></span>
                      </div>      
                    <div>
                    <h1>Mahir Shadid</h1>
                    <p>mahir@gmail.com</p>
                    </div>
            </div>
          {/* <div class="flex gap-2 my-4 px-5">
            <input ref={(i) => search = i} type="text" id="search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g. Jhon" required />
            <button onClick={onHandleSearch} className='py-2 px-3 rounded-md bg-gray-200 hover:bg-gray-300'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" id="search">
                <path fill="black" d="M3.624,15a8.03,8.03,0,0,0,10.619.659l5.318,5.318a1,1,0,0,0,1.414-1.414l-5.318-5.318A8.04,8.04,0,0,0,3.624,3.624,8.042,8.042,0,0,0,3.624,15Zm1.414-9.96a6.043,6.043,0,1,1-1.77,4.274A6,6,0,0,1,5.038,5.038Z"></path>
              </svg>
            </button>
          </div> */}
          {/* {loading ?
            <UserSearchLoadings />
            :
            <div class="mt-6 space-y-1 h-4/5 overflow-y-auto">
              {
                searchUsers?.map((user, i)=> {
                return(
                  <button key={i} onClick={accessChat.bind(this, user._id)} class="flex items-center w-full px-5 py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none">
                      <div class="relative">
                        <img class="object-cover w-11 h-11 rounded-full" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100" alt="" />
                        <span class="h-2 w-2 rounded-full bg-emerald-500 absolute right-0.5 ring-1 ring-white bottom-0"></span>
                      </div>
                      <div class="text-left rtl:text-right space-y-1">
                        <h1 class="text-sm font-medium text-gray-700 capitalize dark:text-white">{user.firstname+" "+user.lastname}</h1>

                        <p class="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                      </div>
                    </button>
                )
              })
              }       
            </div>
          } */}
        </div>
      </aside>
    </Fragment>
  )
}

export default GroupInfo
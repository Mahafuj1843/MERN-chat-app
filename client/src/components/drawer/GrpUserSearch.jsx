import React, { Fragment, useEffect, useRef, useState } from 'react'
import UserSearchLoadings from '../loading/UserSearchLoadings'
import { ErrorToast, IsEmpty } from '../../helper/formHelper'
import { searchUserRequest } from '../../apiRequest/authRequest'
import { useSelector } from 'react-redux'
import store from '../../redux/store/store'
import { removeSelectForGrp, setEmpty, setSelectForGrp, } from '../../redux/state/chatSlice'
import { createGroupRequest } from '../../apiRequest/chatRequset'

const GrpUserSearch = ({ state, dispatch }) => {
    const [loadings, setLoading] = useState(false)
    const { showGUS } = state
    let search, name = useRef()
    const searchUsers = useSelector((state) => state.chat.searchUsers)
    const selectForGrp = useSelector((state) => state.chat.selectForGrp)

    const onHandleSearch = async () => {
        setLoading(true)
        await searchUserRequest(search.value)
        setLoading(false)
    }

    useEffect(()=>{
        if(!showGUS){
            store.dispatch(setEmpty())
            search.value = ''
            name.value = ''
        }
    },[showGUS])

    const onAddtoGrp = (user) => {
        if(selectForGrp.some((u)=>u._id===user._id)){
            store.dispatch(removeSelectForGrp(user))
        }else{
            store.dispatch(setSelectForGrp(user))
        }
    }

    const onCreateGrp = async () =>{
        if(IsEmpty(name.value)){
            ErrorToast('Group name requried.')
        }else if(IsEmpty(selectForGrp)){
            ErrorToast('Group member requried.')
        }else{
            if(await createGroupRequest(name.value, selectForGrp))
                dispatch({ type: 'HIDEGUS' })
        }
    }
    return (
        <Fragment >
            <aside class="fixed h-full w-full z-50 left-0 top-0 transition duration-300 ease-in-out" style={{ display: showGUS ? 'block' : 'none' }}>
                <div onClick={() => dispatch({ type: 'HIDEGUS' })} class="fixed h-full w-full left-0 top-0 bg-black bg-opacity-50 z-[-1]"></div>
                <div class="fixed h-full w-1/2 sm:w-72 left-0 top-0 bg-white shadow-lg pt-4 p-x2 transition duration-700 ease-in-out" style={{ left: showGUS ? '0%' : '100%' }}>
                    <h2 class="px-5 text-lg font-medium text-gray-800 dark:text-white">Create Group</h2 >
                    <div className='my-4 px-5'>
                        <input ref={(i) => name = i} type="text" name="grpName" id="grpName" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Group Name" required="" />
                    </div>
                    <div class="my-4 px-5">
                        <input ref={(i) => search = i} onChange={onHandleSearch} type="search" id="search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search User..." required />
                    </div>
                    <div class="mt-2 mx-5 flex gap-2 h-fit border-y overflow-x-auto">
                        {
                            selectForGrp?.map((user, i) => {
                                return(
                                    <button onClick={onAddtoGrp.bind(this, user)} class="flex flex-col w-fit py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 focus:outline-none">
                                    <div class="relative px-1">
                                        <img class="object-cover w-11 h-11 rounded-full" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100" alt="" />
                                        <span class="h-4 w-4 flex item-center justify-center rounded-full bg-emerald-500 absolute right-0.5 ring-1 ring-white bottom-0 -right-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="close"><path fill="white" d="M7 18a1 1 0 0 1-.707-1.707l10-10a1 1 0 0 1 1.414 1.414l-10 10A.997.997 0 0 1 7 18Z"></path><path fill="white" d="M17 18a.997.997 0 0 1-.707-.293l-10-10a1 1 0 0 1 1.414-1.414l10 10A1 1 0 0 1 17 18Z"></path></svg>
                                        </span>
                                    </div>
                                    <div class="text-left rtl:text-right w-14">
                                        <p class="text-sm truncate text-gray-700 capitalize dark:text-white">{user.firstname+" "+user.lastname}</p>
                                    </div>
                                </button>
                                )
                            })
                        }
                        {/* <button class="flex flex-col w-fit py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none">
                            <div class="relative px-1">
                                <img class="object-cover w-11 h-11 rounded-full" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100" alt="" />
                                <span class="h-4 w-4 flex item-center justify-center rounded-full bg-emerald-500 absolute right-0.5 ring-1 ring-white bottom-0 -right-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="close"><path fill="white" d="M7 18a1 1 0 0 1-.707-1.707l10-10a1 1 0 0 1 1.414 1.414l-10 10A.997.997 0 0 1 7 18Z"></path><path fill="white" d="M17 18a.997.997 0 0 1-.707-.293l-10-10a1 1 0 0 1 1.414-1.414l10 10A1 1 0 0 1 17 18Z"></path></svg>
                                </span>
                            </div>
                            <div class="text-left rtl:text-right w-14">
                                <p class="text-sm truncate text-gray-700 capitalize dark:text-white">Mahafujul Alam</p>
                            </div>
                        </button>
                        <button class="flex flex-col w-fit py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none">
                            <div class="relative px-1">
                                <img class="object-cover w-11 h-11 rounded-full" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100" alt="" />
                                <span class="h-4 w-4 flex item-center justify-center rounded-full bg-emerald-500 absolute right-0.5 ring-1 ring-white bottom-0 -right-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="close"><path fill="white" d="M7 18a1 1 0 0 1-.707-1.707l10-10a1 1 0 0 1 1.414 1.414l-10 10A.997.997 0 0 1 7 18Z"></path><path fill="white" d="M17 18a.997.997 0 0 1-.707-.293l-10-10a1 1 0 0 1 1.414-1.414l10 10A1 1 0 0 1 17 18Z"></path></svg>
                                </span>
                            </div>
                            <div class="text-left rtl:text-right w-14">
                                <p class="text-sm truncate text-gray-700 capitalize dark:text-white">Mahir Shadid</p>
                            </div>
                        </button>
                        <button class="flex flex-col w-fit py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none">
                            <div class="relative px-1">
                                <img class="object-cover w-11 h-11 rounded-full" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100" alt="" />
                                <span class="h-4 w-4 flex item-center justify-center rounded-full bg-emerald-500 absolute right-0.5 ring-1 ring-white bottom-0 -right-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="close"><path fill="white" d="M7 18a1 1 0 0 1-.707-1.707l10-10a1 1 0 0 1 1.414 1.414l-10 10A.997.997 0 0 1 7 18Z"></path><path fill="white" d="M17 18a.997.997 0 0 1-.707-.293l-10-10a1 1 0 0 1 1.414-1.414l10 10A1 1 0 0 1 17 18Z"></path></svg>
                                </span>
                            </div>
                            <div class="text-left rtl:text-right w-14">
                                <p class="text-sm truncate text-gray-700 capitalize dark:text-white">Shohidul Islam</p>
                            </div>
                        </button>
                        <button class="flex flex-col w-fit py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none">
                            <div class="relative px-1">
                                <img class="object-cover w-11 h-11 rounded-full" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100" alt="" />
                                <span class="h-4 w-4 flex item-center justify-center rounded-full bg-emerald-500 absolute right-0.5 ring-1 ring-white bottom-0 -right-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="close"><path fill="white" d="M7 18a1 1 0 0 1-.707-1.707l10-10a1 1 0 0 1 1.414 1.414l-10 10A.997.997 0 0 1 7 18Z"></path><path fill="white" d="M17 18a.997.997 0 0 1-.707-.293l-10-10a1 1 0 0 1 1.414-1.414l10 10A1 1 0 0 1 17 18Z"></path></svg>
                                </span>
                            </div>
                            <div class="text-left rtl:text-right w-14">
                                <p class="text-sm truncate text-gray-700 capitalize dark:text-white">Mahafujul Alam</p>
                            </div>
                        </button>
                        <button class="flex flex-col w-fit py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none">
                            <div class="relative px-1">
                                <img class="object-cover w-11 h-11 rounded-full" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100" alt="" />
                                <span class="h-4 w-4 flex item-center justify-center rounded-full bg-emerald-500 absolute right-0.5 ring-1 ring-white bottom-0 -right-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="close"><path fill="white" d="M7 18a1 1 0 0 1-.707-1.707l10-10a1 1 0 0 1 1.414 1.414l-10 10A.997.997 0 0 1 7 18Z"></path><path fill="white" d="M17 18a.997.997 0 0 1-.707-.293l-10-10a1 1 0 0 1 1.414-1.414l10 10A1 1 0 0 1 17 18Z"></path></svg>
                                </span>
                            </div>
                            <div class="text-left rtl:text-right w-14">
                                <p class="text-sm truncate text-gray-700 capitalize dark:text-white">Mahafujul Alam</p>
                            </div>
                        </button> */}
                    </div>

                    {loadings ?
                        <UserSearchLoadings />
                        :
                        (<div class="mt-3 space-y-1 mx-h-1/2 overflow-y-auto">
                            {/* <button class="flex items-center w-full px-5 py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none">
                                <img class="object-cover w-11 h-11 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&h=880&q=80" alt="" />

                                <div class="text-left rtl:text-right space-y-1">
                                    <h1 class="text-sm font-medium text-gray-700 capitalize dark:text-white">arthur melo</h1>

                                    <p class="text-xs text-gray-500 dark:text-gray-400">1.2 Followers</p>
                                </div>
                            </button>

                            <button class="flex items-center w-full px-5 py-2 transition-colors duration-200 bg-gray-100 dark:bg-gray-800 gap-x-2 focus:outline-none">
                                <div class="relative px-1">
                                    <img class="object-cover w-11 h-11 rounded-full" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100" alt="" />
                                    <span class="h-4 w-4 flex item-center justify-center rounded-full bg-emerald-500 absolute right-0.5 ring-1 ring-white bottom-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" id="done"><path fill="none" d="M0 0h24v24H0V0z"></path><path fill="white" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
                                    </span>
                                </div>
                                <div class="text-left rtl:text-right space-y-1">
                                    <h1 class="text-sm font-medium text-gray-700 capitalize dark:text-white">Jane Doe</h1>

                                    <p class="text-xs text-gray-500 dark:text-gray-400">15.6 Followers</p>
                                </div>
                            </button>
                            <button class="flex items-center w-full px-5 py-2 transition-colors duration-200 bg-gray-100 dark:bg-gray-800 gap-x-2 focus:outline-none">
                                <div class="relative px-1">
                                    <img class="object-cover w-11 h-11 rounded-full" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100" alt="" />
                                    <span class="h-4 w-4 flex item-center justify-center rounded-full bg-emerald-500 absolute right-0.5 ring-1 ring-white bottom-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" id="done"><path fill="none" d="M0 0h24v24H0V0z"></path><path fill="white" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
                                    </span>
                                </div>
                                <div class="text-left rtl:text-right space-y-1">
                                    <h1 class="text-sm font-medium text-gray-700 capitalize dark:text-white">Jane Doe</h1>

                                    <p class="text-xs text-gray-500 dark:text-gray-400">15.6 Followers</p>
                                </div>
                            </button>
                            <button class="flex items-center w-full px-5 py-2 transition-colors duration-200 bg-gray-100 dark:bg-gray-800 gap-x-2 focus:outline-none">
                                <div class="relative px-1">
                                    <img class="object-cover w-11 h-11 rounded-full" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100" alt="" />
                                    <span class="h-4 w-4 flex item-center justify-center rounded-full bg-emerald-500 absolute right-0.5 ring-1 ring-white bottom-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" id="done"><path fill="none" d="M0 0h24v24H0V0z"></path><path fill="white" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
                                    </span>
                                </div>
                                <div class="text-left rtl:text-right space-y-1">
                                    <h1 class="text-sm font-medium text-gray-700 capitalize dark:text-white">Jane Doe</h1>

                                    <p class="text-xs text-gray-500 dark:text-gray-400">15.6 Followers</p>
                                </div>
                            </button>
                            <button class="flex items-center w-full px-5 py-2 transition-colors duration-200 bg-gray-100 dark:bg-gray-800 gap-x-2 focus:outline-none">
                                <div class="relative px-1">
                                    <img class="object-cover w-11 h-11 rounded-full" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100" alt="" />
                                    <span class="h-4 w-4 flex item-center justify-center rounded-full bg-emerald-500 absolute right-0.5 ring-1 ring-white bottom-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" id="done"><path fill="none" d="M0 0h24v24H0V0z"></path><path fill="white" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
                                    </span>
                                </div>
                                <div class="text-left rtl:text-right space-y-1">
                                    <h1 class="text-sm font-medium text-gray-700 capitalize dark:text-white">Jane Doe</h1>

                                    <p class="text-xs text-gray-500 dark:text-gray-400">15.6 Followers</p>
                                </div>
                            </button> */}

                            {
                                searchUsers?.slice(0, 5).map((user, i) => {
                                    return (
                                        <button key={i} onClick={onAddtoGrp.bind(this, user)} class="flex items-center w-full px-5 py-2 transition-colors duration-200 bg-gray-100 dark:bg-gray-800 gap-x-2 focus:outline-none">
                                            <div class="relative px-1">
                                                <img class="object-cover w-11 h-11 rounded-full" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100" alt="" />
                                                <span class="h-4 w-4 flex item-center justify-center rounded-full bg-emerald-500 absolute right-0.5 ring-1 ring-white bottom-0">
                                                {
                                                    selectForGrp.some((u)=>u._id===user._id) ? 
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" id="done"><path fill="none" d="M0 0h24v24H0V0z"></path><path fill="white" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
                                                    :
                                                    ""
                                                }
                                                </span>
                                            </div>
                                            <div class="text-left rtl:text-right space-y-1">
                                                <h1 class="text-sm font-medium text-gray-700 capitalize dark:text-white">{user.firstname + " " + user.lastname}</h1>

                                                <p class="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                                            </div>
                                        </button>
                                    )
                                })
                            }
                            <hr className='mx-5' />
                        </div>)
                    }
                    <div className='mx-5 my-2'>
                        <button onClick={onCreateGrp} type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create</button>
                    </div>
                </div>
            </aside>
        </Fragment>
    )
}

export default GrpUserSearch

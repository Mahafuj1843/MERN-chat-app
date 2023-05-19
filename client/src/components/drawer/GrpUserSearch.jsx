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
    const onlineUsers = useSelector((state) => state.setting.onlineUsers)

    const onHandleSearch = async () => {
        setLoading(true)
        await searchUserRequest(search.value)
        setLoading(false)
    }

    useEffect(() => {
        if (!showGUS) {
            store.dispatch(setEmpty())
            search.value = ''
            name.value = ''
        }
    }, [showGUS])

    const onAddtoGrp = (user) => {
        if (selectForGrp.some((u) => u._id === user._id)) {
            store.dispatch(removeSelectForGrp(user))
        } else {
            store.dispatch(setSelectForGrp(user))
        }
    }

    const onCreateGrp = async () => {
        if (IsEmpty(name.value)) {
            ErrorToast('Group name requried.')
        } else if (IsEmpty(selectForGrp)) {
            ErrorToast('Group member requried.')
        } else {
            if (await createGroupRequest(name.value, selectForGrp))
                dispatch({ type: 'HIDEGUS' })
        }
    }
    
    return (
        <Fragment >
            <aside className="fixed h-full w-full z-50 left-0 top-0 transition duration-300 ease-in-out" style={{ display: showGUS ? 'block' : 'none' }}>
                <div onClick={() => dispatch({ type: 'HIDEGUS' })} class="fixed h-full w-full left-0 top-0 bg-black bg-opacity-50 z-[-1]"></div>
                <div className="fixed flex flex-col item-center py-5 space-y-4 h-full w-3/4 md:w-2/6 xl:w-1/5 left-0 top-0 bg-white shadow-lg transition duration-700 ease-in-out" style={{ left: showGUS ? '0%' : '100%' }}>
                    <h2 className="px-5 text-lg font-medium text-gray-800 ">Create Group</h2 >
                    <div className='px-5 my-4'>
                        <input ref={(i) => name = i} type="text" name="grpName" id="grpName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#0C7075] focus:border-[#1c9096] block w-full p-2.5 " placeholder="Group Name" required="" />
                    </div>
                    <div className="px-5 my-4">
                        <input ref={(i) => search = i} onChange={onHandleSearch} type="search" id="search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#0C7075] focus:border-[#269ba1] block w-full p-2.5 " placeholder="Search User..." required />
                    </div>
                    <div className="px-5 mt-2 flex gap-2 h-fit border-y overflow-x-auto">
                        {
                            selectForGrp?.map((user, i) => {
                                return (
                                    <button key={i} onClick={onAddtoGrp.bind(this, user)} className="flex flex-col w-fit py-2 transition-colors duration-200 gap-x-2 focus:outline-none">
                                        <div className="relative px-1">
                                            <img className="object-cover w-11 h-11 rounded-full" src={user.photo} alt="User pic" />
                                            <span className='h-4 w-4 flex item-center justify-center rounded-full bg-gray-500 absolute right-0.5 ring-1 ring-white bottom-0'>
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

                    {loadings ?
                        <UserSearchLoadings />
                        :
                        (<div className="mt-3 space-y-1 overflow-y-auto min-h-fit max-[360px]:max-h-[57%] max-[389px]:h-[53%] max-[450px]:h-[63%] max-[820px]:h-[70%] max-[1024px]:h-[45%] xl:max-h-[50%]">
                            {
                                searchUsers?.map((user, i) => {
                                    return (
                                        <button key={i} onClick={onAddtoGrp.bind(this, user)} className="flex items-center w-full px-5 py-2 transition-colors duration-200 bg-gray-100 gap-x-2 focus:outline-none">
                                            <div className="relative px-1">
                                                <img className="object-cover w-11 h-11 rounded-full" src={user.photo} alt="User pic" />
                                                <span
                                                    className={`${selectForGrp.find((u) => u._id === user._id) ? 'h-4 w-4 bg-gray-600 right-0.5 ring-1 ring-white bottom-0' : onlineUsers.find((u) => u.userId === user._id) ? 'h-3 w-3 bg-emerald-500 right-0.5 ring-1 ring-white bottom-0' : 'hidden'} flex item-center justify-center rounded-full absolute`}>
                                                    {
                                                        selectForGrp.find((u) => u._id === user._id) ?
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" id="done"><path fill="none" d="M0 0h24v24H0V0z"></path><path fill="white" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
                                                            :
                                                            <></>
                                                    }
                                                </span>
                                            </div>
                                            <div className="text-left rtl:text-right space-y-1">
                                                <h1 className="text-sm font-medium text-gray-700 capitalize ">{user.firstname + " " + user.lastname}</h1>

                                                <p className="text-xs text-gray-500 ">{user.email}</p>
                                            </div>
                                        </button>
                                    )
                                })
                            }
                            <hr className='mx-5' />
                        </div>)
                    }
                    {
                        selectForGrp.length>0 && 
                        <div className='px-5 w-full'>
                            <button onClick={onCreateGrp} type="submit" class="w-full text-white bg-[#0C7075] hover:bg-[#0b5155] focus:ring-4 focus:outline-none focus:ring-[#8de6eb] font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Create</button>
                        </div>
                    }
                </div>
            </aside>
        </Fragment>
    )
}

export default GrpUserSearch

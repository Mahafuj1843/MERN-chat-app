import React, { Fragment } from 'react'
import { getUserDetails } from '../helper/sessionHelper'
import store from '../redux/store/store'
import { setSelectUser } from '../redux/state/chatSlice'
import { useSelector } from 'react-redux'
const MyChat = ({ myChats, dispatch }) => {
    const getSender = (users, loggedUser) =>{
        return users[0]._id === loggedUser._id ? `${users[1].firstname} ${users[1].lastname}` : `${users[0].firstname} ${users[0].lastname}`
    }

    const accessChatMsg = (user) =>{
        store.dispatch(setSelectUser(user))
    }
    const selectUser = useSelector((state)=>state.chat.selectUser)
    return (
        <Fragment>
            <div class="flex flex-col flex-none h-full w-[30rem] border-r border-gray-600">
                <div class="flex justify-between bg-white px-4 py-2 border-b">
                    <div class="flex items-center space-x-8 ms-auto">
                        <svg onClick={() => dispatch({ type: 'SHOWGUS' })} width="27" height="27" class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" clip-rule="evenodd" viewBox="0 0 48 48" id="group">
                            <path fill="text-gary-700" d="M155.469,79.103C155.009,79.037 154.52,79 154,79C150.17,79 148.031,81.021 147.211,82.028C147.078,82.201 147.007,82.413 147.007,82.632C147.007,82.638 147.007,82.644 147.006,82.649C147,83.019 147,83.509 147,84C147,84.552 147.448,85 148,85L155.172,85C155.059,84.682 155,84.344 155,84C155,84 155,84 155,84C155,82.862 155,81.506 155.004,80.705C155.004,80.135 155.167,79.58 155.469,79.103ZM178,85L158,85C157.735,85 157.48,84.895 157.293,84.707C157.105,84.52 157,84.265 157,84C157,82.865 157,81.515 157.004,80.711C157.004,80.709 157.004,80.707 157.004,80.705C157.004,80.475 157.084,80.253 157.229,80.075C158.47,78.658 162.22,75 168,75C174.542,75 177.827,78.651 178.832,80.028C178.943,80.197 179,80.388 179,80.583L179,84C179,84.265 178.895,84.52 178.707,84.707C178.52,84.895 178.265,85 178,85ZM180.828,85L188,85C188.552,85 189,84.552 189,84L189,82.631C189,82.41 188.927,82.196 188.793,82.021C187.969,81.021 185.829,79 182,79C181.507,79 181.042,79.033 180.604,79.093C180.863,79.546 181,80.06 181,80.585L181,84C181,84.344 180.941,84.682 180.828,85ZM154,67C151.24,67 149,69.24 149,72C149,74.76 151.24,77 154,77C156.76,77 159,74.76 159,72C159,69.24 156.76,67 154,67ZM182,67C179.24,67 177,69.24 177,72C177,74.76 179.24,77 182,77C184.76,77 187,74.76 187,72C187,69.24 184.76,67 182,67ZM168,59C164.137,59 161,62.137 161,66C161,69.863 164.137,73 168,73C171.863,73 175,69.863 175,66C175,62.137 171.863,59 168,59Z" transform="translate(-144 -48)"></path>
                        </svg>
                        <button onClick={() => dispatch({ type: 'SHOW' })} type="button" data-hs-overlay="#hs-overlay-example">
                            <svg viewBox="0 0 24 24" width="24" height="24">
                                <path fill="text-gary-700"
                                    d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z">
                                </path>
                            </svg>
                        </button>
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <path fill="text-gary-700"
                                d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z">
                            </path>
                        </svg>
                    </div>
                </div>

                <div class="flex flex-col space-y-2 flex-grow">
                    <div class="flex flex-col space-y-4 flex-grow mt-2">
                        <div class="flex space-x-2 items-center px-4 pb-2 border-b">
                            <div class="flex-grow flex items-center space-x-2 bg-gray-200 py-1 px-4 rounded-md">
                                <svg viewBox="0 0 24 24" width="24" height="24" class="cursor-pointer">
                                    <path fill="text-gray-700"
                                        d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z">
                                    </path>
                                </svg>
                                <input type="search" class="focus:outline-none bg-gray-200 w-full text-gray-500 text-xs"
                                    placeholder="Search chat" />
                            </div>
                            {/* <svg viewBox="0 0 24 24" width="20" height="20" class="cursor-pointer">
                                <path fill="#aebac1" d="M10 18.1h4v-2h-4v2zm-7-12v2h18v-2H3zm3 7h12v-2H6v2z"></path>
                            </svg>  */}
                        </div>

                        <div class="overflow-x-hidden overflow-y-auto flex-grow scroller h-10">
                            {
                                myChats.map((items, i) => {
                                    return (
                                        <button key={i} onClick={accessChatMsg.bind(this, items)} class={`flex items-center w-full px-4 py-2 border-b transition-colors duration-200 gap-x-2 ${selectUser._id===items._id ? "bg-gray-200":"bg-white hover:bg-gray-200"} dark:hover:bg-gray-800 focus:outline-none`}>
                                            <img class="object-cover w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100" alt="" />

                                            <div className='flex justify-between w-full'>
                                                <div class="text-left rtl:text-right space-y-1">
                                                    <h1 class="text-sm font-medium text-gray-700 capitalize dark:text-white">
                                                        {items.isGroupChat ? 
                                                            items.chatName : getSender(items.users, getUserDetails())
                                                        }
                                                    </h1>

                                                    <p class="text-xs text-gray-500 dark:text-gray-400">1.2 Followers</p>
                                                </div>
                                                <div class="flex flex-col flex-none text-xs items-end space-y-2 w-20 pr-2">
                                                    <p class="text-xs text-gray-500 dark:text-gray-400">03/08/2023</p>
                                                    <div class="flex bg-[#00a884] justify-center text-xs items-center rounded-full w-4 h-4 text-black">
                                                        1
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    )
                                })
                            }
                            {/* <button class="flex items-center w-full px-4 py-2 border-b transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 bg-white hover:bg-gray-200 focus:outline-none">
                                <img class="object-cover w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100" alt="" />

                                <div className='flex justify-between w-full'>
                                    <div class="text-left rtl:text-right space-y-1">
                                        <h1 class="text-sm font-medium text-gray-700 capitalize dark:text-white">arthur melo</h1>

                                        <p class="text-xs text-gray-500 dark:text-gray-400">1.2 Followers</p>
                                    </div>
                                    <div class="flex flex-col flex-none text-xs items-end space-y-2 w-20 pr-2">
                                        <p class="text-xs text-gray-500 dark:text-gray-400">03/08/2023</p>
                                            <div class="flex bg-[#00a884] justify-center text-xs items-center rounded-full w-4 h-4 text-black">
                                                1
                                            </div>
                                    </div>
                                </div>
                            </button> */}

                            {/* <button class="flex items-center w-full px-4 py-2 border-b transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 bg-white hover:bg-gray-200 focus:outline-none">
                                <img class="object-cover w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&h=880&q=80" alt="" />

                                <div className='flex justify-between w-full'>
                                    <div class="text-left rtl:text-right space-y-1">
                                        <h1 class="text-sm font-medium text-gray-700 capitalize dark:text-white">arthur melo</h1>

                                        <p class="text-xs text-gray-500 dark:text-gray-400">1.2 Followers</p>
                                    </div>
                                    <div class="flex flex-col flex-none text-xs items-end space-y-2 w-20 pr-2">
                                        <p class="text-xs text-gray-500 dark:text-gray-400">03/08/2023</p>
                                            <div class="flex bg-[#00a884] justify-center text-xs items-center rounded-full w-4 h-4 text-black">
                                                1
                                            </div>
                                    </div>
                                </div>
                            </button>
                            <button class="flex items-center w-full px-4 py-2 border-b transition-colors duration-200 bg-gray-200 dark:bg-gray-800 gap-x-2 focus:outline-none">
                                <div class="relative">
                                    <img class="object-cover w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&h=764&q=100" alt="" />
                                    <span class="h-2 w-2 rounded-full bg-emerald-500 absolute right-0.5 ring-1 ring-white bottom-0"></span>
                                </div>

                                <div className='flex justify-between w-full'>
                                    <div class="text-left rtl:text-right space-y-1">
                                        <h1 class="text-sm font-medium text-gray-700 capitalize dark:text-white">arthur melo</h1>

                                        <p class="text-xs text-gray-500 dark:text-gray-400">1.2 Followers</p>
                                    </div>
                                    <div class="flex flex-col flex-none text-xs items-end space-y-2 w-20 pr-2">
                                        <p class="text-xs text-gray-500 dark:text-gray-400">03/08/2023</p>
                                            <div class="flex bg-[#00a884] justify-center text-xs items-center rounded-full w-4 h-4 text-black">
                                                1
                                            </div>
                                    </div>
                                </div>
                            </button>
                            <button class="flex items-center w-full px-4 py-2 border-b transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 bg-white hover:bg-gray-200 focus:outline-none">
                                <img class="object-cover w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100" alt="" />

                                <div class="text-left rtl:text-right space-y-1">
                                    <h1 class="text-sm font-medium text-gray-700 capitalize dark:text-white">Mia John</h1>

                                    <p class="text-xs text-gray-500 dark:text-gray-400">11.2 Followers</p>
                                </div>
                            </button>

                            <button class="flex items-center w-full px-4 py-2 border-b transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 bg-white hover:bg-gray-200 focus:outline-none">
                                <img class="object-cover w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&h=880&q=80" alt="" />

                                <div className='flex justify-between w-full'>
                                    <div class="text-left rtl:text-right space-y-1">
                                        <h1 class="text-sm font-medium text-gray-700 capitalize dark:text-white">arthur melo</h1>

                                        <p class="text-xs text-gray-500 dark:text-gray-400">1.2 Followers</p>
                                    </div>
                                    <div class="flex flex-col flex-none text-xs items-end space-y-2 w-20 pr-2">
                                        <p class="text-xs text-gray-500 dark:text-gray-400">03/08/2023</p>
                                            <div class="flex bg-[#00a884] justify-center text-xs items-center rounded-full w-4 h-4 text-black">
                                                1
                                            </div>
                                    </div>
                                </div>
                            </button>
                            <button class="flex items-center w-full px-4 py-2 transition-colors duration-200 bg-gray-200 dark:bg-gray-800 gap-x-2 focus:outline-none">
                                <div class="relative">
                                    <img class="object-cover w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&h=764&q=100" alt="" />
                                    <span class="h-2 w-2 rounded-full bg-emerald-500 absolute right-0.5 ring-1 ring-white bottom-0"></span>
                                </div>

                                <div className='flex justify-between w-full'>
                                    <div class="text-left rtl:text-right space-y-1">
                                        <h1 class="text-sm font-medium text-gray-700 capitalize dark:text-white">arthur melo</h1>

                                        <p class="text-xs text-gray-500 dark:text-gray-400">1.2 Followers</p>
                                    </div>
                                    <div class="flex flex-col flex-none text-xs items-end space-y-2 w-20 pr-2">
                                        <p class="text-xs text-gray-500 dark:text-gray-400">03/08/2023</p>
                                            <div class="flex bg-[#00a884] justify-center text-xs items-center rounded-full w-4 h-4 text-black">
                                                1
                                            </div>
                                    </div>
                                </div>
                            </button>
                            <button class="flex items-center w-full px-4 py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 bg-white hover:bg-gray-200 focus:outline-none">
                                <img class="object-cover w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100" alt="" />

                                <div class="text-left rtl:text-right space-y-1">
                                    <h1 class="text-sm font-medium text-gray-700 capitalize dark:text-white">Mia John</h1>

                                    <p class="text-xs text-gray-500 dark:text-gray-400">11.2 Followers</p>
                                </div>
                            </button>

                            <button class="flex items-center w-full px-4 py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 bg-white hover:bg-gray-200 focus:outline-none">
                                <img class="object-cover w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&h=880&q=80" alt="" />

                                <div className='flex justify-between w-full'>
                                    <div class="text-left rtl:text-right space-y-1">
                                        <h1 class="text-sm font-medium text-gray-700 capitalize dark:text-white">arthur melo</h1>

                                        <p class="text-xs text-gray-500 dark:text-gray-400">1.2 Followers</p>
                                    </div>
                                    <div class="flex flex-col flex-none text-xs items-end space-y-2 w-20 pr-2">
                                        <p class="text-xs text-gray-500 dark:text-gray-400">03/08/2023</p>
                                            <div class="flex bg-[#00a884] justify-center text-xs items-center rounded-full w-4 h-4 text-black">
                                                1
                                            </div>
                                    </div>
                                </div>
                            </button>
                            <button class="flex items-center w-full px-4 py-2 transition-colors duration-200 bg-gray-200 dark:bg-gray-800 gap-x-2 focus:outline-none">
                                <div class="relative">
                                    <img class="object-cover w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&h=764&q=100" alt="" />
                                    <span class="h-2 w-2 rounded-full bg-emerald-500 absolute right-0.5 ring-1 ring-white bottom-0"></span>
                                </div>

                                <div className='flex justify-between w-full'>
                                    <div class="text-left rtl:text-right space-y-1">
                                        <h1 class="text-sm font-medium text-gray-700 capitalize dark:text-white">arthur melo</h1>

                                        <p class="text-xs text-gray-500 dark:text-gray-400">1.2 Followers</p>
                                    </div>
                                    <div class="flex flex-col flex-none text-xs items-end space-y-2 w-20 pr-2">
                                        <p class="text-xs text-gray-500 dark:text-gray-400">03/08/2023</p>
                                            <div class="flex bg-[#00a884] justify-center text-xs items-center rounded-full w-4 h-4 text-black">
                                                1
                                            </div>
                                    </div>
                                </div>
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default MyChat
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ChangePasswordRequest, Logout, ProfileDetailsRequest, UpdateProfileRequest } from '../apiRequest/authRequest'
import { getUserDetails } from '../helper/sessionHelper'
import { ErrorToast, IsEmpty, IsPassword, getBase64 } from '../helper/formHelper'
import { useSelector } from 'react-redux'
import NotificationBadge from 'react-notification-badge'
import { Effect } from 'react-notification-badge';
import { setSelectUser } from '../redux/state/chatSlice'
import { emptyNotification, removeNotification } from '../redux/state/settingSlice'
import store from '../redux/store/store'

const Header = () => {
    let fname, lname, image, imageView, oPassword, nPassword = useRef()
    const [toggle, setToggle] = useState(false)
    const navigate = useNavigate()
    let location = useLocation()
    const notifications = useSelector((state) => state.setting.notifications)

    const onProfile = async () => {
        await ProfileDetailsRequest()
    }

    const ProfileData = useSelector((state) => state.profile.profile);

    useEffect(() => {
        oPassword.value = ''
        nPassword.value = ''
        imageView.value = ProfileData.photo
    }, [location])

    const onSave = async () => {
        let photo = imageView.src;

        if (IsEmpty(fname.value)) {
            ErrorToast("Firstname required !")
        }
        else if (IsEmpty(lname.value)) {
            ErrorToast("Lastname Required !")
        }
        else {
            UpdateProfileRequest(fname.value, lname.value, photo).then((result) => {
                if (result) navigate('/chat')
            })
        }
    }

    const onSavePass = async () => {

        if (IsPassword(nPassword.value)) {
            ErrorToast("Password must be six characters, at least one letter and one number !")
        }
        else {
            ChangePasswordRequest(oPassword.value, nPassword.value).then((result) => {
                if (result) navigate('/chat')
            })
        }
    }

    const previewImage = () => {
        let ImgFile = image.files[0];
        getBase64(ImgFile).then((base64Img) => {
            imageView.src = base64Img;
        })
    }

    return (
        <Fragment>
            <div class="flex justify-between bg-[#0C7075] px-4 py-2 z-10">
                <div class="logo flex items-center cursor-pointer">
                    <span class="text-2xl font-bold text-white">Instachat.</span>
                </div>
                <div class="flex items-center space-x-3 lg:space-x-8">
                    <div className="px-1 h-35">
                        <button onClick={() => setToggle(!toggle)}>
                            <NotificationBadge count={notifications.length} effect={Effect.SCALE} />
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 512 512" id="bell">
                                <path fill="#aebac1" d="M381.7 225.9c0-97.6-52.5-130.8-101.6-138.2 0-.5.1-1 .1-1.6 0-12.3-10.9-22.1-24.2-22.1-13.3 0-23.8 9.8-23.8 22.1 0 .6 0 1.1.1 1.6-49.2 7.5-102 40.8-102 138.4 0 113.8-28.3 126-66.3 158h384c-37.8-32.1-66.3-44.4-66.3-158.2zM256.2 448c26.8 0 48.8-19.9 51.7-43H204.5c2.8 23.1 24.9 43 51.7 43z">
                                </path>
                            </svg>
                        </button>
                        <div className={`absolute ${toggle ? 'block' : 'hidden'} right-6 md:right-24 z-10 mt-2 w-60 md:w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                            {
                                notifications?.length > 0 ? (
                                    <div onClick={()=>setToggle(!toggle)} className="p-1">
                                        {
                                            notifications.map((n, i)=>{
                                                return(
                                                    <span key={i} className="text-gray-700 block px-2 md:px-4 py-2 text-sm hover:bg-gray-300 cursor-pointer"
                                                    onClick={()=>{
                                                        store.dispatch(setSelectUser(n.chat))
                                                        store.dispatch(removeNotification(n.chat))
                                                    }}
                                                    >
                                                    {
                                                        n.chat.isGroupChat ? `New message in ${n.chat.chatName}` : 
                                                        `New message from ${n.sender.firstname} ${n.sender.lastname}`
                                                    }
                                                    </span>
                                                )
                                            })
                                        }
                                        <span onClick={()=>store.dispatch(emptyNotification())} className="text-gray-700 text-center border-t block px-2 md:px-4 py-2 text-sm md:text-md font-medium cursor-pointer">Mark as read</span>
                                    </div>
                                ) : (
                                    <div className="p-1">
                                        <span className="text-gray-700 text-center block px-4 py-2 text-md font-medium">No New Message.</span>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="dropdown dropdown-end dropdown-hover">
                        <img tabIndex={0} src={getUserDetails().photo} class="rounded-full h-12 w-12 object-fill" alt="Profile Image" />
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-[#ffff] text-black rounded-box w-52">
                            <li><label onClick={onProfile} htmlFor="my-modal-3" className='hover:bg-gray-200'>Profile</label></li>
                            <li><label htmlFor="my-modal-2" className='hover:bg-gray-200'>Change Password</label></li>
                            <li><label onClick={Logout} className='hover:bg-gray-200'>Logout</label></li>
                        </ul>
                    </div>
                </div>
            </div>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">My Profile</h3>
                    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <div class="space-y-4 md:space-y-6">
                                <div class="profile flex justify-center ">
                                    <img ref={(i) => imageView = i} src={ProfileData.photo} class="w-24 h-24 object-cover rounded-full" alt="Profile image" />
                                    <div class="w-24 h-24 group hover:bg-gray-200 opacity-60 rounded-full absolute flex justify-center items-center cursor-pointer transition duration-500">
                                        <img class="hidden absolute group-hover:block w-8" for="file-input" src="https://www.svgrepo.com/show/33565/upload.svg" alt="" />
                                        <input
                                            onChange={previewImage} ref={(input) => image = input}
                                            type="file"
                                            accept='image/*'
                                            className='absolute opacity-0 w-24 h-24 cursor-pointer rounded-full'
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label for="fname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Firstname</label>
                                    <input ref={(i) => fname = i} defaultValue={ProfileData.firstname} type="text" name="fname" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g. John" required="" />
                                </div>
                                <div>
                                    <label for="lname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lastname</label>
                                    <input ref={(i) => lname = i} defaultValue={ProfileData.lastname} type="text" name="lname" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g. Doe" required="" />
                                </div>
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input defaultValue={ProfileData.email} disabled type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                </div>
                                <button onClick={onSave} type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <input type="checkbox" id="my-modal-2" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal-2" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Change Password</h3>
                    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <div class="space-y-4 md:space-y-6">
                                <div>
                                    <label for="fname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Old Password</label>
                                    <input ref={(i) => oPassword = i} type="password" name="fname" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" required="" />
                                </div>
                                <div>
                                    <label for="lname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                                    <input ref={(i) => nPassword = i} type="password" name="lname" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" required="" />
                                </div>
                                <button onClick={onSavePass} type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>

    )
}

export default Header
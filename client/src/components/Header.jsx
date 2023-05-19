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
            <div className="flex justify-between bg-[#0C7075] px-4 py-2 z-10">
                <div className="logo flex items-center cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0,0,256,256"
                        style={{ fill: "#000000" }}>
                        <g fill="#ffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style={{ mixBlendMode: "normal" }}><g transform="scale(5.12,5.12)"><path d="M12.00781,0c-0.26656,-0.00206 -0.52291,0.10239 -0.71213,0.29015c-0.18922,0.18776 -0.29566,0.44329 -0.29568,0.70985v12.35352c-0.00045,0.38468 0.21978,0.73553 0.56641,0.90234l18,8.64649c0.31871,0.15285 0.69443,0.12612 0.98828,-0.07031l9,-6c0.29056,-0.19328 0.45936,-0.52403 0.4454,-0.87272c-0.01396,-0.34869 -0.20867,-0.66489 -0.51376,-0.83431l-27,-15c-0.14652,-0.08107 -0.31106,-0.12405 -0.47852,-0.125zM13,2.70117l24.08008,13.37695l-7.16016,4.77344l-16.91992,-8.12695zM11.95898,17c-0.53618,0.02206 -0.95938,0.46337 -0.95898,1v31c0.00047,0.01108 0.00112,0.02215 0.00195,0.0332c0.00131,0.0294 0.00392,0.05872 0.00781,0.08789c0.00053,0.00912 0.00118,0.01824 0.00195,0.02734c0.00357,0.02556 0.00813,0.05097 0.01367,0.07617c0.00246,0.0098 0.00506,0.01957 0.00781,0.0293c0.00476,0.01706 0.00997,0.034 0.01563,0.05078c0.00916,0.02845 0.01958,0.05647 0.03125,0.08398c0.01282,0.03064 0.02716,0.06063 0.04297,0.08984c0.01612,0.02951 0.03372,0.0582 0.05273,0.08594c0.01481,0.02144 0.03044,0.04229 0.04688,0.0625c0.00952,0.01128 0.01929,0.02235 0.0293,0.0332c0.01016,0.0113 0.02058,0.02237 0.03125,0.0332c0.00894,0.00929 0.01805,0.01841 0.02734,0.02734c0.01638,0.01621 0.03332,0.03184 0.05078,0.04688c0.00962,0.008 0.01939,0.01581 0.0293,0.02344c0.01592,0.01221 0.0322,0.02393 0.04883,0.03516c0.00965,0.00668 0.01942,0.01319 0.0293,0.01953c0.02535,0.01614 0.05142,0.03113 0.07813,0.04492c0.02553,0.01283 0.05159,0.02456 0.07813,0.03516c0.00777,0.00335 0.01558,0.00661 0.02344,0.00977c0.01614,0.00562 0.03242,0.01083 0.04883,0.01563c0.01999,0.00649 0.04018,0.01236 0.06055,0.01758c0.01102,0.00279 0.02209,0.0054 0.0332,0.00781c0.01619,0.00366 0.03247,0.00692 0.04883,0.00977c0.02463,0.00353 0.04939,0.00613 0.07422,0.00781c0.0052,0.00069 0.01041,0.00134 0.01563,0.00195c0.00391,0.00002 0.00781,0.00002 0.01172,0c0.02925,0.00194 0.05858,0.00259 0.08789,0.00195c0.03331,-0.00094 0.06656,-0.00355 0.09961,-0.00781c0.02621,-0.00352 0.05227,-0.00808 0.07813,-0.01367c0.00718,-0.00122 0.01434,-0.00253 0.02149,-0.00391c0.01046,-0.00244 0.02088,-0.00504 0.03125,-0.00781c0.0217,-0.00579 0.04319,-0.0123 0.06445,-0.01953c0.00065,0 0.0013,0 0.00195,0c0.03053,-0.01091 0.06052,-0.02329 0.08984,-0.03711c0.02726,-0.01182 0.05398,-0.02486 0.08008,-0.03906l28,-16c0.31186,-0.17821 0.5042,-0.50996 0.50391,-0.86914v-13c-0.00008,-0.40744 -0.24733,-0.77411 -0.62504,-0.92691c-0.37771,-0.1528 -0.81035,-0.06119 -1.09371,0.23159l-25.0957,25.99219l6.76953,-22.00195c0.13351,-0.43334 -0.04124,-0.90228 -0.42578,-1.14258l-8,-5c-0.17045,-0.10701 -0.36921,-0.1601 -0.57031,-0.15234zM13,19.80469l5.81836,3.63672l-5.81836,18.91016zM39,22.47461v9.94531l-21.41797,12.23828z"></path></g></g>
                    </svg>
                    <span class="text-2xl font-bold text-white ">Instachat.</span>
                </div>
                <div className="flex items-center space-x-3 lg:space-x-8">
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
                                    <div onClick={() => setToggle(!toggle)} className="p-1">
                                        {
                                            notifications.map((n, i) => {
                                                return (
                                                    <span key={i} className="text-gray-700 block px-2 md:px-4 py-2 text-sm hover:bg-gray-300 cursor-pointer"
                                                        onClick={() => {
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
                                        <span onClick={() => store.dispatch(emptyNotification())} className="text-gray-700 text-center border-t block px-2 md:px-4 py-2 text-sm md:text-md font-medium cursor-pointer">Mark as read</span>
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
                        <img tabIndex={0} src={getUserDetails().photo} className="rounded-full h-12 w-12 object-fill" alt="Profile pic" />
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
                <div className="modal-box overflow-hidden relative">
                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">My Profile</h3>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <div className="space-y-4 md:space-y-6">
                                <div className="profile flex justify-center ">
                                    <img ref={(i) => imageView = i} src={ProfileData.photo} className="w-24 h-24 object-cover rounded-full" alt="Profile pic" />
                                    <div className="w-24 h-24 group hover:bg-gray-200 opacity-60 rounded-full absolute flex justify-center items-center cursor-pointer transition duration-500">
                                        <img className="hidden absolute group-hover:block w-8" for="file-input" src="https://www.svgrepo.com/show/33565/upload.svg" alt="" />
                                        <input
                                            onChange={previewImage} ref={(input) => image = input}
                                            type="file"
                                            accept='image/*'
                                            className='absolute opacity-0 w-24 h-24 cursor-pointer rounded-full'
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label for="fname" className="block mb-2 text-sm font-medium text-gray-900 ">Firstname</label>
                                    <input ref={(i) => fname = i} defaultValue={ProfileData.firstname} type="text" name="fname" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-[#0c7075] dark:focus:border-[#0c7075]" placeholder="e.g. John" required="" />
                                </div>
                                <div>
                                    <label for="lname" className="block mb-2 text-sm font-medium text-gray-900 ">Lastname</label>
                                    <input ref={(i) => lname = i} defaultValue={ProfileData.lastname} type="text" name="lname" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-[#0c7075] dark:focus:border-[#0c7075]" placeholder="e.g. Doe" required="" />
                                </div>
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                                    <input defaultValue={ProfileData.email} disabled type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-[#0c7075] dark:focus:border-[#0c7075]" placeholder="name@company.com" required="" />
                                </div>
                                <button onClick={onSave} type="submit" className="w-full text-white bg-primary-600 hover:bg-[#0e858b] focus:ring-4 focus:outline-none focus:ring-[#3da9af] font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-[#12979e] dark:focus:ring-[#0f979e]">Save</button>
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
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <div className="space-y-4 md:space-y-6">
                                <div>
                                    <label for="fname" className="block mb-2 text-sm font-medium text-gray-900 ">Old Password</label>
                                    <input ref={(i) => oPassword = i} type="password" name="fname" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-[#0e888f] dark:focus:border-[#1d898f]" placeholder="••••••••" required="" />
                                </div>
                                <div>
                                    <label for="lname" className="block mb-2 text-sm font-medium text-gray-900 ">New Password</label>
                                    <input ref={(i) => nPassword = i} type="password" name="lname" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-[#0e8d94] dark:focus:border-[#1b868b]" placeholder="••••••••" required="" />
                                </div>
                                <button onClick={onSavePass} type="submit" className="w-full text-white bg-primary-600 hover:bg-[#11878d] focus:ring-4 focus:outline-none focus:ring-[#65c2c7] font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-[#12959c] dark:focus:ring-[#0b6064]">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>

    )
}

export default Header
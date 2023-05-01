import React, { Fragment, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Logout, ProfileDetailsRequest } from '../apiRequest/authRequest'
import { getUserDetails } from '../helper/sessionHelper'
import { getBase64 } from '../helper/formHelper'
import { useSelector } from 'react-redux'

const Header = () => {
    let fname, lname, email, image = useRef()

    useEffect(()=>{
        ProfileDetailsRequest()
    }, [])
      const ProfileData = useSelector((state) => state.profile.profile);
    const onSave = async () =>{

    }
    const previewImage = () =>{
        let ImgFile = image.files[0];
        getBase64(ImgFile).then((base64Img)=>{
            image.src=base64Img;
        })
    }
    return (
        <Fragment>
            <div class="flex justify-between bg-[#202c33] px-4 py-2">
                <div class="logo flex items-center cursor-pointer">
                    <span class="text-2xl font-bold text-white">Instachat.</span>
                </div>
                <div class="flex items-center space-x-8">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path fill="#aebac1"
                            d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z">
                        </path>
                    </svg>
                    <div className="dropdown dropdown-end dropdown-hover">
                        <img tabIndex={0} src={getUserDetails().photo} class="rounded-full h-12 w-12" alt="Profile Image" />
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-[#0b141a] text-[#aebac1] rounded-box w-52">
                            <li><label htmlFor="my-modal-3" className='hover:bg-[#202c33]'>Profile</label></li>
                            <li><Link className='hover:bg-[#202c33]'>Change Password</Link></li>
                            <li><Link onClick={Logout} className='hover:bg-[#202c33]'>Logout</Link></li>
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
                                    <img class="w-24 h-24 rounded-full " src="https://apicms.thestar.com.my/uploads/images/2022/06/09/1616593.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
                                    <div class="w-24 h-24 group hover:bg-gray-200 opacity-60 rounded-full absolute flex justify-center items-center cursor-pointer transition duration-500">
                                        <img ref={(input)=>image=input} class="hidden absolute group-hover:block w-8" for="file-input" src="https://www.svgrepo.com/show/33565/upload.svg" alt="" />
                                        <input
                                             onChange={previewImage}  ref={(input)=>image=input}
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
                                    <input ref={(i) => email = i} defaultValue={ProfileData.email} disabled type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                </div>
                                <button onClick={onSave} type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>

    )
}

export default Header
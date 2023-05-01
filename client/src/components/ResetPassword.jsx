import React, { Fragment, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ErrorToast, IsPassword } from '../helper/formHelper'
import { ResetPasswordRequest } from '../apiRequest/authRequest'

const ResetPassword = () => {
    let npassword, cpassword = useRef()
    let navigate = useNavigate()
    let params = useParams()

    const onReset = async () =>{
        if(IsPassword(npassword.value)){
            ErrorToast("Password must be six characters, at least one letter and one number !")
        }else if(npassword.value !== cpassword.value){
            ErrorToast("Password doesn't match with confirm password.")
        }else{
          await ResetPasswordRequest(npassword.value, params.token).then((result)=>{
            if(result) navigate('/')
          })
        }
      }
  return (
    <Fragment>
            <section class="bg-gray-50 dark:bg-gray-900">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
                            Instachat
                    </a>
                    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Reset Password
                            </h1>
                            <div class="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                                    <input ref={(i)=>npassword=i} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                                </div>
                                <div>
                                    <label for="Cpassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                    <input ref={(i)=>cpassword=i} type="password" name="Cpassword" id="Cpassword" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                                </div>
                                <button onClick={onReset} type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Save</button>
                                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <Link to="/" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
  )
}

export default ResetPassword

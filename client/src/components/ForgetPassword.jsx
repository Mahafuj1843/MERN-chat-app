import React, { Fragment, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ForgetPasswordRequest } from '../apiRequest/authRequest'
import { ErrorToast, IsEmail } from '../helper/formHelper'

const ForgetPassword = () => {
    let email = useRef()
    const navigate = useNavigate()

    const onSend = async () => {
        if (email.value) {
            if (IsEmail(email.value)) {
                ErrorToast("Invalid email address.")
            }
            else {
                await ForgetPasswordRequest(email.value).then((result) => {
                    if (result) navigate('/')
                })
            }
        }
    }
    return (
        <Fragment>
            <section className="bg-gray-50 ">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0,0,256,256"
                            style={{ fill: "#000000" }}>
                            <g fill="#0c7075" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style={{ mixBlendMode: "normal" }}><g transform="scale(5.12,5.12)"><path d="M12.00781,0c-0.26656,-0.00206 -0.52291,0.10239 -0.71213,0.29015c-0.18922,0.18776 -0.29566,0.44329 -0.29568,0.70985v12.35352c-0.00045,0.38468 0.21978,0.73553 0.56641,0.90234l18,8.64649c0.31871,0.15285 0.69443,0.12612 0.98828,-0.07031l9,-6c0.29056,-0.19328 0.45936,-0.52403 0.4454,-0.87272c-0.01396,-0.34869 -0.20867,-0.66489 -0.51376,-0.83431l-27,-15c-0.14652,-0.08107 -0.31106,-0.12405 -0.47852,-0.125zM13,2.70117l24.08008,13.37695l-7.16016,4.77344l-16.91992,-8.12695zM11.95898,17c-0.53618,0.02206 -0.95938,0.46337 -0.95898,1v31c0.00047,0.01108 0.00112,0.02215 0.00195,0.0332c0.00131,0.0294 0.00392,0.05872 0.00781,0.08789c0.00053,0.00912 0.00118,0.01824 0.00195,0.02734c0.00357,0.02556 0.00813,0.05097 0.01367,0.07617c0.00246,0.0098 0.00506,0.01957 0.00781,0.0293c0.00476,0.01706 0.00997,0.034 0.01563,0.05078c0.00916,0.02845 0.01958,0.05647 0.03125,0.08398c0.01282,0.03064 0.02716,0.06063 0.04297,0.08984c0.01612,0.02951 0.03372,0.0582 0.05273,0.08594c0.01481,0.02144 0.03044,0.04229 0.04688,0.0625c0.00952,0.01128 0.01929,0.02235 0.0293,0.0332c0.01016,0.0113 0.02058,0.02237 0.03125,0.0332c0.00894,0.00929 0.01805,0.01841 0.02734,0.02734c0.01638,0.01621 0.03332,0.03184 0.05078,0.04688c0.00962,0.008 0.01939,0.01581 0.0293,0.02344c0.01592,0.01221 0.0322,0.02393 0.04883,0.03516c0.00965,0.00668 0.01942,0.01319 0.0293,0.01953c0.02535,0.01614 0.05142,0.03113 0.07813,0.04492c0.02553,0.01283 0.05159,0.02456 0.07813,0.03516c0.00777,0.00335 0.01558,0.00661 0.02344,0.00977c0.01614,0.00562 0.03242,0.01083 0.04883,0.01563c0.01999,0.00649 0.04018,0.01236 0.06055,0.01758c0.01102,0.00279 0.02209,0.0054 0.0332,0.00781c0.01619,0.00366 0.03247,0.00692 0.04883,0.00977c0.02463,0.00353 0.04939,0.00613 0.07422,0.00781c0.0052,0.00069 0.01041,0.00134 0.01563,0.00195c0.00391,0.00002 0.00781,0.00002 0.01172,0c0.02925,0.00194 0.05858,0.00259 0.08789,0.00195c0.03331,-0.00094 0.06656,-0.00355 0.09961,-0.00781c0.02621,-0.00352 0.05227,-0.00808 0.07813,-0.01367c0.00718,-0.00122 0.01434,-0.00253 0.02149,-0.00391c0.01046,-0.00244 0.02088,-0.00504 0.03125,-0.00781c0.0217,-0.00579 0.04319,-0.0123 0.06445,-0.01953c0.00065,0 0.0013,0 0.00195,0c0.03053,-0.01091 0.06052,-0.02329 0.08984,-0.03711c0.02726,-0.01182 0.05398,-0.02486 0.08008,-0.03906l28,-16c0.31186,-0.17821 0.5042,-0.50996 0.50391,-0.86914v-13c-0.00008,-0.40744 -0.24733,-0.77411 -0.62504,-0.92691c-0.37771,-0.1528 -0.81035,-0.06119 -1.09371,0.23159l-25.0957,25.99219l6.76953,-22.00195c0.13351,-0.43334 -0.04124,-0.90228 -0.42578,-1.14258l-8,-5c-0.17045,-0.10701 -0.36921,-0.1601 -0.57031,-0.15234zM13,19.80469l5.81836,3.63672l-5.81836,18.91016zM39,22.47461v9.94531l-21.41797,12.23828z"></path></g></g>
                        </svg>
                        Instachat
                    </a>
                    <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                Forgot Your Password?
                            </h1>
                            <p className="mb-4 text-sm text-gray-700 ">
                                We get it, stuff happens. Just enter your email address below and we'll send you a
                                mail to reset your password.
                            </p>
                            <div className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                    <input ref={(i) => email = i} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#0C7075] focus:border-[#0C7075] block w-full p-2.5 " placeholder="name@company.com" required="" />
                                </div>
                                <button onClick={onSend} type="submit" className="w-full text-white bg-[#0C7075] hover:bg-[#138288] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Send Password Reset Mail</button>
                                <p className="text-sm font-light text-gray-500 ">
                                    Don’t have an account yet? <Link to="/register" className="font-medium text-[#0C7075] hover:underline">Sign up</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default ForgetPassword

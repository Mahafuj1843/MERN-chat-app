import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/formHelper";
import { getToken, removeSessions, setToken, setUserDetails } from "../helper/sessionHelper";
import { hideLoader, showLoader } from "../redux/state/settingSlice";
import store from "../redux/store/store";
const BaseURL = "http://localhost:8100/api"
const AxiosHeader = { headers: { "token": getToken() } }

export const RegistrationRequest = (firstname, lastname, email, password) => {
    store.dispatch(showLoader())
    let URL = BaseURL + "/auth/register";
    let PostBody = { firstname: firstname, lastname: lastname, email: email, password: password }
    return axios.post(URL, PostBody).then((res) => {
        store.dispatch(hideLoader())
        if (res.status === 200) {
            SuccessToast("Registration Successfull.")
            return true;
        } else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err) => {
        store.dispatch(hideLoader())
        if (err.response.data.status === 400) {
            ErrorToast(err.response.data.message)
            return false;
        } else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    })
}

export const LoginRequest = (email, password) => {
    store.dispatch(showLoader())
    let URL = BaseURL + "/auth/login";
    let PostBody = { email: email, password: password }
    return axios.post(URL, PostBody).then((res) => {
        store.dispatch(hideLoader())
        if (res.status === 200) {
            setToken(res.data.token)
            setUserDetails(res.data.data)
            SuccessToast("Login Successfull.")
            return true;
        } else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err) => {
        store.dispatch(hideLoader())
        if (err.response.data.status === 400) {
            ErrorToast(err.response.data.message)
            return false;
        } else if (err.response.data.status === 404) {
            ErrorToast(err.response.data.message)
            return false;
        } else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    })
}

export const Logout = async() =>{
    store.dispatch(showLoader())
    let URL = BaseURL + "/auth/logout";

    return await axios.get(URL).then((res) => {
        store.dispatch(hideLoader())
        if (res.status === 200) {
            removeSessions()
            SuccessToast("Logout Successfull.")
            return true;
        } else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err) => {
        store.dispatch(hideLoader())
        ErrorToast("Something Went Wrong")
        return false;
    })
}

export const ForgetPasswordRequest = (email) =>{
    store.dispatch(showLoader())
    let URL = BaseURL + "/auth/forgotPassword";
    let PostBody = { email: email }
    return axios.post(URL, PostBody).then((res) => {
        store.dispatch(hideLoader())
        if (res.status === 200) {
            SuccessToast(res.data)
            return true;
        } else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err) => {
        store.dispatch(hideLoader())
        if (err.response.data.status === 404) {
            ErrorToast(err.response.data.message)
            return false;
        } else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    })
}

export const ResetPasswordRequest = (password, resetToken) =>{
    store.dispatch(showLoader())
    let PostBody = { password: password }
    let URL = BaseURL + "/auth/resetPassword/"+resetToken;
    return axios.put(URL, PostBody).then((res) => {
        store.dispatch(hideLoader())
        if (res.status === 200) {
            SuccessToast(res.data)
            return true;
        } else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err) => {
        store.dispatch(hideLoader())
        if (err.response.data.status === 401) {
            ErrorToast(err.response.data.message)
            return false;
        } else if (err.response.data.status === 404) {
            ErrorToast(err.response.data.message)
            return false;
        } else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    })
}

export const ProfileDetailsRequest = () =>{
    store.dispatch(showLoader())
    let URL = BaseURL + "/auth/profile/details";
    return axios.get(URL, AxiosHeader).then((res) => {
        store.dispatch(hideLoader())
        if (res.status === 200) {
            store.dispatch(setProfile(res.data.data))
            return true;
        } else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err) => {
        store.dispatch(hideLoader())
        if (err.response.data.status === 400) {
            ErrorToast(err.response.data.message)
            return false;
        } else if (err.response.data.status === 404) {
            ErrorToast(err.response.data.message)
            return false;
        } else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    })
}
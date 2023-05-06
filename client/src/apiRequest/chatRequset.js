import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/formHelper";
import { hideLoader, showLoader } from "../redux/state/settingSlice";
import store from "../redux/store/store";
import { getToken } from "../helper/sessionHelper";
import { setMyChats, setSelectUser } from "../redux/state/chatSlice";
import { useSelector } from "react-redux";
const BaseURL = "http://localhost:8100/api"
const AxiosHeader = { headers: { "token": getToken() } }

export const myChatRequest = async () =>{
    store.dispatch(showLoader())
    let URL = BaseURL + "/chat";
    return await axios.get(URL, AxiosHeader).then((res) => {
        store.dispatch(hideLoader())
        if (res.status === 200) {
            store.dispatch(setMyChats(res.data))
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

export const accessChatRequest = async (userId) =>{
    store.dispatch(showLoader())
    let PostBody = { userId: userId }
    let URL = BaseURL + "/chat";
    return await axios.post(URL, PostBody, AxiosHeader).then((res) => {
        store.dispatch(hideLoader())
        if (res.status === 200) {
            const myChats = store.getState().chat.myChats
            if(!myChats.find((c)=>c._id===res.data._id))
                store.dispatch(setMyChats([res.data, ...myChats]))
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

export const createGroupRequest = async (grpName, users) =>{
    store.dispatch(showLoader())
    let PostBody = { name: grpName, members: JSON.stringify(users.map((u)=> u._id)) }
    let URL = BaseURL + "/chat/group";
    return await axios.post(URL, PostBody, AxiosHeader).then((res) => {
        store.dispatch(hideLoader())
        if (res.status === 200) {
            const myChats = store.getState().chat.myChats
            store.dispatch(setMyChats([res.data, ...myChats]))
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
        } else if (err.response.data.status === 403) {
            ErrorToast(err.response.data.message)
            return false;
        } else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    })
}

export const renameGroupRequest = async (grpName, grpId) =>{
    let PostBody = { groupName : grpName, chatId: grpId }
    let URL = BaseURL + "/chat/rename";
    return await axios.put(URL, PostBody, AxiosHeader).then((res) => {
        if (res.status === 200) {
            store.dispatch(setSelectUser(res.data))
            myChatRequest()
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
        } else if (err.response.data.status === 403) {
            ErrorToast(err.response.data.message)
            return false;
        } else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    })
}
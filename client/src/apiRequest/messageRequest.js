import axios from "axios";
import { ErrorToast } from "../helper/formHelper";
import store from "../redux/store/store";
import { getToken } from "../helper/sessionHelper";
import { setAllMessages, setNewMessage, setSingleMessage } from "../redux/state/chatSlice";
import { socket } from "../components/ChatBox";
const BaseURL = "https://instachat-api.onrender.com/api"
const AxiosHeader = { headers: { "token": getToken() } }

export const sentMessageRequest = async (content, chatId) =>{
    let PostBody = { chatId: chatId, content: content }
    let URL = BaseURL + "/message";
    return await axios.post(URL, PostBody, AxiosHeader).then((res) => {
        if (res.status === 200) {
            store.dispatch(setSingleMessage(res.data))
            store.dispatch(setNewMessage(res.data))
            socket.emit("new msg", res.data)
            return true;
        } else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err) => {
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

export const fetchAllMessagesRequest = async (chatId) =>{
    let URL = BaseURL + `/message/${chatId}`;
    return await axios.get(URL, AxiosHeader).then((res) => {
        if (res.status === 200) {
            store.dispatch(setAllMessages(res.data))
            return true;
        } else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err) => {
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


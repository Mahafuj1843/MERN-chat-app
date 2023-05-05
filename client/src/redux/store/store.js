import { configureStore } from "@reduxjs/toolkit";
import settingSlice from "../state/settingSlice";
import profileSlice from "../state/profileSlice";
import chatSlice from "../state/chatSlice";

export default configureStore({
    reducer:{
        setting: settingSlice,
        profile: profileSlice,
        chat: chatSlice
    }
})
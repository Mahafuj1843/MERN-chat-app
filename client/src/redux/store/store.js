import { configureStore } from "@reduxjs/toolkit";
import settingSlice from "../state/settingSlice";
import profileSlice from "../state/profileSlice";

export default configureStore({
    reducer:{
        setting: settingSlice,
        profile: profileSlice
    }
})
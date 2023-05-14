import { createSlice } from "@reduxjs/toolkit";

export const settingSlice = createSlice({
    name: 'setting',
    initialState: {
        loader: 'none',
        notifications: [],
        onlineUsers: []
    },

    reducers:{
        showLoader:(state)=>{
            state.loader= "block"
        },
        hideLoader:(state)=>{
            state.loader= 'none'
        },
        setNotification:(state, action)=>{
            if(state.notifications.find((n)=>n.chat._id===action.payload.chat._id))
                state.notifications = state.notifications.filter((n)=>n.chat._id!==action.payload.chat._id)
            state.notifications = [action.payload, ...state.notifications]
        },
        removeNotification:(state, action)=>{
            state.notifications = state.notifications.filter((n)=>n.chat._id!==action.payload._id)
        },
        emptyNotification:(state, action)=>{
            state.notifications = []
        },
        setOnlineUsers:(state, action)=>{
            state.onlineUsers = action.payload
        }
    }
})

export const { showLoader, hideLoader, setNotification, removeNotification, emptyNotification, setOnlineUsers } = settingSlice.actions
export default settingSlice.reducer
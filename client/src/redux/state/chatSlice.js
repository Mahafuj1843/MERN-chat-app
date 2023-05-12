import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: 'chat',
    initialState:{
        myChats: [],
        searchUsers: [],
        selectUser: "",
        selectForGrp: [],
        allMessages: [],
        newMessage: {},
        newArrivalMessage: {}
    },

    reducers:{
        setMyChats:(state, action)=>{
            state.myChats = action.payload
        },
        setsearchUsers:(state, action)=>{
            state.searchUsers = action.payload
        },
        setSelectUser:(state, action)=>{
            state.selectUser = action.payload
        },
        setSelectForGrp:(state, action)=>{
            state.selectForGrp = [...state.selectForGrp, action.payload]
        },
        removeSelectForGrp:(state, action)=>{
            state.selectForGrp = state.selectForGrp.filter((u)=> u._id !== action.payload._id)
        },
        setEmpty:(state)=>{
            state.selectForGrp = []
            state.searchUsers = []
        },
        setAllMessages:(state, action)=>{
            state.allMessages = action.payload
        },
        setSingleMessage:(state, action)=>{
            state.allMessages = [...state.allMessages, action.payload]
        },
        setNewMessage:(state, action)=>{
            state.newMessage = action.payload
        }
    }
})

export const { setMyChats, setsearchUsers, setSelectUser, setSelectForGrp, removeSelectForGrp, setEmpty, setAllMessages, setSingleMessage, setNewMessage } = chatSlice.actions
export default chatSlice.reducer
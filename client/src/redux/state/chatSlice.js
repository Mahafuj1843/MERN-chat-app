import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: 'chat',
    initialState:{
        myChats: [],
        searchUsers: [],
        selectUser: "",
        selectForGrp: []
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
            state.selectForGrp = [],
            state.searchUsers = []
        }
    }
})

export const { setMyChats, setsearchUsers, setSelectUser, setSelectForGrp, removeSelectForGrp, setEmpty } = chatSlice.actions
export default chatSlice.reducer
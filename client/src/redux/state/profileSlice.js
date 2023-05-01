import {createSlice} from "@reduxjs/toolkit"

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profile: []
    },
    reducers:{
        setProfile:(state, action)=>{
            state.profile= action.payload
        }
    }
})

export const {setProfile} = profileSlice.actions
export default profileSlice.reducer
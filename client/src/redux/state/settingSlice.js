import { createSlice } from "@reduxjs/toolkit";

export const settingSlice = createSlice({
    name: 'setting',
    initialState: {
        loader: 'none'
    },

    reducers:{
        showLoader:(state)=>{
            state.loader= "block"
        },
        hideLoader:(state)=>{
            state.loader= 'none'
        }
    }
})

export const { showLoader, hideLoader } = settingSlice.actions
export default settingSlice.reducer
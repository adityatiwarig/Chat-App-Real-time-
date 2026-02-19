import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",  // chunks of data ke naam
    initialState: {
        authUser: null,  // abhi user login nai hai
        otherUsers: null,
        selectedUser: null,
    },
    reducers: {
       setAuthUser:(state,action) =>{
        state.authUser = action.payload // frontend se jo data bhejenge wo direct save ho jayega

       },

       setOtherUsers:(state,action) =>{
        state.otherUsers = action.payload // baki users bhi save
       },

       setSelectedUser:(state,action) => {
        state.selectedUser = action.payload
       }
    }
});

export const {setAuthUser,setOtherUsers,setSelectedUser} = userSlice.actions;
export default userSlice.reducer;
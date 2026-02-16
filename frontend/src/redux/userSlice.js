import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",  // chunks of data ke naam
    initialState: {
        authUser: null,  // abhi user login nai hai
    },
    reducers: {
       setAuthUser:(state,action) =>{
        state.authUser = action.payload // frontend se jo data bhejenge wo direct save ho jayega

       }
    }
});

export const {setAuthUser} = userSlice.actions;
export default userSlice.reducer;
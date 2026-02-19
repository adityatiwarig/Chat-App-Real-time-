import React, { useEffect} from 'react'
import axios from 'axios';
import {useDispatch} from 'react-redux'
import { setOtherUsers } from '../redux/userSlice';

function useGetOtherUsers() {
  const dispatch = useDispatch();

  useEffect(()=>{
    const fetchOtherUsers = async() => {
        try {
            axios.defaults.withCredentials = true; // tbhi authentify hoga
            const res = await axios.get(`http://localhost:8000/api/v1/user/`);
            

            // store
            dispatch(setOtherUsers(res.data)) // res.data ko store me save kr diya
             
        } catch (error) {
            console.log(error);
        }
    }
    fetchOtherUsers();
  },[])
}

export default useGetOtherUsers
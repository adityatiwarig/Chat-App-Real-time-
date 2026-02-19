import React from 'react'
import OtherUser from './OtherUser';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import {useSelector} from "react-redux";


const OtherUsers = () => {

    useGetOtherUsers();
    const { otherUsers } = useSelector(store => store.user);

    return (
        <div className='flex-1 overflow-y-auto mt-4 space-y-2'>

            {!otherUsers ? (
                <p className="text-gray-400">Loading...</p>
            ) : (
                otherUsers.map((user) => (
                    <OtherUser key={user._id} user={user} />
                ))
            )}

        </div>
    )
}


export default OtherUsers
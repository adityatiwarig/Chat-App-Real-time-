import React, { useMemo } from "react";
import OtherUser from "./OtherUser";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";

const OtherUsers = ({ searchTerm = "" }) => {
  useGetOtherUsers();
  const { otherUsers } = useSelector((store) => store.user);

  const filteredUsers = useMemo(() => {
    if (!otherUsers) return [];
    if (!searchTerm) return otherUsers;

    const query = searchTerm.toLowerCase();
    return otherUsers.filter((user) => {
      const fullName = user?.fullName?.toLowerCase() || "";
      const username = user?.username?.toLowerCase() || "";
      return fullName.includes(query) || username.includes(query);
    });
  }, [otherUsers, searchTerm]);

  return (
    <div className="flex-1 overflow-y-auto mt-4 space-y-2 pr-1">
      {!otherUsers ? <p className="text-gray-400">Loading users...</p> : null}

      {otherUsers && filteredUsers.length === 0 ? (
        <p className="text-gray-400 text-sm">No users found.</p>
      ) : null}

      {filteredUsers.map((user) => (
        <OtherUser key={user._id} user={user} />
      ))}
    </div>
  );
};

export default OtherUsers;

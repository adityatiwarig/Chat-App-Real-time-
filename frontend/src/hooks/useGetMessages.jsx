import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/userSlice";

const useGetMessages = () => {
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser?._id) {
        dispatch(setMessages([]));
        return;
      }

      try {
        axios.defaults.withCredentials = true;

        const res = await axios.get(
          `http://localhost:8000/api/v1/message/${selectedUser._id}`
        );

        dispatch(setMessages(res.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();

    if (!selectedUser?._id) return undefined;

    const intervalId = setInterval(fetchMessages, 6000);
    return () => clearInterval(intervalId);
  }, [selectedUser?._id, dispatch]);
};

export default useGetMessages;

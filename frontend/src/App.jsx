import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import Signup from "./components/Signup.jsx";
import HomePage from "./components/HomePage.jsx";
import Login from "./components/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";
import {
  addMessage,
  setAuthLoading,
  setAuthUser,
  setOnlineUsers,
} from "./redux/userSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
    errorElement: <h1>Page Not Found</h1>,
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Signup />
      </PublicRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
]);

function App() {
  const dispatch = useDispatch();
  const { authUser } = useSelector((store) => store.user);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get("http://localhost:8000/api/v1/user/me");
        dispatch(setAuthUser(res.data));
      } catch {
        dispatch(setAuthUser(null));
      } finally {
        dispatch(setAuthLoading(false));
      }
    };

    checkAuth();
  }, [dispatch]);

  useEffect(() => {
    if (!authUser?._id) {
      dispatch(setOnlineUsers([]));
      return;
    }

    const socket = io("http://localhost:8000", {
      withCredentials: true,
      transports: ["websocket"],
    });

    socket.on("getOnlineUsers", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    });

    socket.on("newMessage", (newMessage) => {
      dispatch(addMessage(newMessage));
    });

    return () => {
      socket.disconnect();
      dispatch(setOnlineUsers([]));
    };
  }, [authUser?._id, dispatch]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

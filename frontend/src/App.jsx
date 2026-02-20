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
  updateUserLastSeen,
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
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 4000,
    });

    socket.on("getOnlineUsers", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers || []));
    });

    socket.on("newMessage", (newMessage) => {
      dispatch(addMessage(newMessage));
    });

    socket.on("userLastSeen", (payload) => {
      dispatch(updateUserLastSeen(payload));
    });

    socket.on("connect_error", () => {
      dispatch(setOnlineUsers([]));
    });

    return () => {
      socket.disconnect();
      dispatch(setOnlineUsers([]));
    };
  }, [authUser?._id, dispatch]);

  return (
    <div className="min-h-screen px-3 py-4 md:px-6 md:py-6">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

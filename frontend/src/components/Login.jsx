import React, { use, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { log } from "console";
import { useDispatch } from "react-redux";
import { set } from "mongoose";
import { setAuthUser } from "../redux/userSlice";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitHandler = async(e) => {
    e.preventDefault();
        try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/user/login`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

        navigate("/");
        dispatch(setAuthUser(res.data)) // YE AUTHUSER KO OBJECT SEND KREGA REACT REDUX ME
        
      console.log(res);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }

    setUser({
      username: "",
      password: "",
    });
  };   

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        <form onSubmit={onSubmitHandler}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            value={user.username}
            onChange={(e) =>
              setUser({ ...user, username: e.target.value })
            }
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) =>
              setUser({ ...user, password: e.target.value })
            }
          />

          <p className="switch-text">
            Don't have an account? <Link to="/register">Signup</Link>
          </p>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
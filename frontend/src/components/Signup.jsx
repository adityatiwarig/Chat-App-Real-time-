import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/user/register`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }

      console.log(res);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }

    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Signup</h2>

        <form onSubmit={onSubmitHandler}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Full Name"
            value={user.fullName}
            onChange={(e) => setUser({ ...user, fullName: e.target.value })}
          />

          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={user.confirmPassword}
            onChange={(e) =>
              setUser({ ...user, confirmPassword: e.target.value })
            }
          />

          <div className="gender">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={user.gender === "male"}
                onChange={(e) => setUser({ ...user, gender: e.target.value })}
              />{" "}
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={user.gender === "female"}
                onChange={(e) => setUser({ ...user, gender: e.target.value })}
              />{" "}
              Female
            </label>
          </div>

          <p className="switch-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>

          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

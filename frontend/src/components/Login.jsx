import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(user);

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
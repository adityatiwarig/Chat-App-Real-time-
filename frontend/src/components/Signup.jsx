import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: ""
  });

  

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(user);
    setUser({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: ""
    })
    
  }

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
            onChange={(e) =>
              setUser({ ...user, fullName: e.target.value })
            }
          />

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
                value="Male"
                checked={user.gender === "Male"}
                onChange={(e) =>
                  setUser({ ...user, gender: e.target.value })
                }
              />{" "}
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={user.gender === "Female"}
                onChange={(e) =>
                  setUser({ ...user, gender: e.target.value })
                }
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
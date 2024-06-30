import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./LoginPage.css";
import { loginAPI } from "../service/AllAPI";
import { setLogin } from "../redux/slice/userSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && password) {
      try {
        const result = await loginAPI({ email, password });
        if (result.status == 200) {
          dispatch(
            setLogin({
              user: result.data.user,
              token: result.data.token,
            })
          );
          navigate("/");
        } else {
          alert(result.response.data);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("Please fill the form completely");
    }
  };

  return (
    <div className="login">
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email Id"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Log In</button>
        </form>
        <p>
          Don't Have account? <Link to={"/register"}>Sign Up Here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

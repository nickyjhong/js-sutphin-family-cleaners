import React, { useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login({ setIsAuth }) {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const login = async () => {
    await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    localStorage.setItem("isAuth", true);
    setIsAuth(true);
    navigate("/");
  };

  return (
    <div className="login-main">
      <div className="login-container">
        <div className="login-heading">
          <h1>Login <img src="/logo.png" alt="logo" height="25px" className="login-img" /></h1>
        </div>
        <div className="input-group-container">
          <input
            className="form-input"
            placeholder="Email"
            type="email"
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          />
          <input
            className="form-input"
            placeholder="Password"
            type="password"
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
          />
          <button className="login-btn" onClick={login}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

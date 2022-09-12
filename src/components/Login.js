import React, { useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "../firebase-config"
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"

export default function Login({ setIsAuth }) {
  const navigate = useNavigate()
  const [ loginEmail, setLoginEmail ] = useState("")
  const [ loginPassword, setLoginPassword ] = useState("")
  const [ user, setUser ] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/")
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      <div className="login-container">
        <input 
          placeholder="Email"
          onChange={(event) => {
            setLoginEmail(event.target.value)
          }}
        />
        <input 
          placeholder="Password"
          onChange={(event) => {
            setLoginPassword(event.target.value)
          }}
        />
        <button onClick={login}>Login</button>
      </div>

      <h4> User Logged In: </h4>
      {user?.email}

    </div>
  );
}

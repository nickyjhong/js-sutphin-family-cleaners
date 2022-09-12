import React, { useState } from "react";
import { auth } from "../firebase-config"
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"

export default function Login() {
  const [ loginEmail, setLoginEmail ] = useState("")
  const [ loginPassword, setLoginPassword ] = useState("")
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    } catch (error) {
      console.log(error.message)
    }
  }

  const logout = async () => {
    await signOut(auth);
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

      <button onClick={logout}>Sign Out</button>
    </div>
  );
}

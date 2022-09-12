import React from 'react'
import { Link } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { auth } from "../firebase-config"

export default function Navbar({ isAuth, setIsAuth }) {

  const logout = async () => {
    await signOut(auth);
    localStorage.clear()
    setIsAuth(false);
    window.location.pathname = "/"
  }

  return (
    <div className="navbar">
      {isAuth ? (
        <>
          <Link style={{textDecoration: 'none'}} className="nav-link nav-link-page" to="/">Home</Link>
          <Link style={{textDecoration: 'none'}} className="nav-link nav-link-page" to="/" onClick={logout}>Log out</Link>
        </>
      ) : (
        ""
      )}
    </div>
  )
}
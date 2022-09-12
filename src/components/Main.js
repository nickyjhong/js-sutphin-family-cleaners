import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import Login from './Login'

export default function Main() {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

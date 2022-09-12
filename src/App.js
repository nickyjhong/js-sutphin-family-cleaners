import React, { useState }from 'react'
import './styles/app.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  return (
    <Router>
      <nav>
        <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
      </nav>
      <Routes>
        {isAuth ? (
          <>
            <Route exact path='/' element={<Home />} />  
          </>
        ) : (
          <Route path="/" element={<Login setIsAuth={setIsAuth} />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;

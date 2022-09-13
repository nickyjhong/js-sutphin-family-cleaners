import React, { useState }from 'react'
import './styles/app.css'
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { auth } from "./firebase-config"
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import Home from './components/Home';
import Login from './components/Login';
import CreateCompany from './components/CreateCompany';
import SingleInvoice from './components/SingleInvoice';
import AllInvoices from './components/AllInvoices';
import CompanyInvoices from './components/CompanyInvoices';
import CreateInvoice from './components/CreateInvoice';
import UpdateInvoice from './components/UpdateInvoice';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const logout = async () => {
    await signOut(auth);
    localStorage.clear()
    setIsAuth(false);
    window.location.pathname = "/"
  }

  return (
    <Router>
      <nav>
        {isAuth ? (
          <Navbar bg="nav" sticky="top" expand="sm" collapseOnSelect>
            <Navbar.Brand className="nav-logo" href="/">
              <img src="../logo.png" alt="logo" height="25px" className="nav-logo-img" />{' '}
              Sutphin Family Cleaners
            </Navbar.Brand>

            <Navbar.Toggle />
            <Navbar.Collapse className="right-aligned">
              <Nav className="nav-links">
                <Nav.Link href="/">Home</Nav.Link>
                <NavDropdown title="Admin" align="end">
                  <NavDropdown.Item href="/invoice/all">View Invoices</NavDropdown.Item>
                  <NavDropdown.Item href="/company/all">View Companies</NavDropdown.Item>
                  <NavDropdown.Item href="/invoice/add">Add Invoice</NavDropdown.Item>
                  <NavDropdown.Item href="/company/add">Add Company</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/" onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        ) : (
          <Navbar bg="nav" sticky="top">
            <Navbar.Brand>
              SFC
            </Navbar.Brand>
          </Navbar>
        )}
      </nav>
      <Routes>
        {isAuth ? (
          <>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/company/add' element={<CreateCompany />} />
            {/* <Route exact path='/company/:name' element={<SingleCompany />} /> */}
            <Route exact path='/invoice/all' element={<AllInvoices /> } />
            <Route exact path='/invoice/add' element={<CreateInvoice />} />
            <Route exact path='/invoice/:invoiceId' element={<SingleInvoice />} />
            <Route exact path='/invoice/:invoiceId/update' element={<UpdateInvoice />} />
            <Route exact path='/:companyName/invoices' element={<CompanyInvoices />} />
          </>
        ) : (
          <Route path="/" element={<Login setIsAuth={setIsAuth} />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;

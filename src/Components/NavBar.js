import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function NavBar() {
  let location = useLocation();
  let navigate = useNavigate();
  const handleLogOut=()=>{
    localStorage.removeItem('token');
    navigate("/login");
  }
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Notefy</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/home" ? "active" : ""}`} aria-current="page" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/addnote" ? "active" : ""}`} to="/addnote">Add Note</Link>
            </li>
          </ul>
          {!localStorage.getItem('token')?
          <div className="d-flex my-1 mx-1" role="search">
            <Link to="/login">
              <button className="SUbtn btn-dark">LogIn</button>
            </Link>
            <Link to="/signup">
              <button className="SUbtn btn-dark ">SignUp</button>
            </Link>
          </div>:<button className="SUbtn btn-dark" onClick={handleLogOut}>Log Out</button>}
        </div>
      </div>
    </nav>
  )
}

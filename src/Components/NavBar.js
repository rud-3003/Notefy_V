import React, { useContext, useState } from 'react';
import NoteContext from '../Context/notes/NoteContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function NavBar() {
  let location = useLocation();
  let navigate = useNavigate();
  const context = useContext(NoteContext);
  const { searchNotes } = context;

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      console.log('Searching for:', searchTerm); // Debugging statement
      await searchNotes(searchTerm);
    } catch (error) {
      console.error('Error during search:', error); // Debugging statement
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
    navigate("/login");
  };

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
          {location.pathname === "/home" ? <div className="d-flex align-items-center" role="search" onSubmit={handleSearch}>
            <input className="form-control me-2" type="search" placeholder="Search for tags" aria-label="Search" value={searchTerm} onChange={handleSearchChange} />
            <button className="btn btn-outline-light mx-1" >Search</button>
          </div> : <></>}
          {!localStorage.getItem('token') ?
            <div className="d-flex my-1 mx-1" role="login">
              <Link to="/login">
                <button className="btn btn-outline-light mx-1">LogIn</button>
              </Link>
              <Link to="/signup">
                <button className="btn btn-outline-light mx-1">SignUp</button>
              </Link>
            </div> :
            <div>
              <button className="btn btn-outline-light mx-1" onClick={handleLogOut}>Log Out</button>
            </div>}
        </div>
      </div>
    </nav>
  );
}

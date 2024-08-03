import './App.css';
import Notefy from "./Components/Notefy";
import Home from "./Components/Home";
import About from "./Components/About";
import NavBar from "./Components/NavBar";
import AddNote from "./Components/AddNote";
import NotePage from "./Components/NotePage";
// import SideBar from "./Components/SideBar";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoteState from './Context/notes/NoteState';
import Alert from './Components/Alert';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <NavBar />
          <Alert alert={alert} />
          <div className="container container-ctm">
            <Routes>
              <Route path="/" element={<Notefy />} />
              <Route path="/home" element={<Home showAlert={showAlert} />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login showAlert={showAlert} />} />
              <Route path="/signup" element={<SignUp showAlert={showAlert} />} />
              <Route path="/addnote" element={<AddNote showAlert={showAlert} />} />
              <Route path="/note/:id" element={<NotePage showAlert={showAlert} />} />
            </Routes>
            </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;

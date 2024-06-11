import './App.css';
import Notefy from "./Components/Notefy";
import Home from "./Components/Home";
import About from "./Components/About";
import NavBar from "./Components/NavBar";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoteState from './Context/notes/NoteState';
import Alert from './Components/Alert';

function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <NavBar />
          <Alert message="This is an Alert" />
          <div className="container">
            <Routes>
              <Route path="/" element={<Notefy />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;

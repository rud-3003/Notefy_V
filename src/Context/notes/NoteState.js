import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:8000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  // Fetch all Notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setNotes(json);
  }

  // Search Notes
  const searchNotes = async (key) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/searchnotes/${key}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log('Search results:', json); // Debugging statement
    setNotes(json);
  }

  // Add a Note
  const addNote = async (title, description, tag, myFile) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag, myFile })
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  }

  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
    });

    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  }

  // Edit a Note
  const editNote = async (id, title, description, tag, myFile) => {
    // API Call 
    await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag, myFile })
    });

    let newNotes = JSON.parse(JSON.stringify(notes));
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        newNotes[index].myFile = myFile;
        break;
      }
    }
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes, searchNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteState;

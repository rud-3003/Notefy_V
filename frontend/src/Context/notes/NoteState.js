import { useState } from "react";
import NoteContext from "./NoteContext";
import { Host } from "../../Components/host";

const NoteState = (props) => {
  const host = Host;
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  // Fetch all non-private Notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // "auth-token": localStorage.getItem('token')
      },
      credentials: 'include',
    });
    const json = await response.json();
    setNotes(json);
  }

  // Fetch all user Notes
  const getUserNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchusernotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      credentials: 'include',
    });
    const json = await response.json();
    setNotes(json);
  }

  // Search Notes
  const searchNotes = async (key) => {
    const response = await fetch(`${host}/api/notes/searchnotes/${key}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      credentials: 'include',
    });
    const json = await response.json();
    console.log('Search results:', json); // Debugging statement
    setNotes(json);
  }

  // Get a single note
  const getNote = async (id) => {
    const response = await fetch(`${host}/api/notes/note/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
        },
        credentials: 'include',
    });
    const json = await response.json();
    return json; // Return the fetched note
}


  // Add a Note
  const addNote = async (title, description, tag, myFile, isPrivate) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      credentials: 'include',
      body: JSON.stringify({ title, description, tag, myFile, isPrivate })
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  }

  // Delete a Note
  const deleteNote = async (id) => {
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      credentials: 'include',
    });

    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  }

  // Edit a Note
  const editNote = async (id, title, description, tag, myFile, isPrivate) => {
    await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      credentials: 'include',
      body: JSON.stringify({ title, description, tag, myFile, isPrivate })
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
        newNotes[index].isPrivate = isPrivate;
        break;
      }
    }
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes, getUserNotes, searchNotes, getNote }}>
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteState;

import { useState } from "react";
import NoteContext from "./NoteContext";
// import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:8000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  //Fetch all Note
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2MmYyMWRlNjFlNzRiNTE5MDkwYWY1In0sImlhdCI6MTcxNzc2NDE0MH0.9mSS7gQr64GsoLWXwtF600hv1-rqxmmtoBgTKqP4BsA"
      },
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }

  //Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2MmYyMWRlNjFlNzRiNTE5MDkwYWY1In0sImlhdCI6MTcxNzc2NDE0MH0.9mSS7gQr64GsoLWXwtF600hv1-rqxmmtoBgTKqP4BsA"
      },
      body: JSON.stringify({ title, description, tag })
    });


    console.log("Adding a new node.")
    const note = {
      "_id": "6666e88b0e9064935c3881214a",
      "user": "6662f21de61e74b519090af5",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2024-06-10T11:50:35.760Z",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }

  //Delete a Note
  const deleteNote = async(id) => {
    // TODO: API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2MmYyMWRlNjFlNzRiNTE5MDkwYWY1In0sImlhdCI6MTcxNzc2NDE0MH0.9mSS7gQr64GsoLWXwtF600hv1-rqxmmtoBgTKqP4BsA"
      },
    });


    console.log("Note deleted with id:" + id);
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2MmYyMWRlNjFlNzRiNTE5MDkwYWY1In0sImlhdCI6MTcxNzc2NDE0MH0.9mSS7gQr64GsoLWXwtF600hv1-rqxmmtoBgTKqP4BsA"
      },
      body: JSON.stringify({ title, description, tag })
    });

    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )

}


export default NoteState;
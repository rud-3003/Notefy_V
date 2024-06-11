import { useState } from "react";
import NoteContext from "./NoteContext";
// import { useState } from "react";

const NoteState = (props) => {
    
    const notesInitial = [
        {
          "_id": "6666e8800e9064935c388148",
          "user": "6662f21de61e74b519090af5",
          "title": "Test Title 0",
          "description": "Check this test description",
          "tag": "personal",
          "date": "2024-06-10T11:50:24.525Z",
          "__v": 0
        },
        {
          "_id": "6666e88b0e9064935c38814a",
          "user": "6662f21de61e74b519090af5",
          "title": "Test Title 1",
          "description": "Check this test description 1",
          "tag": "personal",
          "date": "2024-06-10T11:50:35.760Z",
          "__v": 0
        },
        {
          "_id": "6666e88werb0e9064935c38814a",
          "user": "6662f21de61e74b519090af5",
          "title": "Test Title 1",
          "description": "Check this test description 1",
          "tag": "personal",
          "date": "2024-06-10T11:50:35.760Z",
          "__v": 0
        },
        {
          "_id": "6666e88b0e9032464935c38814a",
          "user": "6662f21de61e74b519090af5",
          "title": "Test Title 1",
          "description": "Check this test description 1",
          "tag": "personal",
          "date": "2024-06-10T11:50:35.760Z",
          "__v": 0
        },
        {
          "_id": "62444666e88b0e9064935c38814a",
          "user": "6662f21de61e74b519090af5",
          "title": "Test Title 1",
          "description": "Check this test description 1",
          "tag": "personal",
          "date": "2024-06-10T11:50:35.760Z",
          "__v": 0
        },
        {
          "_id": "6666e88b0e9231064935c38814a",
          "user": "6662f21de61e74b519090af5",
          "title": "Test Title 1",
          "description": "Check this test description 1",
          "tag": "personal",
          "date": "2024-06-10T11:50:35.760Z",
          "__v": 0
        },
        {
          "_id": "6666e88b0e90244264935c38814a",
          "user": "6662f21de61e74b519090af5",
          "title": "Test Title 1",
          "description": "Check this test description 1",
          "tag": "personal",
          "date": "2024-06-10T11:50:35.760Z",
          "__v": 0
        },
        {
          "_id": "6666e88b0e12349064935c38814a",
          "user": "6662f21de61e74b519090af5",
          "title": "Test Title 1",
          "description": "Check this test description 1",
          "tag": "personal",
          "date": "2024-06-10T11:50:35.760Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial)
      
      //Add a Note
      const addNote = (title, description, tag)=>{
        // TODO: API Call
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
      const deleteNote = (id)=>{
        // TODO: API Call
        console.log("Note deleted with id:"+id);
        const newNotes= notes.filter((note)=>{return note._id!==id});
        setNotes(newNotes);
      }

      //Edit a Note
      const editNote = (id, title, description, tag)=>{
        
      }

    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
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
          "_id": "6666e88b0e9064935c38814a",
          "user": "6662f21de61e74b519090af5",
          "title": "Test Title 1",
          "description": "Check this test description 1",
          "tag": "personal",
          "date": "2024-06-10T11:50:35.760Z",
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
          "_id": "6666e88b0e9064935c38814a",
          "user": "6662f21de61e74b519090af5",
          "title": "Test Title 1",
          "description": "Check this test description 1",
          "tag": "personal",
          "date": "2024-06-10T11:50:35.760Z",
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
          "_id": "6666e88b0e9064935c38814a",
          "user": "6662f21de61e74b519090af5",
          "title": "Test Title 1",
          "description": "Check this test description 1",
          "tag": "personal",
          "date": "2024-06-10T11:50:35.760Z",
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
        }
      ]
      const [notes, setNotes] = useState(notesInitial)
    
    return(
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
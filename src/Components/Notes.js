import React, { useContext } from 'react';
import NoteContext from '../Context/notes/NoteContext';
import NoteItem from './NoteItem';


export default function Notes() {
    const context = useContext(NoteContext);
    const {notes, setNotes} = context;
    return (
        <div className="row my-3">
            <h1>Your Notes</h1>
            {notes.map((note) => {
                return <NoteItem note={note}/>;
            })}
        </div>
    )
}

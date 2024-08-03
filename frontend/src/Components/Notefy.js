import React, { useContext, useEffect } from 'react';
import NoteContext from '../Context/notes/NoteContext';
import NoteItem from './NoteItem';

export default function Notefy() {
  const context = useContext(NoteContext);
  const { notes = [], getNotes } = context; // Ensure notes is always an array

  useEffect(() => {
    // Fetch all non-private notes when the component mounts
    getNotes();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="row my-3">
      <h1>Public Notes</h1>
      <div className="container">
        {notes.length === 0 && "No Public Notes to display"}
      </div>
      {notes.map((note) => {
        return !note.isPrivate && (
          <NoteItem key={note._id} note={note} />
        );
      })}
    </div>
  );
}

import React, { useContext, useEffect, useState } from "react";
import NoteContext from "../Context/notes/NoteContext";
import NoteItem from "./NoteItem";
import Search from "./Search";

export default function Notefy() {
  const context = useContext(NoteContext);
  const [searchTerm, setSearchTerm] = useState("");
  const { notes = [], getNotes, searchNotes } = context; // Ensure notes is always an array

  useEffect(() => {
    // Fetch all non-private public notes when the component mounts
    getNotes();
    // eslint-disable-next-line
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      if (searchTerm.trim() === "") {
        // Fetch all public notes if search term is empty
        await getNotes();
      } else {
        // Search public notes by the search term
        await searchNotes(searchTerm);
      }
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <div className="row my-3">
      <h1>Public Notes</h1>
      <Search
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        handleSearch={handleSearch}
      />
      <div className="container">
        {notes.length === 0 && "No Public Notes to display"}
      </div>
      {notes.map((note) => {
        return !note.isPrivate && <NoteItem key={note._id} note={note} />;
      })}
    </div>
  );
}

import React, { useContext, useState, useEffect, useRef } from 'react';
import NoteContext from '../Context/notes/NoteContext';
import NoteItem from './NoteItem';
import Search from './Search';
import { useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';

export default function Notes(props) {
    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'formula'],

        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme

        ['clean']];
    const modules = {
        toolbar: toolbarOptions,
    };
    const context = useContext(NoteContext);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default", emyFile: "" });
    const [searchTerm, setSearchTerm] = useState('');
    let navigate = useNavigate();

    const { notes, getNotes, editNote, searchNotes } = context;

    useEffect(() => {
        async function fetchData() {
            if (searchTerm.trim() === "") {
                await getNotes();
            } else {
                await searchNotes(searchTerm);
            }
        }
        fetchData();
    }, [navigate, getNotes, searchNotes, searchTerm]);

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag, emyFile: currentNote.myFile });
    }

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag, note.emyFile);
        ref.current.click();
        props.showAlert("Updated Successfully", "success");
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const onChangeDes = (e) => {
        setNote({ ...note, edescription: e });
    }

    // const handleFileUpload = async (e) => {
    //     const file = e.target.files[0];
    //     const base64 = await convertToBase64(file); // Define or import convertToBase64 function
    //     setNote({ ...note, emyFile: base64 });
    // };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            if (searchTerm.trim() === "") {
                await getNotes();
            } else {
                await searchNotes(searchTerm);
            }
        } catch (error) {
            console.error('Error during search:', error);
        }
    };

    const ref = useRef(null);

    return (
        <>
            <div className="row my-3">
                <h1>Your Notes</h1>
                <Search
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                    handleSearch={handleSearch}
                />
                <div className="container">
                    {notes.length === 0 && "No Notes to display"}
                </div>

                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />;
                })}
            </div>
        </>
    )
}
import React, { useContext, useState, useEffect, useRef } from 'react';
import NoteContext from '../Context/notes/NoteContext';
import NoteItem from './NoteItem';
import ReactQuill from 'react-quill';
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

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setNote({ ...note, emyFile: base64 });
    };

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
    const refClose = useRef(null);

    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <ReactQuill theme="snow" id="edescription" modules={modules} minLength={5} onChange={onChangeDes} value={note.edescription} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} minLength={3} required value={note.etag} />
                                </div>
                                <div className="input-group mb-3">
                                    <label className="input-group-text-1 mx-2 my-1">Upload</label>
                                    <input type="file" label="Image" accept=".jpeg, .png, .jpg" onChange={handleFileUpload} className="form-control" id="inputGroupFile02" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
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

function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
}

import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NoteContext from '../Context/notes/NoteContext';
import defaultimg from './iphone_notes.png';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AuthContext from '../Context/auth/AuthContext'; // Import your authentication context

const NotePage = (props) => {
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        ['link', 'formula'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'color': [] }, { 'background': [] }],
        ['clean']
    ];
    const modules = { toolbar: toolbarOptions };

    const { id } = useParams();
    const context = useContext(NoteContext);
    const { getNote, editNote, deleteNote } = context;
    const authContext = useContext(AuthContext); // Access authentication context
    const { user } = authContext; // Get the logged-in user

    const [note, setNote] = useState({
        id: '',
        title: '',
        description: '',
        tag: 'default',
        myFile: '',
        date: new Date(),
        isPrivate: false,
        user: '' // Ensure you track the owner of the note
    });
    let navigate = useNavigate();

    useEffect(() => {
        const fetchNote = async () => {
            const fetchedNote = await getNote(id);
            setNote(fetchedNote || {
                id: '',
                title: '',
                description: '',
                tag: 'default',
                myFile: '',
                date: new Date(),
                isPrivate: false,
                user: '' // Handle no user case
            });
        };
        fetchNote();
    }, [id, getNote]);

    const updateNote = (currentNote) => {
        if (currentNote) {
            ref.current.click();
            setNote({
                id: currentNote._id,
                title: currentNote.title,
                description: currentNote.description,
                tag: currentNote.tag,
                myFile: currentNote.myFile,
                date: currentNote.date,
                isPrivate: currentNote.isPrivate,
                user: currentNote.user // Keep track of the owner of the note
            });
        }
    };

    const handleClick = (e) => {
        if (note.id && note.title && note.description && note.tag) {
            editNote(note.id, note.title, note.description, note.tag, note.myFile, note.isPrivate);
            refClose.current.click();
            props.showAlert("Updated Successfully", "success");
        }
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const onChangeDes = (value) => {
        setNote({ ...note, description: value });
    };

    const onChangePrivate = (e) => {
        setNote({ ...note, isPrivate: e.target.checked });
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setNote({ ...note, myFile: base64 });
    };

    const ref = useRef(null);
    const refClose = useRef(null);

    const handleDelete = async (id) => {
        await deleteNote(id);
        props.showAlert("Deleted Successfully", "success");
        navigate('/home');
    };

    if (!note) {
        return <div>Loading...</div>;
    }

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
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <ReactQuill theme="snow" id="description" modules={modules} minLength={5} onChange={onChangeDes} value={note.description || ''} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} minLength={3} required value={note.tag} />
                                </div>
                                <div className="input-group mb-3">
                                    <label className="input-group-text-1 mx-2 my-1">Upload</label>
                                    <input type="file" label="Image" accept=".jpeg, .png, .jpg" onChange={handleFileUpload} className="form-control" id="inputGroupFile02" />
                                </div>
                                <div className="form-check form-switch mt-3">
                                    <label className="form-label">Private: </label>
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" name="isPrivate" onChange={onChangePrivate} checked={note.isPrivate} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
                            <button disabled={!note.title || note.title.length < 5 || !note.description || note.description.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='text-center'>
                <div>
                    <h1>{note.title}</h1>
                    {/* Conditionally render edit and delete icons */}
                    {user && note.user === user.id && (
                        <h3>
                            <i className="fa-solid fa-pen-to-square mx-1" style={{ color: "#5c5d60" }} onClick={() => { updateNote(note) }}></i>
                            <i className="fa-solid fa-trash mx-1" style={{ color: "#5c5d60" }} onClick={() => { handleDelete(note._id) }}></i>
                        </h3>
                    )}
                </div>
                <div><img src={note.myFile === "" ? defaultimg : note.myFile} className="card-img-top" alt="..." /></div>
                <div><div dangerouslySetInnerHTML={{ __html: note.description }} /></div>
                <div>
                    <p>Tag: {note.tag}</p>
                    <p>Modified at: {new Date(note.date).toLocaleString("en-GB")}</p>
                </div>
            </div>
        </>
    );
};

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

export default NotePage;

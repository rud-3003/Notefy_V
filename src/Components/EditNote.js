import React, { useContext, useState, useEffect, useRef } from 'react';
import NoteContext from '../Context/notes/NoteContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function EditNote(props) {
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'formula'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        ['clean']
    ];
    const modules = { toolbar: toolbarOptions };

    const context = useContext(NoteContext);
    const { editNote } = context;
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default", emyFile: "" });

    useEffect(() => {
        if (props.currentNote) {
            setNote({
                id: props.currentNote._id,
                etitle: props.currentNote.title,
                edescription: props.currentNote.description,
                etag: props.currentNote.tag,
                emyFile: props.currentNote.myFile
            });
        }
    }, [props.currentNote]);

    const handleClick = () => {
        editNote(note.id, note.etitle, note.edescription, note.etag, note.emyFile);
        props.showAlert("Updated Successfully", "success");
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const onChangeDes = (e) => {
        setNote({ ...note, edescription: e });
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setNote({ ...note, emyFile: base64 });
    };

    return (
        <div className="edit-note">
            <form>
                <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="etitle"
                        name="etitle"
                        value={note.etitle}
                        onChange={onChange}
                        minLength={5}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">Description</label>
                    <ReactQuill
                        theme="snow"
                        id="edescription"
                        modules={modules}
                        onChange={onChangeDes}
                        value={note.edescription}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="etag" className="form-label">Tag</label>
                    <input
                        type="text"
                        className="form-control"
                        id="etag"
                        name="etag"
                        onChange={onChange}
                        minLength={3}
                        required
                        value={note.etag}
                    />
                </div>
                <div className="input-group mb-3">
                    <label className="input-group-text-1 mx-2 my-1">Upload</label>
                    <input
                        type="file"
                        label="Image"
                        accept=".jpeg, .png, .jpg"
                        onChange={handleFileUpload}
                        className="form-control"
                        id="inputGroupFile02"
                    />
                </div>
                <button
                    disabled={note.etitle.length < 5 || note.edescription.length < 5}
                    type="button"
                    className="btn btn-primary"
                    onClick={handleClick}
                >
                    Update Note
                </button>
            </form>
        </div>
    );
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

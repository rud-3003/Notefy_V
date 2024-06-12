import React, { useContext, useState } from 'react'
import ReactQuill from 'react-quill';
import NoteContext from '../Context/notes/NoteContext';
import 'react-quill/dist/quill.snow.css'

export default function AddNote(props) {
    var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'formula'],

    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  
    ['clean'] ]
    const module = {
        toolbar: toolbarOptions,
    };
    const context = useContext(NoteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title:"", description:"", tag:"default", myFile:""})
    
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag, note.myFile);
        setNote({title:"", description:"", tag:"", myFile:""});
        props.showAlert("Added Successfully", "success");
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    
    const onChangeDes = (e)=>{
        setNote({...note, description : e})
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (file && file.size <= 5 * 1024 * 1024) { // 5 MB limit
            const base64 = await convertToBase64(file);
            setNote({...note, myFile: base64});
        } else {
            alert("File size should be less than 5 MB");
        }
    }

    return (
        <div className="container my-3">
            <h1>Add a Note</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} minLength={5} required value={note.title}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    {/* <input type="text" className="form-control" id="description" name="description" onChange={onChange} minLength={5} required value={note.description}/> */}
                    <ReactQuill theme="snow" id="description" modules={module} minLength={5} onChange={onChangeDes} value={note.description} />
                    {console.log(note.description)}
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} minLength={3} required value={note.tag}/>
                </div>
                <div className="input-group mb-3">
                        <label className="input-group-text-1 mx-2 my-1">Upload</label>
                        <input type="file" label="Image" accept=".jpeg, .png, .jpg" onChange={handleFileUpload} className="form-control" id="inputGroupFile02" />
                </div>
                <button disabled={note.title.length<5 } type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
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

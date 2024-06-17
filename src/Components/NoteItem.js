import React, { useContext } from 'react'
import NoteContext from '../Context/notes/NoteContext';
import defaultimg from './iphone_notes.png';
import { Link } from 'react-router-dom';

export default function NoteItem(props) {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    var sdate = new Date(note.date);
    
    return (
        <div className='col-md-3'>
            <div className="card text-center my-1" >
                <img src={note.myFile === "" ? defaultimg : note.myFile} className="card-img-top" alt="..." height={200} width={300} />
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    {/* <div className="card-text" dangerouslySetInnerHTML={{ __html: note.description }} /> */}
                    <p className="card-text"><small className="text-muted">tag: {note.tag}</small></p>
                    <p className="card-text"><small className="text-muted">Modified at {sdate.toLocaleString("en-GB")}</small></p>

                </div>
                <div className="card-footer text-body-secondary">
                    <Link to={`/note/${note._id}`}>
                        <i className="fa-solid fa-arrow-up-right-from-square mx" style={{ color: "#5c5d60" }}></i>
                    </Link>
                    {/* <i className="fa-solid fa-pen-to-square mx-1" style={{ color: "#5c5d60" }} onClick={() => { updateNote(note) }}></i> */}
                    <i className="fa-solid fa-trash mx-1" style={{ color: "#5c5d60" }} onClick={() => { deleteNote(note._id); props.showAlert("Deleted Successfully", "success"); }}></i>
                </div>
            </div>
        </div>
    )
}

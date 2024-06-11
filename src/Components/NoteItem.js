import React from 'react'

export default function NoteItem(props) {
    const { note } = props;
    return (
        <div className='col-md-3'>
            <div class="card text-center my-1" >
                <img src="..." class="card-img-top" alt="..."/>
                    <div class="card-body">
                        <h5 class="card-title">{note.title}</h5>
                        <p class="card-text">{note.description}</p>
                    </div>
            </div>
        </div>
    )
}

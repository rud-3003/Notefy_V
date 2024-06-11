import React, { useContext } from 'react'
import Notes from './Notes';

export default function Home() {
    return (
        <div>
            <div className="container my-3">
                <h1>Add a Note</h1>
            </div>
            <Notes/>
        </div>
    )
}

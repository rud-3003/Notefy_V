import React, { useContext, useEffect} from 'react'
import NoteContext from '../Context/notes/NoteContext'

export default function About() {
    const a = useContext(NoteContext);
    useEffect(() => {
        a.update();
    }, [])
    return (
        <div>
            This is About {a.state.name} and his age is {a.state.age}
        </div>
    )
}

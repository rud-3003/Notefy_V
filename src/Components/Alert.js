import React from 'react'

export default function Alert(props) {
    return (
        <div>
            <div className="alert alert-secondary alert-dismissible" role="alert" >
                {props.message}
            </div>
        </div>
    )
}

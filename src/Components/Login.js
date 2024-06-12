import './styles.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {

    const host = "http://localhost:8000"
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
        const json=await response.json();
        console.log(json);
        setEmail('');
        setPassword('');
        if(json.success){
            // redirect
            localStorage.setItem('token', json.authToken);
            navigate('/home');
            props.showAlert("Logged In Successfully", "success");
        }
        else{
            props.showAlert("Invalid Credentials", "danger");
        }
    }

    return (
        <div className="containerLS">
            <div className="formLS">
            <h2>Log In to Continue</h2>
                <form onSubmit={handleSubmit}>
                    <div className="emailID mx-1 my-2 d-flex align-items-center">
                        <label htmlFor="email" className="form-label me-2">Email</label>
                        <input type="email" className="form-control ip" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    </div>
                    <div className="password mx-1 my-2 d-flex align-items-center">
                        <label htmlFor="password" className="form-label me-2">Password</label>
                        <input type="password" id="password" name="password" className="form-control ip" value={password} onChange={(e) => setPassword(e.target.value)} aria-describedby="passwordHelpBlock" placeholder="Password" />
                    </div>
                    <div className="LoginBtn text-center">
                        <button type="submit" className="SUbtn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

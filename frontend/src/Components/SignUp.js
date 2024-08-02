import './styles.css';
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp(props) {

    const navigate = useNavigate();
    const host = "http://localhost:8000"
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [myFile, setMyFile] = useState('');

    async function submit(e) {
        e.preventDefault();

        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({fname, lname, email, password})
        });
        const json=await response.json();
        console.log(json);
        setFname('');
        setLname('');
        setEmail('');
        setPassword('');
        setCpassword('');
        if(json.success){
            // redirect
            localStorage.setItem('token', json.authToken);
            navigate('/login');
            props.showAlert("Account created Successfully", "success");
        }
        else{
            props.showAlert("User already exists", "warning");
        }
    }

    return (
        <div className="containerLS">
            <div className="formLS text-center">
            <h2>Create Account</h2>
                <form onSubmit={submit}>
                    <div className="name mx-1 my-2 d-flex align-items-center">
                        <label htmlFor="firstName" className="form-label me-2">Name</label>
                        <input type="text" className="form-control me-2 ip" id="firstName" value={fname} onChange={(e) => setFname(e.target.value)} placeholder="First Name" />
                        <input type="text" className="form-control ip" id="lastName" value={lname} onChange={(e) => setLname(e.target.value)} placeholder="Last Name" />
                    </div>
                    <div className="emailID mx-1 my-2 d-flex align-items-center">
                        <label htmlFor="emailID" className="form-label me-2">Email</label>
                        <input type="email" className="form-control ip" id="emailID" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    </div>
                    <div className="password mx-1 my-2 d-flex align-items-center">
                        <label htmlFor="password" className="form-label me-2">Password</label>
                        <input type="password" id="password" className="form-control ip" value={password} onChange={(e) => setPassword(e.target.value)} aria-describedby="passwordHelpBlock" placeholder="Password" minLength={5} required />
                    </div>
                    <div className="cpassword mx-1 my-2 d-flex align-items-center">
                        <label htmlFor="cpassword" className="form-label me-2">Confirm Password</label>
                        <input type="password" id="cpassword" className="form-control ip" value={cpassword} onChange={(e) => setCpassword(e.target.value)} aria-describedby="passwordHelpBlock" placeholder="Confirm Password" minLength={5} required />
                    </div>
                    <div className="SignUpBtn text-center">
                        <button disabled={password!==cpassword} type="submit" className="SUbtn btn-primary">Sign Up</button>
                    </div>
                    <div className='text-center'>
                        <label htmlFor="signup" className="form-label me-2 mt-3">Already have an account?</label>
                        <Link to="/login">
                            <button className="SUbtn btn-primary">Login</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
import './styles.css';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Host } from "./host";
import aboutImage from './about-image.jpg'; // Import the image

export default function Login(props) {

    const host = process.env.HOST;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showImage, setShowImage] = useState(false); // State to control image display
    let navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        });
        const json = await response.json();
        console.log(json);
        setEmail('');
        setPassword('');
        if (json.success) {
            // Display the image for 1.5 seconds before redirecting
            setShowImage(true);
            localStorage.setItem('token', json.authToken);
            props.showAlert("Logged In Successfully", "success");

            setTimeout(() => {
                setShowImage(false);
                navigate('/home');
            }, 1500); // Reduced delay for a quicker transition
        } else {
            props.showAlert("Invalid Credentials", "danger");
        }
    }

    return (
        <div className="containerLS">
            {showImage && ( // Conditionally render the image overlay
                <div className="image-overlay">
                    <img 
                        src={aboutImage} 
                        alt="About Notefy" 
                        className="overlay-image"
                    />
                </div>
            )}
            {!showImage && (
                <div className="formLS text-center">
                    <h2>Log In to Continue</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="emailID mx-1 my-2 d-flex align-items-center">
                            <label htmlFor="email" className="form-label me-2">Email</label>
                            <input 
                                type="email" 
                                className="form-control ip" 
                                id="email" 
                                name="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="Email" 
                            />
                        </div>
                        <div className="password mx-1 my-2 d-flex align-items-center">
                            <label htmlFor="password" className="form-label me-2">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                className="form-control ip" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                aria-describedby="passwordHelpBlock" 
                                placeholder="Password" 
                            />
                        </div>
                        <div className="LoginBtn text-center">
                            <button type="submit" className="SUbtn btn-primary">Login</button>
                        </div>
                        <div className='text-center'>
                            <label htmlFor="signup" className="form-label me-2 mt-3">Don't have an account?</label>
                            <Link to="/signup">
                                <button className="SUbtn btn-primary">SignUp</button>
                            </Link>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

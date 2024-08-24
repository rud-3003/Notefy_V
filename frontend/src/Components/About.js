import React from 'react';

export default function About() {
    return (
        <div>
            <section 
                className="about-section" 
                style={{
                    textAlign: 'center', 
                    color: '#fff', 
                    padding: '60px 20px', 
                    // background: 'url(./bg.jpg) no-repeat center center/cover'
                }}
            >
                <div 
                    className="content-wrapper" 
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.6)', 
                        padding: '40px', 
                        borderRadius: '10px'
                    }}
                >
                    <h1 
                        style={{
                            fontSize: '48px', 
                            marginBottom: '20px', 
                            fontWeight: 'bold'
                        }}
                    >
                        Welcome to Notefy
                    </h1>
                    <p 
                        style={{
                            fontSize: '18px', 
                            marginBottom: '40px'
                        }}
                    >
                        Notefy is your go-to app for creating and organizing notes with ease. Whether you're a student, professional, or just someone who loves to jot things down, Notefy helps you keep your thoughts organized, accessible, and secure.
                    </p>
                    <p 
                        style={{
                            fontSize: '18px', 
                            marginBottom: '40px'
                        }}
                    >
                        Sign up today and join a community of note-takers who value efficiency and simplicity. With features like a rich text editor, tagging, and the ability to make your notes public or private, Notefy is the perfect solution for your note-taking needs.
                    </p>
                    <a 
                        href="/signup" 
                        className="btn btn-outline-light" 
                        style={{
                            fontSize: '20px', 
                            padding: '10px 30px'
                        }}
                    >
                        Get Started Now
                    </a>
                </div>
            </section>

            <div className="about-details" style={{ padding: '20px' }}>
                <h2 style={{ fontSize: '32px', marginBottom: '10px' }}>About Notefy</h2>
                <p style={{ fontSize: '18px', marginBottom: '20px' }}>
                    <strong>Notefy</strong> is a full-featured web application built on the MERN stack (MongoDB, Express.js, React.js, Node.js). It is designed to help users easily create, manage, and share notes. With an intuitive UI and rich text editor, Notefy supports adding detailed notes with titles, descriptions, tags, images, and privacy settings.
                </p>

                <h2 style={{ fontSize: '32px', marginBottom: '10px' }}>Key Features</h2>
                <p style={{ fontSize: '18px', marginBottom: '20px' }}>
                    <strong>Main Features of Notefy:</strong>
                    <ul>
                        <li>Sign Up & Login: Secure authentication to keep your notes safe.</li>
                        <li>Rich Text Editor: Create beautiful and organized notes.</li>
                        <li>Tagging System: Organize your notes with tags for easy searching.</li>
                        <li>Privacy Controls: Make your notes public or keep them private.</li>
                        <li>Search Functionality: Search notes by title or tags for quick access.</li>
                    </ul>
                </p>

                <h2 style={{ fontSize: '32px', marginBottom: '10px' }}>Future Enhancements</h2>
                <p style={{ fontSize: '18px', marginBottom: '20px' }}>
                    <strong>Looking Forward:</strong> We are constantly working on improving Notefy. Some of the upcoming features include:
                    <ul>
                        <li>User-specific categories for better organization.</li>
                        <li>Note-sharing with specific users to collaborate efficiently.</li>
                        <li>Advanced search filters for more precise results.</li>
                    </ul>
                </p>
            </div>
        </div>
    );
}

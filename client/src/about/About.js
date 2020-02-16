import React from 'react'
import './About.css'

export default function About() {
    return (
        <div className="about-container">
        <div className="about-overlay">
            <div className="about-card">
                <div className="card-header">
                    <div className="header-overlay"></div>
                </div>
                <div className="card-image">
                </div>
                <div className="card-details">
                    <h1>Yakov Haiilo</h1>
                    <h2>Full Stack Developer</h2>
                </div>
                <div className="social-links">
                    <a href="https://www.linkedin.com/in/yakov-haiilo-797944194/" rel="noopener noreferrer" target="_blank"><i className="fab fa-linkedin"></i></a>
                    <a   href="https://github.com/yakovhaiilo" rel="noopener noreferrer" target="_blank"><i className="fab fa-github-square"></i></a>
                    <a  href="https://www.facebook.com/profile.php?id=100001264699821" rel="noopener noreferrer" target="_blank"><i className="fab fa-facebook" rel="noopener noreferrer" target="_blank"></i></a>
                </div>
            </div>
        </div>
    </div>
    )
}

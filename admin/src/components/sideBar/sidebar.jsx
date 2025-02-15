import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css'; // Custom styles for the sidebar

const Sidebar = () => {
    // State to handle the sidebar toggle (open/close)
    const [isOpen, setIsOpen] = useState(true);

    // Toggle function to open/close the sidebar
    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            {/* Sidebar Toggle Button */}
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                {isOpen ? 'Close' : 'Open'} Sidebar
            </button>

            {/* Sidebar Content */}
            <div className="sidebar-content">
                <ul>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/home-slider">Home Slider</Link>
                    </li>
                    <li>
                        <Link to="/home-info">Home Information</Link>
                    </li>
                    <li>
                        <Link to="/home-client">Home Client</Link>
                    </li>
                    <li>
                        <Link to="/home-service">Home Service</Link>
                    </li>
                    <li>
                        <Link to="/home-project">Home Project</Link>
                    </li>
                    <li>
                        <Link to="/home-awards">Home Awards</Link>
                    </li>
                    <li>
                        <Link to="/about-overview">About Overview</Link>
                    </li>
                    <li>
                        <Link to="/about-awards">About Awards</Link>
                    </li>
                    <li>
                        <Link to="/about-career">About Career</Link>
                    </li>
                    <li>
                        <Link to="/main-service">Service</Link>
                    </li>
                    <li>
                        <Link to="/whyus-title">Whyus Title</Link>
                    </li>
                    <li>
                        <Link to="/whyus">Whyus Content</Link>
                    </li>
                    <li>
                        <Link to="/portfolio">Portfolio</Link>
                    </li>
                    <li>
                        <Link to="/innovation">Innovation</Link>
                    </li>
                    <li>
                        <Link to="/all-title">All Title</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link to="/contact-form">Contact Form</Link>
                    </li>
                    <li>
                        <Link to="/job-application">Job Application</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;

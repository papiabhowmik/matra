import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./login.css";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Check if token exists in localStorage and redirect if so
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            navigate('/dashboard');
        }
    }, [navigate]);

    function handleSubmit(event) {
        event.preventDefault();
        axios.post(`/api/matra/login`, { username, password })
            .then(res => {
                const token = res.data.token;
                // console.log(token);
                if (token) {
                    localStorage.setItem('authToken', token);
                    navigate('/dashboard');
                } else {
                    setErrorMessage('Invalid credentials');
                }
            })
            .catch(err => {
                setErrorMessage('Login failed. Please try again.');
                console.error(err);
            });
    }

    return (
        <div className='login'>
            <h3>Log In</h3>
            <form className='loginForm' onSubmit={handleSubmit}>
                <div className="inputGroup">
                    <label>User Name</label>
                    <input className='form-control' type='text' placeholder='Enter User Name'
                        onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="inputGroup">
                    <label>Password</label>
                    <input className='form-control' type='password' placeholder='Enter Password'
                        onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="loginbtn"></div>
                <button className='btn'>Login</button>
                {errorMessage && <div className="error">{errorMessage}</div>}
            </form>
        </div>
    );
};

export default Login;

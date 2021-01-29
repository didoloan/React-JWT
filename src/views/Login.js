import React, { useState } from 'react';
import {apiBaseURL} from '../app.json'

const Login = props => {
    const [creds, setCreds] = useState({email:'', password:''})


    const handleSubmit = e => {
        e.preventDefault();
        login();
    }

    const login = () => {
        fetch(`${apiBaseURL}/auth/login`, {
            method:'POST', 
            headers: {
            'Content-Type': 'application/json',
            'cache-control': 'no-cache'},
            body:JSON.stringify(creds)
        })
        .then(res => res.json())
        .then(res => console.table(res))
    }

    const handleInput = e => {
        const value = e.target.value;
        setCreds({...creds, [e.target.name]:value});
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="email" value={creds.email} onChange={handleInput} />
                <input name="password" value={creds.password} onChange={handleInput} />
                <button>Login</button>
            </form>
        </div>
    );
}

export default Login;
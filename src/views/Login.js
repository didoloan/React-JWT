import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import {apiBaseURL} from '../app.json';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import {Link, navigate } from '@reach/router'
import { TextField, Button } from '@material-ui/core'
import {loginUser} from '../actions/authActions'

const Login = props => {
    const [creds, setCreds] = useState({email:'', password:''})
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)

    useEffect(() => {
        if(auth.isLoggedIn) {
            navigate('/dashboard');
        }
    },[])


    

    const login = () => {
        console.log('fetching login')
        fetch(`${apiBaseURL}/auth/login`, {
            method:'POST', 
            headers: {
            'Content-Type': 'application/json',
            'cache-control': 'no-cache'},
            body:JSON.stringify(creds)
        })
        .then(res => res.json())
        .then(res => {
            console.table(res)
            if(res.accessToken){
                dispatch(loginUser(res))
                navigate('/dashboard')
            }
        })
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        login();
    }

    const handleInput = e => {
        const value = e.target.value;
        setCreds({...creds, [e.target.name]:value});
    }

    return (

        <div style={{width:300, margin:'auto'}}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column'}}>
                <TextField style={{marginTop:20}} placeholder="Email" name="email" value={creds.email} onChange={handleInput} />
                <TextField style={{marginTop:20}} type="password" placeholder="Password" name="password" value={creds.password} onChange={handleInput} />
                <Button onClick={handleSubmit} style={{marginTop:20}} variant="contained" color="primary">Login</Button>
            </form>
            <p>Not yet registered <Link to="/login">Register</Link></p>
        </div>
    );
}

export default Login;
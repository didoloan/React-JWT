import React, { useState } from 'react';
import {TextField, Button} from '@material-ui/core';
import ReactDOM from 'react-dom';
import {apiBaseURL} from '../app.json'
import {Link, navigate} from '@reach/router'
import { useDispatch } from 'react-redux' 
import { loginUser } from '../actions/authActions';


const Register = props => {
    const [user, setUser] = useState({email:'', fname:'', lname:'', dob:'', password:''})
    const dispatch = useDispatch()

    const handleSubmit = e => {
        e.preventDefault();
        register();
    }

    const register = () => {
        fetch(`${apiBaseURL}/auth/register`, {
            method:'POST', 
            headers: {
            'Content-Type': 'application/json',
            'cache-control': 'no-cache'},
            body:JSON.stringify(user)
        })
        .then(res => res.json())
        .then(res => {
            console.table(res)
            if(res.accessToken) {
                dispatch(loginUser(res));
                navigate('/dashboard');
            }
        })
    }

    const handleInput = e => {
        const value = e.target.value;
        setUser({...user, [e.target.name]: value});
    }

    return (
        <div style={{width:300, margin:'auto'}}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column'}}>
                <TextField style={{marginTop:20}} type="email" placeholder="Email" name="email" value={user.email} onChange={handleInput} />
                <TextField style={{marginTop:20}} placeholder="Firstname" name="fname" value={user.fname} onChange={handleInput} />
                <TextField style={{marginTop:20}} placeholder="Lastname" name="lname" value={user.lname} onChange={handleInput} />
                <TextField style={{marginTop:20}} label="Birthday" defaultValue="2000-01-01" type="date" name="dob" value={user.dob} onChange={handleInput} />
                <TextField style={{marginTop:20}} type="password" placeholder="Password" name="password" value={user.password} onChange={handleInput} InputLabelProps={{shrink:false}} />
                <Button onClick={handleSubmit} style={{marginTop:20}} variant="contained" color="primary">Register</Button>
            </form>
            <p>Already registered <Link to="/login">Login</Link></p>
        </div>

    );
}

export default Register;
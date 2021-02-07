import React, { useState } from 'react';
import {TextField, Button, Fade, CircularProgress} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import ReactDOM from 'react-dom';
import {apiBaseURL} from '../app.json'
import {Link, navigate} from '@reach/router'
import { useDispatch } from 'react-redux' 
import { loginUser } from '../actions/authActions';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Register = props => {
    const [user, setUser] = useState({email:'', fname:'', lname:'', dob:'', password:''})
    const [reserror, setError] = useState({});
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false);

    const filled = () => {
        return user.email&&user.fname&&user.lname&&user.dob&&user.password;
    }

    const handleSubmit = e => {
        e.preventDefault();
        register();
    }

    const register = () => {
        setLoad(true);
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
            if(res.error) {
                console.log(res.error)
                setError(res.error);
                setTimeout(() => setError({}), 2000);
            }
            if(res.accessToken) {
                dispatch(loginUser(res));
                navigate('/dashboard');
            }
        })
        setLoad(false);
    }

    const handleInput = e => {
        const value = e.target.value;
        setUser({...user, [e.target.name]: value});
    }

    return (
        <div style={{width:300, margin:'auto'}}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column'}}>
                <TextField style={{marginTop:20}} type="email" placeholder="Email" label="Email" name="email" value={user.email} onChange={handleInput} variant="filled" />
                <TextField style={{marginTop:20}} placeholder="Firstname" label="Firstname" name="fname" value={user.fname} onChange={handleInput} variant="filled" />
                <TextField style={{marginTop:20}} placeholder="Lastname" label="Lastname" name="lname" value={user.lname} onChange={handleInput} variant="filled" />
                <TextField style={{marginTop:20}} label="Birthday" label="Birthday" defaultValue="2000-01-01" type="date" name="dob" value={user.dob} onChange={handleInput} variant="filled" />
                <TextField style={{marginTop:20}} type="password" placeholder="Password" label="Password" name="password" value={user.password} onChange={handleInput} InputLabelProps={{shrink:false}} variant="filled" />
                {filled()?<Button onClick={handleSubmit} style={{marginTop:20, marginBottom:20, height:50}} variant="outlined" color="primary">Register</Button>:<Button onClick={handleSubmit} style={{marginTop:20, marginBottom:20, height:50}} variant="outlined" color="primary" disabled>Register</Button>}
                {reserror&&<Fade in={reserror.message}><Alert severity="error">{reserror.message}</Alert></Fade>}
            </form>
            <p>Already registered <Link to="/login">Login</Link></p>
            {load&&<div style={{display:'flex',justifyContent:'center', alignItems:'center', width:'100%', height:'100%', zIndex:3, backgroundColor:'ffffffaa', position:'absolute', top:0}}>
                <CircularProgress />
            </div>}
        </div>

    );
}

export default Register;
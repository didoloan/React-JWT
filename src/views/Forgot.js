import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import { apiBaseURL } from '../app.json';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { Link, navigate } from '@reach/router'
import { GoogleLogin } from 'react-google-login'
import FacebookLogin from 'react-facebook-login'
import { TextField, Button, Fade, CircularProgress, FilledInput, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import MuiAlert from '@material-ui/lab/Alert';
import { loginUser } from '../actions/authActions'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Forgot = props => {
    const [email, setEmail] = useState('');
    const [reserror, setError] = useState({});
    const [load, setLoad] = useState(false);
    const [pasvisi, setpasvisi] = useState(false);
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);


    useEffect(() => {
        if (auth.isLoggedIn) {
            navigate('/dashboard');
        }
    }, [])




    const requestReset = () => {
        setLoad(true);
        console.log('fetching login')
        fetch(`${apiBaseURL}/auth/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:email})
        })
            .then(res => res.json())
            .then(res => {
                console.table(res)
                if (res.error) {
                    console.log(res.error)
                    fadeError(res.error);
                }
                if (res.accessToken) {
                    dispatch(loginUser(res));
                    setEmail('');
                    navigate('/login');
                }
            })
            .catch(err => { console.log(err.message); fadeError(err) })
        setLoad(false);
    }

    const fadeError = (err) => {
        setError(err);
        setTimeout(() => setError({}), 2000);
    }

    const handleSubmit = e => {
        e.preventDefault();
        requestReset();
    }

    const acceptEnter = e => {
        if (e.key === 'Enter') {
            requestReset();
        }
    }

    const handleInput = e => {
        setEmail(e.target.value);
    }

    return (

        <div style={{ width: 300, margin: 'auto', position: 'relative' }}>
            <h2>Input Email to Reset Password</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <TextField style={{ marginTop: 20 }} placeholder="Email" label="Email" name="email" value={email} onChange={handleInput} onKeyPress={acceptEnter} variant="filled" />
                {/* <FilledInput style={{ marginTop: 20 }} type={pasvisi ? "text" : "password"} placeholder="Password" label="Password" name="password" value={creds.password} onChange={handleInput} onKeyPress={acceptEnter} endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => { setpasvisi(!pasvisi) }}
                            onMouseDown={e => { e.preventDefault() }}
                            edge="end"
                        >
                            {pasvisi ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                } /> */}
                {email ? <Button onClick={handleSubmit} style={{ marginTop: 20, marginBottom: 20, height: 50 }} variant="outlined" color="primary">Submit</Button> : <Button onClick={handleSubmit} style={{ marginTop: 20, marginBottom: 20, height: 50 }} variant="outlined" color="primary" disabled>Submit</Button>}
                {reserror && <Fade in={reserror.message}><Alert severity="error">{reserror.message}</Alert></Fade>}
            </form>
            {load && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', zIndex: 3, backgroundColor: 'ffffffaa', position: 'absolute', top: 0 }}>
                <CircularProgress />
            </div>}
        </div>
    );
}

export default Forgot;
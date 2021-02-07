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

const Login = props => {
    const [creds, setCreds] = useState({ email: '', password: '' });
    const [reserror, setError] = useState({});
    const [load, setLoad] = useState(false);
    const [pasvisi, setpasvisi] = useState(false);
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const filled = () => {
        const { email, password } = creds;
        return email && password;
    }

    useEffect(() => {
        if (auth.isLoggedIn) {
            navigate('/dashboard');
        }
    }, [])

    const responseGoogle = () => {
        return;
    }




    const login = () => {
        setLoad(true);
        console.log('fetching login')
        fetch(`${apiBaseURL}/auth/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(creds)
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
                    setCreds({ email: '', password: '' });
                    navigate('/dashboard');
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
        login();
    }

    const acceptEnter = e => {
        if (e.key === 'Enter') {
            login();
        }
    }

    const handleInput = e => {
        const value = e.target.value;
        setCreds({ ...creds, [e.target.name]: value });
    }

    return (

        <div style={{ width: 300, margin: 'auto', position: 'relative' }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <TextField style={{ marginTop: 20 }} placeholder="Email" label="Email" name="email" value={creds.email} onChange={handleInput} variant="filled" />
                <FilledInput style={{ marginTop: 20 }} type={pasvisi ? "text" : "password"} placeholder="Password" label="Password" name="password" value={creds.password} onChange={handleInput} onKeyPress={acceptEnter} endAdornment={
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
                } />
                {filled() ? <Button onClick={handleSubmit} style={{ marginTop: 20, marginBottom: 20, height: 50 }} variant="outlined" color="primary">Login</Button> : <Button onClick={handleSubmit} style={{ marginTop: 20, marginBottom: 20, height: 50 }} variant="outlined" color="primary" disabled>Login</Button>}
                {reserror && <Fade in={reserror.message}><Alert severity="error">{reserror.message}</Alert></Fade>}
            </form>
            <p>Not yet registered <Link to="/register">Register</Link></p>
            <GoogleLogin
                clientId="387852080754-6gfsprtf26hlgpivgnhvfu61e2h4euju.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
            {/* <FacebookLogin
                appId="1088597931155576"
                autoLoad={true}
                fields="name,email,picture"
                onClick={() => {}}
                callback={() => {}} 
            /> */}
            {load && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', zIndex: 3, backgroundColor: 'ffffffaa', position: 'absolute', top: 0 }}>
                <CircularProgress />
            </div>}
        </div>
    );
}

export default Login;
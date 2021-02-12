import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { apiBaseURL } from '../app.json';
import { useDispatch, connect } from 'react-redux';
import { Link, navigate } from '@reach/router';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { TextField, Button, Fade, CircularProgress, FilledInput, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import MuiAlert from '@material-ui/lab/Alert';
import { loginUser } from '../actions/authActions';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = ({isLoggedIn}) => {
    const [creds, setCreds] = useState({ email: '', password: '' });
    const [reserror, setError] = useState({});
    const [load, setLoad] = useState(false);
    const [pasvisi, setpasvisi] = useState(false);
    const dispatch = useDispatch();

    const filled = () => {
        const { email, password } = creds;
        return email && password;
    }

    useEffect(() => {
        if (auth.isLoggedIn) {
            navigate('/dashboard');
        }
    }, [isLoggedIn])

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
                    // navigate('/dashboard');
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
                <Link style={{textDecoration:'none', alignSelf:'self-end'}} to="/forgot-password">Forgot Password</Link>
                {filled() ? <Button onClick={handleSubmit} style={{ marginTop: 20, marginBottom: 20, height: 50 }} variant="outlined" color="primary">Login</Button> : <Button onClick={handleSubmit} style={{ marginTop: 20, marginBottom: 20, height: 50 }} variant="outlined" color="primary" disabled>Login</Button>}
                {reserror && <Fade in={reserror.message}><Alert severity="error">{reserror.message}</Alert></Fade>}
            </form>
            <p>Not yet registered <Link to="/register">Register</Link></p>
            <GoogleLogin
                clientId="387852080754-6gfsprtf26hlgpivgnhvfu61e2h4euju.apps.googleusercontent.com"
                render={renderProps => (
                    <button style={{display:'flex', width:220, justifyContent:'center', padding:5, margin:'auto',marginBottom:20,backgroundColor:'#fff',borderRadius:4 }} onClick={renderProps.onClick} disabled={renderProps.disabled}>
                        <div>
                            <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg"><g fill="#000" fill-rule="evenodd"><path d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z" fill="#EA4335"></path><path d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z" fill="#4285F4"></path><path d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z" fill="#FBBC05"></path><path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z" fill="#34A853"></path><path fill="none" d="M0 0h18v18H0z"></path></g></svg>
                            <h4 style={{display:'inline-block'}}>Google</h4>
                        </div>
                    </button>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
            <FacebookLogin
                appId="2505092879792378"
                autoLoad={false}
                fields="name,email,picture"
                onClick={() => {}}
                callback={() => {}} 
            />
            {load && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', zIndex: 3, backgroundColor: 'ffffffaa', position: 'absolute', top: 0 }}>
                <CircularProgress />
            </div>}
        </div>
    );
}

const mapState = (state) => ({
    isLoggedIn: state.auth.isLoggedIn
})

// const mapDispatch = ()

export default connect(mapState)(Login);
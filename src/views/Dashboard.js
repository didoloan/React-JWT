import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@material-ui/core';
import { apiBaseURL } from '../app.json';
import { useSelector, useDispatch } from 'react-redux';
import { navigate } from '@reach/router';
import { logoutUser, loginUser } from '../actions/authActions'
import { initialiseInterests, addInterests, delInterest } from '../actions/interestActions'
import { Interests, Hobbies } from '../components/interests';
// import Hobbies from '../components/hobbies';

const Dashboard = props => {

    const [user, setUser] = useState({});

    const auth = useSelector(state => state.auth);

    const interests = useSelector(state => state.interests);

    const dispatch = useDispatch()

    useEffect(() => {
        console.log(auth);
        if (!auth.isLoggedIn) navigate('/login')
        fetch(`${apiBaseURL}/user`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${auth.tokens.access}`
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.error) {
                    if (res.error.message === "Token Expired!") {
                        fetch(`${apiBaseURL}/auth/refresh`, {
                            method: 'POST',
                            credentials: 'include',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ refreshToken: auth.refresh })
                        })
                            .then(res => res.json())
                            .then(res => {
                                if (res.error) {
                                    dispatch(logoutUser());
                                }
                                loginUser(res);
                            })
                    }
                }
                if (res.result) {
                    setUser(res.result);
                }
            })
    }, [auth])

    useEffect(() => {
        user.fname && dispatch(initialiseInterests(user.interests))
    }, [user])

    const logout = () => {
        dispatch(logoutUser());
        navigate('/login');
    }

    const addHobby = val => {
        let valarr = []
        valarr.push(val)
        fetch(`${apiBaseURL}/user/hobbies`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${auth.tokens.access}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ hobbies: valarr })
        })
            .then(res => res.json())
            .then(res => {
                if (res.message) {
                    let old = user
                    setUser(old.hobbies.push(val))
                }
            })
    }

    const addInterest = (val) => {
        let valarr = [];
        valarr.push(val);
        console.log(valarr);
        fetch(`${apiBaseURL}/user/interests`, {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Authorization': `Bearer ${auth.tokens.access}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ interests: valarr })
        })
            .then(res => res.json())
            .then(res => {
                if (res.message) {
                    dispatch(addInterests(valarr));
                }
            })
    }

    const deleteInterest = index => {
        fetch(`${apiBaseURL}/user/interests`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${auth.tokens.access}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ index: index })
        })
            .then(res => res.json())
            .then(res => {
                if (res.message = 'Interest deleted successfully!') {
                    dispatch(delInterest(index));
                }
            })
    }



    return (
        <div>
            <Button onClick={() => logout()}>Logout</Button>
            <h1 style={{ color: '#645454' }}>Welcome {user.fname}</h1>
            {user.email && <Interests interests={interests} add={addInterest} deleteI={deleteInterest} />}
            {user.email && <Hobbies interests={user.hobbies} add={addHobby} />}

        </div>
    );
}

export default Dashboard;
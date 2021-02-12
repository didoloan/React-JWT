import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@material-ui/core';
import { apiBaseURL } from '../app.json';
import { useDispatch, connect } from 'react-redux';
import { navigate } from '@reach/router';
import { logoutUser, loginUser } from '../actions/authActions'
import { initialiseInterests, addInterests, delInterest } from '../actions/interestActions'
import { initialiseHobbies, addHobby, delHobby } from '../actions/hobbyActions'
import { Interests, Hobbies } from '../components/interests';

const Dashboard = ({ isLoggedIn, access, refresh, interests, hobbies }) => {

    const [user, setUser] = useState({});

    const dispatch = useDispatch()

    useEffect(() => {
        if (!isLoggedIn) navigate('/login')
        console.log(access);
        fetch(`${apiBaseURL}/user`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${access}`
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
                        body: JSON.stringify({ refreshToken: refresh })
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
    }, [])

    useEffect(() => {
        if(user.fname){
            dispatch(initialiseInterests(user.interests));
            dispatch(initialiseHobbies(user.hobbies));
        }
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
            headers: { 'Authorization': `Bearer ${access}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ hobbies: valarr })
        })
        .then(res => res.json())
        .then(res => {
            if (res.message) {
                dispatch(addHobby(valarr));
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
            headers: { 'Authorization': `Bearer ${access}`, 'Content-Type': 'application/json' },
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
            headers: { 'Authorization': `Bearer ${access}`, 'Content-Type': 'application/json' },
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
            <h1 style={{ color: '#645454' }}>Welcome {user.fname ? 'Loading...' : user.fname}</h1>
            {user.email && <Interests interests={interests} add={addInterest} deleteI={deleteInterest} />}
            {user.email && <Hobbies interests={hobbies} add={addHobby} />}

        </div>
    );
}

const mapState = state => ({
    isLoggedIn: state.auth.isLoggedIn,
    access: state.auth.tokens.access,
    refresh: state.auth.tokens.refresh,
    interests: state.interests,
    hobbies: state.hobbies
})

export default connect(mapState)(Dashboard);
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@material-ui/core';
import { apiBaseURL } from '../app.json';
import { connect, dispatch } from 'react-redux';
import { navigate } from '@reach/router';
import { logoutUser, loginUser } from '../actions/authActions'
import { initialiseInterests, addInterests, delInterest } from '../actions/interestActions'
import { initialiseHobbies, addHobby, delHobby } from '../actions/hobbyActions'
import { Interests, Hobbies } from '../components/interests';

const Dashboard = ({ isLoggedIn, access, refresh, interests, hobbies, initHobbies, initInterests, addHob, addInt, delInt, loginNow, logoutNow }) => {

    const [user, setUser] = useState({});

    // const dispatch = useDispatch()

    useEffect(() => {
        if (!isLoggedIn) navigate('/login')
        fetch(`${apiBaseURL}/user`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${access}`
            }
        })
        .then(res => res.json())
        .then(res => {
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
                            logoutNow();
                        }
                        loginNow(res);
                    })
                }
            }
            if (res.result) {
                setUser(res.result);
            }
        })
    }, [isLoggedIn])

    useEffect(() => {
        if(user.fname){
            initInterests(user.interests);
            initHobbies(user.hobbies);
        }
    }, [user])

    const logout = () => {
        logoutNow();
        navigate('/login');
    }

    const addHobbies = val => {
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
                addHob(valarr);
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
                addInt(valarr);
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
                    delInt(index);
                }
            })
    }



    return (
        <div>
            <Button onClick={() => logout()}>Logout</Button>
            <h1 style={{ color: '#645454' }}>Welcome {user.fname ? user.fname:'Loading...' }</h1>
            {user.email && <Interests interests={interests} add={addInterest} deleteI={deleteInterest} />}
            {user.email && <Hobbies interests={hobbies} add={addHobbies} />}

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

const mapDispatch = dispatch => ({
    initInterests: values => dispatch(initialiseHobbies(values)),
    initHobbies: values => dispatch(initialiseHobbies(values)),
    loginNow: res => dispatch(loginUser(res)),
    logoutNow: () => dispatch(logoutUser),
    addHob: values => dispatch(addHobby(values)),
    addInt: values => dispatch(addInterests(values)),
    delInt: index => dispatch(delInterest(index))
})

export default connect(mapState, mapDispatch)(Dashboard);
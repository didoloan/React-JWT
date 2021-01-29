import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {Button} from '@material-ui/core';
import { apiBaseURL} from '../app.json';
import { useSelector, useDispatch } from 'react-redux';
import { navigate } from '@reach/router';
import {logoutUser} from '../actions/authActions'
import Interests from '../components/interests';
import Hobbies from '../components/hobbies';

const Dashboard = props => {

    const [user, setUser] = useState({})

    const auth = useSelector(state => state.auth)

    const dispatch = useDispatch()

    useEffect(() => {
        console.log(auth);
        if(!auth.isLoggedIn) navigate('/login')
        fetch(`${apiBaseURL}/user`, {method:'GET', headers:{
            'Authorization': `Bearer ${auth.tokens.access}`}
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if(res.error){
                dispatch(logoutUser);
            }
            if(res.result.email) {
                setUser(res.result);
            }
        })
    },[auth.isLoggedIn])

    const addHobby = val => {
        let valarr = []
        valarr.push(val)
        fetch(`${apiBaseURL}/user/hobbies`, {method:'POST',
        headers: {'Authorization':`Bearer ${auth.tokens.access}`, 'Content-Type':'application/json'}, 
        body:JSON.stringify({hobbies:valarr})})
        .then(res => res.json())
        .then(res => {
            if(res.message) {
                let old = user
                setUser(old.hobbies.push(val))
            }
        })
    }

    const addInterest = (val) => {
        let valarr = [];
        valarr.push(val);
        console.log(valarr);
        fetch(`${apiBaseURL}/user/interests`, {method:'POST',
        headers: {'Authorization':`Bearer ${auth.tokens.access}`, 'Content-Type': 'application/json'}, 
        body:JSON.stringify({interests:valarr})})
        .then(res => res.json())
        .then(res => {
            if(res.message) {
                let old = user
                setUser(old.interests.push(val))
            }
        })
    }


    
    return (
        <div>
            <h1 style={{color:'#645454'}}>Welcome {user.fname}</h1>
            {user.email&&<Interests interests={user.interests} add={addInterest} />}
            {user.email&&<Hobbies interests={user.hobbies} add={addHobby} />}

        </div>
    );
}

export default Dashboard;
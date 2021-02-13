import React, { useState } from 'react';
import ReactDOM from 'react-dom'
import {TextField} from '@material-ui/core'

const Interests = ({interests, add}) => {
    const [newI,setNew] = useState('')

    const handleInput = e => {
        setNew(e.target.value);
    }

    const handleEnter = e => {
        if(e.key==='Enter'){
            add(newI);
        }
    }

    return (
        <div>
            <h2>Hobbies</h2>
            <TextField style={{textAlign:'center'}} type="text" placeholder="Add new Hobby" onChange={handleInput} onKeyPress={handleEnter} value={newI} />
            <div style={{width: 300, display:'flex', margin:'auto', flexFlow:'row wrap', justifyContent:'center'}}>
            {interests.map((interest,index) => <p style={{padding:5,margin:0, marginLeft:5, boxShadow:'0 2px 5px #aaa',borderRadius:5}}>{interest}</p>)}
            </div>
        </div>
        
    );
}

export default Interests;


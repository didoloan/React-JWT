import React, {useState} from 'react';
import ReactDOM from 'react-dom'
import {TextField, Chip} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import FaceIcon from '@material-ui/icons/Face'
import DeleteIcon from '@material-ui/icons/Delete'
import { useDispatch } from 'react-redux';
import { delInterest } from '../actions/interestActions'


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: theme.spacing(0.5),
      margin: 0,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
}));




export const Interests = ({interests, add, deleteI}) => {
    const classes = useStyles();
    const [newI,setNew] = useState('');
    const dispatch = useDispatch();

    const handleInput = e => {
        setNew(e.target.value);
    }

    const handleEnter = e => {
        if(e.key==='Enter'){
            add(newI);
            setNew('');
        }
    }

    const handleDelete = index => {
        deleteI(index);
        
    }

    return (
        <div>
            <h2>Interests</h2>
            <TextField style={{alignSelf:'flex-start'}} type="text" placeholder="Add new Interest" onChange={handleInput} onKeyPress={handleEnter} value={newI} />
            <div style={{width: 300, display:'flex', margin:'auto', flexFlow:'row wrap'}}>
                {interests.map((interest,index) => <Chip label={interest} onDelete={() => handleDelete(index)} deleteIcon={<DeleteIcon />} className={classes.chip} />)}
            </div>
            
        </div>
        
    );
}


export const Hobbies = ({interests, add}) => {
    const classes = useStyles();
    const [newI,setNew] = useState('')

    const handleInput = e => {
        setNew(e.target.value);
    }

    const handleEnter = e => {
        if(e.key==='Enter'){
            add(newI);
        }
    }

    const handleDelete = index => {
        console.log(index);
    }

    return (
        <div>
            <h2>Hobbies</h2>
            <div style={{width: 300, display:'flex', margin:'auto', flexFlow:'row wrap'}}>
                {interests.map((interest,index) => <Chip icon={<FaceIcon />} label={interest} key={index} onDelete={() => handleDelete(index)} deleteIcon={<DeleteIcon/>} className={classes.chip} />)}
            </div>
            <TextField type="text" placeholder="Add new Hobby" onChange={handleInput} onKeyPress={handleEnter} value={newI} />
        </div>
        
    );
}

// module.exports = { Interests, Hobbies };


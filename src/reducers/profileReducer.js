import { INIT_PROFILE, SET_EMAIL, SET_NAME } from '../actions/profileActions'


const profileReducer = (initial={email:'', fname:'',lname:''}, action) => {
    switch(action.type){
        case INIT_PROFILE:
            return action.data
        case SET_NAME:
            return {...initial, fname:action.data.fname, lname:action.data.lname}
        case SET_EMAIL:
            return {...initial, email: action.data.email}
        default:
            return initial
    }
}

export default profileReducer;
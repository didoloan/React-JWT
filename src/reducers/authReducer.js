import { LOGIN, LOGOUT} from '../actions/authActions'
 
const authReducer = (initial={isLoggedIn:false, tokens:{access:'',refresh:''}}, action) => {
    switch(action.type) {
        case LOGIN:
            return {tokens:{access:action.payload.accessToken, refresh:action.payload.refreshToken}, isLoggedIn:true}
        case LOGOUT:
            return {tokens:{access:'',refresh:''}, isLoggedIn:false}
        default:
            return initial
    }
}

export default authReducer;
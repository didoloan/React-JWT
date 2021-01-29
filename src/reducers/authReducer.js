

const authReducer = (initial={isLoggedIn:false, user:{email:'',fname:'',lname:''}}, action) => {
    switch(action.type) {
        case "LOGIN":
            return {...initial, isLoggedIn:true}
        case "LOGOUT":
            return {user:{email:'',fname:'',lname:''}, isLoggedIn:false}
        case default:
            return initial
    }
}
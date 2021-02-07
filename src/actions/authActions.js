export const LOGIN = 'LOGIN';

export const LOGOUT = 'LOGOUT';

export const ADD_USER = 'ADD_USER';


export const loginUser = (tokens) => (
    {
        type: LOGIN,
        payload: tokens
    }
)

export const logoutUser = () => ({ type:LOGOUT})
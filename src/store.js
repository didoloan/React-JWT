import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducer';


const saveToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('ghch8u7', serializedState)
    } catch (error) {
        console.log(error)
    }
}

const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('ghch8u7');
        if(serializedState===null) return {auth:{isLoggedIn:false, tokens:{access:'',refresh:''}}}
        return JSON.parse(serializedState);
    } catch (error) {
        console.log(error);
        return {auth:{isLoggedIn:false, tokens:{access:'',refresh:''}}}
    }
}

const persistedState = loadFromLocalStorage()

const rootReducer = combineReducers({
    auth:authReducer
})

const store = createStore(rootReducer,persistedState);

store.subscribe(() => saveToLocalStorage(store.getState()))

export default store;
import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import hobbyReducer from './reducers/hobbyReducer';
import interestReducer from './reducers/interestReducer';
import profileReducer from './reducers/profileReducer';


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
        if(serializedState===null) return {auth:{isLoggedIn:false, tokens:{access:'',refresh:''}},hobbies:[],interests:[], profile:{fname:'', lname:'', email:''}}
        return JSON.parse(serializedState);
    } catch (error) {
        console.log(error);
        return {auth:{isLoggedIn:false, tokens:{access:'',refresh:''}},hobbies:[],interests:[], profile:{fname:'', lname:'', email:''}}
    }
}

const persistedState = loadFromLocalStorage();

const rootReducer = combineReducers({
       auth: authReducer,
    hobbies: hobbyReducer,
  interests: interestReducer,
    profile: profileReducer
});

const store = createStore(rootReducer,persistedState);

store.subscribe(() => {
    console.log('Saving to local store');
    saveToLocalStorage(store.getState());
});

export default store;
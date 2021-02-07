import { Button } from '@material-ui/core';
import {Link, navigate} from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, } from '../actions/authActions';

const Navbar = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    return (
        <div style={{display:'flex', justifyContent:'space-between', padding:20, backgroundColor:'#303f9f', color:'white'}}>
            <h2 style={{margin:0, fontWeight:'bold'}}>ReactJWT</h2>
            {/* {auth.isLoggedIn?<Button onClick={dispatch(logoutUser())} color='danger'>Logout</Button>:<Button onClick={() => navigate('/login')} color='primary'>Login</Button>} */}
        </div>
    );
}

export default Navbar;
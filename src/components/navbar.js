import { Button } from '@material-ui/core';
import {Link} from '@reach/router';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../actions/authActions';

const Navbar = () => {
    const dispatch = useDispatch();

    return (
        <div style={{display:'flex', justifyContent:'space-between', padding:20, backgroundColor:'#303f9f', color:'white'}}>
            <h2 style={{margin:0}}>ReactJWT</h2>
            <Button color='danger'>Logout</Button>
        </div>
    );
}

export default Navbar;
import {Link} from '@reach/router';

const Navbar = () => {

    return (
        <div style={{display:'flex', justifyContent:'space-between', padding:20}}>
            <h2>ReactJWT</h2>
            <ul>
                <li>
                    <Link to="/dashboard"></Link>
                    <Link to="/login"></Link>
                    <Link to="/signout"></Link>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;
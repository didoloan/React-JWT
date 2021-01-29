import React, { useState } from 'react';

const Register = props => {
    const [user, setUser] = useState({email:'', fname:'', lname:'', dob:'', password:''})

    const handleSubmit = e => {
        e.preventDefault();
    }

    const handleInput = e => {
        const value = e.target.value;
        setUser({...user, [e.target.name]: value});
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="email" value={user.email} onChange={handleInput} />
                <input name="fname" value={user.email} onChange={handleInput} />
                <input name="lname" value={user.email} onChange={handleInput} />
                <input name="dob" value={user.email} onChange={handleInput} />
                <input name="password" value={user.email} onChange={handleInput} />
                <button>Register</button>
            </form>
        </div>

    );
}

export default Register;
import { useState } from 'react';
// Imports stylesheet(s):
import './LoginForm.css';
// Imports Users Utilities:
import { login } from '../../utilities/users-service';

// Initial State:
const initialCredentials = {
    email: '',
    password: ''
}

export default function LoginForm({ alterUser }) {
    // Sets state:
    const [credentials, setCredentials] = useState(initialCredentials);
    const [error, setError] = useState('');
    // Event handler functions:
    function handleChange(evt) {
        // Sets state:
        setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
        setError('');
    }

    async function handleSubmit(evt) {
        // Prevent default form submission: 
        evt.preventDefault();
        try {
            // Awaits login user service:
            const user = await login(credentials);
            // Sets user state:
            alterUser(user);
        } catch {
            // Sets error state:
            setError('Log In Failed - Try Again');
        }
    }
    // Rendered component:
    return (
            <div>
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <label>Email: </label>
                    <input type="text" name="email" 
                        value={credentials.email} placeholder={'Email@email.com'}
                        onChange={handleChange} required />
                    <label>Password: </label>
                    <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
                    <button type="submit">LOG IN</button>
                </form>
                <p className="error-message">&nbsp;{error}</p>
            </div>
    );
}
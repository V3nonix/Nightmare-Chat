import { useState } from 'react';
// Imports stylesheet(s):
import './AuthPage.css';
// Imports Components:
import LoginForm from '../../components/LoginForm/LoginForm';
import Logo from '../../components/Logo/Logo';
import SignUpForm from '../../components/SignUpForm/SignUpForm';

export default function AuthPage({ alterUser }) {
    // Sets state:
    const [authType, setAuthType] = useState(false);
    // Event handler functions:
    function handleClick() {
        setAuthType(!authType);
    }
    // Rendered component:
    return (
        <main className='AuthPage'>
            <div>
                <h3>Welcome to...</h3>
                <h1>NIGHTMARE CHAT</h1>
            </div>
            <div>PlaceHolder</div>
            <div>
                <button onClick={handleClick} className='button-red-dark'>{ authType ? 'RETURNING DEVOTEE?' : 'NEW INITIATE?'}</button>
                <div className='form-container'>
                { authType ?
                    <SignUpForm alterUser={alterUser}/>
                :
                    <LoginForm alterUser={alterUser}/>
                }
                </div>
            </div>
        </main>
    );
}
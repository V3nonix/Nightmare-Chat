import { useState, useEffect, useRef } from 'react';
// Imports 'react-router-dom' Component(s):
import { Navigate } from 'react-router-dom';
// Imports stylesheet(s):
import './UserPage.css';
// Imports Users Utilities:
import { getData } from '../../utilities/server/users';


export default function UserPage({ user, alterUser, handleError }) {
    // Sets state:
    const [userData, setUserData] = useState();
    // Lifecycle method(s):
    useEffect(function() {
        // Defines tryData:
        async function tryData() {
            try {
                const resUserData = await getData();
                // Sets userData state:
                setUserData(resUserData);
            } catch(err) {
                handleError(err);
            }
        }
        // Calls tryData:
        tryData();
        // console.log(userData);
    }, []);
    // Event handler functions:

    // Rendered component:
    return (
        <main>
            <h1>UserPage</h1>
        </main>
    );
}
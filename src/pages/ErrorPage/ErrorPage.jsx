// Imports stylesheet(s):
import './ErrorPage.css';
// Imports Users Utilities:
import { logOut } from '../../utilities/users-service';


export default function ErrorPage({ error, alterUser, handleError }) {
    // Event handler functions:
    function handleLogOut() {
        // Delegates to the users-service:
        logOut();
        // Updates user to null:        
        alterUser(null);
    }
    // Rendered component:
    return (
        <main>
            <h1>{error.status}</h1>
            <h3>{error.reason}</h3>
            <p>Something went wrong... Apologies for the inconvenience!</p>
            <button onClick={() => handleError('')}>RETURN?</button>
            <button onClick={handleLogOut}>LOGOUT?</button>
        </main>
    );
}
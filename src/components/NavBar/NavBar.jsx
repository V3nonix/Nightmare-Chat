// Imports stylesheet(s):
import './NavBar.css';
// Imports Users Utilities:
import { logOut } from '../../utilities/users-service';

export default function NavBar({ type, alterUser, navigate }) {
    // Event handler functions:
    function handleLogOut() {
        // Delegates to the users-service:
        logOut();
        // Updates user to null:        
        alterUser(null);
    }
  return (
      <nav className='NavBar'>
        { type === 'UserPage' ?
          <>
            <button onClick={() =>  navigate('/forms/create-chat')}>CREATE CHAT</button>
            <button onClick={() => navigate('/placeholder')}>PLACEHOLDER</button>
          </>       

        : type === 'FormPage' ?
          <>
            <button onClick={() => navigate('/users')}>USER PAGE</button>
            <button onClick={() => navigate('/placeholder')}>PLACEHOLDER</button>
          </>
        :
          <>
            <button onClick={() => navigate('/users')}>USER PAGE</button>
            <button onClick={() => navigate('/placeholder')}>PLACEHOLDER</button>
          </>
        }
          <button onClick={handleLogOut} className='button-red-dark'>LOGOUT</button>
      </nav>
  );
}

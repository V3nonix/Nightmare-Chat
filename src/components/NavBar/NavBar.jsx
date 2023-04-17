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
    function handleCreateChat() {
      // Navigates to /forms/create:
      navigate('/forms/create');
    }
    function handleAddFriend() {
      // Navigates to /user:
      navigate('/forms/add-friend');
    }
    function handleUserPage() {
      // Navigates to /user:
      navigate('/user');
    }
  return (
    <nav className='NavBar'>
      { type === 'UserPage' ?
      <>
        <button onClick={handleCreateChat}>CREATE CHAT</button>
        <button onClick={handleCreateChat}>ADD FRIEND</button>
        <button onClick={handleLogOut}>LOGOUT</button>
      </>
      :
      <>
        <button onClick={handleUserPage}>USER PAGE</button>
        <button onClick={handleLogOut}>LOGOUT</button>
      </>    
      }
    </nav>
  )
}

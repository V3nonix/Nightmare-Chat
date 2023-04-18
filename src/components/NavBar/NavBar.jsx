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
      // Navigates to /form/create-chat:
      navigate('/form/create-chat');
    }
    function handleAddFriend() {
      // Navigates to /user:
      // navigate('/form/add-friend');
    }
    function handleUserPage() {
      // Navigates to /user:
      navigate('/user');
    }
  return (
    <>
      { type === 'UserPage' ?
      <nav className='NavBar'>
        <button onClick={handleCreateChat}>CREATE CHAT</button>
        <button onClick={handleAddFriend}>PLACEHOLDER</button>
        <button onClick={handleLogOut} className='button-red-dark'>LOGOUT</button>
      </nav>
      : type === 'FormPage' ?
      <nav className='NavBar'>
        <button onClick={handleUserPage}>USER PAGE</button>
        <button onClick={handleAddFriend}>PLACEHOLDER</button>
        <button onClick={handleLogOut} className='button-red-dark'>LOGOUT</button>
      </nav>  
      :
      <nav className='NavBar'>
        <button onClick={handleUserPage}>USER PAGE</button>
        <button onClick={handleLogOut} className='button-red-dark'>LOGOUT</button>
      </nav>    
      }
    </>
  )
}

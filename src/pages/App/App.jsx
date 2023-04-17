import { useState } from 'react';
// Imports 'react-router-dom' Component(s):
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
// Imports stylesheet(s):
import './App.css';
// Imports Page Components:
import AuthPage from '../AuthPage/AuthPage';
import UserPage from '../UserPage/UserPage';
import ChatroomPage from '../ChatroomPage/ChatroomPage';
import GroupChatPage from '../GroupChatPage/GroupChatPage';
import ErrorPage from '../ErrorPage/ErrorPage';
// Imports Users Utilities:
import { getUser } from '../../utilities/users-service';

export default function App() {
  // Sets state:
  const [error, setError] = useState('');
  const [user, setUser] = useState(getUser());
  // Allows hook(s) to be used in function bodies:
  const navigate = useNavigate();
  // Passes state setter as function:
  function alterUser(user) {
    setUser(user);
  }
  // Event handler function(s):
  function handleError(newError) {
    if (newError) {
      // Converts newError:
      const errArr = newError.message.split('|||', 2);
      // Sets error state:
      setError({ status: `${errArr[0]}`, reason: `${errArr[1]}` });
      // Navigates to error page:
      navigate(`/error/${errArr[0]}`);
    } else {
      // Sets error state:
      setError('');
      // Navigates to catch:
      navigate(`/`);
    }
  }

  // Rendered component:
  return (
    <main className="App">
      { user ?
      <>
        <Routes>
          <Route 
            path='/user' 
            element={<UserPage user={user} 
                      navigate={navigate}
                      alterUser={alterUser}
                      handleError={handleError}
                    />} 
          />
          <Route 
            path='/room' 
            element={<ChatroomPage user={user} 
                      alterUser={alterUser}
                      handleError={handleError}
                    />} 
          />
          <Route 
            path='/group/:id' 
            element={<GroupChatPage user={user} 
                      alterUser={alterUser}
                      handleError={handleError}
                    />} 
          />
          <Route 
            path='/error/:id' 
            element={<ErrorPage error={error} 
                      alterUser={alterUser}
                      handleError={handleError}
                    />} 
          />
          <Route path="/*" element={<Navigate to="/user"/>}/>
        </Routes>
      </> 
        :
        <AuthPage alterUser={alterUser}/>
      }
    </main>
  )
}
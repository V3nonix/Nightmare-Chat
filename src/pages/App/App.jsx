import { useState } from 'react';
// Imports 'react-router-dom' Component(s):
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
// Imports Page Components:
import AuthPage from '../AuthPage/AuthPage';
import UserPage from '../UserPage/UserPage';
import GlobalChatPage from '../GlobalChatPage/GlobalChatPage';
import ChatroomPage from '../ChatroomPage/ChatroomPage';
import GroupChatPage from '../GroupChatPage/GroupChatPage';
import FormPage from '../FormPage/FormPage';
import ErrorPage from '../ErrorPage/ErrorPage';
// Imports Users Utilities:
import { getUser } from '../../utilities/usersService';

// DO ERROR HANDLING LATER!!!

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
    <>
      { user ?
      <>
        <Routes>
          <Route 
            path='/users' 
            element={<UserPage user={user} 
                      navigate={navigate}
                      alterUser={alterUser}
                      handleError={handleError}
                    />} 
          />
          <Route 
            path='/global' 
            element={<GlobalChatPage user={user} 
                      navigate={navigate}
                      alterUser={alterUser}
                    />} 
          />
          <Route 
            path='/rooms/:id' 
            element={<ChatroomPage user={user} 
                      alterUser={alterUser}
                      handleError={handleError}
                    />} 
          />
          <Route 
            path='/groups/:id' 
            element={<GroupChatPage user={user} 
                      alterUser={alterUser}
                      handleError={handleError}
                    />} 
          />
          <Route 
            path='/errors/:id' 
            element={<ErrorPage error={error} 
                      alterUser={alterUser}
                      handleError={handleError}
                    />} 
          />
          <Route 
            path='/forms/:id' 
            element={<FormPage user={user} 
                      navigate={navigate}
                      alterUser={alterUser}
                      handleError={handleError}
                    />} 
          />
          <Route path="/*" element={<Navigate to="/users"/>}/>
        </Routes>
      </> 
        :
        <AuthPage alterUser={alterUser}/>
      }
    </>
  )
}
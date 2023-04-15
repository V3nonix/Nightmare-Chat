import { useState } from 'react';
// Imports 'react-router-dom' Component(s):
import { Routes, Route, Navigate } from 'react-router-dom';
// Imports stylesheet(s):
import './App.css';
// Imports Page Components:
import AuthPage from '../AuthPage/AuthPage';
import TempChatPage from '../TempChatPage/TempChatPage';
import UserPage from '../UserPage/UserPage';
import ChatroomPage from '../ChatroomPage/ChatroomPage';
import GroupChatPage from '../GroupChatPage/GroupChatPage';
// Imports Users Utilities:
import { getUser } from '../../utilities/users-service';

export default function App() {
  // Sets state:
  const [user, setUser] = useState(getUser());
  // Passes state setter as function:
  function alterUser(user) {
    setUser(user);
  }
  // Rendered component:
  return (
    <main className="App">
      { user ?
      <>
        <Routes>
          <Route path='/chat' element={<TempChatPage user={user}/>} />
          <Route path='/user/:id' element={<UserPage user={user}/>}/>
          <Route path='/room/:id' element={<ChatroomPage user={user}/>}/>
          <Route path='/group/:id' element={<GroupChatPage user={user}/>}/>
          <Route path="/*" element={<Navigate to="/user" />} />
        </Routes>
      </> 
        :
        <AuthPage alterUser={alterUser}/>
      }
    </main>
  )
}
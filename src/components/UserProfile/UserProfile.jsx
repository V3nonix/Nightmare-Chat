import { useState } from 'react';
// Imports stylesheet(s):
import './UserProfile.css';
// Imports Component(s):
import UserProfileForm from '../ProfileAboutForm/UserProfileForm';

export default function UserProfile({ userProfile, handleError, userId}) {
  // Sets state:
  const [userAbout, setUserAbout] = useState(userProfile.about);
  const [toggle, setToggle] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  // Event handler functions:
  function handleToggle() {
    setToggle(!toggle);
  }
  return (
    <div className='UserProfile'>
      <h6><span>Account created: </span>{userProfile.created.toLocaleDateString()}</h6>
        <div className='list-aside' id='user-about-container'>
          <button onClick={handleToggle} disabled={formOpen}>
            <div className={ toggle ? 'arrow-up' : 'arrow-down'}/>
          </button>
          <span> About:</span>
          { formOpen ? 
            <UserProfileForm  userAbout={userAbout} setUserAbout={setUserAbout}
              setFormOpen={setFormOpen} handleError={handleError} userId={userId}
            />
          :
            <>
              <div className='list-container' id='user-about'>
                {toggle && <p id='user-about-p'>{ userAbout ? userAbout : 'Your about section is empty!'}</p>}
              </div>
              { toggle &&
                <button onClick={() => {setFormOpen(true) 
                  setToggle(true)}}
                >
                  { userAbout ? 'EDIT' : 'ADD'}
                </button>
              }
            </>
          }
        </div>
    </div>
  );
}
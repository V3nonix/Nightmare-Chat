// Imports stylesheet(s):
import './UserProfileContainer.css';
// Imports Component(s):
import UserProfile from '../UserProfile/UserProfile';
import UserAvatar from '../UserAvatar/UserAvatar';

export default function UserProfileContainer({ user, userProfile, handleError}) {
  // Rendered component:  
  return (
    <div className='UserProfileContainer'>
      <UserAvatar userAvatar={user.avatar}  type={1}/>
      <h5>{user.name}</h5>
      <UserProfile userProfile={userProfile} userId={user._id} handleError={handleError}/>
    </div>
  );
}

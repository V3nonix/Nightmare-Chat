// Imports stylesheet(s):
import './UserProfileContainer.css';
// Imports Component(s):
import UserProfile from '../UserProfile/UserProfile';
import UserAvatar from '../UserAvatar/UserAvatar';

export default function UserProfileContainer({ user, userProfile}) {
  // Rendered component:  
  return (
    <div className='UserProfileContainer'>
      <UserAvatar userAvatar={user.avatar}  type={1}/>
      <h5>{user.name}</h5>
      <UserProfile userProfile={userProfile}/>
    </div>
  );
}

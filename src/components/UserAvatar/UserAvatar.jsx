// Imports stylesheet(s):
import './UserAvatar.css';

export default function UserAvatar({ userAvatar, type }) {
  return (
    <div className={type ? 'UserAvatar-big' : 'UserAvatar-small'}>
      <h6>User Avatar PlaceHolder</h6>
    </div>
  )
}

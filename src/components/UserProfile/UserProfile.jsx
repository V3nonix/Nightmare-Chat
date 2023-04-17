// Imports stylesheet(s):
import './UserProfile.css';

export default function UserProfile({ userProfile }) {
  return (
    <div className='UserProfile'>
      <h6><span>Account created: </span>{userProfile.created.toLocaleDateString()}</h6>
      { userProfile.about ?
        <>
          <p>{userProfile.about}</p>
          <button>EDIT?</button>
        </> 

      :
        <>
          <p>Your about section is empty!</p>
          <button>ADD?</button>
        </>

      }
    </div>
  )
}
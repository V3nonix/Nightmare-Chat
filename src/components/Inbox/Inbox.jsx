import { useState } from 'react';
// Imports stylesheet(s):
import './Inbox.css';
// Imports Components: 
import InboxListItem from '../InboxListItem/InboxListItem';

export default function Inbox({ inbox }) {
  // Sets state:
  const [toggle, setToggle] = useState(false);
  // Event handler functions:
  function handleToggle() {
    setToggle(!toggle);
  }
  return (
    <aside className='list-aside'>
      <button onClick={handleToggle}>
        <div className={toggle ? 'arrow-up' : 'arrow-down'}/>
      </button>
      <span>Chat Rooms:</span>
      <div className='list-container'>
        {toggle &&
          <ul className='list'>
            {!inbox.length && <h5>Your inbox is empty!</h5>}
            {inbox.map(item => <InboxListItem item={item} key={item.name}/>)}
          </ul>
        }
        { inbox.length <= 15 && <h5>Your inbox is full!</h5>}
      </div>
    </aside>
  );
}
import { useState } from 'react';
// Imports stylesheet(s):
import './Inbox.css';
// Imports Components: 
import InboxListItem from '../InboxListItem/InboxListItem';

export default function Inbox({ inbox, inboxInfo, active }) {
  // Sets state:
  const [toggle, setToggle] = useState(false);
  const [fdReqsNum, setFdReqsNum] = useState(inboxInfo.fReqsNum);
  const [reqsNum, setReqsNum] = useState(inboxInfo.reqsNum);
  // Event handler functions:

  return (
    <aside className='list-aside'>
      <button onClick={() => setToggle(!toggle)}>
        <div className={toggle ? 'arrow-up' : 'arrow-down'}/>
      </button>
      <span> Inbox:</span>
      <div className='list-container'>
        {toggle &&
          <ul className='list'>
            {!inbox.length && <h5>Your inbox is empty!</h5>}
            {inbox.map(item => <InboxListItem item={item} key={item.name} active={active} 
              type={item.type} setFdReqsNum={setFdReqsNum} setReqsNum={setReqsNum}/>
            )}
          </ul>
        }
        <div className='warning-container'>
          { reqsNum === 25 && fdReqsNum !== 50 && <p>You have reached the maximum number of chat invites!</p>}
          { reqsNum !== 25 && fdReqsNum === 50 && <p>You have reached the maximum number of friend invites!</p>}
          { reqsNum === 25 && fdReqsNum === 50 && <p>Your inbox is full! You cannot recieve new invites!</p>}
        </div>
      </div>
    </aside>
  );
}
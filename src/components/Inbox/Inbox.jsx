import { useState } from 'react';
// Imports stylesheet(s):
import './Inbox.css';
// Imports Components: 
import InboxListItem from '../InboxListItem/InboxListItem';

export default function Inbox({ inbox, inboxInfo }) {
  // Sets state:
  const [toggle, setToggle] = useState(false);
  const [fdReqsNum, setFdReqsNum] = useState(inboxInfo.fReqsNum);
  const [reqsNum, setReqsNum] = useState(inboxInfo.reqsNum);
  // Event handler functions:
  function handleToggle() {
    setToggle(!toggle);
  }
  return (
    <aside className='list-aside'>
      <button onClick={handleToggle}>
        <div className={toggle ? 'arrow-up' : 'arrow-down'}/>
      </button>
      <span> Inbox:</span>
      <div className='list-container'>
        {toggle &&
          <ul className='list'>
            {!inbox.length && <h5>Your inbox is empty!</h5>}
            {inbox.map(item => <InboxListItem item={item} key={item.name} 
              type={item.type} setFdReqsNum={setFdReqsNum} setReqsNum={setReqsNum}/>
            )}
          </ul>
        }
        <div className='warning-container'>
          { reqsNum === 25 && fdReqsNum !== 50 && <p>You have reached the maximum number of chat requests!</p>}
          { reqsNum !== 25 && fdReqsNum === 50 && <p>You have reached the maximum number of friend requests!</p>}
          { reqsNum === 25 && fdReqsNum === 50 && <p>Your inbox is full! You cannot recieve new requests!</p>}
        </div>
      </div>
    </aside>
  );
}
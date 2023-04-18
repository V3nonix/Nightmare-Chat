import { useState } from 'react';
// Imports stylesheet(s):
import './SentList.css';
// Imports Components: 
import SentListItem from '../SentListItem/SentListItem';

export default function SentList({ sent, sentInfo, active }) {
  // Sets state:
  const [toggle, setToggle] = useState(false);
  const [fdInvsNum, setFdInvsNum] = useState(sentInfo.fdInvsNum);
  const [invsNum, setInvsNum] = useState(sentInfo.invsNum);
  // Event handler functions:

  return (
    <aside className='list-aside'>
      <button onClick={() => setToggle(!toggle)}>
        <div className={toggle ? 'arrow-up' : 'arrow-down'}/>
      </button>
      <span> Sent:</span>
      <div className='list-container'>
        {toggle &&
          <ul className='list'>
            {!sent.length && <h5>You have no sent mail!</h5>}
            {sent.map(item => <SentListItem item={item} key={item.name} active={active}  
              type={item.type} setFdInvsNum={setFdInvsNum} setInvsNum={setInvsNum}/>
            )}
          </ul>
        }
        <div className='warning-container'>
          { invsNum === 25 && fdInvsNum !== 50 && <p>You have reached the maximum number of chat requests!</p>}
          { invsNum !== 25 && fdInvsNum === 50 && <p>You have reached the maximum number of friend requests!</p>}
          { invsNum === 25 && fdInvsNum === 50 && <p>Your sent mail is full! You cannot send new requests!</p>}
        </div>
      </div>
    </aside>
  );
}
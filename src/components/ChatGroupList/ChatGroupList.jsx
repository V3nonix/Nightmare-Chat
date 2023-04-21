import { useState } from 'react';
// Imports stylesheet(s):
import './ChatGroupList.css';
// Imports Component(s):
import ChatGroupListItem from '../ChatGroupListItem/ChatGroupListItem';

export default function ChatGroupList({ groups, navigate, active }) {
  // Sets state:
  const [toggle, setToggle] = useState(false);
  const [groupsState, setGroupsState] = useState(groups);
  
  // Event handler functions:
  
  return (
    <aside className='list-aside'>
      <button onClick={() => setToggle(!toggle)}>
        <div className={ toggle ? 'arrow-up' : 'arrow-down'}/>
      </button>
      <span> Chat Groups:</span>
      <div className='list-container'>
        {toggle &&
          <ul className='list'>
            {!groups.length && <h5>You have no chat groups!</h5>}
            {groups.map(group => <ChatGroupListItem group={group} key={group.name} active={active} 
              navigate={navigate} setGroupsState={setGroupsState} groupsState={groupsState}/>
            )}
          </ul>
        }
      </div>
      { toggle &&
        <>
          {groups.length <= 15 ?
            <button onClick={() => navigate('/form/add-group')} disabled={true}>ADD GROUP</button>
            :
            <h6>Maximum chat groups reached!</h6>
          }
        </>
      }
    </aside>
  );
}

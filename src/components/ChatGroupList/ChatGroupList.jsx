import { useState } from 'react';
// Imports stylesheet(s):
import './ChatGroupList.css';
// Imports Components:
import ChatGroupListItem from '../ChatGroupListItem/ChatGroupListItem';

export default function ChatGroupList({ groups, navigate }) {
  // Sets state:
  const [toggle, setToggle] = useState(false);
  const [groupsState, setGroupsState] = useState(groups);
  // Event handler functions:
  function handleToggle() {
    setToggle(!toggle);
  }
  return (
    <aside className='list-aside'>
      <button onClick={handleToggle}>
        <div className={ toggle ? 'arrow-up' : 'arrow-down'}/>
      </button>
      <span> Chat Groups:</span>
      <div className='list-container'>
        {toggle &&
          <ul className='list'>
            {!groups.length && <h5>You have no chat groups!</h5>}
            {groups.map(group => <ChatGroupListItem group={group} key={group.name}
              navigate={navigate} setGroupsState={setGroupsState} groupsState={groupsState}/>
            )}
          </ul>
        }
        {groups.length <= 15 ?
        <button>ADD GROUP</button>
        :
        <h6>Maximum chat groups reached!</h6>
        }
      </div>
    </aside>
  );
}

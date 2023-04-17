import { useState } from 'react';
// Imports stylesheet(s):
import './ChatroomList.css';
// Imports Components: 
import ChatroomListItem from '../ChatroomListItem/ChatroomListItem';

export default function ChatroomList({ rooms, navigate }) {
  // Sets state:
  const [toggle, setToggle] = useState(false);
  const [roomsState, setRoomsState] = useState(rooms);
  // Event handler functions:
  function handleToggle() {
    setToggle(!toggle);
  }
  return (
    <aside className='list-aside'>
      <button onClick={handleToggle}>
        <div className={toggle ? 'arrow-up' : 'arrow-down'}/>
      </button>
      <span> Chat Rooms:</span>
      <div className='list-container'>
        {toggle &&
          <ul className='list'>
            {!rooms.length && <h5>You have no chat rooms!</h5>}
            {rooms.map(room => <ChatroomListItem room={room} key={room.name} 
              navigate={navigate} setRoomsState={setRoomsState} roomsState={roomsState}/>
            )}
          </ul>
        }
        {rooms.length <= 15 ?
        <button>ADD ROOM</button>
        :
        <h5>Maximum chat rooms reached!</h5>
        }
      </div>
    </aside>
  );
}

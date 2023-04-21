import { useState } from 'react';
// Imports stylesheet(s):
import './ChatroomList.css';
// Imports Components: 
import ChatroomListItem from '../ChatroomListItem/ChatroomListItem';

export default function ChatroomList({ rooms, navigate, active }) {
  // Sets state:
  const [toggle, setToggle] = useState(false);
  const [roomsState, setRoomsState] = useState(rooms);
  // Event handler functions:

  return (
    <aside className='list-aside'>
      <button onClick={() => setToggle(!toggle)}>
        <div className={toggle ? 'arrow-up' : 'arrow-down'}/>
      </button>
      <span> Chat Rooms:</span>
      <div className='list-container'>
        {toggle &&
          <ul className='list'>
            {!rooms.length && <h5>You have no chat rooms!</h5>}
            {rooms.map(room => <ChatroomListItem room={room} key={room.name} active={active}
              navigate={navigate} setRoomsState={setRoomsState} roomsState={roomsState}/>
            )}
          </ul>
        }
      </div>
      { toggle &&
        <>
          {rooms.length <= 15 ?
            <button onClick={() => navigate('/form/add-room')} disabled={true}>ADD ROOM</button>
            :
            <h5>Maximum chat rooms reached!</h5>
          }
        </>
      }
    </aside>
  );
}
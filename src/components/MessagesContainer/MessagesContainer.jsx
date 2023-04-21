// Imports stylesheet(s):
import './MessagesContainer.css';
// Imports Component(s):
import Loader from "../../components/Loader/Loader";
import Message from '../Message/Message';

export default function MessagesContainer({ global }) {
  let msgEls;
  if (global && global.messages) {
    msgEls = global.messages.map((msg, idx) =>  <Message msg={msg} idx={idx}/>)
  } else {
    msgEls = false;
  }
  return (
    <div className='messages-container'>
      { msgEls ?
          <ul>
              {msgEls}
          </ul> 
      :
        <>
          <div>
            <h3>No messages.</h3>
          </div>
        </>
      }
    </div>
  );
}

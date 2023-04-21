// Imports stylesheet(s):
import './MessagesContainer.css';
// Imports Component(s):
import Loader from "../../components/Loader/Loader";
import Message from '../Message/Message';

export default function MessagesContainer({ global }) {

  return (
    <div className='messages-container'>
      { global && global.messages.length > 0 ?
          <ul>
              {messages.map((msg, idx) =>  <Message msg={msg} idx={idx}/>)}
          </ul> 
      :
        <>
          <div>

          </div>
        </>
      }
    </div>
  );
}

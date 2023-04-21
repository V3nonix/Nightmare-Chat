// Imports stylesheet(s):
import './MessagesContainer.css';
// Imports Component(s):
import Loader from "../../components/Loader/Loader";

export default function MessagesContainer(messages) {
  return (
    <div>
      { messages.length > 0 ?
          <ul>
              {messages.map((msg, idx) =>     
                  <li className={ idx % 2 === 0 ? 'msg-1' : 'msg-2'} key={idx}>
                      <h4>{msg.name}</h4>
                      <h6>{msg._createdAt}</h6>
                      <p>{msg.contents}</p>
                  </li>
              )}
          </ul> 
      :
          <Loader />
      }
    </div>
  );
}

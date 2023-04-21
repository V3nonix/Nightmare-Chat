// Imports stylesheet(s):
import './Message.css';

export default function Message({msg, idx}) {
  return (
    <li className={ idx % 2 === 0 ? 'msg-1' : 'msg-2'} key={idx}>
      <h4>{msg.name}</h4>
      <h6>{msg._createdAt}</h6>
      <p>{msg.contents}</p>
    </li>
  )
}

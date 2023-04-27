// Imports stylesheet(s):
import './Message.css';

export default function Message({msg, idx}) {
  return (
    <li className={idx % 2 === 0 ? 'msg-1 message' : 'msg-2 message'} key={idx}>
      <div className='message-head'>
        <div className='message-name'>{msg.name}</div>
        <div className='message-date'>{msg.createdAt}</div>
      </div>
      <p className='message-body'>{msg.contents}</p>
    </li>
  )
}

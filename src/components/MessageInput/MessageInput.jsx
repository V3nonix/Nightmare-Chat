import { useState } from "react";
import { sendGlobal } from "../../socket";
// Imports stylesheet(s):
import './MessageInput.css';

export default function MessageInput({ user }) {

  const [msg, setMsg] = useState({ 
    name: user.name,
    user: user._id,
    contents: ''
  });

  function handleChange(evt) {
    setMsg({
        ...msg,
        contents: evt.target.value
    });
  }

  function handleSendMsg(evt) {
    evt.preventDefault();
    sendGlobal(msg);
    setMsg({ 
        name: user.name,
        user: user._id,
        contents: ''
    });
  }

  return (
    <form className='message-form' onSubmit={handleSendMsg}>
      <label>Message Input</label>
      <textarea className='input-textarea'
          type='textarea' name='contents'
          minLength='1' maxLength='1547'
          rows='10' cols='65'
          placeholder="Input message here!"
          onChange={handleChange} required
          value={msg.contents}
      />
      <button className='button-inv' type='submit'> 
          SUBMIT
      </button>
    </form>
  );
}

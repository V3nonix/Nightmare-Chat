import { useState } from "react";
// Imports stylesheet(s):
import './MessageInput.css';

export default function MessageInput({ sendGlobal, user }) {

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
      <form className='Message-form'>
      <textarea className='input-textarea'
          type='textarea' name='contents'
          minLength='1' maxLength='1547'
          rows='15' cols='50'
          onChange={handleChange} required
          value={msg.contents}
      />
      <button className='button-inv' type='submit' onClick={handleSendMsg}> 
          SUBMIT
      </button>
    </form>
  );
}

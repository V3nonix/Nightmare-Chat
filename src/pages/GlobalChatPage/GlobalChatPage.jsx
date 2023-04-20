import { useState, useEffect, useRef } from "react";
import { enterGlobal, sendGlobal, exitGlobal, registerSetGlobal } from "../../socket";
import Loader from "../../components/Loader/Loader";
import Header from "../../components/Header/Header";

export default function GlobalChatPage({ user, alterUser, navigate }) {
    // Sets state:
    const [global, setGlobal] = useState(null);
    const [msg, setMsg] = useState({ 
        name: user.name,
        user: user._id,
        contents: ''
    });
    // Lifecycle method(s):
    useEffect(() => {
        registerSetGlobal(setGlobal);
        if (user) {
          enterGlobal();
        }
        return () => {
          exitGlobal();
        };
    }, [user]);
    // Event handler functions:
    function handleChange(evt) {
        // Sets state:
        setMsg({
            ...msg,
            contents: evt.target.value
        });
    }
    function handleSendMsg(evt) {
        // Prevent default form submission: 
        evt.preventDefault();
        sendGlobal(msg);
        setMsg({ 
            name: user.name,
            user: user._id,
            contents: ''
        });
    }
    // Rendered component:
    return (
    <>
        <Header type={'Global'} alterUser={alterUser} navigate={navigate}/>
        <main>
            <div>
                { global ?
                    <ul>
                        {global.messages.map((msg, idx) =>     
                            <li className={ idx % 2 === 0 ? 'msg-1' : 'msg-2'} key={idx}>
                                <h4>{msg.name}</h4>
                                <p>{msg.contents}</p>
                            </li>
                        )}
                    </ul> 
                :
                    <Loader />
                }
            </div>
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
        </main>
    </>
    );
}
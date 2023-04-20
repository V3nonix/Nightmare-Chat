import { useState } from 'react';
// Imports stylesheet(s):
import './CreateChatForm.css';
// Imports Utilities:

// Imports Component(s):
import FormSearchComponent from '../FormSearchComponent/FormSearchComponent';

// Initial State:
const initialForm = {
    name: '',
    thumb: '',
    description: '',
    invites: [],
    error: ''
};

export default function CreateChatForm({ user, navigate }) {
    // Sets state(s):
    const [formData, setFormData] = useState(initialForm);
    const [type, setType] = useState('CRM');
    // Event handler functions:
    function handleChange(evt) {
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value,
            error: ''
        });
    };
    function toggleType() {
      setType(`${type === 'CRM' ? 'CGP' : 'CRM'}`);
    }
    async function handleSubmit(evt) {
        // Prevent default form submission: 
        evt.preventDefault();
        // Try block:
        try {
          // Excludes unneeded properties:
          const createData = {
            name: formData.name,
            // Placeholder!!!
            thumb: '',
            creator: user._id,
            description: formData.description,
            members: [],
            invites: formData.invites,
          };
          let createRes;
          if (type === CRM) {
            // Async Chatroom creation:
            createRes = await createChatroom({ type, data: createData});
          } else {
            // Async ChatGroup creation:
            createRes = await createChatGroup({ type, data: createData});
          }

          // Navigates to chat path:
          navigate(`${ type === 'CRM' ? 'room' : 'group' }/${createRes}`);
        } catch(err) {
          // Error catch: 
          setFormData({ error: `Chat Creation Failed! Reason: ${err}` });
        }
    }; 
    // Rendered component:
    return (
        <div className='FormPage-container'>
          <h3>{type === 'CRM' ? 'CHATROOM' : 'GROUP CHAT'} CREATE FORM</h3>
          <form autoComplete='off' onSubmit={handleSubmit} className='FormPage-form'>
          <button onClick={toggleType} type='button' disabled={true}>
            {type === 'CRM' ? 'CREATE a Group Chat?' : 'CREATE a Chatroom?'}
          </button>
            <div className='FormPage-form-spacer'>
              <div className='FormPage-sub-container'>
                <label>{ type === 'CRM' ? 'Chatroom' : 'Group Chat'} Name: </label>
                <input type='text' name='name'
                  value={formData.name}
                  minLength='3' maxLength='64'
                  onChange={handleChange}
                  placeholder={'Chat Name'}
                  required
                />
                <label>Description: </label>
                <input className='input-textarea' id='FormPage-textarea'
                  type='textarea' name='description'
                  minLength='1' maxLength='3000'
                  rows='15' cols='75'
                  onChange={handleChange} required
                  value={formData.description}
                />
              </div>
              <div className='FormPage-sub-container'>
                <label>Send Invites: </label>
                { formData.invites.length === 0 ?
                  <FormSearchComponent servicePackage={{ type, act: 'NEW', limit: type === 'CRM' ? 29 : 9}} 
                    formData={formData} setFormData={setFormData} user={user} 
                  />
                :
                <ul className='search-list'>
                  {formData.invites.map((inv, idx) =>     
                    <li className={ idx % 2 === 0 ? 's-list-item-1' : 's-list-item-2'} key={idx}>
                        <p>{inv.avatar}</p>
                        <p>{inv.name}</p>
                    </li>
                  )}
                </ul>
                }
              </div>
            </div>
            <button type='submit' >CREATE</button>
          </form>
          {formData.error && <p className='error-message'>&nbsp;{formData.error}</p>}
        </div>
    );
}

//disabled={disabled}
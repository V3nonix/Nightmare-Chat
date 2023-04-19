import { useState } from 'react';
// Imports stylesheet(s):
import './CreateChatForm.css';
// Imports Users Utilities:

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
          // Async chat creation:
          const createRes = await createChat({ type, data: createData});
          // Sets user state to new user:
          navigate(`${ type === 'CRM' ? 'room' : 'group' }/${createRes}`);
        } catch(err) {
          // Error catch: 
          setFormData({ error: `Chat Creation Failed! Reason: ${err}` });
        }
    }; 
    // Rendered component:
    return (
        <div className='FormPage-container'>
          <button onClick={toggleType} className='button-inv'>
            {type === 'CRM' ? 'CREATE a Group Chat?' : 'CREATE a Chatroom?'}
          </button>
          <form autoComplete='off' onSubmit={handleSubmit} className='FormPage-form'>
            <label>Chat{ type === 'room' ? 'room' : ' Group '} Name: </label>
              <input type='text' name='name'
                value={formData.name}
                minLength='3' maxLength='64'
                onChange={handleChange}
                placeholder={'Chat Name'}
                required
              />
              <label>Description: </label>
              <input className='input-textarea'
                type='textarea' name='description'
                minLength='1' maxLength='3000'
                rows='15' cols='75'
                onChange={handleChange} required
                value={formData.description}
              />
            <label>Send Invites: </label>
            <FormSearchComponent servicePackage={{ type, act: 'NEW', limit: type === 'CRM' ? 29 : 9}} 
              handleChange={handleChange} formData={formData} setFormData={setFormData}/>
            <button type='submit' >CREATE</button>
          </form>
          {formData.error && <p className='error-message'>&nbsp;{formData.error}</p>}
        </div>
    );
}

//disabled={disabled}
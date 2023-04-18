import { useState } from 'react';
// Imports stylesheet(s):
import './UserProfileForm.css';
// Imports Users Utilities:
import { updateUserData } from '../../utilities/server/users';

export default function UserProfileForm({ userAbout, setUserAbout, setFormOpen, handleError, id }) {
    // Sets state:
    const [formData, setFormData] = useState(userAbout);
    // Event handler functions:
    function handleChange(evt) {
        console.log(formData);
        // Sets state:
        setFormData(evt.target.value);
    }
    async function handleSubmit(evt) {
        // Prevent default form submission: 
        evt.preventDefault();
        try {
            // Awaits update userData service:
            await updateUserData({ _id: id, tar: 'about', origin: '', data: formData });
            // Sets userAbout state:
            setUserAbout(formData);
            setFormOpen(false);
        } catch(err) {
            // Handles error:
            handleError(err);
        }
    }
    // Rendered component:
    return (
        <form className='UserProfileForm' onSubmit={handleSubmit}>
            <textarea className='input-textarea'
                type='textarea' name='name'
                minLength='1' maxLength='750'
                rows='15' cols='50'
                onChange={handleChange} required
            >{formData}</textarea>
            <div>
                <button className='button-inv' type='submit'> 
                    SUBMIT
                </button>
                <button className='button-red-dark' onClick={() => setFormOpen(false)}> 
                    CANCEL
                </button>
            </div>
        </form>
    );
}
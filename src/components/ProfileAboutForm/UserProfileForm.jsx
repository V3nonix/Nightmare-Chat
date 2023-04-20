import { useState } from 'react';
// Imports stylesheet(s):
import './UserProfileForm.css';
// Imports Users Utilities:
import { updateUserData } from '../../utilities/server/users';

export default function UserProfileForm({ userAbout, setUserAbout, setFormOpen, handleError, userId }) {
    // Sets state:
    const [formData, setFormData] = useState(userAbout);
    // Event handler functions:
    function handleChange(evt) {
        // Sets state:
        setFormData(evt.target.value);
    }
    async function handleSubmit(evt) {
        // Prevent default form submission: 
        evt.preventDefault();
        try {
                // Awaits update userData service:
                const resData = await updateUserData({ userId: userId, tar: 'about', origin: '', data: formData});
                // Sets userAbout state:
                setUserAbout(resData);
                // Sets form state to closed:
                setFormOpen(false);
        } catch(err) {
            // Handles error:
            handleError(err);
        }
    }
    function handleCancel(evt) {
        evt.preventDefault();
        setFormOpen(false);
    }
    // Rendered component:
    return (
        <form className='UserProfileForm  form-no-auto-dsbl'>
            <textarea className='input-textarea'
                type='textarea' name='about'
                minLength='1' maxLength='750'
                rows='15' cols='50'
                onChange={handleChange} required
                value={formData}
            />
            <div>
                <button className='button-inv' type='submit' 
                     onClick={handleSubmit} disabled={formData.length > 750 || formData.length < 1}
                > 
                    SUBMIT
                </button>
                <button className='button-red-dark' disabled={false}
                    type='submit' onClick={handleCancel} 
                > 
                    CANCEL
                </button>
            </div>
        </form>
    );
}
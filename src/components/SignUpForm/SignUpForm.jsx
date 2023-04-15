import { useState } from 'react';
// Imports stylesheet(s):
import './SignUpForm.css';
// Imports Users Utilities:
import { signUp } from '../../utilities/users-service';

// Initial State:
const initialForm = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
};

export default function SignUpForm({ alterUser }) {
    // Sets state:
    const [formData, setFormData] = useState(initialForm);
    // Event handler functions:
    handleChange = (evt) => {
        setFormData({
            [evt.target.name]: evt.target.value,
            error: ''
        });
    };
    handleSubmit = async (evt) => {
        // Prevent default form submission: 
        evt.preventDefault();
        // Try block:
        try {
          // Excludes unneeded properties:
          const userData = {
            name: formData.name,
            email: formData.email,
            password: formData.password
          };
          // Async user creation:
          const user = await signUp(userData);
          // Sets user state to new user:
          alterUser(user);
        } catch {
          // Error catch: 
          setFormData({ error: 'Sign Up Failed - Try Again' });
        }
      };    
    // Rendered component:
    return (
        <div>
        <div className='SignUpForm'>
          <form autoComplete='off' onSubmit={handleSubmit}>
            <label>Name</label>
              <input type='text' name='name'
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label>Email</label>
              <input type='email' name='email'
                value={formData.email}
                  onChange={handleChange}
                required
              />
            <label>Password</label>
              <input type='password' name='password'
                value={formData.password}
                onChange={handleChange}
                required
              />
            <label>Confirm</label>
              <input type='password' name='confirm'
                  value={formData.confirm}
                  onChange={handleChange}
                  required
              />
            <button type='submit' disabled={disabled}>SIGN UP</button>
          </form>
        </div>
          <p className='error-message'>&nbsp;{formData.error}</p>
        </div>
    );
}
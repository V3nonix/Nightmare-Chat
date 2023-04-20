import { useState } from 'react';
// Imports stylesheet(s):
import './FormSearchComponent.css';
// Imports component(s):
import FormSearchItem from '../FormSearchItem/FormSearchItem';
// Imports Utilities:
import { findUsersPartial } from '../../utilities/server/users';

export default function FormSearchComponent({ servicePackage, formData, setFormData, user }) {
    // Sets state(s):
    const [searchInput, setSearchInput] = useState('');
    const [toggleSearch, setToggleSearch] = useState(true);
    const [searchResults, setSearchResults] = useState([]);
    const [finalResults, setFinalResults] = useState([]);
    // Sets state-related variables:
    const disabled = finalResults.length >= servicePackage.limit
    // Event handler functions:
    function handleSearchChange(evt) {
      setSearchInput(evt.target.value);
    }
    async function HandleSearchSubmit() {
      try {
        if (servicePackage.act === 'NEW' || servicePackage.act === 'INV') {
          const newResults = await findUsersPartial({txt: searchInput});
          setFormData({ ...formData, error: '' });
          setSearchResults(newResults);
          setToggleSearch(false);
        }
      } catch(err) {
        setFormData({ ...formData, error: `${err}` });
      }
      }
      function handleAdd(searchResult) {
        if ( searchResults.length < servicePackage.limit && !finalResults.find(r => r._id === searchResult._id)) {
            const newResults = searchResults.filter(res => res._id !== searchResult._id)
            setSearchResults(newResults);
            setFinalResults([...finalResults, searchResult ]);
        }
      }
      function handleRemove(fRes) {
        const newResults = finalResults.filter(res => res._id !== fRes._id)
        setFinalResults(newResults);  
      }
      function handleConfirm() {
        const invitesPrep = finalResults.map(res => {
          let inv = {name: res.name, type: '', thumb: '', id: '', senderName: user.name, sender: user._id}
          return inv
        });
        setFinalResults([]);
        setSearchResults([]);        
        setFormData({ ...formData, invites: invitesPrep });
      }
  // Rendered component:
  return (
    <div className='search-component-container'>
      <div className='search-input-container'>
        { toggleSearch ? 
        <div>
          <input type='text' value={searchInput}
            minLength='3' maxLength={ servicePackage.type === 'FRD' ? '32' : '64' } onChange={handleSearchChange}
            placeholder={'Search by name here!'} required
          />
          <button onClick={HandleSearchSubmit} type='button' disabled={searchInput.length < 3}>SEARCH</button>
        </div>
        : 
        <div className='search-results-container'>
          <p className='search-message'>
            { searchResults.length > 0 ? 'Is this what you were searching for?' : 'There was nothing there...'}
          </p>
          <div>
            { searchResults.length > 0 ?
              <ul className='search-list'>
                {searchResults.map((result, idx) => <FormSearchItem result={result} idx={idx} 
                  handler={handleAdd} servicePackage={servicePackage} disabled={disabled} type={'ADD'}/>)}
              </ul>
            :
              <div>Placeholder</div>
            }
          </div>
          <button onClick={() => setToggleSearch(true)}>SEARCH AGAIN?</button>
        </div>
        }
        <label>Added:</label>
        <ul className='search-list'>
          {finalResults.map((fRes, idx) => 
              <FormSearchItem result={fRes} idx={idx}
              handler={handleRemove} servicePackage={servicePackage} disabled={disabled}/>
          )} 
        </ul>
        { finalResults.length !== 0 && <button onClick={handleConfirm} type='button'>CONFIRM</button> }
      </div>
    </div>
  );
}
import { useState } from 'react';
// Imports stylesheet(s):
import './FormSearchComponent.css';
// Imports Component(s):
import SearchResultsList from '../SearchResultList/SearchResultsList';
// Imports Utilities:
import { findUsersPartial } from '../../utilities/server/users';

export default function FormSearchComponent({ servicePackage, formData, setFormData, userId }) {
    // Sets state(s):
    const [searchInput, setSearchInput] = useState('');
    const [toggleSearch, setToggleSearch] = useState(true);
    const [searchResults, setSearchResults] = useState(null);
    const [finalResults, setFinalResults] = useState([]);
    // Event handler functions:
    function handleSearchChange(evt) {
      setSearchInput(evt.target.value);
    }
    async function HandleSearchSubmit() {
      try {
        if (servicePackage.act === 'NEW' || servicePackage.act === 'INV') {
          console.log(searchInput);
          const newResults = await findUsersPartial({txt: searchInput});
          console.log(newResults);
        }
      } catch(err) {
        setFormData({ ...formData, error: `${err}` });
      }
    }
  
  // Rendered component:
  return (
    <>
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
        <>
          <p className='search-message'>
            { searchResults ? 'Is this what you were searching for?' : 'There was nothing there...'}
          </p>
          <ul>
            { searchResults ?
              <SearchResultsList searchResults={searchResults} setSearchResults={setSearchResults}
                finalResults={finalResults} setFinalResults={setFinalResults} servicePackage={servicePackage}           
              />
            :
            <div>Placeholder</div>
            }
          </ul>
          <button onClick={() => setToggleSearch(true)}>SEARCH AGAIN?</button>
        </>
        }
        <ul>

        </ul>
      </div>
    </>
  );
}
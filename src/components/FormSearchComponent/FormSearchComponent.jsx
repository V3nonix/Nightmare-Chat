import { useState } from 'react';
// Imports stylesheet(s):
import './FormSearchComponent.css';
// Imports Component(s):
import SearchResultsList from '../SearchResultList/SearchResultsList';
// Imports Users Utilities:


export default function FormSearchComponent({ servicePackage, handleChange, userId }) {
    // Sets state(s):
    const [searchInput, setSearchInput] = useState('');
    const [toggleSearch, setToggleSearch] = useState(true);
    const [searchResults, setSearchResults] = useState(null);
    const [finalResults, setFinalResults] = useState([]);
    // Event handler functions:
    function handleSearchChange(evt) {
      setSearchInput(evt.target.value);
    }
    function HandleSearchSubmit(evt) {

    }
  
  // Rendered component:
  return (
    <>
      <div className='search-input-container'>
        { toggleSearch ? 
        <div>
          <input type='text' value={searchInput}
            minLength={ servicePackage.type === 'FRD' ? '3' : '1' } maxLength='64'onChange={handleSearchChange}
            placeholder={'Search by name here!'} required
          />
          <button onClick={HandleSearchSubmit}>SEARCH</button>
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
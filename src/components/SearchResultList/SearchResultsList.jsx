// Imports stylesheet(s):
import './SearchResultsList.css';

export default function SearchResultsList({ searchResults, setSearchResults, finalResults, setFinalResults, servicePackage }) {
  // Event handler functions:
  function handleAdd(searchResult) {
    if ( searchResults.length < servicePackage.limit ) {
        const newResults = searchResults.filter(res => !res._id === searchResult._id)
        setSearchResults(newResults);
        setFinalResults([...finalResults ]);
    }
  }
  return (
    <ul className='list'>
        {searchResults.map(searchResult, idx => {
            <li className={ idx % 2 === 0 ? 'list-item-1' : 'list-item-2'} key={idx}>
                <p>{ servicePackage.type !== 'FRD' ? searchResult.thumb : searchResult.avatar}</p>
                <p>searchResult.name</p>
                <p>{ servicePackage.type !== 'FRD' ? searchResult.description : searchResult.about}</p>
                <button onClick={() => handleAdd(searchResult)} disabled={searchResults.length === servicePackage.limit}>
                    ADD
                </button>  
            </li>
            })
        }
    </ul>
  );
}

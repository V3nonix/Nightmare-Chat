

export default function FormSearchItem({result, idx, handler, servicePackage, disabled, type}) {
    const resultStor = result;
    // Event Handler:
    function handleClick() {
        handler(resultStor)
    }
  // Rendered component:  
  return (
    <li className={ idx % 2 === 0 ? 's-list-item-1' : 's-list-item-2'} key={idx}>
        <p>{ servicePackage.type !== 'FRD' ? result.thumb : result.avatar}</p>
        <p>{ result.name }</p>
        <p>{ servicePackage.type !== 'FRD' ? result.description : result._createdAt}</p>
        <button onClick={handleClick} disabled={disabled} type='button'>
            { type === 'ADD' ? 'ADD' : 'REMOVE' }
        </button>  
    </li>
  );
}

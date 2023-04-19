import { useParams } from 'react-router-dom';
// Imports stylesheet(s):
import './FormPage.css';
// Imports Component(s):
import Header from '../../components/Header/Header';
import CreateChatForm from '../../components/CreateChatForm/CreateChatForm';
// Imports Users Utilities:


export default function FormPage({ user, alterUser, handleError, navigate }) {
    // Parameter variable:
    const { id } = useParams();
    // Event handler functions:

    // Rendered component:
    return (
        <>
            <Header type={'FormPage'} alterUser={alterUser} navigate={navigate}/>
            <main className='FormPage'>
                { id === 'create-chat' ?
                    <>
                        <CreateChatForm user={user} navigate={navigate}/>
                    </>
                : id === 'add-room' ?
                    <>
                        <h1>TEST: add-room</h1>                   
                    </>
                : id === 'add-group' ?
                    <>
                        <h1>TEST: add-group</h1>                   
                    </>                
                : id === 'add-friend' ?
                    <>
                        <h1>TEST: add-friend</h1>   
                    </>
                :
                    <>
                        <h1>TEST: invalid-param</h1>      
                    </>
                }
            </main>
        </>

    );
}
import { useState, useEffect, useRef } from 'react';
// Imports stylesheet(s):
import './UserPage.css';
// Imports Users Utilities:
import { getData } from '../../utilities/server/users';
// Imports Component(s):
import UserProfileContainer from '../../components/UserProfileContainer/UserProfileContainer';
import ChatGroupList from '../../components/ChatGroupList/ChatGroupList';
import ChatroomList from '../../components/ChatroomList/ChatroomList';
import SentList from '../../components/SentList/SentList';
import Inbox from '../../components/Inbox/Inbox';
import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';

export default function UserPage({ user, alterUser, handleError, navigate }) {
    // Sets state:
    const [userData, setUserData] = useState();
    const [toggleDelete1, setToggleDelete1] = useState(false);
    const [toggleDelete2, setToggleDelete2] = useState(false);
    // Sets refference(s):

    // Lifecycle method(s):
    useEffect(function() {
        // Defines tryData:
        async function tryData() {
            try {
                const resUserData = await getData();
                // Sets userData state:
                setUserData(resUserData);
            } catch(err) {
                handleError(err);
            }
        }
        // Calls tryData:
        tryData();
    }, []);
    // Event handler functions:

    // Rendered component:
    return (
        <>
            <Header type={'UserPage'} alterUser={alterUser} navigate={navigate}/>
            { userData ?
                <> 
                    <main className='UserPage'>
                        <aside className='UserPage-aside'>
                            <button onClick={() => {setToggleDelete1(!toggleDelete1)}}  
                            className={toggleDelete1 ? 'delete-active' : 'delete-inactive'
                            }>
                                    DELETE MODE: {toggleDelete1 ? 'ON' : 'OFF'}
                            </button>
                            <ChatroomList navigate={navigate} rooms={userData.rooms} 
                                dataId={userData._id}  active={toggleDelete1} />
                            <ChatGroupList navigate={navigate} groups={userData.groups} 
                                dataId={userData._id}  active={toggleDelete1} />
                        </aside >
                        <aside className='UserPage-aside-center'>
                            <UserProfileContainer user={user} handleError={handleError} 
                                userProfile={{created: new Date(user.createdAt), 
                                about: userData.about, id: userData._id}}
                            />
                        </aside>
                        <aside className='UserPage-aside'>
                            <button onClick={() => {setToggleDelete2(!toggleDelete2)}} 
                            className={toggleDelete2 ? 'delete-active' : 'delete-inactive'
                            }>
                                DELETE MODE: {toggleDelete2 ? 'ON' : 'OFF'}
                            </button>
                            <Inbox inbox={userData.comPackage.inbox} active={toggleDelete2}
                                inboxInfo={{fReqsNum: userData.comPackage.fReqsNum, 
                                reqsNum:  userData.comPackage.reqsNum}}
                            />
                            <SentList sent={userData.comPackage.sent} active={toggleDelete2} 
                                sentInfo={{fInvsNum: userData.comPackage.fInvsNum, 
                                invsNum:  userData.comPackage.invsNum}}
                            />
                        </aside>
                    </main>
                </>
                :
                <>
                    <main className='UserPage'>
                        <aside className='UserPage-aside'>
                            <Loader /> 
                        </aside >
                        <aside className='UserPage-aside-center'>
                            <Loader /> 
                        </aside>
                        <aside className='UserPage-aside'>
                            <Loader /> 
                        </aside>
                    </main>
                </>
            }
        </>
    );
}
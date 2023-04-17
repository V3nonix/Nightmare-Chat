import { useState, useEffect, useRef } from 'react';
// Imports stylesheet(s):
import './UserPage.css';
// Imports Users Utilities:
import { getData } from '../../utilities/server/users';
// Imports Components: 
import UserProfileContainer from '../../components/UserProfileContainer/UserProfileContainer';
import ChatGroupList from '../../components/ChatGroupList/ChatGroupList';
import ChatroomList from '../../components/ChatroomList/ChatroomList';
import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';

export default function UserPage({ user, alterUser, handleError, navigate }) {
    // Sets state:
    const [userData, setUserData] = useState();
    // Sets refference(s):
    const inboxRef = useRef([]);
    const sentRef = useRef([]);
    // Lifecycle method(s):
    useEffect(function() {
        // Defines tryData:
        async function tryData() {
            try {
                const resUserData = await getData();
                // Sets userData ref(s):
                // inboxRef.current = 
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
        { userData ?
        <> 
            <Header type={'UserPage'} alterUser={alterUser} navigate={navigate}/>
            <main className='UserPage'>
                <aside className='UserPage-aside'>
                    <ChatroomList navigate={navigate} rooms={userData.rooms} dataId={userData._id}/>
                    <ChatGroupList navigate={navigate} groups={userData.groups} dataId={userData._id}/>
                </aside >
                <aside className='UserPage-aside-center'>
                    <UserProfileContainer user={user} userProfile={{
                        created: new Date(user.createdAt), about: userData.about
                    }}/>
                </aside>
                <aside className='UserPage-aside'>
                    <ChatroomList navigate={navigate} rooms={userData.rooms}/>
                    <ChatGroupList navigate={navigate} groups={userData.groups}/>
                </aside>
            </main>
        </>
        :
        <Loader /> 
        }
        </>
    );
}

// about: userData.about
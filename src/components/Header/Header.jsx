// Imports stylesheet(s):
import './Header.css';
// Imports Component(s):
import NavBar from '../NavBar/NavBar';
import Logo from '../Logo/Logo';


export default function Header({ type, alterUser, navigate}) {
  return (
    <header className='Header'>
      <Logo />
      <span>NIGHTMARE CHAT</span>
      <NavBar type={type} 
        alterUser={alterUser} 
        navigate={navigate}
      />
    </header>
  )
}

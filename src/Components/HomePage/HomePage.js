import React, {useState, useEffect} from 'react'
import NavBar from '../NavBar'
import Banner from './Banner'
import CourseDetails from './CourseDetails'
import Stud_profile from './Stud_profile'
import Cart from './Cart'
import WishList from './WishList'

function HomePage({ isAuthenticated, onLogout }) {
  const [activeLink, setActiveLink] = useState('');
  const[user, setUser ] = useState('')

  const handleLinkClick = (linkName, username) => {
    setActiveLink(linkName);
    setUser(username)
  };

  useEffect(() => {
    // Set 'home' as active link when the component mounts
    setActiveLink('home');
  }, []); // Empty dependency array ensures this effect runs only once, on mount

  useEffect(() => {
    console.log('State Value Name', activeLink);
  }, [activeLink]);

  let displayedComponent = null;

  if (isAuthenticated) {
    if (activeLink === 'home'){
      <h2>hjfhgjkfhgjh</h2>
    }
    else if (activeLink === 'all-courses') {
      displayedComponent = <Stud_profile username = {user} />;
    }else if (activeLink === 'wish') {
      displayedComponent = <WishList />;
    } 
    else if (activeLink === 'cart') {
      displayedComponent = <Cart  username = {user}/>;
    } 
  }

  console.log('Displayed Component', displayedComponent);
  return (
   <>

  <NavBar isAuthenticated={isAuthenticated} onLogout={onLogout} handleLinkClick={handleLinkClick} />

  

  {isAuthenticated ? (
  <>
  {displayedComponent }
  </>
  ) : (
        <>
          <Banner />
        <CourseDetails />
        
        </>
    )}

</>
  )
}

export default HomePage
import React, { useState,useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {UserAlert} from '../Common/UserAlert'


export const Home = (prop) => {
  const location=useLocation()
  const [message, setMessage] = useState(prop.message);
  const navigate = useNavigate();

  useEffect(()=>{
    const handleBeforeUnload = (event) => {
      // Clear the state on refresh
      navigate(location.pathname, { replace: true, state: null });
    };
    // Listen for page refresh or tab close
    window.addEventListener('beforeunload', handleBeforeUnload);
    if (location.state) {
      setMessage(location.state.message);
    }
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  },[navigate,location])
  return (
    <>
    <UserAlert show={true}message={message}/>

    <div>Home component</div>
    <div><Link to="/entryform">entryfrom</Link></div>
    <div><Link to="/playerslotting">Playerslotting</Link></div>
    </>

  )
}

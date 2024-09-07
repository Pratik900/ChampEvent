import React, { useState,useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {UserAlert} from './UserAlert'


export const Home = (prop) => {
  const location=useLocation()
  const [message, setMessage] = useState(prop.message);
  const navigate = useNavigate();
  var cnt=0
  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);

      // Clear the message after 3 seconds
      const timer = setTimeout(() => {
        setMessage(null);
      }, 1000);

      // Clean up timer on component unmount
      return () => clearTimeout(timer);
    }
    else{
      setMessage(prop.message);
    }
  },[prop.message,location.state]);
  useEffect(() => {
    if(cnt<=1){
      if (location.state) {
        // Clear the state by navigating to the same route without state
        navigate(location.pathname, { replace: true});
      }
    }
  },);
  return (
    <>
    <UserAlert show={true}message={message}/>

    <div>Home component</div>
    <div><Link to="/entryform">entryfrom</Link></div>
    <div><Link to="/playerslotting">Playerslotting</Link></div>
    </>

  )
}

import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <>
    <div>Home component</div>
    <div><Link to="/entryform">Link</Link></div>
    </>
  )
}

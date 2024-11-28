import React from 'react'
import "../CSS/profilepage.css"

const ProfilePage = () => {
  const role = sessionStorage.getItem('role')
  return (
    <div id='profile-page'>
      <h2 id='profile'>ProfilePage</h2>
      <h4 id='role'>{role}</h4>
    </div>
  )
}

export default ProfilePage
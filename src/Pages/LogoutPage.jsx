import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LogoutPage = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/')
    sessionStorage.removeItem('isAuth')
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('uid');

  }, [navigate])

  return (
    <div>LogoutPage</div>
  )
}

export default LogoutPage
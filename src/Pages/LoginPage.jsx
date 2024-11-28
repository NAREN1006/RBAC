import React, { useState } from 'react';
import { UserData } from '../DataBase/UserData';
import { useNavigate } from 'react-router-dom';
import "../CSS/loginpage.css"

const LoginPage = () => {
  const navigate = useNavigate();
  const [UserName, setUserName] = useState('');
  const [Password, setPassword] = useState('');



  const HandleLogin = (event) => {
    event.preventDefault();
    const result = UserData.find(
      (user) => user.username === UserName && user.password === Password
    );
    if (!result) {
      alert('Wrong credentials');
    } else {
      console.log('Login successful');
      sessionStorage.setItem('isAuth', true);
      sessionStorage.setItem('role', result.role);
      sessionStorage.setItem('uid', result.uid)
      navigate('/home')
    }
  };

  return (
    <div className='box'>
      <form onSubmit={HandleLogin}>
        <h1 id='login'>LOG IN</h1>
        <input className='input-box'
          type="text"
          name='user'
          value={UserName}
          required
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Username"
        />
        <input className='input-box'
          type="password"
          name='pass'
          value={Password}
          required
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <div> <input type="submit" name='login' value="LOG IN" className='login-button' /></div>
      </form>
    </div>
  );
};

export default LoginPage;
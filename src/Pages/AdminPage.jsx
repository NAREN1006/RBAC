import React, { useState } from 'react';
import { UserData } from '../DataBase/UserData';
import { v4 as uuidv4 } from 'uuid';
import "../CSS/adminpage.css";

const AdminPage = () => {
  const [NewUser, setNewUser] = useState('');
  const [NewPassword, setNewPassword] = useState('');  
  const [DataBase, setDataBase] = useState(UserData);
  const [ToEditUserName, setToEditUserName] = useState('');
  const [ToEditPassword, setToEditPassword] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [NewUserUid, setNewUserUid] = useState('');

  const generateUUID = () => {
    const newUUID = uuidv4();
    setNewUserUid(newUUID)
  };

  const AddUser = () => {
    generateUUID();
    if (NewUser.length === 0 || NewPassword.length === 0) {
      alert('Please fill in both username and password');
      return;
    }

    const newUser = {
      id: DataBase.length + 1,
      username: NewUser,
      password: NewPassword,
      uid: NewUserUid
    };

    setDataBase((prev) => [...prev, newUser]);
    console.log(DataBase);
    setNewUser('');
    setNewPassword('');
  };

  // Delete a user
  const DeleteUser = (id) => {
    const modifiedData = DataBase.filter((user) => user.uid !== id);
    setDataBase(modifiedData);
  };

  const EditUser = (id, username, password) => {
    setEditingId(id);
    setToEditUserName(username);
    setToEditPassword(password);
  };

  const SaveUser = () => {
    setDataBase((prev) =>
      prev.map((user) =>
        user.id === editingId
          ? { ...user, username: ToEditUserName, password: ToEditPassword } 
          : user
      )
    );
    setEditingId(null);
    setToEditUserName('');
    setToEditPassword('');
  };

  return (
    <div>
      <h2 id='admin'>Admin Page</h2>

      <div className='add-users'>
        <input
          type="text"
          name="add-user"
          placeholder="Enter username to add"
          value={NewUser}
          onChange={(e) => setNewUser(e.target.value)}
        />
        <input
          type="password"
          name="set-pass"
          placeholder="set password"
          value={NewPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button name="add-user" onClick={AddUser}>ADD USER</button>
      </div>

      <div>
        {DataBase.length === 0 ? (
          <h1 id='no-users'>No users</h1>
        ) : (
          DataBase.map((user) => (
            <div key={user.id} id='user-container'>
              <h3 id='uname'>{user.username}</h3>
              <h4 id='upass'>{user.password}</h4>
              <strong><center>uid</center></strong>  <h5 id='uuid'>{user.uid}</h5>
              <button name="delete-user" onClick={() => DeleteUser(user.uid)}>DELETE</button>
              <button name="edit-user" onClick={() => EditUser(user.id, user.username, user.password)}>EDIT</button>

              {editingId === user.id && (
                <div className='edit-form'>
                  <input
                    type="text"
                    name="editingId"
                    value={ToEditUserName}
                    onChange={(e) => setToEditUserName(e.target.value)}
                  />
                  <input
                    type="password"
                    name="editingPassword"
                    value={ToEditPassword}
                    onChange={(e) => setToEditPassword(e.target.value)}
                  />
                  <button name="edit-user" onClick={SaveUser}>SAVE</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPage;

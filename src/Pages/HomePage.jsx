import React, { useState } from 'react'
import "../CSS/homepage.css";
import "../CSS/RoutePage.css";
import { ContentData } from "../DataBase/ContentData"
const HomePage = () => {
  const [NewContent, setNewContent] = useState('')
  const [DataBase, setDataBase] = useState(ContentData)
  const [ToEdit, setToEdit] = useState('');
  const [editingId, setEditingId] = useState(null);
  const useruid = sessionStorage.getItem('uid')
  const username=sessionStorage.getItem('username')
  //create a new content
  const Post = () => {
    if (NewContent.length == 0) { alert("fill") }
    const newData = {
      id: DataBase.length,
      username:username ,
      message: NewContent,
      uid: useruid

    }
    setDataBase((prev) => [...prev, newData])
    console.log(DataBase);
    setNewContent('')
  }

  //delete a content
  const Delete = (id) => {
    const ModifiedData = DataBase.filter((selected) => selected.id !== id)
    setDataBase(ModifiedData)
  }

  const Edit = (id, message) => {
    setEditingId(id);
    setToEdit(message);
  };

  const SaveEdit = () => {
    setDataBase((prev) =>
      prev.map((item) =>
        item.id === editingId ? { ...item, message: ToEdit } : item
      )
    );
    setEditingId(null);
    setToEdit('');
  };

  return (
    <div>
      <h2 id='share-your-thoughts'>SHARE YOUR THOUGHT</h2>
      <div>
        <input type="text" name='share' placeholder='share something' value={NewContent} onChange={(e) => setNewContent(e.target.value)} />
        <button name="post" onClick={Post}>POST</button>
      </div>
      <div>
        {DataBase.length === 0 ? <h1 id="no-message">no messages</h1> : DataBase.map((sample) => (
          <div key={sample.id}>
            <h3 id="username">{sample.username}</h3>
            <h4 id="message">{sample.message}</h4>
            {useruid === sample.uid && (
              <>
                <button name="delete" onClick={() => Delete(sample.id)}>DELETE</button>
                <button name="edit" onClick={() => Edit(sample.id, sample.message)}>EDIT</button>

                {editingId === sample.id ? (
                  <div>
                    <input
                      type="text"
                      name="editcontent"
                      value={ToEdit}
                      onChange={(e) => setToEdit(e.target.value)}
                    />
                    <button name="save" onClick={SaveEdit}>SAVE</button>
                  </div>
                ) : (
                  <p id='mess'>Only the owner can edit this message</p>
                )}
              </>
            )}

          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage
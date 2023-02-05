import React, { Component, useState} from 'react';
import { useMutation } from '@apollo/client';
import axios from 'axios';
import { QUERY_CREATIONS, QUERY_ME } from '../../utils/queries';
import { ADD_CREATION } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { Input, Button, Space, Modal } from 'antd';

const { TextArea } = Input;


const PostPopupInput = () => {

  const dyanmicInput = (event) => {
    const { value } = event.target;
      setCreationText(value);
    
  };

  const [addCreation,  { error }] = useMutation(ADD_CREATION, {
    update(cache, { data: { 
      addCreation, 
      addCreationURL } }) {
      try {
        const { creations } = cache.readQuery(
          { query: QUERY_CREATIONS });

        cache.writeQuery({
          query: QUERY_CREATIONS,
          data: { creations: [addCreation, addCreationURL,...creations] },
        });
      } catch (e) {
        console.error(e);
      }


    },
  });

  const PostCreation = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addCreation({
        variables: {creationText, creationURL},
      });
    } catch (err) {
    };

  };

  const [creationText, setCreationText] = useState('');
  const [creationURL, setCreationURL] = useState('');

 
  const [selectedFile, setSelectedFile] = useState(null);

  const fileSelectedHandler = event => {
    setSelectedFile(event.target.files[0]);
  };

  const fileUploadHandler = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
  
    axios.post('gs://project-3-68141.appspot.com', formData)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // console.log(document.getElementById('test1').value)

  return (
    <div>
      <br></br>
      <h3>Welcome to Recipe Corner</h3>
      <br></br>
      <img src='https://cdn.shopify.com/s/files/1/0070/7032/files/food-photgraphy-tips.png?format=webp&v=1657891849&width=1024'></img>

      <br></br>
      <br></br>
      {Auth.loggedIn() ? (
        <>
 <Button type="primary" onClick={showModal}>
        Add a creation
      </Button>

    <br></br>
    <br></br>

      <Modal title="Detail your creation" open={isModalOpen} onOk={PostCreation} onCancel={handleCancel}>
    
      <form onSubmit={PostCreation}>

            <div>
              <TextArea
              rows={4}
                name="creationText"
                placeholder="Enter your description and a link to an image in brackets."
                onChange={dyanmicInput}
                value={creationText}
              ></TextArea>
            </div>
          <div>
      
            </div>
            {error && (
                'Posted'
            )}
            
          </form>

          <div>
            {/* <br></br>
          <input type="file" onChange={fileSelectedHandler} />
            <button onClick={fileUploadHandler}>Upload</button> */}
  </div>
        
      </Modal>
         
        </>
      ) : (
        <>
        <br></br>
        </>
      )}
      
       
    </div>
  );
};




export default PostPopupInput;

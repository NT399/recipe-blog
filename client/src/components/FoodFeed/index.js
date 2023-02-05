import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row } from 'antd';
import { useMutation } from '@apollo/client';

import { DELETE_CREATION } from '../../utils/mutations';



const FoodFeed = ({creations}) => {
  const [deleteCreation, { loading, error }] = useMutation(DELETE_CREATION);

  return (
    <div>

      {creations.map((creation) => (
          <div key={creation._id}>

            
       <Col span={24}>
      <Card
      style={{backgroundColor: 'lightblue'}}

      title=            
      {
          <>
          {creation.creationAuthor}'s creation: 
          <br/>
          </>
      }
    >
      <p>{creation.creationText.replace(/ *\([^)]*\) */g, "")}</p>
      <img src={creation.creationText.substring( creation.creationText.indexOf( '(' ) + 1, creation.creationText.indexOf( ')' ) )}></img>
    </Card>


          <Card>
               <button >
            {'Delete'}
            </button>
            <>
      
    </>

            </Card>
            </Col>
      
            <br></br>
          </div>
          
        ))}

      
   
     
    </div>
    
  );
};

export default FoodFeed;
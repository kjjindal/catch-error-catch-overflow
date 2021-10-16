import { Avatar } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import '../css/SearchLine.css';
import { setanswer } from '../features/answerSlice';
import { setnotshowsearchbox } from '../features/searchSlice';


function SearchLine({title,user,id,type}){

  const dispatch=useDispatch();
  const history=useHistory();


    
    const handleAnswer=()=>{
      dispatch(setnotshowsearchbox());
      console.log(type,id);
      dispatch(setanswer({
          id:id,
          type:type
      }))
      history.push('/answer');
  }

    return (
        <>
        <div className="searchline">

        <p  onClick={handleAnswer}  >  {title.slice(0,50)} 
          </p>
          <Avatar  src={user.photo} />

        </div>


        </>
    )
}

export default SearchLine
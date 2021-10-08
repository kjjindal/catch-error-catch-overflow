import { Avatar } from '@material-ui/core';
import userEvent from '@testing-library/user-event';
import React from 'react';
import '../css/SearchLine.css';


function SearchLine({title,user}){
    return (
        <>
        <div className="searchline">

        <p>  {title.slice(0,50)} 
          </p>
          <Avatar  src={user.photo} />

        </div>


        </>
    )
}

export default SearchLine
import React from 'react';
import {Avatar, Chip} from '@material-ui/core';
import '../css/ProblemBox.css';
import * as timeago from 'timeago.js';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { setanswer } from '../features/answerSlice';


function ProblemBox({type,title,body,user,timestamp,id}){

    const dispatch=useDispatch();

    const history=useHistory();



    const handleAnswer=()=>{
        dispatch(setanswer({
            id:id,
            type:type
        }))
        history.push('/answer');


    }


    return (
        <>
        <div className="problembox">

        <div className="problembox__left">
        <div  className="problembox__votes">   
        <p>  0  </p>
        <p>  votes  </p>
         
         </div>
         <div  className="problembox__answer">   
        <p>  0  </p>
        <p>  answer  </p>
         
         </div>
         



        </div>
        <div className="problembox__right">
        <h2 onClick={handleAnswer}>  {title}  </h2>
        <p>  {body.slice(0,184)} 
        {body.length>=184?'...':null}
          </p>
        <Chip variant="outlined" size="small" label={type} />
        <div className="problembox__askedby">
        <small> {timeago.format(
                 new Date(timestamp?.toDate()).toLocaleString()
            )} </small>
        <p>   Ask by <Avatar src={user.photo} alt={user.displayName} />  </p>


        </div>

        </div>
          

        </div>



        </>
    )
}


export default ProblemBox
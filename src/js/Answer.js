import { Button } from '@material-ui/core';
import React,{useEffect, useState} from 'react';
import '../css/answer.css';
import db from '../js/firebase';
import {selectanswer} from '../features/answerSlice';
import { useSelector } from 'react-redux';

function Answer(){

    const [answer,setanswer]=useState('');
    const [title,settitle]=useState('');
    const [description,setdescription]=useState('');
    const [question,setquestion]=useState([]);

    const secques = useSelector(selectanswer)


    useEffect(()=>{
        db.collection('questions').doc(secques.id).onSnapshot((snapshot)=>{
            setquestion(snapshot.docs.map((doc)=>
            (doc.data())
            ));
           })
     },[])

   

     console.log(question)




    return (
        <>
        <div className="answer">
            <div className='answer__container'>
            <form className="answer__form" >
            <h1> {title} </h1>

                <textarea  onChange={(e)=>{setanswer(e.target.value)}}>
                {answer}

                </textarea>
                <Button> Answer  </Button>
            </form>


            </div>
        </div>
      

        </>
    )
}

export default Answer
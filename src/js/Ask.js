import { Button} from '@material-ui/core';
import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import '../css/Ask.css';
import askimage from '../image/background.svg';
import db from './firebase';
import {selectuser} from '../features/userSilice';
import firebase from 'firebase';


const containerstyle={
    width:'1200px',
    background:`url(${askimage})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right bottom ',
}




const Ask=()=>{

  const user = useSelector(selectuser);
  const [title,settitle]=useState('');
  const [type,settype]=useState('');
  const [body,setbody]=useState('');
  const [smalltitle,setsmalltitle]=useState(true);
  const [smallbody,setsmallbody]=useState(true);



   const handleAsk=()=>{


    if(!smalltitle && !smallbody){
        db.collection('questions').add({
            user:user,
            type:type,
            title:title,
            body:body,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        })
        settitle('');
        setbody('');
        settype('');
    

    }
    else{

    }
    

   
   
   
   }


   const handleTitle=(e)=>{
       settitle(e.target.value)
       if(e.target.value.length>=90){
           setsmalltitle(false);

       }

   }

   const handleBody=(e)=>{
       setbody(e.target.value)
       if(e.target.value.length>=193){
        setsmallbody(false);

    }

   }








    return (
        <>

          <div className="ask">

          <div className="ask__container"  style={containerstyle}  >

          <h1>   ASk a question  </h1>

          <form>

<div className="form__title">
<p>  title  </p>
           <input  value={title}  onChange={handleTitle}    type='text' placeholder="e.g. Is there an R function for finding the index of an element in a vector?"  />
{smalltitle?<small> * title should be atleast 90   </small>:null}


</div>
<div className="form__type">
<p>  type </p>
           <input value={type}  onChange={(e)=>{settype(e.target.value)}}  type='text' placeholder="python,javascript,reactjs,php,mysql,sql,nodejs"  />

</div>
<div className="form__body">

<p> Body   </p>
           <textarea value={body}  onChange={handleBody}   >    </textarea>
{smallbody?<small>  * body should be atleast 193   </small>:null}


</div>


      


           <Button  disabled={!title || !type || !body}  onClick={handleAsk}  >   Post Your question  </Button>
          </form>



                 
          </div>

 

        </div>


        </>
    )
}
export default Ask
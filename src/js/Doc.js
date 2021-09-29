import React,{useState,useEffect} from 'react';
import '../css/Doc.css';
import ProblemBox from './ProblemBox';
import {Button} from '@material-ui/core';
import db from  './firebase';
import { useHistory } from "react-router-dom";
import {selectuser} from '../features/userSilice';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector } from 'react-redux';


function Doc(){
    let history = useHistory();
    const [open, setOpen] = React.useState(false);
    const user =useSelector(selectuser);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const [questions,setquestions]=useState([]);

    const handleAskQues=()=>{
        // return <Redirect to='/ask'  />

    
        history.push("/ask");
    }

     useEffect(()=>{
        db.collection('questions').orderBy('timestamp','desc').onSnapshot((snapshot)=>{
            setquestions(snapshot.docs.map((doc)=>
            ({id:doc.id,
              data:doc.data()})
            
            ));
           })
     },[])
   
 

    return (
        <>
        <div className="doc">

        <div className="doc__body">

        <div className="doc__header">
        <div className="doc__header1">

        <h1> All Questions  </h1>
        {user?<Button onClick={handleAskQues}  >   ASK Ques   </Button>:
        <Button onClick={handleClickOpen}  >   ASK Ques   </Button>
        }
        

        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Admin page"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           You Have to login first for ask questions
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog> 



        </div>
        <div className="doc__header2">
        <h2> {questions.length}  </h2>
        <Button> Filter  </Button>

        </div>
        </div>

        <div className="doc__body2">

        {questions.map(({data:{type,title,body,user,timestamp},id})=>(
            <ProblemBox id={id} type={type} title={title} body={body} user={user} timestamp={timestamp} />

        ))}
 


       



        </div>


        </div>



        
        </div>


        </>
    )
}

export default Doc

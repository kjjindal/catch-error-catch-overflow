import React, { useState, useEffect } from 'react';
import '../css/Doc.css';
import ProblemBox from './ProblemBox';
import { Button, CircularProgress } from '@material-ui/core';
import db from './firebase';
import { useHistory } from "react-router-dom";
import { selectuser } from '../features/userSilice';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector } from 'react-redux';
import InfiniteScroll from "react-infinite-scroll-component";


function Doc() {
  let history = useHistory();
  const [open, setOpen] = React.useState(false);
  const user = useSelector(selectuser);
  const [questionlength,setquestionlength]=useState(3);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [questions, setquestions] = useState([]);
  const [limitquestions, setlimitquestions] = useState([]);






  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {


      setlimitquestions(limitquestions.concat(questions.slice(questionlength,questionlength+3)))
      setquestionlength(questionlength+3)

    }, 1500);
  };


  const handleAskQues = () => {
    history.push("/ask");
  }

  useEffect(() => {
    db.collection('questions').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
      setquestions(snapshot.docs.map((doc) =>
      ({
        id: doc.id,
        data: doc.data()
      })

      ));
    })
  }, [])

  useEffect(() => {
    setlimitquestions(questions.slice(0, 3));

  }, [questions])



  return (
    <>
      <div className="doc">
        <div className="doc__body">
          <div className="doc__header">
            <div className="doc__header1">
              <h1> All Questions  </h1>
              {user ? <Button onClick={handleAskQues}  >   ASK Ques   </Button> :
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
              <h2> {limitquestions.length}  </h2>
              <Button> Filter  </Button>

            </div>
          </div>

          <div className="doc__body2">
            <InfiniteScroll
              dataLength={limitquestions.length}
              next={fetchMoreData}
              hasMore={limitquestions.length!==questions.length}
              loader={<div className="doc__scroll"><CircularProgress  color="inherit" /> </div>
            }
            >
              {limitquestions.map(({ data: { type, title, body, user, timestamp }, id }) => (
                <ProblemBox id={id} type={type} title={title} body={body} user={user} timestamp={timestamp} />
              ))}
            </InfiniteScroll>

          </div>


        </div>




      </div>


    </>
  )
}

export default Doc

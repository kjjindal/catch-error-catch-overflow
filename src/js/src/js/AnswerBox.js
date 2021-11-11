import { Avatar } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import '../css/AnswerBox.css';
import { selectanswer } from '../features/answerSlice';
import db from './firebase';
import * as timeago from 'timeago.js';
import { Check, Favorite } from '@material-ui/icons';



function AnswerBox({id2,submitedBy,likes,votes,solution,timestamp,videolink}) {

    const secques = useSelector(selectanswer);


    const handleLike = () => {
        db.collection("questions").doc(secques?.id).collection('answers').doc(id2).update({likes:likes+1});

      };


      const handleVote=()=>{
        db.collection("questions").doc(secques?.id).collection('answers').doc(id2).update({votes:votes+1});

      }

   

    

    return (
        <>
            <div className="answerbox">

                <div className="answerbox__left">
                    <div className="answerbox__votes">
                        <p>  {votes} </p>
                        <p onClick={handleVote} className="answerbox__pbutton" > <Check /> </p>

                    </div>
                    <div className="answerbox__answer">
                        <p>  {likes} </p>
                        <p onClick={handleLike} className="answerbox__pbutton2" ><Favorite /> </p>

                    </div>




                </div>


                <div className="answerbox__right">
                    <p>  {solution}
                    </p>
                    <div className="answerbox__askedby">
                        <small> {timeago.format(
                            new Date(timestamp?.toDate()).toLocaleString()
                        )} </small>
                        <p> Answer by<Avatar src={submitedBy.photo} alt={submitedBy.displayName} />  </p>


                    </div>

                </div>
                {videolink&&<div className="answerbox__right2">
<iframe  src={videolink} title="YouTube video player"    ></iframe>

                </div>}
                


            </div>





        </>
    )
}


export default AnswerBox
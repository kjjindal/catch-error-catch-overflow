import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import '../css/answer.css';
import db from '../js/firebase';
import { selectanswer } from '../features/answerSlice';
import { useSelector } from 'react-redux';
import { selectuser } from '../features/userSilice';
import firebase from 'firebase';
import AnswerBox from '../js/AnswerBox';


function Answer() {

    const [answer, setanswer] = useState('');
    const user = useSelector(selectuser);
    const [answers, setanswers] = useState([]);
    const [videolink, setvideolink] = useState('');


    const handleVideoLink = (e) => {
        setvideolink(e.target.value);
    }

    const [question, setquestion] = useState([]);

    const secques = useSelector(selectanswer);

    const giveAnswer = () => {
        var regex = /https:\/\/www\.youtube\.com\/embed\/*/;
        if (regex.test(videolink)) {
            db.collection('questions').doc(secques?.id).collection('answers').add({
                submitedBy: user,
                solution: answer,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                votes: 0,
                likes: 0,
                videolink:videolink
            })
            setanswer('');
        }
        else if(videolink===''){
            db.collection('questions').doc(secques?.id).collection('answers').add({
                submitedBy: user,
                solution: answer,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                votes: 0,
                likes: 0,
            })
            setanswer('');

        }
        else {
            console.log('not set');
        }

    }

    useEffect(() => {
        db.collection('questions').doc(secques?.id).collection('answers').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
            setanswers(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data()
            })))
        })

    }, [secques?.id])


    useEffect(() => {
        db.collection('questions').doc(secques?.id).get()
            .then(snapshot => setquestion(snapshot.data()))
    }, [secques?.id])

    return (
        <>
            <div className="answer">
                <div className='answer__container'>
                    <form className="answer__form" >
                        <h1> {question.title} </h1>
                        <small>  {question.body}  </small>

                        <textarea value={answer} onChange={(e) => { setanswer(e.target.value) }}>


                        </textarea>
                        <input type="text" placeholder="type video link in this format only https://www.youtube.com/embed/A_V2tfgrxj8" onChange={handleVideoLink} value={videolink} />
                        <Button onClick={giveAnswer} disabled={!user  || !answer} > Answer  </Button>
                    </form>


                </div>
                <div className="answer__already">
                    <h2>  Answers   </h2>
                    {answers.map(({ id, data: { solution, likes, votes, submitedBy, timestamp,videolink } }) => (
                        <AnswerBox id2={id} solution={solution} timestamp={timestamp} likes={likes} votes={votes} submitedBy={submitedBy} videolink={videolink}  />
                    ))}
                </div>
            </div>



        </>
    )
}

export default Answer
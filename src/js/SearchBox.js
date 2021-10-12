import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../css/SearchBox.css';
import { selectsearch } from '../features/searchSlice';
import db from './firebase';
import SearchLine from './SearchLine';

function SearchBox(){

    const [questions,setquestions]=useState([]);
    const [newquestions,setnewquestions]=useState([]);
    const query=useSelector(selectsearch);

    
    useEffect(() => {
        db.collection('questions').onSnapshot((snapshot) => {
          setquestions(snapshot.docs.map((doc) =>
          ({
            id: doc.id,
            data: doc.data()
          })
    
          ));
        })

      }, [])

      useEffect(()=>{
        setnewquestions(questions.filter((value)=>{
            return value.data.title.includes(query.query)
        }))

      },[query?.query])

      
    


    return (
        <>
        <div className="searchbox">

           {newquestions.map(({id,data:{title,user,type}})=>(
<SearchLine  key={id}  title={title} user={user} id={id} type={type} />
    ))}
    <small> Results : {newquestions.length}  </small>
        </div>


        </>
    )
}


export default SearchBox
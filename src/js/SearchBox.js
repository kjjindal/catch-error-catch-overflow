import React, { useEffect, useState } from 'react';
import '../css/SearchBox.css';
import db from './firebase';
import SearchLine from './SearchLine';

function SearchBox(){

    const [questions,setquestions]=useState([]);
    const [newquestions,setnewquestions]=useState([]);
    
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

       const handleClick=()=>{
        
           setnewquestions(questions.filter((value)=>{
               return value.data.title.includes('is there')
           }))

       }
    
        console.log(newquestions);


    return (
        <>
        <div className="searchbox"  onClick={handleClick}>
           {newquestions.map(({id,data:{title,user}})=>(
<SearchLine  key={id}  title={title} user={user}/>
    ))}
    <small> Results : {newquestions.length}  </small>
        </div>


        </>
    )
}


export default SearchBox
import React, { useEffect, useState } from 'react';
import '../css/Language.css';
import LanguageCard from './LanguageCard';
import db from './firebase';



function Language(){

    const [language,setlanguage]=useState([]);


   

    useEffect(()=>{
        db.collection('language').onSnapshot((snapshot)=>{
         setlanguage(snapshot.docs.map((doc)=>doc.data()));
        })
    },[])   

  


    return (
        <>
        <div className="language">
           
           <div className="language__type">

           {language.map(({language_name,language_playlist,language_description,latest_video})=>(

               <LanguageCard key={language_name} title={language_name} playlistlink={language_playlist} videolink={latest_video}  description={language_description}      />
           )
            
           )} 

        
                

              



                

           </div>



        </div>
        </>
    )
}

export default Language
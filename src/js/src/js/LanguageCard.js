import React from 'react';
import '../css/LanguageCard.css';

function LanguageCard({title,playlistlink,videolink,description}){
    return (
        <>
        <div className="languagecard">
<iframe  src={videolink} title="YouTube video player"    ></iframe>
<p>  {title}  </p>        
<small> {description} </small>    

<a href={playlistlink} target="__blank"> View on Youtube   </a> 


        </div>
        </>
    )
}

export default LanguageCard
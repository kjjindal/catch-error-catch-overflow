import React from 'react';
import '../css/Home.css';
import homegif from '../image/homegif.gif';



const homecss={
    background: `url(${homegif})`,
    // background: `url(https://tenor.com/bgbW1.gif)`,
    height: '100vh',
    backgroundColor: '#000000',
    backgroundPosition:'center',
    backgroundSize: 'auto',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed'
}
 

function Home(){
    return (
        <>
        <div className="home" style={homecss} >
        this is home page
        </div>
        </>
    )
}


export default Home
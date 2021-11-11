import React from 'react';
import '../css/Login.css';
import {auth,provider} from './firebase';
import {Button} from '@material-ui/core';
import Google from '../image/google.png';
import {useHistory} from 'react-router-dom';



function Login(){


    const history=useHistory();
    
    const handleclick=()=>{
        auth.signInWithPopup(provider)
        .then(()=>{          history.push('/docs');
    })
        .catch((err)=>{alert(err)})
    

    }



    return (
        <>

        <div className="login">


        <Button   onClick={handleclick}> <img src={Google} alt="google" />  Log in with Google    </Button>




        </div>



        </>
    )
}

export default Login
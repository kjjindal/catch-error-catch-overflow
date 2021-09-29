import { Menu, Search } from '@material-ui/icons';
import {Button} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import '../css/Header.css';
import catchlogo1 from '../image/catchlogo1.png';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setlanguage } from '../features/languageSlice';
import db, { auth } from './firebase';
import {selectuser} from '../features/userSilice';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function Header(){

    const dispatch=useDispatch();
    const [languagearr,setlanguagearr]=useState([]);

    const user = useSelector(selectuser);
    
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    useEffect(()=>{
        db.collection('language').onSnapshot((snapshot)=>{
            setlanguagearr(snapshot.docs.map((doc)=>doc.data().language_name));
           })
    },[])


    const handlelogout=()=>{

      auth.signOut();

    }


    
   

    dispatch(setlanguage({
        name:languagearr
    }))

    return (
        <>
        <div className="header">
        <div className="header__center">
        
        <Menu />
        <img  alt="catch overflow"  src={catchlogo1} />
        <h3><Link to="/home">
             catch<span>overflow</span>
        </Link></h3>

        <div className="header__click">
        <p><Link to="/language">   Language </Link>
           </p>
        <p><Link to="/docs">   Docs </Link> </p>
 
        {user?.email==="kalpitjindal1999@gmail.com"?
        <p> <Link to="/admin">   Admin </Link> </p>
        :
        <p> <a variant="outlined"  color="primary" onClick={handleClickOpen}> Admin    </a>        </p>
        
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
           Your are not admin  this page for admin you are not eligible for this tab
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
        <div className="header__search">
        <Search />
        <input type="text" placeholder="search" />
        </div>
        <div className="header__button">
        {!user?
            <Button  className="header__login"> <Link to="/login" >  Log in  </Link></Button>
        :null
        }
        {user?
            <Button className="header__signup" onClick={handlelogout}   > Logout   </Button>
        :null
        }
        </div>
        </div>
        </div>
        </>
    )
}

  
export default Header
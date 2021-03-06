import React,{useEffect} from 'react';
import '../css/App.css';
import Header from './Header';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Home from './Home';
import Language from './Language';
import Admin  from  './Admin';
import Login from './Login';
import Doc from './Doc';
import Ask from './Ask';
import { useDispatch, useSelector} from 'react-redux';
import { login, logout, selectuser } from '../features/userSilice';
import { auth } from './firebase';
import Pagenotfound from './Pagenotfound';
import Answer from './Answer' ;
import SearchBox from './SearchBox';
import {selectshowsearchbox} from '../features/searchSlice';
import { selectanswer } from '../features/answerSlice';
import PageNotFound from './Pagenotfound';


function App() {


  const dispatch=useDispatch();

  const user=useSelector(selectuser);
  const showsearchbox=useSelector(selectshowsearchbox);
  const answer=useSelector(selectanswer);


  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){

        dispatch(login({
          uid:authUser.uid,
          photo:authUser.photoURL,
          email:authUser.email,
          displayName:authUser.displayName
        }))
      }
      else{
        dispatch(logout())
      }
    })

  },[dispatch])






  return (
    <div className="app"  >
    <Router >
    
    <Header  />
    {showsearchbox?<SearchBox />:null}
  
 
    <Switch>
    <Route  path="/language"  >
    <Language />
    </Route>
    <Route  path="/admin"  >
    {user?<Admin />:<Pagenotfound />}
    
    </Route>
    <Route  path="/docs"  >

    <Doc  />
    </Route>
    <Route  path="/login"  >

    <Login  />
    </Route>
    <Route  path="/ask"  >
    {user?<Ask />:<Pagenotfound  />}
    </Route>
    <Route  path="/answer"    >
   
      {answer? <Answer  />:<PageNotFound  />}
    </Route>
     <Route  path="/"    >
    <Home  />
    </Route> 
    <Route   >

<Pagenotfound  />
</Route> 


    </Switch>
    </Router>

    </div>
  );
}

export default App;

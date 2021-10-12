import { Button, MenuItem, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "../css/Admin.css";
import db from "./firebase";
import { useSelector } from "react-redux";
import { selectlanguage } from "../features/languageSlice";
import Alert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";




function Addnew({ index, value, children }) {
  return (
    <>
      {value === index ? (
        <div className="admin__addnew">{children} </div>
      ) : null}
    </>
  );
}

function Delete({ index, value, children }) {
  return (
    <>
      {value === index ? (
        <div className="admin__delete">{children} </div>
      ) : null}
    </>
  );
}

function Update({ index, value, children }) {
  return (
    <>
      {value === index ? (
        <div className="admin__update">{children} </div>
      ) : null}
    </>
  );
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function Admin() {
  

  const handleDrop = (event) => {
    setdroplanguage(event.target.value);
  };

  const handleupdatelanguage=(event)=>{
    setupdatelanguage(event.target.value);

  }

  const [languagetype, setlanguagetype] = useState();
  const [latestvideo, setlatestvideo] = useState();
  const [playlist, setplaylist] = useState();
  const [description, setdescription] = useState();
  const [alertnew, setalertnew] = useState(false);
  const [alertaddnew, setalertaddnew] = useState(false);

  const [alertdelete, setalertdelete] = useState(false);
  const [alertupdate, setalertupdate] = useState(false);

  const arr = useSelector(selectlanguage);
  const [updatelatestvideo,setupdatelatestvideo]=useState('');


  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [droplanguage, setdroplanguage] = useState(arr.name[0]);
  const [updatelanguage, setupdatelanguage] = useState(arr.name[0]);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  const handleDelete = () => {
    var languagedelete_query = db
      .collection("language")
      .where("language_name", "==", droplanguage);
    languagedelete_query.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete();
      });
    });
    
   setalertdelete(true);
  };

  // update  query 
  const handleUpdate = () => {
    var languagedelete_query = db
      .collection("language")
      .where("language_name", "==",updatelanguage);
    languagedelete_query.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.update({
            latest_video:updatelatestvideo
        });
      });
    });
    setalertupdate(true);
    setupdatelatestvideo('');
  };

  const handleLanguage = (e) => {
    // e.preventDefault();

    if (!arr.name.includes(languagetype)) {
      db.collection("language").add({
        language_name: languagetype,
        language_description: description,
        latest_video: latestvideo,
        language_playlist: playlist,
      });
      setlanguagetype("");
      setplaylist("");
      setdescription("");
      setlatestvideo("");
      setalertaddnew(true);
    } else {
      setalertnew(true);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setalertnew(false);
      setalertaddnew(false);
      setalertdelete(false);
      setalertupdate(false);
    }, 5000);
  }, [alertnew,alertaddnew,alertdelete,alertupdate]);

  return (
    <>
      <div className="admin"  >


      {alertaddnew ? (
          <Alert variant="outlined" severity="success">
            Successfully added
          </Alert>
        ) : null}

        {alertnew ? (
          <Alert variant="outlined" severity="warning">
            Something is wrong may be enter language is already exist in
            language tab
          </Alert>
        ) : null}
        
        {alertdelete ? (
          <Alert variant="outlined" severity="success">
            delete successfully
          </Alert>
        ) : null}


        {alertupdate ? (
          <Alert variant="outlined" severity="success">
            update successfully
          </Alert>
        ) : null}
        


        <Paper className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Add new language" />
            <Tab label="Delete language" />
            <Tab label="Update language" />
          </Tabs>
        </Paper>
        <Addnew value={value} index={0}>
          <form>
           
            <div className="admin__languagetype">
              <p> Enter language type </p>
              <input
                type="text"
                value={languagetype}
                onChange={(e) => {
                  setlanguagetype(e.target.value);
                }}
              />
            </div>
            <div className="admin__link">
              <p> Video embed link  </p>
              <input
                type="text"
                value={latestvideo}
                onChange={(e) => {
                  setlatestvideo(e.target.value);
                }}
              />
            </div>
            <div className="admin__playlist">
              <p> Language playlist link </p>
              <input
                type="text"
                value={playlist}
                onChange={(e) => {
                  setplaylist(e.target.value);
                }}
              />
            </div>
            <div className="admin__description">
              <p> Add description </p>
              <textarea
                rows="7"
                cols="70"
                value={description}
                onChange={(e) => {
                  setdescription(e.target.value);
                }}
              >
                {" "}
              </textarea>
            </div>
            <Button
              onClick={handleLanguage}
              disabled={
                !languagetype || !description || !latestvideo || !playlist
              }
            >
              Add
            </Button>
          </form>
        </Addnew>

        <Delete value={value} index={1}>
          <form>
            <div className="admin__deleteform">
              <Select
                variant="outlined"
                value={droplanguage}
                onChange={handleDrop}
              >
                {arr.name.map((data) => (
                  <MenuItem value={data}>{data}</MenuItem>
                ))}
              </Select>
            </div>
            <Button onClick={handleDelete}> Delete Language </Button>
          </form>
        </Delete>
        <Update value={value} index={2}>
        <form>
           
            <div className="admin__updateform">
            <Select
                variant="outlined"
                value={updatelanguage}
                onChange={handleupdatelanguage}
              >
                {arr.name.map((data) => (
                  <MenuItem value={data}>{data}</MenuItem>
                ))}
              </Select>
            </div>
            <div className="admin__updatelink">
              <p> Enter updated embed link </p>
              <input
                type="text"
                value={updatelatestvideo}
                onChange={(e) => {
                  setupdatelatestvideo(e.target.value);
                }}
              />
            </div>
           
            <Button
              onClick={handleUpdate}
              disabled={!updatelatestvideo}
              
            >
              Update
            </Button>
          </form>
        </Update>
      </div>
    </>
  );
}

export default Admin;

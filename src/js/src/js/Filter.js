import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import '../css/Filter.css';
import { setfilter } from '../features/filterSlice';


function Filter(){

    const [typequery,settypequery]=useState();
    const [timequery,settimequery]=useState();
    const dispatch=useDispatch();

    const handleType=(e)=>{

        settypequery(e.target.value);
        

    }

    

    const handleFilter=()=>{

        dispatch(setfilter({filtertype:typequery,timequery:timequery}));


    }



    const handledesc=(e)=>{

        if(e.target.checked===true){
            settimequery('desc')
        
        }
        else{
            settimequery('')

        }

    }
    const handleasc=(e)=>{
        if(e.target.checked===true){
            settimequery('asc')
        
        }
        else{
            settimequery('')
        }

    }

    return (
        <>
        <div className="filter">
            <div className="filter__top">
                <div className="filter__left">
                <p> Type </p>
                <input type="text"  placeholder="e.g. python or javascript" value={typequery} onChange={handleType}  />

            </div>
            <div className="filter__center">
             
                <FormControl component="fieldset">
      <FormLabel component="legend">Sorted by</FormLabel>
      <RadioGroup
        aria-label="gender"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel value="time_desc" onClick={handledesc} control={<Radio />} label="time desc" />
        <FormControlLabel value="time_asc" onClick={handleasc} control={<Radio />} label="time asc" />

       
      </RadioGroup>
    </FormControl>

            </div>
            
  
            </div>
            <div className="filter__bottom">

                <Button onClick={handleFilter} disabled={!timequery || !typequery} > Apply  </Button>

            </div>
          




        </div>


        </>
    )
}

export default Filter
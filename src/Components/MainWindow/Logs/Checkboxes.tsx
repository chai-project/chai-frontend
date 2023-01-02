import React, {useEffect, useState} from 'react';
import { CssBaseline, Button, Paper, TextField, Grid,Checkbox, FormGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material/';

// import Checkbox from '@mui/material/Checkbox';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';

const Checkboxes: React.FC<{logs:any, setLogs:any, uniquefilterValues:any, setUniquefilterValues:any}>  = ({logs, setLogs, uniquefilterValues, setUniquefilterValues}) => {
//   const uniquefilterValues = ['System', "User"]
  const filterKeyValues  = Object.keys(uniquefilterValues)


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value,'zeuru')
    setUniquefilterValues({...uniquefilterValues,[event.target.value]: event.target.checked, })
  };


//   console.log(filterKeyValues)
  return (
    <FormControl component="fieldset">
      <FormGroup aria-label="position" row>
        {filterKeyValues.map((value:any)=>{
            return         <FormControlLabel value={value} control={<Checkbox checked={uniquefilterValues[value]} onChange={handleChange}/>} label={value} labelPlacement="start" />
        })}
        
        {/* <FormControlLabel
          value="start"
          control={<Checkbox />}
          label="Start"
          labelPlacement="start"
        />
        <FormControlLabel
          value="start"
          control={<Checkbox />}
          label="Start"
          labelPlacement="start"
        /> */}
      </FormGroup>
    </FormControl>
  );
}


export default Checkboxes;
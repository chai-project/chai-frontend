import React, {useEffect, useState} from 'react';
import { CssBaseline, Button, Paper, TextField, Grid,Checkbox, FormGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material/';


const Checkboxes: React.FC<{logs:any, setLogs:any, uniquefilterValues:any, setUniquefilterValues:any}>  = ({logs, setLogs, uniquefilterValues, setUniquefilterValues}) => {

  const filterKeyValues  = Object.keys(uniquefilterValues)


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    setUniquefilterValues({...uniquefilterValues,[event.target.value]: event.target.checked, })
  };

  return (
    <FormControl component="fieldset">
      <FormGroup aria-label="position" row>
        {filterKeyValues.map((value:any)=>{
            return         <FormControlLabel value={value} control={<Checkbox checked={uniquefilterValues[value]} onChange={handleChange}/>} label={value} labelPlacement="end" />
        })}
      </FormGroup>
    </FormControl>
  );
}


export default Checkboxes;
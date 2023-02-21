import React, {useEffect, useState} from 'react';
import { CssBaseline, Button, Paper, TextField, Grid,Checkbox, FormGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material/';
import {useSelector, useDispatch} from 'react-redux'
import { setCategoryFiltersValue } from '../../../Redux-reducers/logsReducer';

const Checkboxes: React.FC<{logs:any, setLogs:any, uniquefilterValues:any, setUniquefilterValues:any}>  = ({logs, setLogs, uniquefilterValues, setUniquefilterValues}) => {

  const filterKeyValues  = Object.keys(uniquefilterValues)
  const dispatch = useDispatch()



  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCategoryFiltersValue({...uniquefilterValues,[event.target.value]: event.target.checked, }))
    // setUniquefilterValues({...uniquefilterValues,[event.target.value]: event.target.checked, })
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
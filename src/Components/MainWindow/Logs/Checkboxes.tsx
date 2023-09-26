import React from 'react';
import { Checkbox, FormGroup, FormControlLabel, FormControl } from '@mui/material/';
import {useSelector, useDispatch} from 'react-redux'
import { setCategoryFiltersValue } from '../../../Redux-reducers/logsReducer';

const Checkboxes: React.FC<{uniquefilterValues:any}>  = ({uniquefilterValues}) => {

  const filterKeyValues  = Object.keys(uniquefilterValues)
  const dispatch = useDispatch()



  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCategoryFiltersValue({...uniquefilterValues,[event.target.value]: event.target.checked, }))
  };

  return (
    <FormControl component="fieldset">
      <FormGroup aria-label="position" row>
        {filterKeyValues.map((value:any)=>{
            return <FormControlLabel value={value} control={<Checkbox checked={uniquefilterValues[value]} onChange={handleChange}/>} label={value} labelPlacement="end" />
        })}
      </FormGroup>
    </FormControl>
  );
}


export default Checkboxes;
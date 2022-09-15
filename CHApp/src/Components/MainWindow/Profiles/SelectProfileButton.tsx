import React, {useState} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

//types
import profile from '../../../Types/types'

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper } from '@mui/material/';

const useStyles = makeStyles({
    label: {
      color: "yellow",
      borderColor: 'yellow',
      border: '20px',
      "&.Mui-focused": {
        color: "green",
      },
    },
  });


const SelectProfileButton: React.FC<{allProfiles:any, profile:any, setProfile:any}> = ({allProfiles, profile, setProfile }) => {
  const [selectedProfile, setSelectedProfile] = useState('');
  const classes = useStyles()
  // console.log(allProfiles)
  const handleChange = (event: SelectChangeEvent) => {
    const profileToSet = allProfiles.find((profile:any)=>{
      return profile.profile === event.target.value
    })
    console.log(profileToSet)
    setSelectedProfile(event.target.value as string)
    setProfile(profileToSet);
  };

  return (
    <Box sx={{ maxWidth: 140 }}>
      <FormControl fullWidth>
        <InputLabel id="select-label" color="primary" >Profile</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedProfile}
          label="Profile"
          onChange={handleChange}
          className={classes.label}
        >
          {allProfiles.map((profile:any)=>{ //define type
              return (
                <MenuItem value={profile.profile}>{profile.profile}</MenuItem>
              )
          })}
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectProfileButton
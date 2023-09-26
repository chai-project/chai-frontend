import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

//mui
import {makeStyles } from '@material-ui/core/styles';

// redux
import {useSelector, useDispatch} from 'react-redux'

const useStyles = makeStyles({
    label: {
      "&.MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "white" // implement logic here for changing color on dark light theme selection
        },
        "&:hover fieldset": {

        },
        "&.Mui-focused fieldset": {
          borderColor: "#5ACBCC"
        },
      },
      "&.Mui-focused": {

      },
      
    },
    icon:{
      color:"#5ACBCC !important",
    }
  });


const SelectProfileButton: React.FC<{allProfiles:any, profile:any, setProfile:any}> = ({allProfiles, profile, setProfile }) => {
  const activeProfile = useSelector( (state:any)=>{
    return  state.heatingComponent.activeProfile
  })

  const [selectedProfile, setSelectedProfile] = useState('');
  const classes = useStyles()


  useEffect(()=>{
    if(activeProfile  && allProfiles){ 
      
      const profileToSet = allProfiles.find((profile:any)=>{
        return profile.profileName === activeProfile.profileName
      })
      setSelectedProfile(activeProfile.profileName)
      setProfile(profileToSet);
    }
  },[activeProfile]);


  const handleChange = (event: SelectChangeEvent) => {
    const profileToSet = allProfiles.find((profile:any)=>{
      return profile.profileName === event.target.value
    })
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
          size="small"
          inputProps={{
            classes: {
              icon: classes.icon,
                },
            }}
        >
          {allProfiles.map((profile:any)=>{
              return (
                <MenuItem  value={profile.profileName}>{profile.profileName} </MenuItem>
              )
          })}
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectProfileButton
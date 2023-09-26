import React, {useEffect, useState} from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent} from '@mui/material/';
//styles
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';

//redux
import {useSelector, useDispatch} from 'react-redux'



//styles 
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selectButton: {
      width:'125px',
      "&.MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#5ACBCC"
        },
        "&:hover fieldset": {

        },
        "&.Mui-focused fieldset": {

        },
      },
      "&.Mui-focused": {

      },
      [theme.breakpoints.down('md')]: {
        height:'35px',

      }
      
    },
    icon:{
      color:"#5ACBCC !important"
    },
  }),
);

const ProfilePicker: React.FC<{timeslots:any, asignedTimeslot:any,setWeekdayScheduleToEdit:any,sortTimeslots:any,setTimeslotToAdd:any, timeslotToAdd:any, isForAddingATimeslot:boolean }> = ({timeslots, asignedTimeslot,setWeekdayScheduleToEdit,sortTimeslots, setTimeslotToAdd, timeslotToAdd, isForAddingATimeslot}) => {
  const [profileName, setProfileName] = useState<string>('');

  useEffect(()=>{
    if(!isForAddingATimeslot){
      setProfileName(asignedTimeslot.profileName)
    }else{
      setProfileName(asignedTimeslot.profileName)
    }
  },[asignedTimeslot])

  const allProfiles = useSelector((state:any)=>{
    return(
        state?.heatingProfiles.heatingProfiles
    )
  })

  const classes = useStyles();

  const handleSetProfile = (event: SelectChangeEvent) => {
    setProfileName(String(event.target.value));
    const foundProfile = allProfiles.find((profile:any)=>{
      return profile.profileName === event.target.value
    })
    if(!isForAddingATimeslot){
      const newTimeslots = timeslots.map((timeslot:any,index:number, arr:any)=>{ 
        if(timeslot.id === asignedTimeslot.id){
            return {...timeslot, profileName: String(event.target.value), profileID: foundProfile.profile, color: foundProfile.profileColor}
        }else{
            return {...timeslot}
        }
      });
      sortTimeslots(newTimeslots)
    }else{
      setTimeslotToAdd({...timeslotToAdd, profileName: String(event.target.value) , profileID: foundProfile.profile, color: foundProfile.profileColor  }) 

    }
  };

  return (
    <Grid key={asignedTimeslot.profileName} container direction="row" justifyContent="flex-start" alignItems="center">
      <Grid item>
        <FormControl sx={{ m: 1, maxWidth: 150 }} size="small">
          <InputLabel id="demo-select-small">Profile</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={profileName}
            label="Profile"
            onChange={handleSetProfile}
            className={classes.selectButton}
            inputProps={{
              classes: {
                icon: classes.icon,
                  },
              }}
          >
            {allProfiles?.map((profile:any)=>{
              return(
                <MenuItem value={profile.profileName}>{profile.profileName}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}
export default ProfilePicker
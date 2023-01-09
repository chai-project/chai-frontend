import React, {useEffect, useState} from 'react';
import { CssBaseline, AppBar, Toolbar, IconButton, Stack, Link, Grid, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent} from '@mui/material/';
// import Stack from '@mui/material/Stack';
//styles
import {makeStyles, Theme, createStyles, withStyles  } from '@material-ui/core/styles';

//redux
import {useSelector, useDispatch} from 'react-redux'



//styles 
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selectButton: {
      width:'125px',
      "&.MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#5ACBCC" // sia spalva pakeisti i balta arba jouda priklauso nuo app temos.
        },
        "&:hover fieldset": {
          // borderColor: "yellow"
        },
        "&.Mui-focused fieldset": {
          // borderColor: "green"
        },
      },
      "&.Mui-focused": {
        // color: "green",
      },
      [theme.breakpoints.down('md')]: {
        height:'35px',
        // width:'70px',
      }
      
    },
    icon:{
      color:"#5ACBCC !important"
    },
  }),
);

const ProfilePicker: React.FC<{timeslots:any, asignedTimeslot:any,setWeekdayScheduleToEdit:any,sortTimeslots:any,setTimeslotToAdd:any, timeslotToAdd:any, isForAddingATimeslot:boolean }> = ({timeslots, asignedTimeslot,setWeekdayScheduleToEdit,sortTimeslots, setTimeslotToAdd, timeslotToAdd, isForAddingATimeslot}) => {
  const [profileName, setProfileName] = useState<string>('');

  useEffect(()=>{ // lygei ta paty padaryti ir ten !!!
    if(!isForAddingATimeslot){
      setProfileName(asignedTimeslot.profileName)
    }else{
      setProfileName(asignedTimeslot.profileName)
    }
  },[asignedTimeslot])

  const allProfiles = useSelector((state:any)=>{//define type
    // console.log(state)
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
      const newTimeslots = timeslots.map((timeslot:any,index:number, arr:any)=>{ //define type later
        if(timeslot.id === asignedTimeslot.id){
            return {...timeslot, profileName: String(event.target.value), profileID: foundProfile.profile, color: foundProfile.profileColor}
        }else{
            return {...timeslot}
        }
      });
      sortTimeslots(newTimeslots)
    }else{
      setTimeslotToAdd({...timeslotToAdd, profileName: String(event.target.value) , profileID: foundProfile.profile, color: foundProfile.profileColor  }) //add new profile needds to be updated!!!

    }

    // const newTimeslots = timeslots.map((timeslot:any,index:number, arr:any)=>{ //define type later
    //     if(timeslot.id === asignedTimeslot.id){
    //         return {...timeslot, profileName: String(event.target.value)}
    //     }else{
    //         return {...timeslot}
    //     }
    // });
    // sortTimeslots(newTimeslots)
  };

  //netaip darai seni yra lentele pasidares esi reduserije tai pagal ja ir padarysi nes ten i back edna ne laika o skaiciu tik nusiust reike xD
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
            {/* <MenuItem value={"OFF"}>Off</MenuItem> */}
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
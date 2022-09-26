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
      width:'75px',
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
        height:'30px',
        width:'70px',
      }
      
    },
    icon:{
      color:"#5ACBCC !important"
    },
  }),
);

const ProfilePicker: React.FC<{timeslots:any, asignedTimeslot:any,setWeekdayScheduleToEdit:any }> = ({timeslots, asignedTimeslot,setWeekdayScheduleToEdit}) => {
  const [profile, setProfile] = useState<string>('');

  useEffect(()=>{ // lygei ta paty padaryti ir ten !!!
    setProfile(asignedTimeslot.profileName)
  },[asignedTimeslot])

  const allProfiles = useSelector((state:any)=>{//define type
    // console.log(state)
    return(
        state?.heatingProfiles
    )
  })

  const classes = useStyles();

  const handleSetProfile = (event: SelectChangeEvent) => {
    setProfile(String(event.target.value));
    let noDuplicates: any[] = []
    const newTimeslots = timeslots.map((timeslot:any,index:number, arr:any)=>{ //define type later
        if(timeslot.id === asignedTimeslot.id){
            // if(arr[index-1].profileName === String(event.target.value)){
            //     console.log('yes!!!!')
            //     // return {...arr[index-1], profileEnd: asignedTimeslot.profileEnd }
            //     // arr[index-1].profileEnd = asignedTimeslot.profileEnd;
            //     // arr.splice(index, index + 1)
            // }
            return {...timeslot, profileName: String(event.target.value)}
        }else{
            return {...timeslot}
        }
        // return timeslot
    });
    // timeslots.forEach((timeslot:any,index:number, arr:any)=>{ //define type later
    //     if(timeslot.id === asignedTimeslot.id){
    //         // if(arr[index-1].profileName === String(event.target.value)){
    //         //     console.log('yes!!!!')
    //         //     // return {...arr[index-1], profileEnd: asignedTimeslot.profileEnd }
    //         //     // arr[index-1].profileEnd = asignedTimeslot.profileEnd;
    //         //     // arr.splice(index, index + 1)
    //         // }
    //         noDuplicates.push({...timeslot, profileName: String(event.target.value)}); 
    //     }else{
    //         noDuplicates.push(timeslot);
    //     }
    //     // return timeslot
    // });
    // const hmm :any[]=[] ;
    for(let i =0; i<newTimeslots.length; i++){
        if(i===0){
            noDuplicates.push(newTimeslots[i])
        }else{
            if(noDuplicates[noDuplicates.length-1].profileName === newTimeslots[i].profileName){
                noDuplicates[noDuplicates.length-1].profileEnd = newTimeslots[i].profileEnd
            }else{
                noDuplicates.push(newTimeslots[i])
            }
        }
    }
    // console.log(noDuplicates,'zeurumelis seni xD');
    setWeekdayScheduleToEdit(noDuplicates);
  };

//   console.log("assigned profile:",assignedProfile )

  //netaip darai seni yra lentele pasidares esi reduserije tai pagal ja ir padarysi nes ten i back edna ne laika o skaiciu tik nusiust reike xD
  return (
    <Grid key={asignedTimeslot.profileName} container direction="row" justifyContent="center" alignItems="center">
      <Grid item>
        <FormControl sx={{ m: 1, maxWidth: 120 }} size="small">
          <InputLabel id="demo-select-small">Profile</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={profile}
            label="Profile"
            onChange={handleSetProfile}
            className={classes.selectButton}
            inputProps={{
              classes: {
                icon: classes.icon,
                  },
              }}
          >
            <MenuItem value={"OFF"}>Off</MenuItem>
            {allProfiles.map((profile:any)=>{
              return(
                <MenuItem value={profile.profile}>{profile.profile}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}
export default ProfilePicker
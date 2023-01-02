import React, {useEffect, useState} from 'react';
import { CssBaseline, AppBar, Toolbar, IconButton, Stack, Link, Grid, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Box} from '@mui/material/';
// import Stack from '@mui/material/Stack';
//styles
import {makeStyles, Theme, createStyles, withStyles  } from '@material-ui/core/styles';

//redux
import {useSelector, useDispatch} from 'react-redux'
import { ClassSharp } from '@mui/icons-material';



//styles 
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selectButton: {
      width:'65px',
      "&.MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#5ACBCC" // sia spalva pakeisti i balta arba jouda priklauso nuo app temos.
        },
        "&:hover fieldset": {
          borderColor: "yellow"
        },
        "&.Mui-focused fieldset": {
          borderColor: "green"
        },
      },
      "&.Mui-focused": {
        // color: "green",
      },
      [theme.breakpoints.down('md')]: {
        height:'25px',
      }
      
    },
    circle:{
    //   color:"#5ACBCC !important"
    height: '50px',
    width: '50px',
    // border: '1px solid red',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    },
  }),
);

const Setpoint: React.FC<{timeslots:any, asignedTimeslot:any}> = ({timeslots, asignedTimeslot}) => {
  const [profile, setProfile] = useState<string>('');

  const allProfiles = useSelector((state:any)=>{//define type
    // console.log(state)
    return(
        state?.heatingProfiles
    )
  })

  const classes = useStyles();

  const handleSetProfile = (event: SelectChangeEvent) => {
    // const editedTimeslot = timeslots.find((timeslot:any)=>{
    //     if(timeslot.id === asignedTimeslot.id){
    //         console.log(timeslot, 'ura!!!')
    //     }
    // })
    setProfile(String(event.target.value)); //event.target.value as string buvo
  };

//   console.log("sdsd",allProfiles )
const colorOfATimeslot = asignedTimeslot.temperature < 17 ? '#57A6F0' : asignedTimeslot.temperature < 22 ? '#F6946B' : asignedTimeslot.temperature < 27 ? '#FE6262' : null 

  return (
    <Grid xs={12} container direction="row" justifyContent="center" alignItems="center">
        <Box  sx={{background:colorOfATimeslot}} className={classes.circle} onClick={()=>{console.log('click')}}>
            <span>{asignedTimeslot.temperature}°C</span>
        </Box>
    </Grid>
  );
}
export default Setpoint
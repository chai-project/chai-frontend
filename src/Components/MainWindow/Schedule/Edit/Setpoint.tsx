import React, {useState} from 'react';
import { Grid, SelectChangeEvent, Box} from '@mui/material/';
//styles
import {makeStyles, Theme, createStyles  } from '@material-ui/core/styles';

//redux
import {useSelector, useDispatch} from 'react-redux'

//styles 
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selectButton: {
      width:'65px',
      "&.MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#5ACBCC"
        },
        "&:hover fieldset": {
          borderColor: "yellow"
        },
        "&.Mui-focused fieldset": {
          borderColor: "green"
        },
      },
      "&.Mui-focused": {

      },
      [theme.breakpoints.down('md')]: {
        height:'25px',
      }
      
    },
    circle:{
      height: '50px',
      width: '50px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
);

const Setpoint: React.FC<{timeslots:any, asignedTimeslot:any}> = ({timeslots, asignedTimeslot}) => {

const classes = useStyles();

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
import React, {useState} from 'react';

import { useParams, useNavigate } from 'react-router-dom';


//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid, IconButton } from '@mui/material/';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';



// redux
import {useSelector, useDispatch} from 'react-redux'
// import { initializeData } from './Redux-reducers/dataReducer';
import {setNewHeatingSchedule} from '../../../../Redux-reducers/heatingScheduleReducer'


//types
import timeslot from '../../../../Types/types';

//components
import Weekday from '../Weekday';
import WeekdayPaste from '../WeekdayPaste';
import ProgressCircular from '../../../ProgressBar/ProgressCircular';
import { Typography } from '@material-ui/core';
// Styles 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer:{
      // border: "1px solid lime",
      height: '100%',
      width: '100%'
    },
    profile:{
        // border: "1px solid red",
        fontSize: '15px',
        width: '14%',
        [theme.breakpoints.down('md')]: {
            width: '35%',
            fontSize: '14px',
            // marginLeft: 'auto',
            // marginRight: 'auto',
          }
    },
    setpoint:{
        // border: "1px solid red",
        width: '7%',
        fontSize: '15px',
        [theme.breakpoints.down('md')]: {
            width: '15%',
            fontSize: '14px',
            // marginLeft: 'auto',
            // marginRight: 'auto',
          }
    },
    period:{
        // border: "1px solid red",
        width: '35%',
        fontSize: '15px',
        [theme.breakpoints.down('md')]: {
            width: '42%',
            fontSize: '14px',
            // marginLeft: 'auto',
            // marginRight: 'auto',
          }
    },
    estimatedCosts:{
        // border: "1px solid red",
        width: '12%',
        fontSize: '15px',
        [theme.breakpoints.down('md')]: {
            width: '20%',
            fontSize: '14px',
            // marginLeft: 'auto',
            // marginRight: 'auto',
          }
    }
  }),
);

const Labels: React.FC = () => {
    const [weekdayScheduleToEdit, setWeekdayScheduleToEdit] = useState<any>(null); //define type

    const classes = useStyles();
    const dispatch = useDispatch()
    const {weekday} = useParams();
    const navigate = useNavigate();


  return (
    <Grid className={classes.mainContainer} container direction="row" alignItems="center" justifyContent="center" >
        <Grid  className={classes.profile}>Profile</Grid>
        {/* <Grid  className={classes.setpoint}>Setpoint</Grid> */}
        <Grid  className={classes.period}>Period</Grid>
        {/* <Grid  className={classes.estimatedCosts}>Estimated cost</Grid> */}
    </Grid> 
  );
};

export default Labels;

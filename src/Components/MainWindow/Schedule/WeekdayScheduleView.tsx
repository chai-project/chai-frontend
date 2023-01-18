import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import dayjs from 'dayjs' 
import useMediaQuery from '@mui/material/useMediaQuery';

//mui
import {makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid, Divider, IconButton } from '@mui/material/';
import MoreVertIcon from '@mui/icons-material/MoreVert';



// redux
import {useSelector, useDispatch} from 'react-redux'
import { Typography } from '@material-ui/core';
// import { initializeData } from './Redux-reducers/dataReducer';
import {setSelectedTimeslot} from '../../../Redux-reducers/heatingProfilesReduces'


//types
import timeslot from "../../../Types/types"
import { profileEnd } from 'console';

//components
import Timeslot from './Timeslot'
import TimeslotTimeLabel from './TimeslotTimeLabel';

// Styles 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container:{
        // border: "1px dashed lime",
        height: '100%',
        // width: '80%',
        // height: '75%',
        //    background: '#CFD8DC',
        //    borderRadius:'25px'
    },
    schedule:{
        // border: "1px solid lime",
        height: '75%',
        borderRadius: '25px',
        overflow: 'hidden',
        // height: '12%',
        // width: '100%',

    },
    timeslot:{
        // border: "1px solid lime",
        // borderRight: "1px solid #57CBCC",
        // width: '10px',
        height: '100%',
        "&:hover, &:focus": {
            // borderRight: "10px solid red",
            background : "#57CBCC",
            cursor: 'pointer'
            
        },
        "& .timeslotInfo": {
            display: "none"
          },
          "&:hover .timeslotInfo": {
            display: "flex"
          }
    },
    labels: {
        // border: "1px solid orange",
        // height: '40%',
        // background:'pink'
    },
    timeLabel:{
        fontSize: '9px',
        [theme.breakpoints.down('md')]: {
            fontSize: '8px', //780px
          },
          [theme.breakpoints.down('sm')]: {
            fontSize: '9px',
            // minHeight: '650px',
          }
    },
    temperatureLabel:{
        fontSize: '10px',
    },
    // timeslotInfo:{
    //     // display: 'none',
    //     border: "1px solid orange",
    //     position:'absolute',
    //     top:'-80%',
    //     // height: '50px'
    // },
    infoLabel:{
        fontSize: '13px',
        marginLeft: '10px',
        zIndex: 10,
    },
  }),
);

const WeekdayScheduleView: React.FC<{timeslots:any, indexOfaWeekday:number, weekday:String}>= ({timeslots, indexOfaWeekday, weekday}) => { // timeslots type timeslot[] | null

    const theme = useTheme();
    const breakpoint = useMediaQuery(theme.breakpoints.down("sm"));

    const getSizeOfTheTimeslot = (start:any, end:any) => {
        let startTime = dayjs().set('hour',start.split(':')[0]).set('minutes', start.split(':')[1]).set('seconds', 10)
        let endTime = dayjs().set('hour',end.split(':')[0]).set('minutes', end.split(':')[1] ).set('seconds', 0)
        const intervals: any[] =[]
        let size = 0
        while(startTime<endTime){
            intervals.push(startTime.format().split(/(?=[A-Z])/)[1].substr(1,5));
            size += 0.125
            startTime = startTime.add(15, 'minute');
        };
        return {intervals: intervals, sizeOfTheTimeslot: size}
    };

    const classes = useStyles();
    const dispatch = useDispatch()

    // const setThisProfileAsSElectedProfile = (timeslot:any) => {
    //     dispatch(setSelectedProfile({...timeslot, indexOfaWeekday: indexOfaWeekday, weekday:weekday}))
    // } ;

  return (
    <Grid container className={classes.container} direction="row" justifyContent="center" alignItems="center">
        <Grid item container xs={12} className={classes.schedule} direction="row" justifyContent="center" alignItems="center">
            {timeslots?.map((profile:any, index:number)=>{
                const sizeOfTheTimeslot = getSizeOfTheTimeslot(profile.profileStart, profile.profileEnd)
                // console.log(weekday,sizeOfTheTimeslot, profile)
                return ( // Timeslot
                    <Timeslot indexOfaWeekday={indexOfaWeekday} weekday={weekday} profile={profile} sizeOfTheTimeslot={sizeOfTheTimeslot}/>
                )
            })}
        </Grid>
        <Grid item container xs={12} className={classes.labels} direction="row" justifyContent="center" alignItems="center">
            {timeslots?.map((profile:any, index:number)=>{
                const sizeOfTheTimeslot = getSizeOfTheTimeslot(profile.profileStart, profile.profileEnd)
                return ( // Time Label
                    <Grid container xs={sizeOfTheTimeslot.sizeOfTheTimeslot}>
                        <Grid item xs={1}>
                            <Typography className={classes.timeLabel}>{breakpoint && sizeOfTheTimeslot.sizeOfTheTimeslot < 1.4 ? null : sizeOfTheTimeslot.sizeOfTheTimeslot < 0.6 ? null : profile.profileStart}</Typography>
                        </Grid>
                        <Grid item style={{ flexGrow: "1" }}></Grid>
                        <Grid item xs={0}>
                            <Typography className={classes.timeLabel}>{timeslots.length === index + 1 ?  profile.profileEnd : null}</Typography>
                        </Grid>
                    </Grid>
                )
                })}
        </Grid>
    </Grid>
  );
};

export default WeekdayScheduleView;

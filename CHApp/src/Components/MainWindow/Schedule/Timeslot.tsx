import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import dayjs from 'dayjs' 

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid, Divider, IconButton } from '@mui/material/';
import MoreVertIcon from '@mui/icons-material/MoreVert';



// redux
import {useSelector, useDispatch} from 'react-redux'
import { Typography } from '@material-ui/core';
// import { initializeData } from './Redux-reducers/dataReducer';
import {setSelectedProfile} from '../../../Redux-reducers/heatingProfilesReduces'


//types
import timeslot from "../../../Types/types"
import { profileEnd } from 'console';

//components

// Styles 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container:{
        // border: "2px dashed red",
        // width: '80%',
        height: '75%',
        //    background: '#CFD8DC',
        //    borderRadius:'25px'
    },
    schedule:{
        // border: "1px solid lime",
        height: '95%',
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
        height: '40%',
        // background:'pink'
    },
    timeLabel:{
        position:'static',
        fontSize: '9px',
        // bottom: '11px'
        
    },
    temperatureLabel:{
        position:'relative',
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

const Timeslot: React.FC<{indexOfaWeekday:any, weekday:any, profile:any, sizeOfTheTimeslot:any}>= ({indexOfaWeekday, weekday, profile, sizeOfTheTimeslot}) => { // timeslots type timeslot[] | null
    // const [sizeOfATimeslot, setSizeOfATimeslot] = useState<number>(0);
    // const [timeIntervals, setTimeIntervals] = useState<any|null>(null)

    useEffect(()=>{
        // let startTime = dayjs().set('hour',profile.profileStart.split(':')[0]).set('minutes', profile.profileStart.split(':')[1]).set('seconds', 10);
        // let endTime = dayjs().set('hour',profile.profileEnd.split(':')[0]).set('minutes', profile.profileEnd.split(':')[1] ).set('seconds',0);
        // const intervals: any[] =[]
        // let size = 0
        // while(startTime < endTime){
        //     console.log(startTime<endTime, startTime,endTime)
        //     intervals.push(startTime.format().split(/(?=[A-Z])/)[1].substr(1,5));
        //     size = size + 0.125
        //     startTime = startTime.add(15, 'minute');
        // };
        // setSizeOfATimeslot(size)
        // setTimeIntervals(intervals)
    },[])


    const classes = useStyles();
    const dispatch = useDispatch()


    const setThisProfileAsSElectedProfile = (timeslot:any) => {
        dispatch(setSelectedProfile({...timeslot, indexOfaWeekday: indexOfaWeekday, weekday:weekday}))
    };
    // console.log(weekday, sizeOfATimeslot, timeIntervals)
  return (
    <Grid item container xs={sizeOfTheTimeslot.sizeOfTheTimeslot} sx={{background:profile.color}} className={classes.timeslot} direction="row" justifyContent="center" alignItems="center" onClick={()=>{setThisProfileAsSElectedProfile(profile)}}> {/* , borderRight: timeslots.length === index + 1 ? null : "1px solid #57CBCC"  */}
        <Typography className={classes.temperatureLabel}>{sizeOfTheTimeslot.sizeOfTheTimeslot! < 0.75 ? null : profile.profileName}</Typography>
    </Grid>
);
};

export default Timeslot;

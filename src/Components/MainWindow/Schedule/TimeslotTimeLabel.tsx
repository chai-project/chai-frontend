import React, {useEffect, useState} from 'react';
import dayjs from 'dayjs' 


//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {Grid } from '@mui/material/';



// redux
import { Typography } from '@material-ui/core';

// Styles 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container:{
        height: '75%',
    },
    schedule:{
        height: '95%',
        borderRadius: '25px',
        overflow: 'hidden',
    },
    timeslot:{
        height: '100%',
        "&:hover, &:focus": {
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
        height: '40%',
    },
    timeLabel:{
        position:'absolute',
        fontSize: '9px',
        bottom: '11px',
    },
    temperatureLabel:{
        position:'relative',
        fontSize: '10px',
    },
    infoLabel:{
        fontSize: '13px',
        marginLeft: '10px',
        zIndex: 10,
    },
  }),
);

const TimeslotTimeLabel: React.FC<{indexOfaWeekday:any, weekday:any, profile:any, index:number, timeslots:any}>= ({indexOfaWeekday, weekday, profile, index, timeslots}) => { 
    const [sizeOfATimeslot, setSizeOfATimeslot] = useState<number>(0);
    // const [timeIntervals, setTimeIntervals] = useState<any|null>(null);


    useEffect(()=>{
        let startTime = dayjs().set('hour',profile.profileStart.split(':')[0]).set('minutes', profile.profileStart.split(':')[1]).set('seconds', 10);
        let endTime = dayjs().set('hour',profile.profileEnd.split(':')[0]).set('minutes', profile.profileEnd.split(':')[1] ).set('seconds',0);
        const intervals: any[] =[]
        let size = 0
        while(startTime < endTime){
            intervals.push(startTime.format().split(/(?=[A-Z])/)[1].substr(1,5));
            size = size + 0.125
            startTime = startTime.add(15, 'minute');
        };
        setSizeOfATimeslot(size)
        // setTimeIntervals(intervals)
    },[])


    const classes = useStyles();

  return (
    <Grid container xs={sizeOfATimeslot}>
        <Grid item xs={1}>
            <Typography className={classes.timeLabel}>{sizeOfATimeslot < 0.4 ? null : profile.profileStart}</Typography>
        </Grid>
        <Grid item style={{ flexGrow: "1" }}></Grid>
        <Grid item xs={0}>
            <Typography className={classes.timeLabel}>{timeslots.length === index + 1 ?  profile.profileEnd : null}</Typography>
        </Grid>
    </Grid>
);
};

export default TimeslotTimeLabel;

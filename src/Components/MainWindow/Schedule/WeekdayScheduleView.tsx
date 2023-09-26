import React from 'react';
import dayjs from 'dayjs' 
import useMediaQuery from '@mui/material/useMediaQuery';

//mui
import {makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import { Grid } from '@mui/material/';


// redux
import {useSelector, useDispatch} from 'react-redux'
import { Typography } from '@material-ui/core';



//components
import Timeslot from './Timeslot'

// Styles 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container:{
        height: '100%',
    },
    schedule:{
        height: '75%',
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

    },
    timeLabel:{
        fontSize: '9px',
        [theme.breakpoints.down('md')]: {
            fontSize: '8px',
          },
          [theme.breakpoints.down('sm')]: {
            fontSize: '9px',
          }
    },
    temperatureLabel:{
        fontSize: '10px',
    },
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

  return (
    <Grid container className={classes.container} direction="row" justifyContent="center" alignItems="center">
        <Grid item container xs={12} className={classes.schedule} direction="row" justifyContent="center" alignItems="center">
            {timeslots?.map((profile:any, index:number)=>{
                const sizeOfTheTimeslot = getSizeOfTheTimeslot(profile.profileStart, profile.profileEnd)
                return (
                    <Timeslot indexOfaWeekday={indexOfaWeekday} weekday={weekday} profile={profile} sizeOfTheTimeslot={sizeOfTheTimeslot}/>
                )
            })}
        </Grid>
        <Grid item container xs={12} className={classes.labels} direction="row" justifyContent="center" alignItems="center">
            {timeslots?.map((profile:any, index:number)=>{
                const sizeOfTheTimeslot = getSizeOfTheTimeslot(profile.profileStart, profile.profileEnd)
                return ( // Timeslot Label
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

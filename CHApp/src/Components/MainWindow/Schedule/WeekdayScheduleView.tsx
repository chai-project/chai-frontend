import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

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
        // border: "1px solid red",
        height: '95%',
        borderRadius: '25px',
        overflow: 'hidden',
        // height: '12%',
        // width: '100%',

    },
    timeslot:{
        // border: "1px solid lime",
        // borderRight: "1px solid #57CBCC",
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
        fontSize: '9px',
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
    // const [profile, setProfile] = useState('');

    // const profilesForAweekDay= [
    //     {
    //         profileName: "Morning",
    //         profileStart:'00:00',
    //         profileEnd: '08:15',
    //         temperature: '19'
    //     },
    //     {
    //         profileName: "Empty",
    //         profileStart:'08:15',
    //         profileEnd: '12:30',
    //         temperature: '0'
    //     },
    //     {
    //         profileName: "Afternoon",
    //         profileStart:'12:30',
    //         profileEnd: '14:00',
    //         temperature: '21'
    //     },
    //     {
    //         profileName: "Empty",
    //         profileStart:'14:00',
    //         profileEnd: '17:30',
    //         temperature: '0'
    //     },
    //     {
    //         profileName: "Evening",
    //         profileStart:'17:30',
    //         profileEnd: '20:00',
    //         temperature: '24'
    //     },
    //     {
    //         profileName: "Night",
    //         profileStart:'20:00',
    //         profileEnd: '24:00',
    //         temperature: '17'
    //     },
        
    // ]

    const classes = useStyles();
    const dispatch = useDispatch()

//   const getData = () => {
//     dispatch(initializeData())
//   }

const setThisProfileAsSElectedProfile = (timeslot:any) => {
    dispatch(setSelectedProfile({...timeslot, indexOfaWeekday: indexOfaWeekday, weekday:weekday}))
} ;

  return (
    <Grid container className={classes.container} direction="row" justifyContent="center" alignItems="center">
        {/* {timeslots.map((slot:any)=>{
            return (
                <p>{slot.profileName}</p>
            )
        })} */}
        <Grid item container xs={12} className={classes.schedule} direction="row" justifyContent="center" alignItems="center">
            {timeslots?.map((profile:any, index:number)=>{

                const parseIn = function(date_time:any){
                    var d = new Date();
                d.setHours(date_time.substring(0,2));
                    d.setMinutes(date_time.substring(3,5));

                return d;
                }

                const startTime = parseIn(profile.profileStart);
                const endTime = parseIn(profile.profileEnd);

                //list of intervals
                const getTimeIntervals = function (time1:any, time2:any) {
                    var arr = [];
                while(time1 < time2){
                    arr.push(time1.toTimeString().substring(0,5));
                    time1.setMinutes(time1.getMinutes() + 15);
                }
                return arr;
                }
                const intervals = getTimeIntervals(startTime, endTime);

                const sizeOfATimeslot = intervals.length * 0.125
                // console.log('intervals',intervals)

                //pasikeicia laikai wTF??:D:DD::DD
                const colorOfATimeslot = parseInt(profile.temperature) < 17 ? '#57A6F0' : parseInt(profile.temperature) < 22 ? '#F6946B' : parseInt(profile.temperature) < 27 ? '#FE6262' : null 
                return (
                    <Grid item container xs={sizeOfATimeslot} sx={{background:profile.color}} className={classes.timeslot} direction="row" justifyContent="center" alignItems="center" onClick={()=>{setThisProfileAsSElectedProfile(profile)}}> {/* , borderRight: timeslots.length === index + 1 ? null : "1px solid #57CBCC"  */}
                        <Typography className={classes.temperatureLabel}>{sizeOfATimeslot < 0.75 ? null : profile.profileName}</Typography>
                        {/* <div className="timeslotInfo" style={{position:'absolute', top:"75%", background: "#57CBCC", width:'180px', height:"85px", borderRadius:'5%', borderTopRightRadius: '5%',zIndex: 10}}>
                            <Grid container  direction="column" justifyContent="center" alignItems="flex-start">
                                <Grid item>
                                    <Typography className={classes.infoLabel} >Profile: <b>{profile.profileName}</b></Typography>
                                </Grid>
                                <Grid item>
                                    <Typography className={classes.infoLabel}>Start: <b>{profile.profileStart}</b></Typography>
                                </Grid>
                                <Grid item>
                                    <Typography className={classes.infoLabel}>End: <b>{profile.profileEnd}</b></Typography>
                                </Grid>
                                <Grid item>
                                    <Typography className={classes.infoLabel}>Average temperature: <b>{profile.temperature}°C</b></Typography>
                                </Grid>
                            </Grid>
                        </div> */}
                    </Grid>
                )
            })}
        </Grid>
        <Grid item container xs={12} className={classes.labels} direction="row" justifyContent="center" alignItems="center">
        {timeslots?.map((profile:any, index:number)=>{

            const parseIn = function(date_time:any){
                var d = new Date();
            d.setHours(date_time.substring(0,2));
                d.setMinutes(date_time.substring(3,5));

            return d;
            }

            const startTime = parseIn(profile.profileStart);
            const endTime = parseIn(profile.profileEnd);

            //list of intervals
            const getTimeIntervals = function (time1:any, time2:any) {
                var arr = [];
            while(time1 < time2){
                arr.push(time1.toTimeString().substring(0,5));
                time1.setMinutes(time1.getMinutes() + 15);
            }
            return arr;
            }
            const intervals = getTimeIntervals(startTime, endTime);
            // console.log(intervals, profile.profileName)

            // console.log(parseIn(profile.profileStart), profile.profileName)


            const sizeOfATimeslot = intervals.length * 0.125
            // console.log(timeslots.length === index)
            return (
                // <Grid item container className={classes.test} xs={sizeOfATimeslot} direction="row" justifyContent="flex-start" alignItems="center">
                //     <Typography className={classes.timeLabel}>{sizeOfATimeslot < 0.4 ? null : profile.profileStart}</Typography>
                // </Grid>
                <Grid container xs={sizeOfATimeslot}>
                    <Grid item xs={1}>
                        <Typography className={classes.timeLabel}>{sizeOfATimeslot < 0.4 ? null : profile.profileStart}</Typography>
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

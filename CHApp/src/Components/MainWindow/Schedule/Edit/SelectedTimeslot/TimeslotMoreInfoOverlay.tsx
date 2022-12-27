import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import dayjs from 'dayjs' 


//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid, Divider, IconButton } from '@mui/material/';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';



// redux
import {useSelector, useDispatch} from 'react-redux'
import { Typography } from '@material-ui/core';
// import { initializeData } from './Redux-reducers/dataReducer';
import {setSelectedTimeslot, setEnergyPriceForSelectedProfile} from '../../../../../Redux-reducers/heatingProfilesReduces'
import { setErrorMessage, setNotification } from '../../../../../Redux-reducers/notificationsReducer';



//types
import timeslot from "../../../../../Types/types"

//components
import ChartForSelectedTimeslot from './ChartForSelectedTimeslot';
import ProgressCircular from '../../../../ProgressBar/ProgressCircular';
// Styles 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container:{
        // border: "2px dashed red",
        // width: '80%',
        position:'absolute',
        top:'4px',
        height: '100%',
        width: '100%',
        zIndex: 10,
        borderRadius: 5,
          //  background: '#CFD8DC',
          // background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(50px)',
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
        fontSize: '14px',
    },
    infoLabel:{
        fontSize: '13px',
        marginLeft: '10px',
        zIndex: 10,
    },
    closePageButton:{
      position:'absolute',
    },
  }),
);

const TimeslotMoreInfoOverlay: React.FC<{heatingProfiles:any}> = ({heatingProfiles}) => { // timeslots type timeslot[] | null

    const classes = useStyles();
    const dispatch = useDispatch()
    const profilePeriodStart = heatingProfiles.selectedTimeslot.indexOfaWeekday === 0 ? dayjs().set('hour', heatingProfiles.selectedTimeslot.profileStart.split(':')[0]).set('minutes', heatingProfiles.selectedTimeslot.profileStart.split(':')[1]).set('seconds', 0) : dayjs().add(heatingProfiles.selectedTimeslot.indexOfaWeekday,'days').set('hour', heatingProfiles.selectedTimeslot.profileStart.split(':')[0]).set('minutes', heatingProfiles.selectedTimeslot.profileStart.split(':')[1]).set('seconds', 0)
    const profilePeriodEnd = heatingProfiles.selectedTimeslot.indexOfaWeekday === 0 ? dayjs().set('hour', heatingProfiles.selectedTimeslot.profileEnd.split(':')[0]).set('minutes', heatingProfiles.selectedTimeslot.profileEnd.split(':')[1]).set('seconds', 0) : dayjs().add(heatingProfiles.selectedTimeslot.indexOfaWeekday,'days').set('hour', heatingProfiles.selectedTimeslot.profileEnd.split(':')[0]).set('minutes', heatingProfiles.selectedTimeslot.profileEnd.split(':')[1]).set('seconds', 0)

    // const blbblbl = () => {
    //   const profilePeriodStart = dayjs().set('hour', 0).set('minutes',15).set('seconds', 0);
    //   const profilePeriodEnd = dayjs().set('hour', 0).set('minutes',45).set('seconds', 0);
    //   dispatch(setEnergyPriceForSelectedProfile(profilePeriodStart, profilePeriodEnd)) 
    // }
    
    useEffect(()=>{
      // const profilePeriodStart = heatingProfiles.selectedProfile.indexOfaWeekday === 0 ? dayjs().set('hour', heatingProfiles.selectedProfile.profileStart.split(':')[0]).set('minutes', heatingProfiles.selectedProfile.profileStart.split(':')[1]).set('seconds', 0) : dayjs().add(heatingProfiles.selectedProfile.indexOfaWeekday,'days').set('hour', heatingProfiles.selectedProfile.profileStart.split(':')[0]).set('minutes', heatingProfiles.selectedProfile.profileStart.split(':')[1]).set('seconds', 0)
      // const profilePeriodEnd = heatingProfiles.selectedProfile.indexOfaWeekday === 0 ? dayjs().set('hour', heatingProfiles.selectedProfile.profileEnd.split(':')[0]).set('minutes', heatingProfiles.selectedProfile.profileEnd.split(':')[1]).set('seconds', 0) : dayjs().add(heatingProfiles.selectedProfile.indexOfaWeekday,'days').set('hour', heatingProfiles.selectedProfile.profileEnd.split(':')[0]).set('minutes', heatingProfiles.selectedProfile.profileEnd.split(':')[1]).set('seconds', 0)
      dispatch(setEnergyPriceForSelectedProfile(profilePeriodStart, profilePeriodEnd)) 

    },[heatingProfiles.selectedTimeslot])
    // console.log(heatingProfiles.energyPriceForSelectedProfile)


    useEffect(()=>{
      // const profilePeriodStart = heatingProfiles.selectedProfile.indexOfaWeekday === 0 ? dayjs().set('hour', heatingProfiles.selectedProfile.profileStart.split(':')[0]).set('minutes', heatingProfiles.selectedProfile.profileStart.split(':')[1]).set('seconds', 0) : dayjs().add(heatingProfiles.selectedProfile.indexOfaWeekday,'days').set('hour', heatingProfiles.selectedProfile.profileStart.split(':')[0]).set('minutes', heatingProfiles.selectedProfile.profileStart.split(':')[1]).set('seconds', 0)
      // const profilePeriodEnd = heatingProfiles.selectedProfile.indexOfaWeekday === 0 ? dayjs().set('hour', heatingProfiles.selectedProfile.profileEnd.split(':')[0]).set('minutes', heatingProfiles.selectedProfile.profileEnd.split(':')[1]).set('seconds', 0) : dayjs().add(heatingProfiles.selectedProfile.indexOfaWeekday,'days').set('hour', heatingProfiles.selectedProfile.profileEnd.split(':')[0]).set('minutes', heatingProfiles.selectedProfile.profileEnd.split(':')[1]).set('seconds', 0)

      if(heatingProfiles.error){
        dispatch(setErrorMessage(heatingProfiles.error, 5000))
      }

    },[heatingProfiles.error])


    const closeOverlay = () => {
      dispatch(setSelectedTimeslot(null))
    }


  return (
    <Grid container className={classes.container} direction="column" justifyContent="center" alignItems="center">
      <CssBaseline/>
          <Grid xs={1} item container direction="row" alignItems="center" justifyContent="flex-end">
            <Grid item xs={0.5}></Grid>
            <Grid item xs={11} container direction="row" alignItems="center" justifyContent="flex-start"><b>{heatingProfiles.selectedTimeslot.profileName}</b></Grid>
            <Grid item xs={0.5}>
              <IconButton className={classes.closePageButton} size='medium' edge='start' color='primary' onClick={closeOverlay}>
                <HighlightOffIcon/>
              </IconButton>
            </Grid>
          </Grid>
          <Grid xs={1} item container direction="row" alignItems="center" justifyContent="flex-end">
            <Grid item xs={0.5}></Grid>
            <Grid item xs={11} container direction="row" alignItems="center" justifyContent="flex-start">
              <Typography>From <b>{profilePeriodStart.format().split(/(?=[A-Z])/)[1].substr(1,5)} {heatingProfiles.selectedTimeslot.weekday} {profilePeriodStart.format().split(/(?=[A-Z])/)[0]}</b> to <b>{profilePeriodEnd.format().split(/(?=[A-Z])/)[1].substr(1,5)} {heatingProfiles.selectedTimeslot.weekday} {profilePeriodEnd.format().split(/(?=[A-Z])/)[0]}</b></Typography>
            </Grid>
            <Grid item xs={0.5}></Grid>
          </Grid>
        <Grid xs={10}item container direction="column" alignItems="center" justifyContent="center"> 
          <Grid item xs={8} container direction="column" alignItems="center" justifyContent="center">
            {heatingProfiles.error ? <h1>No data</h1>: 
              <ChartForSelectedTimeslot selectedTimeslot={heatingProfiles.selectedTimeslot} heatingProfiles={heatingProfiles} pricesList={heatingProfiles.energyPriceForSelectedTimeslot}/>
            }
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
    </Grid>
  );
};

export default TimeslotMoreInfoOverlay;

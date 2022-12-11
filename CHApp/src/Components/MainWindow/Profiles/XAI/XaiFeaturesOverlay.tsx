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
// import {setSelectedProfile, setEnergyPriceForSelectedProfile} from '../../../../../Redux-reducers/heatingProfilesReduces'
import {setSelectedProfile} from '../../../../Redux-reducers/xaiFeaturesReducer'



//types
// import timeslot from "../../../../../Types/types"

//components
// import ChartForSelectedTimeslot from './ChartForSelectedTimeslot';
import XAICharts from './XAICharts'

// Styles 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container:{
        // border: "2px dashed red",
        // width: '80%',
        position:'absolute',
        // top:'4px',
        // left: "-0.01px",
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
    closeButton:{
        // border: "1px solid orange",

      // position:'absolute',
    },
    chartsComponent:{
      // border: "1px solid pink",

    },
    charts:{
      // border: "1px solid red",

    }
  }),
);

const XaiFeaturesOverlay: React.FC<{xaiFeaturesState:any, homeLabel:any}> = ({xaiFeaturesState, homeLabel}) => { // timeslots type timeslot[] | null

    const classes = useStyles();
    const dispatch = useDispatch()

    // const blbblbl = () => {
    //   const profilePeriodStart = dayjs().set('hour', 0).set('minutes',15).set('seconds', 0);
    //   const profilePeriodEnd = dayjs().set('hour', 0).set('minutes',45).set('seconds', 0);
    //   dispatch(setEnergyPriceForSelectedProfile(profilePeriodStart, profilePeriodEnd)) 
    // }
    // console.log(xaiFeaturesState.selectedProfile.profileName)
    useEffect(()=>{
      // const profilePeriodStart = heatingProfiles.selectedProfile.indexOfaWeekday === 0 ? dayjs().set('hour', heatingProfiles.selectedProfile.profileStart.split(':')[0]).set('minutes', heatingProfiles.selectedProfile.profileStart.split(':')[1]).set('seconds', 0) : dayjs().add(heatingProfiles.selectedProfile.indexOfaWeekday,'days').set('hour', heatingProfiles.selectedProfile.profileStart.split(':')[0]).set('minutes', heatingProfiles.selectedProfile.profileStart.split(':')[1]).set('seconds', 0)
      // const profilePeriodEnd = heatingProfiles.selectedProfile.indexOfaWeekday === 0 ? dayjs().set('hour', heatingProfiles.selectedProfile.profileEnd.split(':')[0]).set('minutes', heatingProfiles.selectedProfile.profileEnd.split(':')[1]).set('seconds', 0) : dayjs().add(heatingProfiles.selectedProfile.indexOfaWeekday,'days').set('hour', heatingProfiles.selectedProfile.profileEnd.split(':')[0]).set('minutes', heatingProfiles.selectedProfile.profileEnd.split(':')[1]).set('seconds', 0)
      // dispatch(setEnergyPriceForSelectedProfile(profilePeriodStart, profilePeriodEnd)) 

    },[])
    // console.log(heatingProfiles.energyPriceForSelectedProfile)


    const closeOverlay = () => {
      // dispatch(setSelectedProfile(null))
      dispatch(setSelectedProfile(null))
    }


  return (
    <Grid container className={classes.container} direction="column" justifyContent="center" alignItems="center">
      <CssBaseline/>
          <Grid xs={1} item container direction="row" alignItems="center" justifyContent="flex-end" className={classes.closeButton}>
            <Grid item xs={0.5}></Grid>
            <Grid item xs={10.5} container direction="row" alignItems="center" justifyContent="flex-start"><b>{xaiFeaturesState.selectedProfile.profileName}</b></Grid>
            <Grid item xs={1} container direction="row" alignItems="center" justifyContent="center">
              <IconButton size='medium' edge='start' color='primary' onClick={closeOverlay}>
                <HighlightOffIcon/>
              </IconButton>
            </Grid>
          </Grid>
          <XAICharts xaiFeaturesState={xaiFeaturesState} homeLabel={homeLabel} />
          <Grid xs={0.5} className={classes.closeButton}/>
    </Grid>
  );
};

export default XaiFeaturesOverlay;
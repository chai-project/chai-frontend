import React, {useEffect} from 'react';
import dayjs from 'dayjs' 
//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { CssBaseline, Grid, IconButton } from '@mui/material/';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

// redux
import {useSelector, useDispatch} from 'react-redux'
import { Typography } from '@material-ui/core';
import {setSelectedTimeslot, setEnergyPriceForSelectedProfile} from '../../../../../Redux-reducers/heatingProfilesReduces'
import { setErrorMessage } from '../../../../../Redux-reducers/notificationsReducer';

//components
import ChartForSelectedTimeslot from './ChartForSelectedTimeslot';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container:{
        position:'absolute',
        height: '100%',
        width: '100%',
        zIndex: 2,
        borderRadius: 5,
          backdropFilter: 'blur(50px)',
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

    },
    timeslotInfo:{

    },
    chart:{

    }
  }),
);

const TimeslotMoreInfoOverlay: React.FC<{heatingProfiles:any}> = ({heatingProfiles}) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const profilePeriodStart = heatingProfiles.selectedTimeslot.indexOfaWeekday === 0 ? dayjs().set('hour', heatingProfiles.selectedTimeslot.profileStart.split(':')[0]).set('minutes', heatingProfiles.selectedTimeslot.profileStart.split(':')[1]).set('seconds', 0) : dayjs().add(heatingProfiles.selectedTimeslot.indexOfaWeekday,'days').set('hour', heatingProfiles.selectedTimeslot.profileStart.split(':')[0]).set('minutes', heatingProfiles.selectedTimeslot.profileStart.split(':')[1]).set('seconds', 0)
    const profilePeriodEnd = heatingProfiles.selectedTimeslot.indexOfaWeekday === 0 ? dayjs().set('hour', heatingProfiles.selectedTimeslot.profileEnd.split(':')[0]).set('minutes', heatingProfiles.selectedTimeslot.profileEnd.split(':')[1]).set('seconds', 0) : dayjs().add(heatingProfiles.selectedTimeslot.indexOfaWeekday,'days').set('hour', heatingProfiles.selectedTimeslot.profileEnd.split(':')[0]).set('minutes', heatingProfiles.selectedTimeslot.profileEnd.split(':')[1]).set('seconds', 0)

    
    useEffect(()=>{
      dispatch(setEnergyPriceForSelectedProfile(profilePeriodStart, profilePeriodEnd)) 

    },[heatingProfiles.selectedTimeslot])

    useEffect(()=>{

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
      <Grid xs={1} item container  direction="row" alignItems="center" justifyContent="flex-end" className={classes.timeslotInfo}>
        <Grid item xs={0.5}></Grid>
        <Grid item xs={11} container direction="row" alignItems="center" justifyContent="flex-start"><b>{heatingProfiles.selectedTimeslot.profileName}</b></Grid>
        <Grid item xs={0.5}>
              <IconButton className={classes.closePageButton} size='small' edge='start' color='primary' onClick={closeOverlay}>
                <HighlightOffIcon/>
              </IconButton>
        </Grid>
      </Grid>
      <Grid xs={1} item container  direction="row" alignItems="center" justifyContent="flex-end" className={classes.timeslotInfo}>
        <Grid item xs={0.5}></Grid>
        <Grid item xs={11} container direction="row" alignItems="center" justifyContent="flex-start" >
          <Typography>From <b>{profilePeriodStart.format().split(/(?=[A-Z])/)[1].substr(1,5)} {heatingProfiles.selectedTimeslot.weekday} {profilePeriodStart.format().split(/(?=[A-Z])/)[0]}</b> to <b>{profilePeriodEnd.format().split(/(?=[A-Z])/)[1].substr(1,5)} {heatingProfiles.selectedTimeslot.weekday} {profilePeriodEnd.format().split(/(?=[A-Z])/)[0]}</b></Typography>
        </Grid>
        <Grid item xs={0.5}></Grid> 
      </Grid>
      <Grid xs={10} item container  direction="row" alignItems="center" justifyContent="center">
        {heatingProfiles.error ? <h1>No data</h1>: <ChartForSelectedTimeslot selectedTimeslot={heatingProfiles.selectedTimeslot} heatingProfiles={heatingProfiles} pricesList={heatingProfiles.energyPriceForSelectedTimeslot}/>}
      </Grid>
    </Grid>
  );
};

export default TimeslotMoreInfoOverlay;

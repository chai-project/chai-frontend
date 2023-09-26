import React from 'react';
import dayjs from 'dayjs' 
import { createBrowserHistory } from 'history';

//services
import services from '../../../Services/services';

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Grid } from '@mui/material/';



// redux
import {useSelector, useDispatch} from 'react-redux'
import { Typography } from '@material-ui/core';
import {setSelectedTimeslot} from '../../../Redux-reducers/heatingProfilesReduces'

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
        position:'static',
        fontSize: '9px',
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

const Timeslot: React.FC<{indexOfaWeekday:any, weekday:any, profile:any, sizeOfTheTimeslot:any}>= ({indexOfaWeekday, weekday, profile, sizeOfTheTimeslot}) => {


    const classes = useStyles();
    const dispatch = useDispatch();

    const url = createBrowserHistory()
    const parameters = new URLSearchParams(url.location.search);
    const homeLabel =  parameters.get('home');


    const setThisProfileAsSelectedTimeslot = (timeslot:any) => {
        if(homeLabel){
            const now = dayjs()
            services.addLogEntry(homeLabel, now.toISOString(), 'OVERLAY_VIEW', ['Timeslot']);
            dispatch(setSelectedTimeslot({...timeslot, indexOfaWeekday: indexOfaWeekday, weekday:weekday}));

        }
    };
    
  return (
    <Grid item container xs={sizeOfTheTimeslot.sizeOfTheTimeslot} sx={{background:profile.color}} className={classes.timeslot} direction="row" justifyContent="center" alignItems="center" onClick={()=>{setThisProfileAsSelectedTimeslot(profile)}}> {/* , borderRight: timeslots.length === index + 1 ? null : "1px solid #57CBCC"  */}
        <Typography className={classes.temperatureLabel}>{sizeOfTheTimeslot.sizeOfTheTimeslot! < 1.2 ? null : profile.profileName}</Typography>
    </Grid>
);
};

export default Timeslot;

import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import dayjs from 'dayjs';


//services
import services from '../../../Services/services';

//mui
import {makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid, Typography, Link } from '@mui/material/';



// redux
import {useSelector, useDispatch} from 'react-redux'
// import { initializeData } from './Redux-reducers/dataReducer';
import {setSelectedProfile} from '../../../Redux-reducers/xaiFeaturesReducer'


//types


//components
import SelectProfileButton from './SelectProfileButton';
import Chart from './Chart';
import PriceSensivityGauge from './PriceSensivityGauge';
import TimeslotMoreInfoOverlay from '../Schedule/Edit/SelectedTimeslot/TimeslotMoreInfoOverlay';
import XaiFeaturesOverlay from './XAI/XaiFeaturesOverlay';
import ProgressCircular from '../../ProgressBar/ProgressCircular';
// Styles 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      //  boxSizing: 'border-box',
       position: 'relative', //sitas!!!
       width: '100%',
       height: '100%',
      //  background: '#CFD8DC',
      //  left: '4%',
      //  top: '10%',
    },
    container:{
        // border: "2px dashed lime",
        height: '100%',
        width: '100%',
        // position: 'relative'
    },
    info:{
        height: '100%',
        width: '100%',
        // border: "2px dashed pink",
    },
    moreInfo:{
      // border: "1px dashed orange",
      height: '100%',
      width: '100%',

    },
    gaugeChart:{
      // border: "1px dashed lime",
      height: '100%',
      // width: '90%',

    },
    profileChartContainer:{
        height: '100%',
        width: '100%',
        // border: "2px dashed red",
        // position: 'relative',
        // top: '1px',
        // width: '90%'
    },
    profileChart:{
      height: '95%',
      width: '100%',
      // border: "2px dashed red",
      // position: 'relative',
      // top: '1px',
      // width: '90%'
  },
    gauge:{
      // border: "2px dashed red",
    },
    moreInfoButton:{
      // border: "2px dashed pink",
      cursor: 'pointer',

    }
  }),
);

const Profile: React.FC<{profile:any, homeLabel:any}> = ({profile, homeLabel}) => {//define type
    // const [profile, setProfile] = useState('');

    const classes = useStyles();
    const dispatch = useDispatch();
    const theme = useTheme();
    const breakpoint = useMediaQuery(theme.breakpoints.down("sm"));
    const breakpointMd = useMediaQuery(theme.breakpoints.down("md"));

    // const url = createBrowserHistory()
    // const parameters = new URLSearchParams(url.location.search);
    // const homeLabel =  parameters.get('home');
    // const hmm:any = 0 <= profile.slope && profile.slope  <= (profile.bias -7)/35
    // const krc = (5 / 6) + (0.5 / 6)
    // console.log('profile: ', profile)

//   const getData = () => {
//     dispatch(initializeData())
//   }

    const openXAIOverlay = () => {
      if(homeLabel){
        const now = dayjs()
        services.addLogEntry(homeLabel, now.toISOString(), 'OVERLAY_VIEW', ['XAI']);
        dispatch(setSelectedProfile(profile))
      }
      // services.addLogEntry(homeLabel, now.toISOString(), 'Timeslot', ['Scedule']) 
      // dispatch(setSelectedProfile(profile))
    };

  return (
    <Grid xs={12} container className={classes.container} direction={breakpoint ? 'column' : breakpointMd ? "row" : 'column'} justifyContent="center" alignItems="center">
      <Grid xs={breakpoint ? 4 : breakpointMd ? 6 : 5} className={classes.info} item container direction={breakpoint ? 'row' : breakpointMd ? 'column' : "row"} justifyContent="center" alignItems="center">
        <Grid xs={breakpoint ? 8 : breakpointMd ? 5 : 6} item container className={classes.moreInfo} direction="column" justifyContent="center" alignItems="flex-start" padding={2}>
          <Grid item>
            <Typography>Preferred temperature (if energy were free): {<b>{Math.round(profile.bias * 100)/100}°C</b>}</Typography>
          </Grid>
          <Grid item>
            <Link onClick={openXAIOverlay}><b>Want to know more about this profile?</b></Link>
          </Grid>
        </Grid>
        <Grid xs={breakpoint ? 4 : breakpointMd ? 7 : 6} item container className={classes.gaugeChart} direction="column" justifyContent="center" alignItems="center">
          <Grid item container={breakpoint ? true : false}>
            <PriceSensivityGauge profile={profile}/>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container xs={breakpoint ? 8 : breakpointMd ? 6 : 7} className={classes.profileChartContainer} direction="column" justifyContent="center" alignItems="center">
        <Grid item  className={classes.profileChart}>
          {!profile ? <ProgressCircular size={40}/> : <Chart profile={profile}/> }
        </Grid >
      </Grid>
    </Grid>
  );
};

export default Profile;


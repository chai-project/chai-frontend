import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import dayjs from 'dayjs';


//services
import services from '../../../Services/services';

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
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
        height: '25%',
        // border: "2px dashed pink",
    },
    chart:{
        height: '75%',
        // border: "2px dashed red",
        // position: 'relative',
        // top: '1px',
        width: '90%'
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
    const dispatch = useDispatch()
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
        services.addLogEntry(homeLabel, now.toISOString(), 'XAI', ['Profiles']);
        dispatch(setSelectedProfile(profile))
      }
      // services.addLogEntry(homeLabel, now.toISOString(), 'Timeslot', ['Scedule']) 
      // dispatch(setSelectedProfile(profile))
    };

  return (
    <div className={classes.main}>
        <Grid container className={classes.container} direction="column" justifyContent="center" alignItems="center">
            <Grid xs={1}item container className={classes.info} direction="row" justifyContent="flex-start" alignItems="center">
                <Grid item xs={1}></Grid>
                <Grid item container xs={11} direction="row" justifyContent="center" alignItems="center">
                    <Grid xs={7} item container direction="column" justifyContent="center" alignItems="flex-start" rowSpacing={2}>
                        <Grid item xs={3}>
                          <Typography>Preferred temperature (if energy were free): {<b>{Math.round(profile.bias * 100)/100}°C</b>}</Typography>
                        </Grid>
                        <Grid item xs={3} className={classes.moreInfoButton} onClick={openXAIOverlay}>
                          <Link><b>Want to know more about this profile?</b></Link>
                        </Grid>
                        {/* <Typography>Preferred temperature (if energy were free): {<b>{Math.round(profile.bias * 100)/100}°C</b>}</Typography> */}
                        {/* <Typography><b>What to know more about this proifle?</b></Typography> */}

                    </Grid>
                    <Grid className={classes.gauge} xs={5}item>
                        <PriceSensivityGauge profile={profile}/>
                    </Grid>
                    {/* <Grid xs={6} item>
                        <Typography>Preferred temperature (if energy were free): {<b>{profile.bias}°C</b>}</Typography>
                    </Grid> */}
                </Grid>
            </Grid>
            <Grid xs={8} item container className={classes.chart}  direction="column" justifyContent="center" alignItems="center">
              <Chart profile={profile}/>
            </Grid>
        </Grid>
    </div>
  );
};

export default Profile;

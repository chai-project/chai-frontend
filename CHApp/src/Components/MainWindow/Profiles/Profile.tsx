import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid, Typography } from '@mui/material/';



// redux
import {useSelector, useDispatch} from 'react-redux'
// import { initializeData } from './Redux-reducers/dataReducer';


//types


//components
import SelectProfileButton from './SelectProfileButton';
import Chart from './Chart';
import PriceSensivityGauge from './PriceSensivityGauge';
import TimeslotMoreInfoOverlay from '../Schedule/Edit/SelectedTimeslot/TimeslotMoreInfoOverlay';
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
        width: '90%'
    },
    gauge:{
      // border: "2px dashed red",
    }
  }),
);

const Profile: React.FC<{profile:any}> = ({profile}) => {//define type
    // const [profile, setProfile] = useState('');

    const classes = useStyles();
    const dispatch = useDispatch()
    // const hmm:any = 0 <= profile.slope && profile.slope  <= (profile.bias -7)/35
    // const krc = (5 / 6) + (0.5 / 6)
    console.log('profile: ', profile)

//   const getData = () => {
//     dispatch(initializeData())
//   }

  return (
    <div className={classes.main}>
        <Grid container className={classes.container} direction="column" justifyContent="center" alignItems="center">
            <Grid item container className={classes.info} direction="row" justifyContent="flex-start" alignItems="center">
                <Grid item xs={1}></Grid>
                <Grid item container xs={11} direction="column" justifyContent="center" alignItems="center">
                    <Grid className={classes.gauge} xs={6}item>
                        <PriceSensivityGauge profile={profile}/>
                    </Grid>
                    <Grid xs={6} item>
                        <Typography>Preferred temperature (if energy were free): {<b>{profile.bias}°C</b>}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container className={classes.chart}  direction="column" justifyContent="center" alignItems="center">
              <Chart profile={profile}/>
            </Grid>
        </Grid>
    </div>
  );
};

export default Profile;

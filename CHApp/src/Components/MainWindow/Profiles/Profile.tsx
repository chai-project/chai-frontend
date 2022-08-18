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
        height: '20%',
        // border: "2px dashed pink",
    },
    chart:{
        height: '80%',
        // border: "2px dashed red",
        width: '95%'
    }
  }),
);

const Profile: React.FC = () => {
    // const [profile, setProfile] = useState('');

    const classes = useStyles();
    const dispatch = useDispatch()

//   const getData = () => {
//     dispatch(initializeData())
//   }

  return (
    <div className={classes.main}>
        <Grid container className={classes.container} direction="column" justifyContent="center" alignItems="center">
            <Grid item container className={classes.info} direction="row" justifyContent="flex-start" alignItems="center">
                <Grid item xs={1}></Grid>
                <Grid item container xs={11} direction="column" justifyContent="center" alignItems="flex-start">
                    <Grid item>
                        <Typography>Preferred temperature (At 0p / kWh): {<b>22.4 °C</b>}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography>Price sensitivity: {<b>0.04</b>}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item className={classes.chart}>
              <Chart/>
            </Grid>
        </Grid>
    </div>
  );
};

export default Profile;

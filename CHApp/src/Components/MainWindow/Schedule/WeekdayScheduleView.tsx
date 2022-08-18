import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid, Divider, IconButton } from '@mui/material/';
import MoreVertIcon from '@mui/icons-material/MoreVert';



// redux
import {useSelector, useDispatch} from 'react-redux'
// import { initializeData } from './Redux-reducers/dataReducer';


//types


//components

// Styles 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container:{
        // border: "2px dashed red",
        // width: '80%',
        height: '100%',
           background: '#CFD8DC',
        //    borderRadius:'25px'
    },
    schedule:{
        border: "1px solid lime",
        height: '80%'
        // height: '12%',
        // width: '100%',

    },
    moreButton:{
        border: "1px solid pink",
        height: '80%'
    },
  }),
);

const WeekdayScheduleView: React.FC= () => {
    const [profile, setProfile] = useState('');

    const classes = useStyles();
    const dispatch = useDispatch()

//   const getData = () => {
//     dispatch(initializeData())
//   }

  return (
    <Grid container className={classes.container} direction="row" justifyContent="center" alignItems="center">
        <Grid item xs={6} className={classes.schedule}>schedule</Grid>
        <Grid item xs={6} className={classes.schedule}>schedule</Grid>
    </Grid>
  );
};

export default WeekdayScheduleView;

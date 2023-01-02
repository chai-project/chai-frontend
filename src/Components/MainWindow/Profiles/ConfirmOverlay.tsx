import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import dayjs from 'dayjs' 


//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid, Divider, IconButton, Typography } from '@mui/material/';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';



// redux
import {useSelector, useDispatch} from 'react-redux'




//types

//components
import ProgressCircular from '../../ProgressBar/ProgressCircular';
import { profile } from 'console';

// Styles 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container:{
        flex: 1,
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
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(50px)',
        //    borderRadius:'25px'
    },
    message:{
        border: "2px dashed red",

    },
    markedText: {
      // color: '#5ACBCC'
    }
  }),
);


const ConfirmOverlay: React.FC<{profileToReset:String, setProfileToReset:any, resetProfileOrAllProfiles:any, loadingRequestToTheServer:boolean}> = ({profileToReset, setProfileToReset, resetProfileOrAllProfiles, loadingRequestToTheServer}) => {
    const classes = useStyles();
    const dispatch = useDispatch()

  return (
    <Grid container className={classes.container} direction="column" justifyContent="center" alignItems="center">
      <CssBaseline/>
      <Grid item xs={2} container direction='row'justifyContent="center" alignItems="center">
        {/* <Typography>{confirmOverlayMessage}</Typography> */}
        {/* <Typography>{profileToReset === "all" ? profileToReset : profileToReset ? `Are you sure you wish to reset profile` + profileToReset + `to default settings? This action cannot be undone.` : null }</Typography> */}
        <Typography>Are you sure you wish to reset {profileToReset !== "all" && profileToReset ? "profile" : null} <b className={classes.markedText}>{profileToReset === "all" ? "all profiles" : profileToReset ? `${profileToReset}` : null}</b> to default settings? <b className={classes.markedText}>This action cannot be undone.</b></Typography>
      </Grid>
      <Grid item container direction='row'justifyContent="center" alignItems="center" >
        {loadingRequestToTheServer ? <ProgressCircular size={40}/> : 
          <Grid item container direction='row'justifyContent="center" alignItems="center">
              <Grid item>
              <Button variant="contained" color='primary' size='medium' onClick={resetProfileOrAllProfiles}>Reset</Button>
            </Grid>
            <Grid xs={0.25}></Grid>
            <Grid item>
              <Button variant="contained" color='secondary' size='medium' onClick={()=>{setProfileToReset(null)}}>Cancel</Button>
            </Grid>
          </Grid>
        }
      </Grid>
    </Grid>
  );
};

export default ConfirmOverlay;

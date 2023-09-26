import React from 'react';

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Grid, Typography } from '@mui/material/';

//components
import ProgressCircular from '../../ProgressBar/ProgressCircular';

// Styles 
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container:{
        flex: 1,
        position:'absolute',
        height: '100%',
        width: '100%',
        zIndex: 10,
        borderRadius: 5,
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(50px)',
    },
    message:{
        border: "2px dashed red",

    },
    markedText: {

    }
  }),
);


const ConfirmOverlay: React.FC<{profileToReset:String, setProfileToReset:any, resetProfileOrAllProfiles:any, loadingRequestToTheServer:boolean}> = ({profileToReset, setProfileToReset, resetProfileOrAllProfiles, loadingRequestToTheServer}) => {
    const classes = useStyles();

  return (
    <Grid container className={classes.container} direction="column" justifyContent="center" alignItems="center">
      <CssBaseline/>
      <Grid item xs={2} container direction='row'justifyContent="center" alignItems="center">
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

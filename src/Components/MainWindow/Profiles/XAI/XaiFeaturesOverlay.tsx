import React from 'react';


//mui
import {makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { CssBaseline, Grid, IconButton } from '@mui/material/';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';



// redux
import {useSelector, useDispatch} from 'react-redux'
import {setSelectedProfile} from '../../../../Redux-reducers/xaiFeaturesReducer'

//componenents
import XAICharts from './XAICharts'

// Styles 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container:{
        flex: 1,
        position:'absolute',
        height: '100%',
        width: '100%',
        zIndex: 2,
        borderRadius: 5,
          background: 'rgba(0,0,0,0.4)',
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
    },
    closeButton:{

    },
    chartsComponent:{

    },
    charts:{

    },
    navbarTop:{

    }
  }),
);

const XaiFeaturesOverlay: React.FC<{xaiFeaturesState:any, homeLabel:any, userChanged:boolean}> = ({xaiFeaturesState, homeLabel, userChanged}) => { // timeslots type timeslot[] | null

    const classes = useStyles();
    const dispatch = useDispatch();
    const theme = useTheme();
    const breakpoint = useMediaQuery(theme.breakpoints.down("sm"));

    const closeOverlay = () => {
      dispatch(setSelectedProfile(null))
    }


  return (
    <Grid container className={classes.container} direction="column" justifyContent="center" alignItems="center">
          <CssBaseline/>
          <Grid xs={breakpoint ? 1 : 0.5} item container direction="row" alignItems="center" justifyContent="center" className={classes.navbarTop}>
            <Grid item xs={0.5}></Grid>
            <Grid item xs={11} container direction="row" alignItems="center" justifyContent="flex-start"><b>{xaiFeaturesState.selectedProfile.profileName}</b></Grid>
            <Grid item xs={0.5} container direction="row" alignItems="center" justifyContent="center">
              <IconButton size='medium' edge='start' color='primary' onClick={closeOverlay}>
                <HighlightOffIcon/>
              </IconButton>
            </Grid>
          </Grid>
          <Grid xs={breakpoint ? 11 : 10.8} item container direction="column" justifyContent="center" alignItems="center" className={classes.chartsComponent}>
            <XAICharts xaiFeaturesState={xaiFeaturesState} homeLabel={homeLabel} userChanged={userChanged} />
          </Grid>
    </Grid>
  );
};

export default XaiFeaturesOverlay;

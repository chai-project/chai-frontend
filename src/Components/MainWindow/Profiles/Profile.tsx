import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import dayjs from 'dayjs';

//services
import services from '../../../Services/services';

//mui
import {makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Typography, Link } from '@mui/material/';

// redux
import {useSelector, useDispatch} from 'react-redux'
import {setSelectedProfile} from '../../../Redux-reducers/xaiFeaturesReducer'

//components
import Chart from './Chart';
import PriceSensivityGauge from './PriceSensivityGauge';
import ProgressCircular from '../../ProgressBar/ProgressCircular';
// Styles 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
       position: 'relative',
       width: '100%',
       height: '100%',
    },
    container:{
        height: '100%',
        width: '100%',
    },
    info:{
        height: '100%',
        width: '100%',
    },
    moreInfo:{
      height: '100%',
      width: '100%',

    },
    gaugeChart:{
      height: '100%',
    },
    profileChartContainer:{
        height: '100%',
        width: '100%',
    },
    profileChart:{
      height: '95%',
      width: '100%',
  },
    gauge:{

    },
    moreInfoButton:{
      cursor: 'pointer',
    }
  }),
);

const Profile: React.FC<{profile:any, homeLabel:any}> = ({profile, homeLabel}) => {//define type

    const classes = useStyles();
    const dispatch = useDispatch();
    const theme = useTheme();
    const breakpoint = useMediaQuery(theme.breakpoints.down("sm"));
    const breakpointMd = useMediaQuery(theme.breakpoints.down("md"));

    const openXAIOverlay = () => {
      if(homeLabel){
        const now = dayjs()
        services.addLogEntry(homeLabel, now.toISOString(), 'OVERLAY_VIEW', ['XAI']);
        dispatch(setSelectedProfile(profile))
      }
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


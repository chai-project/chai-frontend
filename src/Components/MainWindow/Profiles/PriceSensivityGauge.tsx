import React from 'react';
//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@mui/material/';
//gauge 
import GaugeChart from "react-gauge-chart";

// Styles 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
       position: 'relative',
       width: '100%',
       height: '100%',
    },
    container:{
        position:'relative',
        width: '80%',
    },
    info:{
        height: '20%',
    },
    chart:{
        height: '80%',
        width: '90%'
    }
  }),
);

const PriceSensivityGauge: React.FC<{profile:any}> = ({profile}) => {

  const classes = useStyles()

  return (
        <Grid container className={classes.container} direction="column" justifyContent="center" alignItems="center">
          <Typography>Price sensitivity</Typography>
          <GaugeChart
            nrOfLevels={6}
            colors={['#FE6262', '#5ACBCC', '#5ACBCC', '#5ACBCC', '#5ACBCC', '#FE6262']}
            percent={profile.gaugeValue ? profile.gaugeValue : 0 }
            animate={false}
            hideText={false}
            formatTextValue={(value:any)=>{return profile.segment === null ? "Unknown" : "" }}
            needleColor={profile.gaugeValue === null ? 'rgba(0%, 0%, 0%, 0)' : profile.gaugeValue < 1/6 ? '#FE6262' : profile.gaugeValue > 1/6*5 ? '#FE6262' : '#5ACBCC' }
            needleBaseColor={profile.gaugeValue === null ? 'rgba(0%, 0%, 0%, 0)' : profile.gaugeValue < 1/6 ? '#FE6262' : profile.gaugeValue > 1/6*5 ? '#FE6262' : '#5ACBCC' }
          />
        </Grid>
  );
};

export default PriceSensivityGauge;


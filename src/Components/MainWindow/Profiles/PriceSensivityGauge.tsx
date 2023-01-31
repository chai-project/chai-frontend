import React, {useEffect, useState} from 'react';

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid, Typography } from '@mui/material/';



// redux
import {useSelector, useDispatch} from 'react-redux'

//types

//gauge 
import GaugeChart from "react-gauge-chart";

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
        position:'relative',
        width: '80%',
        // position: 'relative'
    },
    info:{
        height: '20%',
        // border: "2px dashed pink",
    },
    chart:{
        height: '80%',
        // border: "2px dashed red",
        width: '90%'
    }
  }),
);

const PriceSensivityGauge: React.FC<{profile:any}> = ({profile}) => {//define type
    // const [gaugeValue, setGaugeValue] = useState<number>(0);

    const classes = useStyles()
    const dispatch = useDispatch();

  return (
        <Grid container className={classes.container} direction="column" justifyContent="center" alignItems="center">
          <Typography>Price sensitivity</Typography>
          <GaugeChart
            nrOfLevels={6}
            colors={['#FE6262', '#5ACBCC', '#5ACBCC', '#5ACBCC', '#5ACBCC', '#FE6262']}
            percent={profile.gaugeValue ? profile.gaugeValue : 0 }
            animate={false}
            hideText={false} //false to show text
            formatTextValue={(value:any)=>{return profile.segment === null ? "Unknown" : "" }}
            // formatTextValue={(value:any)=>{return profile.segment === 0 ? "Negative" : profile.segment === 1 ? "Very low" : profile.segment === 2 ? "Low" : profile.segment === 3 ? "Moderate" : profile.segment === 4 ? "High" :  "Very high" }}
            needleColor={profile.gaugeValue === null ? 'rgba(0%, 0%, 0%, 0)' : profile.gaugeValue < 1/6 ? '#FE6262' : profile.gaugeValue > 1/6*5 ? '#FE6262' : '#5ACBCC' }
            needleBaseColor={profile.gaugeValue === null ? 'rgba(0%, 0%, 0%, 0)' : profile.gaugeValue < 1/6 ? '#FE6262' : profile.gaugeValue > 1/6*5 ? '#FE6262' : '#5ACBCC' }
          />
        </Grid>
  );
};

export default PriceSensivityGauge;


//  formatTextValue={(value:any)=>{return value < 1/6*100 ? 'Low' : value > 1/6*5*100 ? 'High' : '' }}
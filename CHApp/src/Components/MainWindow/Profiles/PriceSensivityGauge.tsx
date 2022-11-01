import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid, Typography } from '@mui/material/';



// redux
import {useSelector, useDispatch} from 'react-redux'
// import { initializeData } from './Redux-reducers/dataReducer';


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
    const [gaugeValue, setGaugeValue] = useState<number>(0);

    const classes = useStyles()
    const dispatch = useDispatch()

    useEffect(()=>{
      const priceSensivityBoundaries = (bias:any ) => {
        const finiteIntervals = 4;
        const minSetpoint = 7;
        const maxPrice = 35;
        const upperBound = (bias - minSetpoint) / maxPrice;
        const intervalWidth = upperBound / finiteIntervals;
        let boundaries:any[] = []
  
        for(let i:number = 0; i<finiteIntervals+1; i++  ){
          boundaries.push(intervalWidth*i)
        }
        return boundaries
      };
      let segment = 0
      const boundaries = priceSensivityBoundaries(profile.bias);
      for(let i:number = 0; i<boundaries.length; i++){
        if(-profile.slope >= boundaries[i]){
          segment = i+1
        }
      };
      setGaugeValue(segment === 0 ? 0.083333333 : segment === 1 ? 0.25 : segment === 2 ? 0.416666667 : segment === 3 ? 0.416666667 : segment === 4 ? 0.75 : segment === 5 ? 0.916666667 : 0 )

    },[profile])


    // const priceSensivityBoundaries = (bias:any ) => {
    //   const finiteIntervals = 4;
    //   const minSetpoint = 7;
    //   const maxPrice = 35;
    //   const upperBound = (bias - minSetpoint) / maxPrice;
    //   const intervalWidth = upperBound / finiteIntervals;
    //   let boundaries:any[] = []

    //   for(let i:number = 0; i<finiteIntervals+1; i++  ){
    //     boundaries.push(intervalWidth*i)
    //   }
    //   return boundaries
    // };
    // const priceSensivitySegment = (bias: any, slope:any) => {
    //   let segments = 0
    //   const boundaries = priceSensivityBoundaries(bias);
    //   console.log(boundaries);
    //   for(let i:number = 0; i<boundaries.length; i++){
    //     if(slope >= boundaries[i]){
    //       segments = i+1
    //     }
    //   };
    //   return segments;
    // };

    // console.log(priceSensivitySegment(20.448553121821558, 0.052908061786795565 ))
  return (
        <Grid container className={classes.container} direction="column" justifyContent="center" alignItems="center">
          <Typography>Price sensitivity</Typography>
          <GaugeChart
            nrOfLevels={6}
            colors={['#FE6262', '#5ACBCC', '#5ACBCC', '#5ACBCC', '#5ACBCC', '#FE6262']}
            percent={gaugeValue}
            hideText={false}
            formatTextValue={(value:any)=>{return value < 1/6*100 ? 'Low' : value > 1/6*5*100 ? 'High' : '' }}
            needleColor={gaugeValue < 1/6 ? '#FE6262' : gaugeValue > 1/6*5 ? '#FE6262' : '#5ACBCC' }
            needleBaseColor={gaugeValue < 1/6 ? '#FE6262' : gaugeValue > 1/6*5 ? '#FE6262' : '#5ACBCC' }
          />
        </Grid>
  );
};

export default PriceSensivityGauge;

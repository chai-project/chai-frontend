import React, {useState} from 'react';
//mui
import { CssBaseline, Button, Paper, Grid, Divider, IconButton } from '@mui/material/';
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';

// components
import ProgressCircular from '../../../../ProgressBar/ProgressCircular';
import ToolTip from './ToolTip';

//chartjs 
import 'chart.js/auto'
import {Line} from 'react-chartjs-2'
import { Typography } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chart:{
        height: '25vh',
        width: '95%',
        // [theme.breakpoints.down('md')]: {
        //     height: '28vh',
        //   }
        [theme.breakpoints.up('md')]: {
          height: '25vh',
        },
        [theme.breakpoints.down('md')]: {
          height: '60vh',
          // height: '46vh'

        },
        [theme.breakpoints.down('sm')]: {
            height: '36vh',
          },
        // border: "2px dashed purple",
        // height: '100%',
    },
    tooltip:{
      // border: "2px dashed purple",
      height: '0vh'
    },
    tooltipButton:{
      position: 'absolute',
      // backgroundColor:'lime',
      [theme.breakpoints.up('md')]: {
        // height: '25vh',
        top: 386,
        left: 470,
      },
      [theme.breakpoints.down('md')]: {

        top: 205,
        // left: 465,
        left: 475,
      },
      [theme.breakpoints.down('sm')]: {
        top: 405,
        left: 267,
      },
    }
  }),
);

const PredictionsChart: React.FC<{xaiBandData:any, breakpointMedium:any, breakpoint:any}> = ({xaiBandData, breakpointMedium, breakpoint}) => {
  
  const classes = useStyles();
  const price = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35]

  const data = {
    labels: price,
    datasets: [
      {
        label: "Best guess",
        data: xaiBandData?.prediction,
        fill: false,
        backgroundColor: "rgba(75,192,192,0.8)",
        borderColor: "rgba(75,192,192,1)",
        pointRadius: 0,

      },
      //Lower and upper confidence
      {
        label: "Lower confidence",
        data: xaiBandData?.lower_confidence,
        backgroundColor: "rgba(246, 148, 107, 0.25)",
        borderColor: "rgba(246, 148, 107, 0.5)",
        pointRadius: 0,
        tension: 0,
      },
      {
        label: "Confidence region",
        data: xaiBandData?.upper_confidence,
        fill: '-1',
        backgroundColor: "rgba(246, 148, 107, 0.25)",
        borderColor: "rgba(246, 148, 107, 0.5)",
        pointRadius: 0,
        tension: 0,
      },

      
    ]
  };
  const options:any = {
    responsive: breakpoint ? true : breakpointMedium ? true : true,
    // maintainAspectRatio: false
    maintainAspectRatio: breakpoint ? false : breakpointMedium ? false : false,
    animation: {
      duration: 0
    },
    plugins: {
      title: {
        display: true,
        text: `AI predictions`,
        color: 'rgb(87, 203, 204,1)',
        fullSize:false,
      },
      legend:{
        display:true,
        position: 'chartArea',
        align: breakpoint ? 'center' : breakpointMedium ? 'center' : 'center',
        labels: {
            filter: function(item:any, chart:any) {
                // Logic to remove a particular legend item goes here
                return !item.text.includes('Lower confidence');
            },
            color: '#FFFFFF',
            usePointStyle: true,
            
          },
        onClick: (click:any,legenItem:any,legend:any)=>{
            // console.log(click);
            return;

        },
    },
  },
    scales: {
      x: {
        stacked:true,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Price (p/kWh)',
          color: 'rgb(87, 203, 204,1)',

        },
        grid: {
            drawBorder: true,
            color: 'grey',
          },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 8,
          color: 'rgb(87, 203, 204,1)',
        },
        
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Target temperature (°C)',
          color: 'rgb(87, 203, 204,1)',
        },
        grid: {
            drawBorder: true,
            color: 'grey',
          },
        ticks: {
          color: 'rgb(87, 203, 204,1)',
        },
        min:7,
        max: 30
        // min: xaiBandData ? Math.min(...xaiBandData.lower_confidence) - 5 : 7,
        // max: xaiBandData ? Math.max(...xaiBandData.upper_confidence) + 5 : 30,
      },
    },
  };

  return (
    <Grid xs={12} item container direction="row" justifyContent="center" alignItems="center" >
      <Grid item xs={12} container className={classes.tooltip} direction="row" justifyContent="flex-end" alignItems="center">
        <Grid item>
          <ToolTip info={'predictionsChart'}/>
        </Grid>
      </Grid>
      <Grid item xs={12} container className={classes.chart} direction="row" justifyContent="center" alignItems="center">
        {!xaiBandData ? <ProgressCircular size={40}/> : <Line data={data} options={options}/> }
      </Grid>
    </Grid> 
    // <Grid container direction="row" justifyContent="center" alignItems="center" className={classes.chart}>
    //   {/* <Typography>predictionsChart</Typography> */}
      // {!xaiBandData ? <ProgressCircular size={40}/> : <Line data={data} options={options}/> }
    //   {/* <Grid item className={classes.tooltipButton}>
    //     <ToolTip info={'predictionsChart'}/>
    //   </Grid> */}
    // </Grid>
  )
}


export default PredictionsChart

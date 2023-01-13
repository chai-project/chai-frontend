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
    label:{
        // border: "2px dashed pink",

    },
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
          height: '32vh',
        },
        [theme.breakpoints.down('sm')]: {
            height: '36vh',
          },
        // border: "2px dashed purple",
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
        left: 465,
      },
      [theme.breakpoints.down('sm')]: {
        top: 405,
        left: 267,
      },
    }
  }),
);

const PredictionsChart: React.FC<{xaiBandData:any}> = ({xaiBandData}) => {
  const classes = useStyles();
    // console.log(Math.min(...xaiBandData?.prediction),'zeuru')
    // const mean = xaiBandData?.prediction.reduce((sum:number, value:number)=>(sum+value),0) / xaiBandData?.prediction.length
    // console.log(mean)


  const price = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35]

//   const calculateSetpoints = () => {
//     const setpoints: any [] = price.map((price:any)=>{return profile.bias + profile.slope * price });
//     return setpoints
//   };

  // calculateSetpoints()

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
        // fill: '-1',
        backgroundColor: "rgba(246, 148, 107, 0.25)",

        // borderColor: "red",
        borderColor: "rgba(246, 148, 107, 0.5)",
        pointRadius: 0,
        // fill: true,
        tension: 0,
      },
      {
        label: "Confidence region",
        data: xaiBandData?.upper_confidence,
        fill: '-1',
        backgroundColor: "rgba(246, 148, 107, 0.25)",
        borderColor: "rgba(246, 148, 107, 0.5)",


        // borderColor: "#742774",
        // borderColor: "transparent",
        pointRadius: 0,
        // fill: 0,
        tension: 0,
      },

      
    ]
  };
  const options:any = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0
    },
    plugins: {
      title: {
        display: true,
        text: `AI predictions`,
        color: 'rgb(87, 203, 204,1)'
      },
      legend:{
        display:true,
        position: 'chartArea',
        align: 'end',
        labels: {
            filter: function(item:any, chart:any) {
                // Logic to remove a particular legend item goes here
                return !item.text.includes('Lower confidence');
            },
            color: '#FFFFFF',
            
          },
        onClick: (click:any,legenItem:any,legend:any)=>{
            // console.log(click);
            // legend.chart.update();
            return;

        },
        // fontColor: 'rgb(87, 203, 204,1)'
    },
      // title: {
      //     display: true,
      //     text: 'Custom Chart Title',
      //     padding: {
      //         top: 10,
      //         bottom: 30
      //     }
      // },
  },
    scales: {
      x: {
        stacked:true,
        beginAtZero: true,
        title: {
          display: true,
          text: 'p/kWh',
        //   text: 'Price (p/kWh)',
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
        // stacked:true,
        beginAtZero: true,
        title: {
          display: true,
          text: '°C',
        //   text: 'Setpoint (°C)',
          color: 'rgb(87, 203, 204,1)',
        },
        grid: {
            drawBorder: true,
            color: 'grey',
          },
        ticks: {
          // autoSkip: true,
          // maxTicksLimit: 8,
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
    <Grid container direction="row" justifyContent="center" alignItems="center" className={classes.chart}>
      {!xaiBandData ? <ProgressCircular size={40}/> : <Line data={data} options={options}/> }
      <Grid item className={classes.tooltipButton}>
        <ToolTip info={'This chart visualises your AI model predictions over time. The best guess is a learned estimation of your ideal target temperature relative to energy price. The confidence region represents uncertainty over the best guess: a larger confidence region means more uncertainty. The predictions are used in auto mode to choose your target temperature relative to the current energy price.'}/>
      </Grid>
    </Grid>
  )
}


export default PredictionsChart

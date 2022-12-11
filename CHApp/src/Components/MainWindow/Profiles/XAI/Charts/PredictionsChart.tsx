import React, {useState} from 'react';
//mui
import { CssBaseline, Button, Paper, Grid, Divider, IconButton } from '@mui/material/';
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';

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
        width: '100%',
        // border: "2px dashed purple",
    }
  }),
);

const PredictionsChart: React.FC = () => {
  const classes = useStyles();


  const price = [33,0]

//   const calculateSetpoints = () => {
//     const setpoints: any [] = price.map((price:any)=>{return profile.bias + profile.slope * price });
//     return setpoints
//   };

  // calculateSetpoints()

  const data = {
    labels: price,
    datasets: [
      {
        label: "Target temperature (°C)",
        data: price,
        fill: false,
        backgroundColor: "rgba(75,192,192,0.8)",
        borderColor: "rgba(75,192,192,1)",
        pointRadius: 0,

      },
      {
        label: "Second dataset",
        data: [33.8, 0.6],
        fill: false,
        // backgroundColor: "#742774",

        borderColor: "#742774",
        // borderColor: "transparent",
        pointRadius: 0,
        // fill: 0,
        tension: 0,
      },
      {
        label: "Third dataset",
        data: [32.1, -0.8],
        fill: false,
        // backgroundColor: "#742774",

        borderColor: "#742774",
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
    plugins: {
      title: {
        display: true,
        text: `Predictions (summary)`,
        color: 'rgb(87, 203, 204,1)'
      },
      legend:{
        display:false
      }
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
        beginAtZero: true,
        title: {
          display: true,
          text: 'Price (p/kWh)',
          color: 'rgb(87, 203, 204,1)',

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
          text: 'Setpoint (°C)',
          color: 'rgb(87, 203, 204,1)',
        },
        ticks: {
          // autoSkip: true,
          // maxTicksLimit: 8,
          color: 'rgb(87, 203, 204,1)',
        },
        // min:7,
        // max:30,
      },
    },
  };

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" >
        <Grid item className={classes.chart}>
            <Line data={data} options={options}/>
        </Grid>
    </Grid>
  )
}


export default PredictionsChart
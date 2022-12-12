import React, {useState} from 'react';
//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid, Divider, IconButton } from '@mui/material/';


//chartjs 
import 'chart.js/auto'
import {Line} from 'react-chartjs-2'
import ReactDOM from 'react-dom';
// import Chart from 'chart.js';
// 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    label:{
        // border: "2px dashed pink",

    },
    chart:{
        height: '20vh',
        width: '95%',
        // border: "2px dashed purple",
    }
  }),
);

const SetpointScheduleChart: React.FC = () => {
  const classes = useStyles();


// const setpoint = pricesList?.map((timeframe:any)=>{
//     const {bias, slope} = heatingProfiles.heatingProfiles.find((profile:any)=>{
//         return profile.profile === selectedTimeslot.profileID
//     })
//     return Math.round((bias + slope * timeframe.rate)*2)/2;
// });
// const radius = (type: String) => {
//   const radius = pricesList?.map((item:any, index:any)=>{
//     return index === pricesList.length -1 ? 0 : type === 'radius' ? 3 : 1
//   });
//   // console.log(type, radius)
//   return radius
// }

  const data:any = {
    labels: [0,1,2,3,4,5,6,7,8,9,10],
    // radius: 3,
    // hitRadius: 1,
    datasets: [
      {
        label: "Price (p/kWh)",
        yAxisID: 'y1',
        type:'line',
        data: [1,2,6,8,9,0],
        // radius: radius('radius'),
        // hitRadius: radius('hitradius'),
        fill: false,
        backgroundColor: "#F6946B",
        borderColor: "#F6946B",
        stepped: 'before',
      },
      {
        label: "Setpoint (°C)",
        yAxisID: 'y2',
        type:'line',
        data: [30,35,70,23,45],
        // radius: radius('radius'),
        // hitRadius: radius('hitradius'),
        fill: true,
        backgroundColor: "rgb(87, 203, 204,0.8)",
        borderColor: "rgb(87, 203, 204,1)",
        stepped: 'before',
      }
    ]
  };
  const options:any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
            text: `Setpoint schedule`,
            color: 'rgb(87, 203, 204,1)'
        },
        legend:{
            // position:'left',
            display: false,
            labels:{
                // color:'red'
                // usePointStyle: true,
                generateLabels: (chart:any) => {
                    const labels = chart.data.datasets.map((label:any)=>{return{...label,text:label.label,fillStyle: label.borderColor, fontColor: label.borderColor, onclick: label.onClick}})
                    return labels
                },
            },
            onClick: (click:any,legenItem:any,legend:any)=>{
                // console.log(click);
                // legend.chart.update();
                return;

            },
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
        title: {
          display: false,
          text: 'Timeframe',
          color: 'rgb(87, 203, 204,1)',
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 8,
          color: 'rgb(87, 203, 204,1)'
        }
      },
      y1: {
        position:'right',
        stacked: false,
        title: {
          display: true,
          text: 'Price (p/kWh)',
          color:'#F6946B',
        },
        // min:7,
        // max:30,
        ticks: {
            color: '#F6946B',
            // beginAtZero: true,
            // maxTicksLimit:12,
            
          }
      },
      y2: {
        position:'left',
        stacked: false,
        fontColor:'rgb(87, 203, 204,1)',
        title: {
          display: true,
          text: 'Setpoint (°C)',
          color:'rgb(87, 203, 204,1)'
        },
        ticks: {
            color: 'rgb(87, 203, 204,1)',
          }
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


export default SetpointScheduleChart
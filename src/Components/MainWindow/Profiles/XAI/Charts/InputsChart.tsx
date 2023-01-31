import React, {useEffect, useState} from 'react';
//mui
import { CssBaseline, Button, Paper, Grid, Divider, IconButton } from '@mui/material/';
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';

//components
import ProgressCircular from '../../../../ProgressBar/ProgressCircular';
import ToolTip from './ToolTip';

//chartjs 
import 'chart.js/auto'
import {Scatter} from 'react-chartjs-2'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chart:{
        height: '25vh',
        width: '95%',
        // [theme.breakpoints.down('md')]: {
        //   height: '28vh',
        // }
        [theme.breakpoints.up('md')]: {
          height: '25vh',
        },
        [theme.breakpoints.down('md')]: {
          height: '60vh',
        },
        [theme.breakpoints.down('sm')]: {
            height: '36vh',
          },
        // position: 'absolute'
        // border: "2px dashed purple",
        // height: '60vh',
        // top: '-10% !important'
    },
    tooltip:{
        // border: "2px dashed purple",
        height: '0vh'
    },
    tooltipButton:{
      // backgroundColor:'red',
      position: 'absolute',
      // top: '8%',

      [theme.breakpoints.up('md')]: {
        // height: '25vh',
        top: 43,
        left: 470,
      },
      [theme.breakpoints.down('md')]: {
        top: 40,
        left: 475,
      },
      [theme.breakpoints.down('sm')]: {
        top: 66,
        left: 267,
      },
    }
  }),
);

const InputsChart: React.FC<{dataSet:any, mappedDataForInputsChart:any, inputs:number,breakpointMedium:any, breakpoint:any}> = ({dataSet, mappedDataForInputsChart, inputs, breakpointMedium, breakpoint}) => {

  const classes = useStyles();

  const data = {
    datasets: [
      {
        label: "Previous inputs",
        data:  dataSet?.length < 1 ? null : dataSet?.length < 2 ? mappedDataForInputsChart?.slice(0,1) : dataSet?.slice(0,dataSet.length - 1),
        fill: false,
        backgroundColor: dataSet?.length === 1 ? "#F6946B" : "rgba(75,192,192,0.8)",
        borderColor:  dataSet?.length === 1 ? "#F6946B" : "rgba(75,192,192,1)"
      },
      {
        label: "Latest input",
        data: dataSet?.length > 1 ? dataSet.slice(dataSet.length - 1) : null,
        fill: true,
        borderColor: "#F6946B",
        backgroundColor: "#F6946B",
      },
    ]
  };
  const options:any = {
    responsive: breakpoint ? true : breakpointMedium ? true : true,
    maintainAspectRatio: breakpoint ? false : breakpointMedium ? false : false,
    animation: {
      duration: 0
    },
    
    plugins: {
      title: {
        display: true,
        text: `After ${inputs} input${inputs !== 1 ? "s": ""}...`,
        color: 'rgb(87, 203, 204,1)',
        fullSize:false,
      },
      legend:{
        display:true,
        position: 'chartArea',
        align: breakpoint ? 'center' : breakpointMedium ? 'center' : 'center',
        labels: {
            color: '#FFFFFF',
            usePointStyle: true,
          },
        
      },
      tooltip: {
        callbacks: {
          title: (title:any) => {return `Price: ${title[0].label} p/kWh`},
          label : (label:any)=>{return `Target temperature: ${label.parsed.y.toFixed(1)}°C`},
        }
      }
  },
    scales: {
      x: {
        
        beginAtZero: true,
        title: {
          display: true,
          text: 'Price (p/kWh)',
          color: 'rgb(87, 203, 204,1)',
          stepped: 'before',
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
        min: mappedDataForInputsChart?.length > 0 ? Math.min(...mappedDataForInputsChart?.map((price:any)=>{return Math.trunc(price[0])})) - 5 : 0,
        max: mappedDataForInputsChart?.length > 0 ? Math.max(...mappedDataForInputsChart?.map((price:any)=>{return Math.trunc(price[0])})) + 5 : 35,
        
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
        min: mappedDataForInputsChart?.length > 0 ? Math.min(...mappedDataForInputsChart?.map((temperature:any)=>{return Math.trunc(temperature[1])})) - 5 : 7,
        max: mappedDataForInputsChart?.length > 0 ? Math.max(...mappedDataForInputsChart?.map((temperature:any)=>{return Math.trunc(temperature[1])})) + 5 : 30,
      },
    },
  };

  return (
    <Grid xs={12} item container direction="row" justifyContent="center" alignItems="center" >
      <Grid item xs={12} container className={classes.tooltip} direction="row" justifyContent="flex-end" alignItems="center">
        <Grid item>
          <ToolTip info={'inputsChart'}/>
        </Grid>
      </Grid>
      <Grid item xs={12} container className={classes.chart} direction="row" justifyContent="center" alignItems="center">
        {!dataSet ? <ProgressCircular size={40}/> : <Scatter data={data} options={options}/> }
      </Grid>
      {/* {!dataSet ? <ProgressCircular size={40}/> : <Scatter data={data} options={options}/> } */}
      {/* <Grid item>
        <ToolTip info={'inputsChart'}/>
      </Grid> */}
    {/* <Grid item className={classes.tooltipButton}>
      <ToolTip info={'inputsChart'}/>
    </Grid> */}
  </Grid>
  )
}


export default InputsChart

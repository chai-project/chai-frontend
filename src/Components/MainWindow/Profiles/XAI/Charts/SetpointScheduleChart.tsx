import React, {useState} from 'react';
//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid, Divider, IconButton } from '@mui/material/';


//chartjs 
import 'chart.js/auto'
import {Line} from 'react-chartjs-2'

// components
import ProgressCircular from '../../../../ProgressBar/ProgressCircular';
import ToolTip from './ToolTip';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
      // backgroundColor:'yellow',

      [theme.breakpoints.up('md')]: {
        // height: '25vh',
        top: 386,
        left: 960,
      },
      [theme.breakpoints.down('md')]: {
        top: 205,
        // left: 945,
        // left: 970,
        left: 975,
      },
      [theme.breakpoints.down('sm')]: {
        top: 400,
        left: 565,
      },
    }
  }),
);

const SetpointScheduleChart: React.FC<{periodPriceData:any, xaiRegionData:any}> = ({periodPriceData, xaiRegionData}) => {
  
  const classes = useStyles();

  const profile =  xaiRegionData?.data.profile
  const centre_x =  xaiRegionData?.data.centre_x
  const centre_y =  xaiRegionData?.data.centre_y

const setpoint = periodPriceData?.map((timeframe:any)=>{
    return Math.round((centre_x + centre_y * timeframe.rate)*2)/2;
});
const radius = (type: String) => {
  const radius = periodPriceData?.map((item:any, index:any)=>{
    return index === periodPriceData?.length -1 ? 0 : type === 'radius' ? 3 : 1
  });
  return radius
}      

  const data:any = {
    labels: periodPriceData?.map((timeframe:any)=>{return timeframe.start.split(/(?=[A-Z])/)[1].substr(1,5)}),
    datasets: [
      {
        label: "Price (p/kWh)",
        yAxisID: 'y1',
        type:'line',
        data: periodPriceData?.map((timeframe:any)=>{return timeframe.rate}),
        radius: radius('radius'),
        hitRadius: radius('hitradius'),
        fill: false,
        backgroundColor: "#F6946B",
        borderColor: "#F6946B",
        stepped: 'before',
      },
      {
        label: "Target temperature (°C)",
        yAxisID: 'y2',
        type:'line',
        data: setpoint,
        radius: radius('radius'),
        hitRadius: radius('hitradius'),
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
    animation: {
        duration: 0
      },
    plugins: {
        title: {
            display: true,
            text: `Target temperature schedule for ${ periodPriceData ? periodPriceData[0].start.split(/(?=[A-Z])/)[0] : null }`,
            color: 'rgb(87, 203, 204,1)',
            fullSize:false,
        },
        legend:{
            display: false,
            labels:{
                generateLabels: (chart:any) => {
                    const labels = chart.data.datasets.map((label:any)=>{return{...label,text:label.label,fillStyle: label.borderColor, fontColor: label.borderColor, onclick: label.onClick}})
                    return labels
                },
            },
            onClick: (click:any,legenItem:any,legend:any)=>{
                // console.log(click);
                return;

            },
        },
  },
    scales: {
      x: {
        title: {
          display: false,
          text: 'Timeframe',
          color: 'rgb(87, 203, 204,1)',
        },
        grid: {
            drawBorder: true,
            color: 'grey',
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
        min:0,
        max:35,
        grid: {
            drawBorder: true,
            color: 'grey',
          },
        ticks: {
            color: '#F6946B',            
          }
      },
      y2: {
        position:'left',
        stacked: false,
        fontColor:'rgb(87, 203, 204,1)',
        title: {
          display: true,
          text: 'Target temperature (°C)',
          color:'rgb(87, 203, 204,1)'
        },
        grid: {
            drawBorder: true,
            color: 'grey',
          },
        ticks: {
            color: 'rgb(87, 203, 204,1)',
          },
          min:7,
          max:30,
      },
    },
  };
  
  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" className={classes.chart} >
      {!xaiRegionData || !periodPriceData ? <ProgressCircular size={40}/> : <Line data={data} options={options}/>}
      <Grid item className={classes.tooltipButton}>
        <ToolTip info={'setpointScheduleChart'}/>
      </Grid>
    </Grid>
  )
}


export default SetpointScheduleChart
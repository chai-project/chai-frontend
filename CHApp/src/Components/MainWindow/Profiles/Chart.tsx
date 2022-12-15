import React, {useState} from 'react';
//mui
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
    chart:{
        height: '100%',
        width: '97%',
        // border: "2px dashed purple",
    }
  }),
);

const Chart: React.FC<{profile:any}> = ({profile}) => {
  const classes = useStyles();


  const price = [0,1,2,3,4, 5,6,7,8,9,10,11,12,13,14,15,16,17,18,19, 20,21,22,23,24, 25,26,27,28,29,30,31,32,33,34,35]

  const calculateSetpoints = () => {
    const setpoints: any [] = price.map((price:any)=>{return profile.bias + profile.slope * price });
    return setpoints
  };

  // calculateSetpoints()

  const data = {
    labels: price,
    datasets: [
      {
        label: "Target temperature (°C)",
        data: calculateSetpoints(),
        fill: true,
        backgroundColor: "rgba(75,192,192,0.8)",
        borderColor: "rgba(75,192,192,1)"
      },
      // {
      //   label: "Second dataset",
      //   data: [33, 25, 35, 51, 54, 76],
      //   fill: false,
      //   borderColor: "#742774"
      // }
    ]
  };
  const options:any = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0
    },
    plugins: {
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
        title: {
          display: true,
          text: 'Target temperature (°C)',
          color: 'rgb(87, 203, 204,1)',
        },
        ticks: {
          // autoSkip: true,
          // maxTicksLimit: 8,
          color: 'rgb(87, 203, 204,1)',
        },
        min:7,
        max:30,
      },
    },
  };

  return (
    <div className={classes.chart}>
      <Line data={data} options={options}/>
    </div>
  )
}


export default Chart
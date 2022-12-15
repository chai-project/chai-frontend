import React, {useEffect, useState} from 'react';
//mui
import { CssBaseline, Button, Paper, Grid, Divider, IconButton } from '@mui/material/';
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';

//chartjs 
import 'chart.js/auto'
import {Scatter} from 'react-chartjs-2'


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
        border: "2px dashed yellow",
        height: '100%',
        width: '100%',
    },
    chart:{
        height: '20vh',
        width: '95%',
        // [theme.breakpoints.down('md')]: {
        //   height: '20vh',
        // }
        // border: "2px dashed purple",
    }
  }),
);

const InputsChart: React.FC<{dataSet:any, mappedDataForInputsChart:any, inputs:number}> = ({dataSet, mappedDataForInputsChart, inputs}) => {
  // const [dataSet1, setDataSet1] = useState<any>();
  // const [dataSet2, setDataSet2] = useState<any>();

  // const [options, setOptions] = useState<any>();


  const classes = useStyles();
  


  const price = [0,1,2,3,4, 5,6,7,8,9,10,11,12,13,14,15,16,17,18,19, 20,21,22,23,24, 25,26,27,28,29,30,31,32,33,34,35]

//   const calculateSetpoints = () => {
//     const setpoints: any [] = price.map((price:any)=>{return profile.bias + profile.slope * price });
//     return setpoints
//   };

  // calculateSetpoints()

  // useEffect(()=>{
  //   console.log('eiknx')
  //   // setData()
  //   // setOptions()
  //   setDataSet1(dataSet?.length > 1 ? dataSet.slice(dataSet.length - 1) : null,)

  // },[dataSet])
  
  // console.log(Math.max(...mappedDataForInputsChart.map((price:any)=>{return Math.trunc(price[0])})),'zeuru')
  const data = {
    labels: price,
    datasets: [
      {
        label: "Target temperature (°C)",
        data: dataSet?.length > 1 ? dataSet.slice(dataSet.length - 1) : null,
        // data:dataSet1,
        fill: true,
        // backgroundColor: "rgba(75,192,192,0.8)",
        // borderColor: "rgba(75,192,192,1)"
        borderColor: "#F6946B",
        backgroundColor: "#F6946B",
      },
      {
        label: "Target temperature (°C)",
        data:  dataSet?.length < 1 ? null : dataSet?.length < 2 ? mappedDataForInputsChart?.slice(0,1) : dataSet?.slice(0,dataSet.length - 1),
        // data:  dataSet?.length < 2 ? mappedDataForInputsChart?.slice(0,1) : dataSet?.slice(0,dataSet.length - 1),
        // data:dataSet,
        fill: false,
        // borderColor: "red"
        backgroundColor: "rgba(75,192,192,0.8)",
        borderColor: "rgba(75,192,192,1)"
      }
    ]
  };
  const options:any = {
    // responsive: true,
    // maintainAspectRatio: false,
    animation: {
      duration: 0
    },
    plugins: {
      title: {
        display: true,
        text: `After ${inputs} input${inputs !== 1 ? "s": ""}`, // put value of inputs
        color: 'rgb(87, 203, 204,1)'
      },
      legend:{
        display:false
      },
      // title: {
      //     display: true,
      //     text: 'Inputs',
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
          text: 'p/kWh',
          // text: 'Price (p/kWh)',
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
        min: mappedDataForInputsChart ? Math.min(...mappedDataForInputsChart?.map((price:any)=>{return Math.trunc(price[0])})) - 5 : null,
        max: mappedDataForInputsChart ? Math.max(...mappedDataForInputsChart?.map((price:any)=>{return Math.trunc(price[0])})) + 5 :null,
        
      },
      y: {
        
        beginAtZero: true,
        title: {
          display: true,
          text: '°C',
          // text: 'Setpoint (°C)',
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
        min: mappedDataForInputsChart ? Math.min(...mappedDataForInputsChart?.map((temperature:any)=>{return Math.trunc(temperature[1])})) - 5 : null,
        max: mappedDataForInputsChart ? Math.max(...mappedDataForInputsChart?.map((temperature:any)=>{return Math.trunc(temperature[1])})) + 5 : null,
        // min: 1,
        // max: 10,
      },
    },
  };

  return (
    <Grid xs={12} item container direction="column" justifyContent="center" alignItems="center">
        <Grid item className={classes.chart}>
            <Scatter data={data} options={options}/>
        </Grid>
    </Grid>
  )
}


export default InputsChart
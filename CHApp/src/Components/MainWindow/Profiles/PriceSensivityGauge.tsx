import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid, Typography } from '@mui/material/';



// redux
import {useSelector, useDispatch} from 'react-redux'
// import { initializeData } from './Redux-reducers/dataReducer';


//types


//charts js
import { Doughnut } from 'react-chartjs-2';

import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
  } from 'chart.js';
  
  Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
  );
  
//   const myChart = new Chart(ctx, {...});


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
        height: '100%',
        width: '100%',
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

const PriceSensivityGauge: React.FC<{priceSensivity:any}> = ({priceSensivity}) => {//define type
    // const [profile, setProfile] = useState('');

    const classes = useStyles();
    const dispatch = useDispatch()
    // console.log('profile: ',typeof profile.slope)

//   const getData = () => {
//     dispatch(initializeData())
//   }
const gaugeNeedle = {
    id: "gaugeNeedle",
    afterDatasetDraw(chart:any, args:any,options:any){
        console.log('tema!!!')
        const { ctx, data, config, chartArea:{top,bottom,left,right,width, height} } = chart
        ctx.save()
        console.log(data)
        const dataTotal = data.datasets[0].data.reduce((a:any,b:any)=> a+b,0);
    }
}
const data = {
    labels: [
    //   'Bad',
    //   'Good'
    ],
    datasets: [{
      label: 'Price sensivity',
      data: [25,50,50,50,50,25],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(90, 203, 204)',
        'rgb(90, 203, 204)',
        'rgb(90, 203, 204)',
        'rgb(90, 203, 204)',
        'rgb(255, 99, 132)',

      ],
      needleValue: 30,
      cutout: '75%',
      circumference: 180,
      rotation: 270,
      borderRadius: 5,
      borderWidth: 3,
      hoverOffset: 4
    }]
  };

  const options = {
    plugin: [gaugeNeedle],
    // title:'blbl',
    legend: {
      display: true,
      position: "left"
    },
    elements: {
      arc: {
        borderWidth: 100
      }
    }
  };
  
  return (
    <div className={classes.main}>
        <Grid container className={classes.container} direction="column" justifyContent="center" alignItems="center">
                <Doughnut id="gauge" data={data} options={options}/>
        </Grid>
    </div>
  );
};

export default PriceSensivityGauge;

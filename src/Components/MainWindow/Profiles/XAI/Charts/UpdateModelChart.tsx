import React from 'react';
//mui
import {Grid } from '@mui/material/';
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';

//components
import ProgressCircular from '../../../../ProgressBar/ProgressCircular';
import ToolTip from './ToolTip';

//chartjs 
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } from "chart.js";
  import { Scatter } from "react-chartjs-2";
  
  import annotationPlugin from "chartjs-plugin-annotation";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    annotationPlugin
  );


  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chart:{
        height: '25vh',
        width: '95%',
        [theme.breakpoints.up('md')]: {
          height: '25vh',
        },
        [theme.breakpoints.down('md')]: {
          height: '60vh',
        },
        [theme.breakpoints.down('sm')]: {
            height: '36vh',
          },
    },
    tooltip:{
      height: '0vh'
    },  
    tooltipButton:{
      position: 'absolute',
      [theme.breakpoints.up('md')]: {
        top: 43,
        left: 960,
      },
      [theme.breakpoints.down('md')]: {
        top: 40,
        left: 975,
      },
      [theme.breakpoints.down('sm')]: {
        top: 66,
        left: 565,

      },
    }
  }),
);

const UpdateModelChart: React.FC<{xaiRegionData:any, inputs:number, breakpointMedium:any, breakpoint:any}> = ({xaiRegionData, inputs, breakpointMedium, breakpoint}) => {
    const classes = useStyles();


    const x = xaiRegionData?.data.centre_y;  // Assume that mean2 is on the x-axis
    const y = xaiRegionData?.data.centre_x;  // Assume that mean1 is on the y-axis
    const angle =  xaiRegionData?.data.angle
    const height =  xaiRegionData?.data.height / 2
    const width =  xaiRegionData?.data.width / 2
    const rad_per_deg = Math.PI / 180;
    const deg2rad = (deg:any) => {return deg * rad_per_deg};
    const dotproduct = (a:any, b:any) => {return a.map((x:any, i:any) => a[i] * b[i]).reduce((m:any, n:any) => m + n)};
    const transpose = (a:any) => { return a[0].map((x:any, i:any) => a.map((y:any) => y[i]))};
    const mmultiply = (a:any, b:any) => {return a.map((x:any) => transpose(b).map((y:any) => dotproduct(x, y)))};

    const theta = deg2rad(-angle);

    const theta_cos = Math.cos(theta);
    const theta_sin = Math.sin(theta);
    const rotation_matrix = [[theta_cos, -theta_sin], [theta_sin, theta_cos]];

    let ellipse = [];
    for (let point_degrees = 0; point_degrees <= 360; point_degrees += 12) {  // increment can be any factor of 360
        let point_radians = deg2rad(point_degrees);
        let origin_matrix = mmultiply(rotation_matrix, [[height * Math.cos(point_radians)], [width * Math.sin(point_radians)]]);
        ellipse.push({x: x + origin_matrix[0][0], y: y + origin_matrix[1][0]});
    }

  const data = {
    datasets: [
      {
        label: "Best guess",
        data: [{x,y}],
        backgroundColor: "rgba(75,192,192,0.8)",
      },
      {
        label: "Confidence region",
        data: ellipse,
        backgroundColor: "rgba(246, 148, 107, 0.25)",
        showLine: true,
        pointRadius: 0,
        hitRadius: 0,
        borderColor: "rgba(246, 148, 107, 0.5)",
        fill: 'shape',
      }
    ]
  };
  const options:any = {
    responsive: breakpoint ? true : breakpointMedium ? true : true,
    maintainAspectRatio: breakpoint ? false : breakpointMedium ? false : false,
    animation: {
      duration: 0
    },
    plugins: {
        autocolors: false,
        title: {
            display: true,
            text: `AI model`,
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
            //dissable on click show/hide
            onClick: (click:any,legenItem:any,legend:any)=>{
                // console.log(click);
                return;

            },
        },
        tooltip: {
          callbacks: {
            title: (title:any) => {return `Price sensitivity: ${title[0].label}`},
            label : (label:any)=>{return `Preferred temperature (if energy were free): ${label.parsed.y.toFixed(1)}°C`},
          }
        }
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Price sensitivity',
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
        min: -0.6,
        max: 0.1
        
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Preferred temperature (°C) (if energy were free)',
          color: 'rgb(87, 203, 204,1)',
        },
        grid: {
            drawBorder: true,
            color: 'grey',
          },
        ticks: {
          color: 'rgb(87, 203, 204,1)',
        },
        min: 13,
        max: 30
      },
    },
  };

  return (
    <Grid xs={12} item container direction="row" justifyContent="center" alignItems="center" >
    <Grid item xs={12} container className={classes.tooltip} direction="row" justifyContent="flex-end" alignItems="center">
      <Grid item>
        <ToolTip info={'updatedModeChart'}/>
      </Grid>
    </Grid>
    <Grid item xs={12} container className={classes.chart} direction="row" justifyContent="center" alignItems="center">
      { !xaiRegionData ? <ProgressCircular size={40}/> : <Scatter data={data} options={options} plugins={[annotationPlugin]}/>}
    </Grid>
</Grid>
  )
}


export default UpdateModelChart


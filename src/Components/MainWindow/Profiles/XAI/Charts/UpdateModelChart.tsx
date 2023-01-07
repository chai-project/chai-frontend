import React, {useState} from 'react';
//mui
import { CssBaseline, Button, Paper, Grid, Divider, IconButton } from '@mui/material/';
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';

//components
import ProgressCircular from '../../../../ProgressBar/ProgressCircular';

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
// import 'chart.js/auto'
// import {Scatter} from 'react-chartjs-2'
// import 'chartjs-plugin-annotation';
// import annotationPlugin from 'chartjs-plugin-annotation';
// Scatter.pluginService.register({annotationPlugin});




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
    }
  }),
);

const UpdateModelChart: React.FC<{xaiRegionData:any}> = ({xaiRegionData}) => {
    const classes = useStyles();

    // const x = 0.10579808810668156;  // Assume that mean2 is on the x-axis
    // const y = 21.96713444650198;  // Assume that mean1 is on the y-axis
    const x = xaiRegionData?.data.centre_y;  // Assume that mean2 is on the x-axis
    const y = xaiRegionData?.data.centre_x;  // Assume that mean1 is on the y-axis
    const angle =  xaiRegionData?.data.angle
    const height =  xaiRegionData?.data.height
    const width =  xaiRegionData?.data.width
    // console.log(x,y,angle,height,width)



//   const calculateSetpoints = () => {
//     const setpoints: any [] = price.map((price:any)=>{return profile.bias + profile.slope * price });
//     return setpoints
//   };

  // calculateSetpoints()

  const data = {
    // labels: price,
    datasets: [
      {
        label: "Most likely",
        data: [{x,y}],
        // fill: true,
        backgroundColor: "rgba(75,192,192,0.8)",
        // borderColor: "rgba(75,192,192,1)"
      },
      {
        label: "Confidence region",
        data: [{}],
        // fill: false,
        backgroundColor: "rgba(246, 148, 107, 0.25)"
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
        autocolors: false,
        title: {
            display: true,
            text: `AI model`,
            color: 'rgb(87, 203, 204,1)'
        },
        legend:{
            display:true,
            position: 'chartArea',
            labels: {
                color: '#FFFFFF'
              },
            onClick: (click:any,legenItem:any,legend:any)=>{
                // console.log(click);
                // legend.chart.update();
                return;

            },
            // fontColor: 'rgb(87, 203, 204,1)'
        },
        // annotation: {
        //     annotations: [{
        //             type: 'ellipse' as 'ellipse',
        //             // mode: 'vertical',
        //             xMin: x - (width / 2),
        //             xMax: x + (width / 2),
        //             yMin: y - (height / 2),
        //             yMax: y + (height / 2),
        //             rotation: angle,
        //             backgroundColor: 'rgba(255, 99, 132, 0.25)',
        //             borderWidth: 0
        //     }]
        // }
        annotation: {
            annotations: {
                ellipse1: {
                    type: 'ellipse',
                    xMin: x - (width / 2),
                    xMax: x + (width / 2),
                    yMin: y - (height / 2),
                    yMax: y + (height / 2),
                    rotation: angle,
                    backgroundColor: 'rgba(246, 148, 107, 0.25)',
                    borderWidth: 0
                }
            }
        }
        // annotation: {
        //     events: ["onClick"],
        //     annotations: [
        //         {
        //             drawTime: "afterDatasetsDraw" as "afterDatasetsDraw",
        //             type: "box" as "box",
        //             // xScaleID: "x-axis-0",
        //             // yScaleID: "y-axis-0",
        //             xMin: 0.01,
        //             xMax: 0.02,
        //             yMin: 4,
        //             yMax: 14,
        //             backgroundColor: "green",
        //             borderColor: "red",
        //             borderWidth: 1,
        //             onClick: function (e: any) {
        //                 // console.log("Box", e.type, this);
        //             },
        //         },
        //     ],
        // },
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
    <Grid container direction="column" justifyContent="center" alignItems="center" className={classes.chart}>
      { !xaiRegionData ? <ProgressCircular size={40}/> : <Scatter data={data} options={options} plugins={[annotationPlugin]}/>}
    </Grid>
  )
}


export default UpdateModelChart


// !xaiFeaturesState.xaiRegionData || !xaiFeaturesState.periodPriceData ? <ProgressCircular size={40}/>
// plugins={[ChartDataLabels]}
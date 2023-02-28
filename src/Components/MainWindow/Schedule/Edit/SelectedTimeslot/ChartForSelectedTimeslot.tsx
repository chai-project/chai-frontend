// import React, {useState} from 'react';
// //mui
// import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
// import { CssBaseline, Button, Paper, Grid, Divider, IconButton } from '@mui/material/';


// //chartjs 
// import 'chart.js/auto'
// import {Chart} from 'react-chartjs-2'

// //components
// import ProgressCircular from '../../../../ProgressBar/ProgressCircular';

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     main: {
//       //  boxSizing: 'border-box',
//        position: 'relative', //sitas!!!
//        width: '100%',
//        height: '100%',
//       //  background: '#CFD8DC',
//       //  left: '4%',
//       //  top: '10%',
//     },
//     container:{
//         // border: "2px dashed lime",
//         height: '100%',
//         width: '100%',
//         // position: 'relative'
//     },
//     info:{
//         height: '20%',
//         // border: "2px dashed pink",
//     },
//     chart:{
//         height: '100%',
//         width: '97%',
//         // border: "2px dashed purple",
//     }
//   }),
// );

// const ChartForSelectedTimeslot: React.FC<{selectedTimeslot:any, pricesList:any, heatingProfiles:any}> = ({selectedTimeslot, pricesList, heatingProfiles}) => {
//   const classes = useStyles();

//   const setpoint = pricesList?.map((timeframe:any)=>{
//       const {bias, slope} = heatingProfiles.heatingProfiles.find((profile:any)=>{
//           return profile.profile === selectedTimeslot.profileID
//       })
//       return Math.round((bias + slope * timeframe.rate)*2)/2;
//   });
//   const radius = (type: String) => {
//     const radius = pricesList?.map((item:any, index:any)=>{
//       return index === pricesList.length -1 ? 0 : type === 'radius' ? 3 : 1
//     });
//     return radius
//   }

//   const data:any = {
//     labels: pricesList?.map((timeframe:any)=>{return timeframe.start.split(/(?=[A-Z])/)[1].substr(1,5)}),
//     datasets: [
//       {
//         label: "Price (p/kWh)",
//         yAxisID: 'y1',
//         type:'line',
//         data: pricesList?.map((timeframe:any)=>{return timeframe.rate}),
//         radius: radius('radius'),
//         hitRadius: radius('hitradius'),
//         fill: false,
//         backgroundColor: "#F6946B",
//         borderColor: "#F6946B",
//         stepped: 'before',
//       },
//       {
//         label: "Target temperature (°C)",
//         yAxisID: 'y2',
//         type:'line',
//         data: setpoint,
//         radius: radius('radius'),
//         hitRadius: radius('hitradius'),
//         fill: true,
//         backgroundColor: "rgb(87, 203, 204,0.8)",
//         borderColor: "rgb(87, 203, 204,1)",
//         stepped: 'before',
//       }
//     ]
//   };
//   const options:any = {
//     responsive: true,
//     maintainAspectRatio: false,
//     animation: {
//       duration: 0
//     },
//     plugins: {
//         legend:{
//             labels:{
//                 generateLabels: (chart:any) => {
//                     const labels = chart.data.datasets.map((label:any)=>{return{...label,text:label.label,fillStyle: label.borderColor, fontColor: label.borderColor, onclick: label.onClick}}).reverse()
//                     return labels
//                 },
//             },
//             onClick: (click:any,legenItem:any,legend:any)=>{
//                 // console.log(click);
//                 return;

//             },
//         },
//   },
//     scales: {
//       x: {
//         grid: {
//           drawBorder: true,
//           color: 'grey',
//         },
//         title: {
//           display: false,
//           text: 'Timeframe',
//           color: 'rgb(87, 203, 204,1)',
//         },
//         ticks: {
//           autoSkip: true,
//           maxTicksLimit: 8,
//           color: 'rgb(87, 203, 204,1)'
//         }
//       },
//       y1: {
//         grid: {
//           drawBorder: true,
//           color: 'grey',
//         },
//         position:'right',
//         stacked: false,
//         fontColor:'rgb(87, 203, 204,1)',
//         title: {
//           display: true,
//           text: 'Price (p/kWh)',
//           color:'#F6946B',

//         },
//         ticks: {
//             color: '#F6946B',
//           }
//       },
//       y2: {
//         grid: {
//           drawBorder: true,
//           color: 'grey',
//         },
//         position:'left',
//         stacked: false,
//         title: {
//           display: true,
//           text: 'Target temperature (°C)',
//           color:'rgb(87, 203, 204,1)'

//         },
//         min:7,
//         max:30,
//         ticks: {
//           color:'rgb(87, 203, 204,1)'
//         }
//       },
//     },
//   };
  
//   return (
//     <Grid className={classes.chart} container direction="column" justifyContent="center" alignItems="center">
//       {!pricesList ? <ProgressCircular size={40}/>: 
//         <Chart type={'line'} data={data} options={options}/>
//       }
//     </Grid>
//   )
// }


// export default ChartForSelectedTimeslot


// consistency for all charts

import React, {useState} from 'react';
//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid, Divider, IconButton } from '@mui/material/';


//chartjs 
import 'chart.js/auto'
import {Chart} from 'react-chartjs-2'

//components
import ProgressCircular from '../../../../ProgressBar/ProgressCircular';

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

const ChartForSelectedTimeslot: React.FC<{selectedTimeslot:any, pricesList:any, heatingProfiles:any}> = ({selectedTimeslot, pricesList, heatingProfiles}) => {
  const classes = useStyles();

  const setpoint = pricesList?.map((timeframe:any)=>{
      const {bias, slope} = heatingProfiles.heatingProfiles.find((profile:any)=>{
          return profile.profile === selectedTimeslot.profileID
      })
      return Math.round((bias + slope * timeframe.rate)*2)/2;
  });
  const radius = (type: String) => {
    const radius = pricesList?.map((item:any, index:any)=>{
      return index === pricesList.length -1 ? 0 : type === 'radius' ? 3 : 1
    });
    return radius
  }


  const data:any = {
    labels: pricesList?.map((timeframe:any)=>{return timeframe.start.split(/(?=[A-Z])/)[1].substr(1,5)}),
    datasets: [
      // {
      //   label: "Price (p/kWh)",
      //   yAxisID: 'y1',
      //   type:'line',
      //   data: pricesList?.map((timeframe:any)=>{return timeframe.rate}),
      //   radius: radius('radius'),
      //   hitRadius: radius('hitradius'),
      //   fill: false,
      //   backgroundColor: "#F6946B",
      //   borderColor: "#F6946B",
      //   stepped: 'before',
      // },
      {
        label: "Target temperature (°C)",
        yAxisID: 'y2',
        type:'line',
        data: setpoint,
        radius: radius('radius'),
        hitRadius: radius('hitradius'),
        fill: false, //true buvo
        backgroundColor: "rgb(87, 203, 204,0.8)",
        borderColor: "rgb(87, 203, 204,1)",
        stepped: 'before',
      },
      {
        label: "Price (p/kWh)",
        yAxisID: 'y1',
        type:'line',
        data: pricesList?.map((timeframe:any)=>{return timeframe.rate}),
        radius: radius('radius'),
        hitRadius: radius('hitradius'),
        fill: true,
        backgroundColor: "rgb(246, 148, 107, 0.8)",
        borderColor: "rgb(246, 148, 107, 1)",
        stepped: 'before',
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
        legend:{
            labels:{
                generateLabels: (chart:any) => {
                    const labels = chart.data.datasets.map((label:any)=>{return{...label,text:label.label,fillStyle: label.borderColor, fontColor: label.borderColor, onclick: label.onClick}}).reverse()
                    return labels
                },
            },
            onClick: (click:any,legenItem:any,legend:any)=>{
                // console.log(click);
                return;

            },
        },
        // tooltip: {
        //   callbacks: {
        //     // title: (title:any) => {return `${title[0].label} p/kWh`},
        //     label : (label:any)=>{return `Price ${label.raw} p/kWh`},
        // title: (title:any) => {return `${title[0].label} p/kWh`},
        // label : (label:any)=>{return `${label.parsed.y.toFixed(1)} °C`},

        //   }
        // }
        tooltip: {
          callbacks: {
            label: (tooltipItem:any, data:any) => {
              switch(tooltipItem.datasetIndex){
                case 0:
                  return `Target temperature: ${tooltipItem.raw}°C`;
                case 1:
                  return `Price: ${tooltipItem.raw} p/kWh`;
                default:
                  return `${tooltipItem.raw}`;
              }
            }
          }
        }
        
  },
    scales: {
      x: {
        grid: {
          drawBorder: true,
          color: 'grey',
        },
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
        grid: {
          drawBorder: true,
          color: 'grey',
        },
        position:'right',
        stacked: false,
        fontColor:'rgb(87, 203, 204,1)',
        title: {
          display: true,
          text: 'Price (p/kWh)',
          color:'#F6946B',

        },
        ticks: {
            color: '#F6946B',
          }
      },
      y2: {
        grid: {
          drawBorder: true,
          color: 'grey',
        },
        position:'left',
        stacked: false,
        title: {
          display: true,
          text: 'Target temperature (°C)',
          color:'rgb(87, 203, 204,1)'

        },
        min:7,
        max:30,
        ticks: {
          color:'rgb(87, 203, 204,1)'
        }
      },
    },
  };
  
  return (
    <Grid className={classes.chart} container direction="column" justifyContent="center" alignItems="center">
      {!pricesList ? <ProgressCircular size={40}/>: 
        <Chart type={'line'} data={data} options={options}/>
      }
    </Grid>
  )
}


export default ChartForSelectedTimeslot
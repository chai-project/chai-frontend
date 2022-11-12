import React, {useState} from 'react';
//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';

//chartjs 
import 'chart.js/auto'
import {Chart} from 'react-chartjs-2'
import ReactDOM from 'react-dom';
// import Chart from 'chart.js';
// 

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

const ChartForSelectedTimeslot: React.FC<{selectedProfile:any, pricesList:any, heatingProfiles:any}> = ({selectedProfile, pricesList, heatingProfiles}) => {
  const classes = useStyles();


const setpoint = pricesList?.map((timeframe:any)=>{
    const {bias, slope} = heatingProfiles.heatingProfiles.find((profile:any)=>{
        return profile.profile === selectedProfile.profileID
    })
    return Math.round((bias + slope * timeframe.rate)*2)/2;
});
const radius = (type: String) => {
  const radius = pricesList?.map((item:any, index:any)=>{
    return index === pricesList.length -1 ? 0 : type === 'radius' ? 3 : 1
  });
  // console.log(type, radius)
  return radius
}

  const data:any = {
    labels: pricesList?.map((timeframe:any)=>{return timeframe.start.split(/(?=[A-Z])/)[1].substr(1,5)}),
    // radius: 3,
    // hitRadius: 1,
    datasets: [
      {
        label: "Target temperature (°C)",
        yAxisID: 'y1',
        type:'line',
        data: setpoint,
        radius: radius('radius'),
        hitRadius: radius('hitradius'),
        fill: false,
        backgroundColor: "#F6946B",
        borderColor: "#F6946B",
        stepped: 'before',
      },
      {
        label: "Price (p/kWh)",
        yAxisID: 'y2',
        type:'line',
        data: pricesList?.map((timeframe:any)=>{return timeframe.rate}),
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
    plugins: {
        legend:{
            // position:'left'
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
          text: 'Target temperature (°C)',
          color:'#F6946B',
        },
        min:7,
        max:30,
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
          text: 'Price (p/kWh)',
          color:'rgb(87, 203, 204,1)'
        },
        ticks: {
            color: 'rgb(87, 203, 204,1)',
          }
      },
    },
  };
  
  return (
    <div className={classes.chart}>
      <Chart type={'line'} data={data} options={options}/>
    </div>
  )
}


export default ChartForSelectedTimeslot
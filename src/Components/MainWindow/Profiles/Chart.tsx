import React from 'react';
//chartjs 
import 'chart.js/auto'
import {Line} from 'react-chartjs-2'


const Chart: React.FC<{profile:any}> = ({profile}) => {

  const price = [0,1,2,3,4, 5,6,7,8,9,10,11,12,13,14,15,16,17,18,19, 20,21,22,23,24, 25,26,27,28,29,30,31,32,33,34,35]

  const calculateSetpoints = () => {
    const setpoints: any [] = price.map((price:any)=>{return profile.bias + profile.slope * price });
    return setpoints
  };

  const data = {
    labels: price,
    datasets: [
      {
        label: "Target temperature (°C)",
        data: calculateSetpoints(),
        fill: false,
        backgroundColor: "rgba(75,192,192,0.8)",
        borderColor: "rgba(75,192,192,1)"
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
        display:false
      },
      tooltip: {
        callbacks: {
          title: (title:any) => {return `Price: ${title[0].label} p/kWh`},
          label : (label:any)=>{return `Target temperature: ${label.parsed.y.toFixed(2)}°C`},
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
        grid: {
          drawBorder: true,
          color: 'grey',
        },
        title: {
          display: true,
          text: 'Target temperature (°C)',
          color: 'rgb(87, 203, 204,1)',
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
      <Line data={data} options={options}/>
  )
}


export default Chart
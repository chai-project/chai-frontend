import React, {useEffect, useState} from 'react';

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {Typography} from '@mui/material/';

// redux
import {useSelector, useDispatch} from 'react-redux'


// Styles 
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    divider:{
      "&.MuiDivider-root": {
        "&::before": {
          borderTop: "medium solid #57CBCC"
        },
        "&::after": {
          borderTop: "medium solid #57CBCC"
        }
      },
    },
    columnContainer:{
    backgroundColor: 'red',
    border: '1px solid red'
    },
    container: {
        border: '1px solid green'
    },
    root:{
        position: 'relative',
        top: '4%',
        left: '3%'
    }
  }),
);

const Estimations: React.FC<{periodState:any, energyPrice:any ,type:any}> = ({periodState, energyPrice ,type}) => {
  const [price, setPrice] = useState<number|null>(null);
  
  useEffect(()=>{
      switch(type){
        case 'avg':
          switch(periodState) {
            case 'Today':
              setPrice(energyPrice.averagePriceToday?.reduce((sum:any, period:any) => sum + period.rate, 0) / energyPrice.averagePriceToday.length)
              break;
            case 'This week':
              setPrice(energyPrice.averagePriceThisWeek?.reduce((sum:any, period:any) => sum + period.rate, 0) / energyPrice.averagePriceThisWeek.length)
              break;
            case 'This month':
              setPrice(energyPrice.averagePriceThisMonth?.reduce((sum:any, period:any) => sum + period.rate, 0) / energyPrice.averagePriceThisMonth.length)
              break;
            default:
              setPrice(null)
          }
          break;
        case "min":
          switch(periodState) {
            case 'Today':
              setPrice(Math.min(...energyPrice.averagePriceToday?.map((period:any) => period.rate)))
              break;
            case 'This week':
              setPrice(Math.min(...energyPrice?.averagePriceThisWeek.map((period:any) => period.rate)))
              break;
            case 'This month':
              setPrice(Math.min(...energyPrice?.averagePriceThisMonth.map((period:any) => period.rate)))
              break;
            default:
              setPrice(null)
          }
          break;
        case "max":
          switch(periodState) {
            case 'Today':
              setPrice(Math.max(...energyPrice?.averagePriceToday.map((period:any) => period.rate)))
              break;
            case 'This week':
              setPrice(Math.max(...energyPrice?.averagePriceThisWeek.map((period:any) => period.rate)))
              break;
            case 'This month':
              setPrice(Math.max(...energyPrice?.averagePriceThisMonth.map((period:any) => period.rate)))
              break;
            default:
              setPrice(null)
          }
          
      }
      
  },[periodState])

  

  return (
    <Typography variant="inherit"><b>{price?.toFixed(2)}</b></Typography>
  );
};

export default Estimations;

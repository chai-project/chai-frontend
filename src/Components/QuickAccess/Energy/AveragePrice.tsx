import React, {useEffect, useState} from 'react';

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Box, Divider, Grid, Button, AppBar, Toolbar, IconButton, Stack, Link, Typography} from '@mui/material/';
    //icons
    import FileDownloadIcon from '@mui/icons-material/FileDownload';
    import FileUploadIcon from '@mui/icons-material/FileUpload';
    import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';

    import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
    import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
    import LineAxisIcon from '@mui/icons-material/LineAxis';
    import MovingIcon from '@mui/icons-material/Moving';
    import ShowChartIcon from '@mui/icons-material/ShowChart';

    import TrendingDownIcon from '@mui/icons-material/TrendingDown';



// redux
import {useSelector, useDispatch} from 'react-redux'
// import { initializeData } from './Redux-reducers/dataReducer';


//components
import ButtonsForEnergyQA from './ButtonsForEnergyQA';
import ProgressCircular from '../../ProgressBar/ProgressCircular';
import Estimations from './Estimations';



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
    //   height: '180px', //visi buvo 170
    //   minWidth: '90%',
    //   borderRadius: '25px'
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

const AveragePrice: React.FC<{periodState:any, energyPrice:any}> = ({periodState, energyPrice}) => {
    // const [avgPrice, setAvgPrice] = useState<number|null>(null);
    // const classes = useStyles();
    // const dispatch = useDispatch();
    
    // useEffect(()=>{
    //     switch(periodState) {
    //       case 'Today':
    //         setAvgPrice(energyPrice.averagePriceToday.reduce((sum:any, period:any) => sum + period.rate, 0) / energyPrice.averagePriceToday.length)
    //         break;
    //       case 'This week':
    //         setAvgPrice(energyPrice.averagePriceThisWeek.reduce((sum:any, period:any) => sum + period.rate, 0) / energyPrice.averagePriceThisWeek.length)
    //         break;
    //       case 'This month':
    //         setAvgPrice(energyPrice.averagePriceThisMonth.reduce((sum:any, period:any) => sum + period.rate, 0) / energyPrice.averagePriceThisMonth.length)
    //         break;
    //       default:
    //         setAvgPrice(null)
    //     }
    // },[periodState])
  


  return (
    <Grid item container direction="row" justifyContent="center" alignItems="flex-start">
        <Grid item xs={1}>
            <CurrencyPoundIcon fontSize='small' color='primary'/>
        </Grid>
        <Grid item xs={7} fontSize={15}><Typography variant="inherit"> Average price:</Typography></Grid>
        <Grid item xs={1.7} fontSize={15}>
        {energyPrice !== null ?  <Estimations type={'avg'} periodState={periodState} energyPrice={energyPrice}/> : <ProgressCircular size={20}/>}
        </Grid>
        <Grid item xs={2.3} fontSize={15}><Typography variant="inherit">p/kWh</Typography></Grid>
    </Grid>
  );
};

export default AveragePrice;

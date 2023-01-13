import React, {useState} from 'react';

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Box, Divider, Grid, Button, AppBar, Toolbar, IconButton, Stack, Link} from '@mui/material/';
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
import { Typography } from '@material-ui/core';



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
    // border: '1px solid red'
    },
    container: {
        border: '1px solid green'
    },
    root:{
        position: 'relative',
        top: '4%',
        left: '3%',
        // border: '1px solid green'
    }
  }),
);

const EnergyPrice: React.FC<{energyPrice:any}> = ({energyPrice}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // console.log(energyPrice, 'blbl')

  return (
    <div className={classes.root}>
        <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
            <Grid item xs={1}>
              <CurrencyPoundIcon fontSize='small' color='primary'/>
            </Grid>
            <Grid item xs={7} fontSize={15}> <Typography variant="inherit"> Current price:</Typography></Grid>
            <Grid item xs={1.7} fontSize={15}>
              {energyPrice !== null ?  <Typography variant="inherit"><b>{energyPrice.currentEnergyPrice[0].rate.toFixed(2)}</b></Typography> : <ProgressCircular size={20}/>}  
            </Grid> {/* jei nori tarpu tarp p / kwh padaryti 14 font size */}
            <Grid item xs={2.3} fontSize={15}><Typography variant="inherit">p/kWh</Typography></Grid>
        </Grid>
    </div>
  );
};

export default EnergyPrice;

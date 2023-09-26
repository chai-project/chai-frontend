import React from 'react';

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Grid } from '@mui/material/';
import { Typography } from '@material-ui/core';


    //icons
    import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
    
//components
import ProgressCircular from '../../ProgressBar/ProgressCircular';



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
    },
    container: {
        border: '1px solid green'
    },
    root:{
        position: 'relative',
        top: '4%',
        left: '3%',
    }
  }),
);

const EnergyPrice: React.FC<{energyPrice:any}> = ({energyPrice}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
            <Grid item xs={1}>
              <CurrencyPoundIcon fontSize='small' color='primary'/>
            </Grid>
            <Grid item xs={7} fontSize={15}> <Typography variant="inherit"> Current price:</Typography></Grid>
            <Grid item xs={1.7} fontSize={15}>
              {energyPrice !== null ?  <Typography variant="inherit"><b>{energyPrice.currentEnergyPrice[0].rate.toFixed(2)}</b></Typography> : <ProgressCircular size={20}/>}  
            </Grid> 
            <Grid item xs={2.3} fontSize={15}><Typography variant="inherit">p/kWh</Typography></Grid>
        </Grid>
    </div>
  );
};

export default EnergyPrice;

import React from 'react';

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Grid, Typography} from '@mui/material/';
    //icons
    import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';


//components
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

import React from 'react';

//mui
import { Grid, Typography} from '@mui/material/';
    //icons
    import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';

//components
import ProgressCircular from '../../ProgressBar/ProgressCircular';
import Estimations from './Estimations';


const MaximumPrice: React.FC<{periodState:any, energyPrice:any}> = ({periodState, energyPrice}) => {

  return (
    <Grid item container direction="row" justifyContent="center" alignItems="flex-start">
        <Grid item xs={1}>
            <CurrencyPoundIcon fontSize='small' color='primary'/>
        </Grid>
        <Grid item xs={7} fontSize={15}><Typography variant="inherit"> Maximum price:</Typography></Grid>
        <Grid item xs={1.7} fontSize={15}>
            {energyPrice !== null ?  <Estimations type={'max'} periodState={periodState} energyPrice={energyPrice}/> : <ProgressCircular size={20}/>}
        </Grid>
        <Grid item xs={2.3} fontSize={15}><Typography variant="inherit">p/kWh</Typography></Grid>
    </Grid>
  );
};

export default MaximumPrice;

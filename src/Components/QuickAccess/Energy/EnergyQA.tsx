import React, {useEffect, useState} from 'react';

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Box, Divider, Grid } from '@mui/material/';


// redux
import {useSelector, useDispatch} from 'react-redux'
import { setErrorMessage } from '../../../Redux-reducers/notificationsReducer';
import { initializeEnergyPriceData } from '../../../Redux-reducers/energyPriceDataReducer';

//components
import ButtonsForEnergyQA from './ButtonsForEnergyQA';
import EnergyPrice from './EnergyPrice';
import AveragePrice from './AveragePrice';
import MinimumPrice from './MinimumPrice';
import MaximumPrice from './MaximumPrice';
import RefreshRequest from '../../RefreshRequest/RefreshRequest';

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
    container:{
      height: '200px',
      minWidth: '90%',
      borderRadius: '25px'
    },
    periodButtons:{
        position: 'relative',
        top: '5px',
        right: '10px'
    },
    columns:{
      height: '100%'
    },
    column:{
      width: '100%'
    },
    estimation:{
      position: 'relative',
      width: '100%',
      top: '4%',
      left: '3%',
    }
  }),
);

const EnergyQA: React.FC = () => {

  const [periodState, setPeriodState] = useState<String>('Today')
  const periods = ['Today', 'This week', 'This month']
  const classes = useStyles();
  const dispatch = useDispatch()
  const energyPrice:any = useSelector((state: any) => state.energyPriceData);


  useEffect(()=>{
    if(energyPrice?.error!){
      dispatch(setErrorMessage(energyPrice.error, 5000))
    }
  },[energyPrice])


  return (
    <div>
      <Divider className={classes.divider} textAlign='left'><b>Energy</b></Divider>
      <Box className={classes.container} bgcolor="background.default">
        {energyPrice && energyPrice.error ? 
          <Grid container className={classes.columns} direction="column" justifyContent="center" alignItems="center">
            <RefreshRequest showError={"Error"} action={()=>{dispatch(initializeEnergyPriceData())}}/>
          </Grid> :
          <Grid container className={classes.columns} direction="column" justifyContent="center" alignItems="center">
            <Grid item xs={1} className={classes.column}></Grid>
            <Grid item xs={2} className={classes.column}>
              <EnergyPrice energyPrice={energyPrice} />
            </Grid>
            <Grid item xs={3} className={classes.column}>
              <ButtonsForEnergyQA state={periodState} setState={setPeriodState} cases={periods}/>
            </Grid>
            <Grid item xs={6} container className={classes.estimation} direction="column" justifyContent="flex-start" alignItems="center">
              <AveragePrice periodState={periodState} energyPrice={energyPrice} />
              <MinimumPrice periodState={periodState} energyPrice={energyPrice} />
              <MaximumPrice periodState={periodState} energyPrice={energyPrice} />
            </Grid>
          </Grid>
        }
        </Box>
    </div>
  );
};

export default EnergyQA;

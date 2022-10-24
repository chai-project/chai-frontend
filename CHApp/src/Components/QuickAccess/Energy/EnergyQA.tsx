import React, {useState} from 'react';

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
import EnergyPrice from './EnergyPrice';
import Estimations from './Estimations';
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
    container:{
      height: '180px', //visi buvo 170
      minWidth: '90%',
      borderRadius: '25px'
    },
    periodButtons:{
        position: 'relative',
        top: '5px',
        right: '10px'
    },
    columns:{
      // border: "1px solid #57CBCC",
      height: '100%'
    },
    column:{
      // border: "1px solid red",
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
  const [deviceState, setDeviceState] = useState<String>('Total')
  const devices = ['Total', 'Heating', 'Battery']
  const classes = useStyles();
  const dispatch = useDispatch()
  const energyPrice:any = useSelector((state: any) => state.energyPriceData);

//   const getData = () => {
//     dispatch(initializeData())
//   }

  return (
    <div>
      <Divider className={classes.divider} textAlign='left'><b>Energy</b></Divider>
      <Box className={classes.container} bgcolor="background.default">
        <Grid container className={classes.columns} direction="column" justifyContent="center" alignItems="center">
          <Grid item xs={1} className={classes.column}></Grid>
          <Grid item xs={2} className={classes.column}>
            <EnergyPrice energyPrice={energyPrice} />
          </Grid>
          <Grid item xs={3} className={classes.column}>
            <ButtonsForEnergyQA state={periodState} setState={setPeriodState} cases={periods}/>
          </Grid>
          <Grid item xs={6} className={classes.estimation}>
            <Grid item container direction="row" justifyContent="center" alignItems="flex-start">
              <Grid item xs={1}>
                  <CurrencyPoundIcon fontSize='small' color='primary'/>
              </Grid>
              <Grid item xs={7} fontSize={15}><Typography variant="inherit"> Average price:</Typography></Grid>
              <Grid item xs={1.7} fontSize={15}>
                {energyPrice !== null ?  <Estimations periodState={periodState} energyPrice={energyPrice}/> : <ProgressCircular size={20}/>}
              </Grid>
              <Grid item xs={2.3} fontSize={15}><Typography variant="inherit">p/kWh</Typography></Grid>
            </Grid>
            {/* <Estimations periodState={periodState} energyPrice={energyPrice!}/> */}
          </Grid>
        </Grid>
        {/* <EnergyPrice/> */}
        {/* <ButtonsForEnergyQA state={periodState} setState={setPeriodState} cases={periods}/> */}
        {/* <ButtonsForEnergyQA state={deviceState} setState={setDeviceState} cases={devices}/> */}
        {/* <Estimations/> */}
      </Box>
    </div>
  );
};

export default EnergyQA;

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
import EnergyPrice from './EnergyPrice';
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
    container:{
      height: '180px', //visi buvo 170
      minWidth: '90%',
      borderRadius: '25px'
    },
    periodButtons:{
        position: 'relative',
        top: '5px',
        right: '10px'
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

//   const getData = () => {
//     dispatch(initializeData())
//   }

  return (
    <div>
      <Divider className={classes.divider} textAlign='left'><b>Energy</b></Divider>
      <Box className={classes.container} bgcolor="background.default">
        <ButtonsForEnergyQA state={periodState} setState={setPeriodState} cases={periods}/>
        <EnergyPrice/>
        <ButtonsForEnergyQA state={deviceState} setState={setDeviceState} cases={devices}/>
        <Estimations/>
      </Box>
    </div>
  );
};

export default EnergyQA;
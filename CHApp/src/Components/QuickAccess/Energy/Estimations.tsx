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

const Estimations: React.FC = () => {

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
    <div className={classes.root}>
        <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
            <Grid item xs={1}>
                <CurrencyPoundIcon fontSize='small' color='primary'/>
            </Grid>
            <Grid item xs={7}> Average price:</Grid>
            <Grid item xs={3} fontSize={15}><b>2.45</b> £</Grid>
        </Grid>
        <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
            <Grid item xs={1}>
                <CurrencyPoundIcon fontSize='small' color='primary'/>
            </Grid>
            <Grid item xs={7}> Estimated cost:</Grid>
            <Grid item xs={3} fontSize={15}><b>4.25</b> £</Grid>
        </Grid>
        <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
            <Grid item xs={1}>
                <TrendingDownIcon fontSize='small' color='primary'/>
            </Grid>
            <Grid item xs={7}> Estimated consumption:</Grid>
            <Grid item xs={3} fontSize={15}><b>22</b> kwh</Grid>
        </Grid>
    </div>
  );
};

export default Estimations;

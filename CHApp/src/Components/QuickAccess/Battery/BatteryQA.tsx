import React, {useState} from 'react';

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Box, Divider, Grid, Typography, AppBar, Toolbar, IconButton, Stack, Link} from '@mui/material/';
    //icons
        //battery discharging
            import BatteryAlertIcon from '@mui/icons-material/BatteryAlert';
            import Battery20Icon from '@mui/icons-material/Battery20';
            import Battery30Icon from '@mui/icons-material/Battery30';
            import Battery50Icon from '@mui/icons-material/Battery50';
            import Battery60Icon from '@mui/icons-material/Battery60';
            import Battery80Icon from '@mui/icons-material/Battery80';
            import Battery90Icon from '@mui/icons-material/Battery90';
        //battery charging
            import BatteryCharging20Icon from '@mui/icons-material/BatteryCharging20';
            import BatteryCharging30Icon from '@mui/icons-material/BatteryCharging30';
            import BatteryCharging50Icon from '@mui/icons-material/BatteryCharging50';
            import BatteryCharging60Icon from '@mui/icons-material/BatteryCharging60';
            import BatteryCharging80Icon from '@mui/icons-material/BatteryCharging80';
            import BatteryCharging90Icon from '@mui/icons-material/BatteryCharging90';




// redux
import {useSelector, useDispatch} from 'react-redux'
// import { initializeData } from './Redux-reducers/dataReducer';


//components

import SwitchButton from '../../Buttons/SwitchButton';
import BatteryIcon from './BatteryIcon';

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
    main:{
        height: '180px',
        minWidth: '90%',
        borderRadius: '25px',
        // border: "2px dashed orange",
      },
    container:{
        height: '100%',
        width: '100%',
    },
    iconAndState: {
        height: '100%',
        // border: '2px solid pink',

    },
    switchButtons:{
        height: '100%',
        // border: '2px solid pink',
    }
  }),
);

const BatteryQA: React.FC = () => {

    const [batteryAutoMode, setBatteryAutoMode] = useState<boolean>(true) // i redux!
    const [batteryOn, setBateryOn] = useState<boolean>(false) // i redux!
    const [batteryChargingMode, setBatteryChargingMode] = useState<boolean>(false) // i redux!

    const classes = useStyles();
    const dispatch = useDispatch()

    const batteryLevel = Math.floor(Math.random() * 100) + 1 // random battery level
    const batteryStatus = "Discharging"

//   const getData = () => {
//     dispatch(initializeData())
//   }

const toogleMode = () => {
    console.log('mode switch')
}

//auto manual switch
const toogleBatteryManualMode = (event:any) => {
    setBatteryAutoMode(event.target.checked)
}

// on off switch
const toogleBatteryOn = (event:any) => {
    setBateryOn(event.target.checked)
}

//  charging discharging mode
const tootgleChargingMode = (event:any) => {
    setBatteryChargingMode(event.target.checked)
}


  return (
    <div>
      <Divider className={classes.divider} textAlign='left'><b>Powerbank</b></Divider>
      <Box className={classes.main} bgcolor="background.default">
        <Grid container direction="row" justifyContent="center" alignItems="center" className={classes.container}>
            <Grid item container xs={5} direction="column" justifyContent="center" alignItems="center" className={classes.iconAndState}>
                <Grid item>
                    <BatteryIcon batteryLevel={batteryLevel} batteryStatus={batteryStatus}/>
                </Grid>
            </Grid>
            <Grid item container xs={7} direction="column" justifyContent="center" alignItems="center"  className={classes.switchButtons}>
                <Grid item>
                    <SwitchButton labelLeft={'Manual'} labelRight={'Auto'} action={toogleBatteryManualMode} status={batteryAutoMode} disabled={false}/>
                </Grid>
                <Grid item>
                    <SwitchButton labelLeft={'Off'} labelRight={'On'} action={toogleBatteryOn} status={batteryOn} disabled={batteryAutoMode ? true : false }/>
                </Grid>
                <Grid item>
                    <SwitchButton labelLeft={'Discharge'} labelRight={'Charge'} action={tootgleChargingMode} status={batteryChargingMode} disabled={!batteryOn || batteryAutoMode ? true : false}/>
                </Grid>
            </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default BatteryQA;

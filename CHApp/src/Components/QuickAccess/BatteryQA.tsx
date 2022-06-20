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

import SwitchButton from '../Buttons/SwitchButton';


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
        position: 'relative',
        height: '160px',
        minWidth: '90%',
        borderRadius: '25px',
    },
    item:{
        position: 'relative',
        left: '50%',
        top: '50%',
        WebkitTransform: 'translate(-50%, -50%)',
        transform: 'translate(-50%, -50%)',
    },
    column: {
        position: 'relative',
        // border: '2px solid pink',
        height: '100px'
    },
    row: {
        // border: '2px solid red',
    },
    iconRoot:{
        position: 'relative',
        top:'-25%',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        // border: '2px solid green',
    },
    icon:{
        transform: 'rotate(90deg)',
    },
    batteryLevel:{
        position: 'absolute',
        lineHeight:1,
        top: '40%'
    },
    batteryStatus:{
        position: 'absolute',
        lineHeight:1,
        bottom: '-20%',
        margin: -5,
        // border: '2px solid green',
    }
  }),
);

const BatteryQA: React.FC = () => {

    const [batteryManualMode, setBatteryManualMode] = useState<boolean>(true) // i redux!
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
    setBatteryManualMode(event.target.checked)
    console.log('viduj',event.target.checked)
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
      <Divider className={classes.divider} textAlign='left'><b>Battery</b></Divider>
      <Box className={classes.container} bgcolor="background.default">
        <div className={classes.item}>
        <Grid container direction="row" alignItems='center' justifyContent="center">
            <Grid item container xs={4} direction="column" alignItems='center' justifyContent="center">
                <Grid item className={classes.column}>
                    <div className={classes.iconRoot}>
                        <Battery20Icon className={classes.icon} style={{ fontSize: 100 }} color='primary'/>
                        <Typography className={classes.batteryLevel} variant='h5'><b>{batteryLevel}%</b></Typography>
                        <div className={classes.batteryStatus}>
                            <Typography variant='h5'><b>80 kWh</b> </Typography>
                            <Typography variant='h6'>{batteryStatus} </Typography>
                        </div>
                    </div>
                </Grid>
            {/* <div className={classes.iconRoot}>
                            <Battery20Icon className={classes.icon} style={{ fontSize: 100 }} color='primary'/>
                            <Typography className={classes.batteryLevel} variant='h5'><b>{batteryLevel}%</b></Typography>
                        </div> */}
                {/* <Grid item container direction="row" className={classes.row}>
                    <Grid item xs={6} className={classes.row}>
                        <div className={classes.iconRoot}>
                            <Battery20Icon className={classes.icon} style={{ fontSize: 100 }} color='primary'/>
                            <Typography className={classes.batteryLevel} variant='h5'><b>{batteryLevel}%</b></Typography>
                        </div>
                    </Grid>
                    <Grid item xs={6} className={classes.row} >
                        <Typography variant='h5'><b>80 kWh</b></Typography>
                    </Grid>
                    <Grid item>

                    </Grid>
                </Grid> */}
                {/* <Grid item container className={classes.row} direction="column" justifyContent="center">
                    <Grid item>
                        <Typography variant='h5'><b>{batteryLevel}%</b></Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='h6'>{batteryStatus} </Typography>
                    </Grid>
                </Grid> */}
            </Grid>
            <Grid item container xs={7} className={classes.column} direction="column" alignItems='center' justifyContent="center" justifySelf='center'>
                <Grid>
                    <SwitchButton labelLeft={'Auto'} labelRight={'Manual'} action={toogleBatteryManualMode} status={batteryManualMode} disabled={false}/>
                </Grid>
                <Grid item>
                    <SwitchButton labelLeft={'Off'} labelRight={'On'} action={toogleBatteryOn} status={batteryOn} disabled={!batteryManualMode ? true : false }/>
                </Grid>
                <Grid item>
                    <SwitchButton labelLeft={'Discharge'} labelRight={'Charge'} action={tootgleChargingMode} status={batteryChargingMode} disabled={!batteryOn ? true : false}/>
                </Grid>
            </Grid>
        </Grid>
        </div>
      </Box>
    </div>
  );
};

export default BatteryQA;

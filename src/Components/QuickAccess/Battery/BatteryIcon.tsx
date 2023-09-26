
import * as React from 'react';
//MUI
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@mui/material/Typography';

//icons
    //battery discharging
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




  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconRoot:{
        position: 'relative',
        top:'-25%',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
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
    }
  }),
);



  const BatteryIcon: React.FC<{batteryLevel: number, batteryStatus: String}> = ({batteryLevel, batteryStatus }) => {

    const classes = useStyles();

    const Icon = () => {
        if(batteryStatus === 'Discharging' || batteryStatus === 'Off'){
            if(batteryLevel <= 20){
                return (
                    <Battery20Icon className={classes.icon} style={{ fontSize: 100 }} color='primary'/>
                )
            } else if( batteryLevel <= 30 && batteryLevel > 20 ){
                return (
                    <Battery30Icon className={classes.icon} style={{ fontSize: 100 }} color='primary'/>
                )
            } else if ( batteryLevel <= 50 && batteryLevel > 30 ){
                return (
                    <Battery50Icon className={classes.icon} style={{ fontSize: 100 }} color='primary'/>
                )
            } else if ( batteryLevel <= 60 && batteryLevel > 50){
                return (
                    <Battery60Icon className={classes.icon} style={{ fontSize: 100 }} color='primary'/>
                )
            } else if( batteryLevel <= 80 && batteryLevel > 60) {
                return (
                    <Battery80Icon className={classes.icon} style={{ fontSize: 100 }} color='primary'/>
                )
            } else if ( batteryLevel <= 100 && batteryLevel > 80) {
                return (
                    <Battery90Icon className={classes.icon} style={{ fontSize: 100 }} color='primary'/>
                )
            }
        } else if ( batteryStatus === "Charging"){
            return (
                <BatteryCharging50Icon className={classes.icon} style={{ fontSize: 100 }} color='primary'/>
            )
        }
    }


  return (
    <div className={classes.iconRoot}>
        {Icon()}
        <Typography className={classes.batteryLevel} variant='h5'><b>{batteryLevel}%</b></Typography>
        <div className={classes.batteryStatus}>
            <Typography variant='h5'><b>80 kWh</b> </Typography>
            <Typography variant='h6'>{batteryStatus} </Typography>
        </div>
    </div>
  );
};

export default BatteryIcon;

  
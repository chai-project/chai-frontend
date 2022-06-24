import React, {useState} from 'react';

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Box, Grid, Divider, Slider, AppBar, Toolbar, IconButton, Stack, Link} from '@mui/material/';



// redux
import {useSelector, useDispatch} from 'react-redux'
// import { initializeData } from './Redux-reducers/dataReducer';


//components
import TemperatureSlider from './TemperatureSlider';
import SwitchButton from '../../Buttons/SwitchButton';



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
      height: '160px',
      minWidth: '90%',
      borderRadius: '25px'
    },
    slider:{
      position: 'relative',
      top: '10%',
      // left: '5px',
      width: '97%',
      right: '-5px'
    },
    temperatureStatusContainer: {
      width: '90px',
      height: '70px',
      position: 'absolute',
      top: '24%',
      left: '21px',
      // fontSize: 35,
      // border: "2px dashed purple",
    },
    currentTemperature: {
      position: 'relative',
      fontSize: 61,
      top: '-95%'
    },
    currentTemperatureLabel:{
      position: 'absolute',
      top: '40%',
      fontSize: 19,
      left: '1px',
      
    },
    currentValveStatus:{
      position: 'absolute',
      top: '100%',
      fontSize: 15,
      left: '2px',
      // border: "2px dashed purple",
      width: '120px'
    },
    switchButtons:{
      position: 'relative',
      right: '-14px',
      bottom: '10%'
    }
  })
);

const HeatingQA: React.FC = () => {

  const [heatingAutoMote, setHeatingAutoMote] = useState<boolean>(true)
  const [heatingOnMode, setHeatingOnMode] = useState<boolean>(false)
    const classes = useStyles();
    const dispatch = useDispatch()

//   const getData = () => {
//     dispatch(initializeData())
//   }

const toogleHeatingAutoMode = (event:any) => {
    setHeatingAutoMote(event.target.checked)
}

const toogleHeatingOnOffMode = (event:any) => {
    setHeatingOnMode(event.target.checked)
}

  return (
    <div>
      <Divider className={classes.divider} textAlign='left'><b>Heating</b></Divider>
      <Box className={classes.container} bgcolor="background.default">
        <Box className={classes.slider} bgcolor="background.default">
          <TemperatureSlider/>
        </Box>
        <Box className={classes.temperatureStatusContainer}>
          <h1 className={classes.currentTemperature}>17°</h1>
          <h1 className={classes.currentTemperatureLabel}>Currently</h1>
          <h1 className={classes.currentValveStatus}> Valve: {heatingOnMode === true ? "Open" : "Closed"}</h1>
        </Box>
        <Box className={classes.switchButtons}>
          <Grid container direction='row' justifyContent='flex-end' alignItems='center' >
            <Grid item>
              <SwitchButton labelLeft={'Manual'} labelRight={'Auto'} action={toogleHeatingAutoMode} status={heatingAutoMote} disabled={false}/>
            </Grid>
            <Grid item>
              <SwitchButton labelLeft={'Off'} labelRight={'On'} action={toogleHeatingOnOffMode} status={heatingOnMode} disabled={heatingAutoMote === true ? true : false}/>
            </Grid>
          </Grid>
        </Box>
        {/* <Grid container direction='row' justifyContent='center' alignItems='center'>
          <Grid item>valve open</Grid>
          <Grid item container>
            <Grid item>switch1</Grid>
            <Grid item>switch2</Grid>
          </Grid>
        </Grid> */}
      {/* <TemperatureSlider/> */}
      </Box>
    </div>
  );
};

export default HeatingQA;

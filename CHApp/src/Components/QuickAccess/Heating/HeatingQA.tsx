import React, {useState, useEffect} from 'react';

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Box, Grid, Divider, Slider, AppBar, Toolbar, IconButton, Stack, Link, Button} from '@mui/material/';



// redux
import {useSelector, useDispatch} from 'react-redux'
// import { initializeData } from './Redux-reducers/dataReducer';
import {setAutoHeatingMode} from '../../../Redux-reducers/heatingComponentReducer'


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
    main:{
      height: '180px',
      minWidth: '90%',
      borderRadius: '25px',
      // border: "2px dashed orange",
    },
    container:{
      height: '100%',
      width: '100%',
      // minWidth: '90%',
      // borderRadius: '25px',
      // border: "2px dashed pink",
      
    },
    slider:{
      position: 'relative',
      top: '10px',
      left: '5px',
      width: '97%',
      // border: "2px dashed pink",
      // right: '-3px' // buvo 5px
    },
    infoAndSwitchButtonsContainer:{
      // border: "2px dashed lime",
      width: '100%',
      height:'50%'
    },
    sliderAndCurrentTemperatureContainer:{
      // border: "2px dashed lime",
      width: '100%',
      height: '50%'
    },
    actualTemperatureContainer:{
      // border: "2px dashed yellow",
      position: 'relative',
      top: '-70px',
      left:'8px'
      // top: '%'
    },
    actualTemperature:{
      fontSize:45,
      // border: "2px dashed red",
      height: '50px'
    },
    actualTemperatureLabel:{
      // border: "2px dashed red",
      fontSize:20
    },
    valveStatusContainer:{
      // border: "2px dashed red",
      height:'100%',
      // position: 'relative',
      // left:'8px'
    },
    valveStatus:{
      fontSize:20,
      position:'relative',
      left: '8px'
    },
    switchButtonsContainer:{
      height:'100%',
      // border: "2px dashed red",
    },
    confirmQuestion:{
      fontSize:14,
      // border: "2px dashed red",
    },
    confirmButtons:{
      // border: "2px dashed red",
    }
  })
);

const HeatingQA: React.FC = () => {
  //main component state from redux
  const heatingComponentState = useSelector(async (state:any)=>{ //buvo async await 
    return  await state.heatingComponent
  })

  const [heatingAutoMode, setHeatingAutoMode] = useState<boolean>(true)
  const [heatingOnMode, setHeatingOnMode] = useState<boolean>(false)
  const [temperature, setTemperature] = useState<String | null>()
  const [targetTemperature, setTargetTemperature] = useState<number>(17)
  const [isSetTargetTemperature, setIsSetTargetTemperature] = useState<boolean>(false)
  const [requestTargetTemperatureValue , setRequestTargetTemperature] = useState<number | null>(null)
  const [valveStatus, setValveStatus] = useState()
  const classes = useStyles();
  const dispatch = useDispatch()

    useEffect(()=>{
      heatingComponentState.then((res)=>{
        setTemperature(res.temperature)
        setValveStatus(res.valve_open)
        setTargetTemperature(res.target_temperature)
        switch(res.mode){
          case 'auto':
            setHeatingAutoMode(true)
            break;
          case 'on' :
            setHeatingAutoMode(false)
            setHeatingOnMode(true)
            break;
          case 'off':
            setHeatingAutoMode(false)
            setHeatingOnMode(false)
            break;
        }
      })
    },[heatingComponentState]) //ideti i array heatingComponentState 

//switch buttons actions
const toogleHeatingAutoMode = (event:any) => {
  setHeatingAutoMode(event.target.checked)
  //checks the state of the switch button and sets the mode to the redux, before that needs to send the request to the server and then if res 200 update redux
  if(event.target.checked){
    dispatch(setAutoHeatingMode('auto'))
  }else if(!event.target.checked){
    dispatch(setAutoHeatingMode(heatingOnMode))
  }
}

const toogleHeatingOnOffMode = (event:any) => {
    setHeatingOnMode(event.target.checked)
    //same thing here before updating redux, send req to server and get res 200
    dispatch(setAutoHeatingMode(event.target.checked))
}

//confirm buttons actions

const confirmYes = () => {
  //send request to the server if 200 update redux!
  console.log('yesysysysysy')
}

const confirmCancel = () => {
  setIsSetTargetTemperature(false)
}


const confirmComponent = () => {
  return(
    <Grid item container direction="row" justifyContent="center" alignItems="flex-start" className={classes.infoAndSwitchButtonsContainer}>
      <Grid item xs={10} className={classes.confirmQuestion}>This action will affect research, do you wish to set the target temperature to <b>{requestTargetTemperatureValue}°</b> ?</Grid>
      <Grid item xs={8} container direction="row" justifyContent='center' alignItems='center' className={classes.confirmButtons} >
        <Grid item xs={4}>
          <Button variant="contained" color='primary' size='small' onClick={()=>{confirmYes()}}>Yes</Button>
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" color='secondary' size='small' onClick={()=>{confirmCancel()}}>Cancel</Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
const switchButtonsComponent = () => {
  return(
    <Grid item container direction="row" justifyContent="center" alignItems="center" className={classes.infoAndSwitchButtonsContainer}>
      <Grid item container xs={5} direction="column" justifyContent="center" alignItems="flex-start" className={classes.valveStatusContainer}>
        <Grid item className={classes.valveStatus}><b>Valve: {valveStatus === true ? "Open" : "Closed"}</b></Grid>
        {/* <button onClick={()=>{console.log(heatingComponentState)}}>state</button> */}
      </Grid>
      <Grid item container xs={7} direction="column" justifyContent="center" alignItems="center" className={classes.switchButtonsContainer}>
        <Grid item>
          <SwitchButton labelLeft={'Manual'} labelRight={'Auto'} action={toogleHeatingAutoMode} status={heatingAutoMode} disabled={false}/>
        </Grid>
        <Grid item>
          <SwitchButton labelLeft={'Off'} labelRight={'On'} action={toogleHeatingOnOffMode} status={heatingOnMode} disabled={heatingAutoMode === true ? true : false}/>
        </Grid>
      </Grid>
    </Grid>
  )
}

  return (
    <div>
      <Divider className={classes.divider} textAlign='left'><b>Heating</b></Divider>
      <Box className={classes.main} bgcolor="background.default">
        <Grid container direction="column" justifyContent="center" alignItems="center" className={classes.container}>
          <Grid item className={classes.sliderAndCurrentTemperatureContainer}>
            <Box className={classes.slider} bgcolor="background.default">
             <TemperatureSlider targetTemperature={targetTemperature} setTargetTemperature={setTargetTemperature} isSetTargetTemperature={isSetTargetTemperature} setIsSetTargetTemperature={setIsSetTargetTemperature} setRequestTargetTemperature={setRequestTargetTemperature}/>
            </Box>
            <Grid item container xs={3.5} direction="column" justifyContent="center" alignItems="flex-start" className={classes.actualTemperatureContainer}>
              <Grid item className={classes.actualTemperature}><b>{temperature}°</b></Grid>
              <Grid item className={classes.actualTemperatureLabel}><b>Currently</b></Grid>
            </Grid>
          </Grid>
          {isSetTargetTemperature ? confirmComponent() : switchButtonsComponent()}
          {/* <Grid item container direction="row" justifyContent="center" alignItems="center" className={classes.infoAndSwitchButtonsContainer}>
            <Grid item container xs={5} direction="column" justifyContent="center" alignItems="flex-start" className={classes.valveStatusContainer}>
              <Grid item className={classes.valveStatus}><b>Valve: {valveStatus === true ? "Open" : "Closed"}</b></Grid>
              <button onClick={()=>{console.log(targetTemperature,isSetTargetTemperature)}}>state</button>
            </Grid>
            <Grid item container xs={7} direction="column" justifyContent="center" alignItems="center" className={classes.switchButtonsContainer}>
              <Grid item>
                <SwitchButton labelLeft={'Manual'} labelRight={'Auto'} action={toogleHeatingAutoMode} status={heatingAutoMode} disabled={false}/>
              </Grid>
              <Grid item>
                <SwitchButton labelLeft={'Off'} labelRight={'On'} action={toogleHeatingOnOffMode} status={heatingOnMode} disabled={heatingAutoMode === true ? true : false}/>
              </Grid>
            </Grid>
          </Grid> */}
        </Grid>
      </Box>
    </div>
  );
};

export default HeatingQA;

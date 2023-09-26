//OLD VERSION!!!!!! HeatingQATest IS the final one.

import React, {useState, useEffect} from 'react';

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Box, Grid, Divider, Button} from '@mui/material/';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


// redux
import {useSelector, useDispatch} from 'react-redux'
import {setHeatingComponentMode} from '../../../Redux-reducers/heatingComponentReducer'


//components
import TemperatureSlider from './TemperatureSlider';


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
      border: "2px solid orange",
    },
    container:{
      height: '100%',
      width: '100%',
    },
    slider:{
      position: 'relative',
      top: '10px',
      left: '5px',
      width: '97%',
    },
    infoAndSwitchButtonsContainer:{
      width: '100%',
      height:'50%'
    },
    sliderAndCurrentTemperatureContainer:{
      width: '100%',
      height: '50%'
    },
    actualTemperatureContainer:{
      position: 'relative',
      top: '-70px',
      left:'8px'
    },
    actualTemperature:{
      fontSize:45,
      height: '50px'
    },
    actualTemperatureLabel:{
      fontSize:20
    },
    valveStatusContainer:{
      height:'100%',
    },
    valveStatus:{
      fontSize:20,
      position:'relative',
      left: '8px'
    },
    switchButtonsContainer:{
      height:'100%',
    },
    confirmQuestion:{
      fontSize:14,
    },
    confirmButtons:{
    },
    switchButton:{
    },
    radioButton: {

    }
  })
);

const HeatingQA: React.FC = () => {
  
  const heatingComponentState = useSelector( (state:any)=>{
    return  state.heatingComponent
  })

  const [heatingAutoMode, setHeatingAutoMode] = useState<boolean>(true)
  const [heatingManualMode, setHeatingManualMode] = useState<String|null>(null)
  const [temperature, setTemperature] = useState<String | null>(null)
  const [targetTemperature, setTargetTemperature] = useState<number>(17)
  const [isSetTargetTemperature, setIsSetTargetTemperature] = useState<boolean>(false)
  const [requestTargetTemperatureValue , setRequestTargetTemperature] = useState<number | null>(null)
  const [valveStatus, setValveStatus] = useState<boolean|null>(null)
  const [timerID, setTimerID] = useState<any>()
  const classes = useStyles();
  const dispatch = useDispatch()
  
  useEffect(()=>{
    setTemperature(heatingComponentState.temperature)
    setValveStatus(heatingComponentState.valve_open)
    setTargetTemperature(heatingComponentState.target_temperature)
    switch(heatingComponentState.mode){
            case 'auto':
              setHeatingAutoMode(true)
              setHeatingManualMode(null)
              break;
            case 'on' :
              setHeatingAutoMode(false)
              setHeatingManualMode(heatingComponentState.mode)
              break;
            case 'off':
              setHeatingAutoMode(false)
              setHeatingManualMode(heatingComponentState.mode)
              break;
          }
  },[heatingComponentState])



  // let timerID:any 
  const doNotShowTheButtons = () => {
    const timerForRadioButtons = setTimeout(doNotShowTheRadioButtons,5000)
    setTimerID(timerForRadioButtons)
  }
  const doNotShowTheRadioButtons = () => {
    setHeatingAutoMode(true)
    setTimerID(null)
  }


const toogleHeatingAutoMode = (event:any) => {
  setHeatingAutoMode(event.target.checked)
  setHeatingManualMode(null)
  if(event.target.checked){
    dispatch(setHeatingComponentMode('auto'))
    clearTimeout(timerID)
    setTimerID(null)
  }else if(!event.target.checked){
    doNotShowTheButtons()
  }
}

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setHeatingManualMode(event.target.value);
  dispatch(setHeatingComponentMode(event.target.value))
  clearTimeout(timerID)
  setTimerID(null)
};



//confirm buttons actions

const confirmYes = () => {
  //send request to the server if 200 update redux!
}

const confirmCancel = () => {
  setIsSetTargetTemperature(false)
}


const confirmComponent = () => {
  return(
    <Grid item container direction="row" justifyContent="center" alignItems="flex-start" className={classes.infoAndSwitchButtonsContainer}>
      <Grid item xs={10} className={classes.confirmQuestion}>Are you sure you wish to set the target temperature to <b>{requestTargetTemperatureValue}°C</b> ?</Grid>
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
      </Grid>
      <Grid item container xs={7} direction="row" justifyContent="center" alignItems="center" className={classes.switchButtonsContainer}>
        <Grid xs={10} item className={classes.switchButton}>
        </Grid>
          <Grid xs ={8.5} item className={classes.radioButton}>
            {!heatingAutoMode ? 
                                <RadioGroup
                                  row
                                  aria-labelledby="demo-radio-buttons-group-label"
                                  name="radio-buttons-group"
                                  value={heatingManualMode? heatingManualMode : " "}
                                  onChange={handleChange}
                                >
                                  <FormControlLabel value="on" control={<Radio />} label="On" />
                                  <FormControlLabel value="off" control={<Radio />} label="Off" />
                                </RadioGroup>
                              : null}
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
             <TemperatureSlider heatingAutoMode={heatingAutoMode} targetTemperature={targetTemperature} setTargetTemperature={setTargetTemperature} isSetTargetTemperature={isSetTargetTemperature} setIsSetTargetTemperature={setIsSetTargetTemperature} setRequestTargetTemperature={setRequestTargetTemperature}/>
            </Box>
            <Grid item container xs={3.5} direction="column" justifyContent="center" alignItems="flex-start" className={classes.actualTemperatureContainer}>
              <Grid item className={classes.actualTemperature}><b>{temperature}°</b></Grid>
              <Grid item className={classes.actualTemperatureLabel}><b>Currently</b></Grid>
            </Grid>
          </Grid>
          {isSetTargetTemperature ? confirmComponent() : switchButtonsComponent()}
        </Grid>
      </Box>
    </div>
  );
};

export default HeatingQA;

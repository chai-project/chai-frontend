import React, {useState, useEffect} from 'react';

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Box, Grid, Divider, Slider, AppBar, Toolbar, IconButton, Stack, Link, Button} from '@mui/material/';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


// redux
import {useSelector, useDispatch} from 'react-redux'
// import { initializeData } from './Redux-reducers/dataReducer';
import {setHeatingComponentMode} from '../../../Redux-reducers/heatingComponentReducer'


//components
import TemperatureSlider from './TemperatureSlider';
import SwitchButton from '../../Buttons/SwitchButton';
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
    main:{
      height: '180px',
      minWidth: '90%',
      borderRadius: '25px',
      border: "2px solid orange",
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
    },
    switchButton:{
      // border: "2px dashed red",
    },
    radioButton: {
      // border: "2px dashed lime",
    }
  })
);

const HeatingQA: React.FC = () => {
  
  //main component state from redux
  const heatingComponentState = useSelector( (state:any)=>{ // async await problemos, su switch button, reike giliau pasikapstyt, bet async await neupdeitina steito.
    // console.log(state.heatingSchedule)
    return  state.heatingComponent
  })

  const [heatingAutoMode, setHeatingAutoMode] = useState<boolean>(true)
  // const [heatingOnMode, setHeatingOnMode] = useState<boolean>(false)
  // const [showRadioButtons, setShowRadioButtons] = useState<boolean>(false)
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
    // console.log('zeuru no async await')
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
    // console.log(timerForRadioButtons, 'id')
  }
  const doNotShowTheRadioButtons = () => {
    // setShowRadioButtons(true) // paziureti ties cia kazka rytoj, bet jau beveik esi cia 
    setHeatingAutoMode(true)
    setTimerID(null)
  }

    // useEffect(()=>{
    //   // console.log('zeuru')
    //   heatingComponentState.then((res)=>{
    //     setTemperature(res.temperature)
    //     setValveStatus(res.valve_open)
    //     setTargetTemperature(res.target_temperature)
    //     switch(res.mode){
    //       case 'auto':
    //         setHeatingAutoMode(true)
    //         setHeatingManualMode(null)
    //         break;
    //       case 'on' :
    //         setHeatingAutoMode(false)
    //         setHeatingManualMode(res.mode)
    //         break;
    //       case 'off':
    //         setHeatingAutoMode(false)
    //         setHeatingManualMode(res.mode)
    //         break;
    //     }
    //   })
    // },[heatingComponentState]) //ideti i array heatingComponentState 

//switch buttons actions

// viena actiona padaryt, kad pasikeitus sustu req, ir tada updeitintu state.

// const timeOutID = setTimeout(alert, 10000, 'zeuru')






const toogleHeatingAutoMode = (event:any) => {
  setHeatingAutoMode(event.target.checked)
  // setShowRadioButtons(event.target.checked)
  setHeatingManualMode(null)
  //checks the state of the switch button and sets the mode to the redux, before that needs to send the request to the server and then if res 200 update redux
  if(event.target.checked){
    dispatch(setHeatingComponentMode('auto'))
    clearTimeout(timerID)
    setTimerID(null)
  }else if(!event.target.checked){
    doNotShowTheButtons()
    // dispatch(setHeatingComponentMode('auto'))
  }
}

// const toogleHeatingOnOffMode = (event:any) => {
//     setHeatingOnMode(event.target.checked)
//     //same thing here before updating redux, send req to server and get res 200
//     dispatch(setAutoHeatingMode(event.target.checked))
// }


const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setHeatingManualMode(event.target.value);
  dispatch(setHeatingComponentMode(event.target.value))
  clearTimeout(timerID)
  setTimerID(null)
};



//confirm buttons actions

const confirmYes = () => {
  //send request to the server if 200 update redux!
  console.log('yes')
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
        {/* <button onClick={()=>{console.log(heatingComponentState, timerID)}}>state</button> */}
      </Grid>
      <Grid item container xs={7} direction="row" justifyContent="center" alignItems="center" className={classes.switchButtonsContainer}>
        <Grid xs={10} item className={classes.switchButton}>
          <SwitchButton labelLeft={'Manual'} labelRight={'Auto'} action={toogleHeatingAutoMode} status={heatingAutoMode} disabled={false}/>
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
        {/* <Grid item>
          <SwitchButton labelLeft={'Off'} labelRight={'On'} action={toogleHeatingOnOffMode} status={heatingOnMode} disabled={heatingAutoMode === true ? true : false}/>
        </Grid> */}
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

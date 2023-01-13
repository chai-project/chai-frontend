import React, {useState, useEffect} from 'react';

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Box, Grid, Divider, Slider, AppBar, Toolbar, IconButton, Stack, Link, Button, Typography} from '@mui/material/';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


// redux
import {useSelector, useDispatch} from 'react-redux'
// import { initializeData } from './Redux-reducers/dataReducer';
import {setHeatingComponentMode} from '../../../Redux-reducers/heatingComponentReducer'
import { setTemperature } from '../../../Redux-reducers/heatingComponentReducer';
import { setNotification, setErrorMessage } from '../../../Redux-reducers/notificationsReducer';
import {refreshLogState} from '../../../Redux-reducers/logsReducer'


//components
import TemperatureSlider from './TemperatureSlider';
import SwitchButton from '../../Buttons/SwitchButton';
import ProgressCircular from '../../ProgressBar/ProgressCircular';
import ToggleButtons from './ToogleButtons';
import services from '../../../Services/services';



import { createBrowserHistory } from 'history';





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
      height: '200px', // was 190
      minWidth: '90%',
      borderRadius: '25px',
      // border: "7px solid orange",
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
      top: '-65px', //was 65 change because of leter C
      left:'5px', //was 10 change because of leter C
      [theme.breakpoints.down('md')]: {
      top: '-60px', //was 65 change because of leter C
      },
      // top: '%'
    },
    actualTemperature:{
      fontSize:30, //was 32,, was 45 change because of leter C
      // border: "2px dashed red",
      height: '35px' //was 40
    },
    actualTemperatureLabel:{
      // border: "2px dashed red",
      fontSize:20 //was 20
    },
    valveStatusContainer:{
      // border: "2px dashed red",
      height:'100%',
      // position: 'relative',
      // left:'3px'
    },
    valveStatus:{
      fontSize:15,
      position:'relative',
      left: '12px'
    },
    switchButtonsContainer:{
      height:'100%',
    //   border: "2px dashed red",
    },
    confirmQuestion:{
      fontSize: 12, //buvo 13
      // border: "2px dashed red",
    },
    confirmButtons:{
      // border: "2px dashed red",
    },
    switchButton:{
      // border: "2px dashed red",
    },
    radioButton: {
    //   border: "2px dashed lime",
    },
    //vlvestatus&&tooglebuttons
    valveStatusAndToogleButtons: {
        width: '100%',
        height: '50%',
        // border: '1px dashed lime',
        // border: "2px dashed lime",
        // width: '100%',
        // height:'50%'
    },
    expiresAt:{
        fontSize:11,
        // border: '1px dashed lime',
        height:'20px',
        position:'relative',
        right: '10px'
    },
    override:{
      fontSize:14,
      color: '#F6946B'
    }
  })
);

const HeatingQATEST: React.FC<{homeLabel:String | null}> = ({homeLabel}) => {
  
  //main component state from redux
  const heatingComponentState = useSelector( (state:any)=>{ // async await problemos, su switch button, reike giliau pasikapstyt, bet async await neupdeitina steito.
    return  state.heatingComponent
  })

  const [targetTemperature, setTargetTemperature] = useState<number>(17)
  const [isSetTargetTemperature, setIsSetTargetTemperature] = useState<boolean>(false)
  const [requestTargetTemperatureValue , setRequestTargetTemperature] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(false)


  useEffect(()=>{
    if(heatingComponentState.error){
      dispatch(setErrorMessage(heatingComponentState.error, 5000))
    }
  },[heatingComponentState.error])

  const classes = useStyles();
  const dispatch = useDispatch();

//confirm buttons actions

const confirmYes = async () => {
  if(requestTargetTemperatureValue){
    setLoading(true)
    const response = await services.setTemperature(homeLabel! , heatingComponentState.mode, requestTargetTemperatureValue );
    if(response === 200){
      dispatch(setTemperature(requestTargetTemperatureValue));
      dispatch(setHeatingComponentMode('override'));
      dispatch(setNotification(`Target temperature is set sucessfully to ${requestTargetTemperatureValue}°C`, 5000))
      dispatch(refreshLogState(homeLabel!, null, null))
    }else{
      dispatch(setErrorMessage(`Failed to set target temperature to ${requestTargetTemperatureValue}°C`, 5000))
    }
  };
  setLoading(false)
  setIsSetTargetTemperature(false);
  setRequestTargetTemperature(null);
}

const confirmCancel = () => {
  setIsSetTargetTemperature(false)
}



const confirmComponent = () => {
  return(
    <Grid item container direction="row" justifyContent="center" alignItems="flex-start" className={classes.infoAndSwitchButtonsContainer}>
      <Grid item xs={10} className={classes.confirmQuestion}>Are you sure you wish to set the target temperature to <b>{requestTargetTemperatureValue}°C</b> ?</Grid>
      <Grid item xs={8} container direction="row" justifyContent='center' alignItems='center' className={classes.confirmButtons} >
        { loading ? <ProgressCircular size={30}/> : 
          <Grid item container direction="row" justifyContent='center' alignItems='center'>
            <Grid item xs={4}>
              <Button variant="contained" color='primary' size='small' onClick={()=>{confirmYes()}}>Yes</Button>
            </Grid>
            <Grid item xs={4}>
              <Button variant="contained" color='secondary' size='small' onClick={()=>{confirmCancel()}}>Cancel</Button>
            </Grid>
          </Grid>
        }
        {/* <Grid item xs={4}>
          <Button variant="contained" color='primary' size='small' onClick={()=>{confirmYes()}}>Yes</Button>
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" color='secondary' size='small' onClick={()=>{confirmCancel()}}>Cancel</Button>
        </Grid> */}
      </Grid>
    </Grid>
  )
}

const valvelStatusAndToogleButtonsComponent = () => {
    return (
        <Grid item container direction="row" justifyContent="center" alignItems="center" className={classes.valveStatusAndToogleButtons}>
            <Grid item container xs={5.5} direction="column" justifyContent="center" alignItems="flex-start" className={classes.valveStatusContainer}>
                <Typography  variant="subtitle2" className={classes.valveStatus}>Valve: <b>{heatingComponentState.valve_open === true ? "Open" : "Closed"}</b></Typography>
                {heatingComponentState.mode === "auto" || heatingComponentState.mode === "override"?  <Typography variant="subtitle2"className={classes.valveStatus}>Active profile: <b>{heatingComponentState.activeProfile?.profileName}</b></Typography> : null}
            </Grid>
            <Grid item container xs={6.5} direction="column" justifyContent="center" alignItems="center">
                <Grid item spacing={1}>
                    <ToggleButtons label={homeLabel!} heatingComponentState={heatingComponentState}/>
                </Grid>
                <Grid item spacing={1}></Grid>
                <Grid item spacing={1} className={classes.expiresAt}>
                    {heatingComponentState.mode !== 'auto' && heatingComponentState.expires_at ?  <p>Expires at: <b>{heatingComponentState?.expires_at.split(/(?=[A-Z])/)[1].substr(1,5) + ' ' + heatingComponentState?.expires_at.split(/(?=[A-Z])/)[0] }</b></p>  : null }
                </Grid>
            </Grid>
        </Grid>
    )
};

  return (
    <div>
      <Divider className={classes.divider} textAlign='left'><b>Heating</b></Divider>
      <Box className={classes.main} bgcolor="background.default">
        {heatingComponentState.mode ? 
                                    <Grid container direction="column" justifyContent="center" alignItems="center" className={classes.container}>
                                        <Grid item className={classes.sliderAndCurrentTemperatureContainer}>
                                            <Box className={classes.slider} bgcolor="background.default">
                                                <TemperatureSlider heatingAutoMode={heatingComponentState.mode} targetTemperature={heatingComponentState.target_temperature ? heatingComponentState.target_temperature : 17 } setTargetTemperature={setTargetTemperature} isSetTargetTemperature={isSetTargetTemperature} setIsSetTargetTemperature={setIsSetTargetTemperature} setRequestTargetTemperature={setRequestTargetTemperature}/>
                                            </Box>
                                            <Grid item container xs={3.5} direction="column" justifyContent="center" alignItems="flex-start" className={classes.actualTemperatureContainer}>
                                                <Grid item className={classes.actualTemperature}><b>{heatingComponentState.temperature}°C</b></Grid>
                                                <Grid item className={classes.actualTemperatureLabel}><b>Currently</b></Grid>
                                                {heatingComponentState.mode === "override" ? <Grid item className={classes.override}> Override active</Grid> : null}
                                            </Grid>
                                        </Grid>
                                        {isSetTargetTemperature ? confirmComponent() : valvelStatusAndToogleButtonsComponent()}
                                    </Grid>
                                    :
                                    <Grid container direction="column" justifyContent="center" alignItems="center" className={classes.container}>
                                        <Grid item>
                                          {/* {heatingComponentState.error ? <p>{heatingComponentState.error}</p> : <ProgressCircular size={40}/>} */}
                                         <ProgressCircular size={40}/>
                                        </Grid>
                                    </Grid>
        }
      </Box>
    </div>
  );
};

export default HeatingQATEST;

//<ToggleButtons heatingComponentMode={heatingComponentState.mode}/>

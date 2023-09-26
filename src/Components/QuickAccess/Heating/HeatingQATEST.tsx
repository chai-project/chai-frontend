import React, {useState, useEffect} from 'react';

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Box, Grid, Divider, Button, Typography} from '@mui/material/';

// redux
import {useSelector, useDispatch} from 'react-redux'
import {initializeHeatingComponentData,setHeatingComponentMode} from '../../../Redux-reducers/heatingComponentReducer'
import { setTemperature } from '../../../Redux-reducers/heatingComponentReducer';
import { setNotification, setErrorMessage } from '../../../Redux-reducers/notificationsReducer';
import {refreshLogState} from '../../../Redux-reducers/logsReducer'

//components
import TemperatureSlider from './TemperatureSlider';
import ProgressCircular from '../../ProgressBar/ProgressCircular';
import ToggleButtons from './ToogleButtons';
import services from '../../../Services/services';
import RefreshRequest from '../../RefreshRequest/RefreshRequest';



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
      height: '200px',
      minWidth: '90%',
      borderRadius: '25px',
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
      top: '-65px',
      left:'5px',
      [theme.breakpoints.down('md')]: {
      top: '-60px',
      },
    },
    actualTemperature:{
      fontSize:30,
      height: '35px'
    },
    actualTemperatureLabel:{
      fontSize:20
    },
    valveStatusContainer:{
      height:'100%',
    },
    valveStatus:{
      fontSize:15,
      position:'relative',
      left: '12px'
    },
    switchButtonsContainer:{
      height:'100%',
    },
    confirmQuestion:{
      fontSize: 12,
    },
    confirmButtons:{

    },
    switchButton:{

    },
    radioButton: {

    },
    valveStatusAndToogleButtons: {
        width: '100%',
        height: '50%',
    },
    expiresAt:{
        fontSize:11,
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
  
  const heatingComponentState = useSelector( (state:any)=>{
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
      dispatch(setNotification(`Target temperature is ${requestTargetTemperatureValue}°C`, 5000))
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
                                          {heatingComponentState.error ? <RefreshRequest showError={"Error"} action={()=>{if(homeLabel){dispatch(initializeHeatingComponentData(homeLabel))}}}/> : <ProgressCircular size={40}/>}
                                         {/* <ProgressCircular size={40}/> */}
                                        </Grid>
                                    </Grid>
        }
      </Box>
    </div>
  );
};

export default HeatingQATEST;


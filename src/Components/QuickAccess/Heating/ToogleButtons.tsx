import React, {useState, useEffect} from 'react';
import axios from 'axios';
//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

//redux
import {useSelector, useDispatch} from 'react-redux'
import { initializeHeatingComponentData, setHeatingComponentMode } from '../../../Redux-reducers/heatingComponentReducer';
import { setNotification, setErrorMessage } from '../../../Redux-reducers/notificationsReducer';
import {refreshLogState} from '../../../Redux-reducers/logsReducer'
import services from '../../../Services/services';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
        position: 'relative',
        top: '5px',
        right: '10px'
    },
    underLine: {
        width: '35px',
        height: '2px',
        backgroundColor: '#57CBCC',
        borderRadius: 18,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    hmm:{
      fontSize: 10
    },
    ovverride:{
      backgroundColor: "#F6946B!important"
    },
    standardColour:{
      // backgroundColor: "red!important"
    }
  }),
);

const ToggleButtons: React.FC<{heatingComponentState:any, label:String}> = ({heatingComponentState, label})  => {
  const [mode, setMode] = useState<String | null>(null);
  const dispatch = useDispatch();
  const classes = useStyles();
  
  useEffect(()=>{
    setMode(heatingComponentState.mode === "override" ? "auto" :heatingComponentState.mode)
  },[heatingComponentState.mode])

  const handleChange = async (
    event: React.MouseEvent<HTMLElement>,
    newMode: string,

  ) => {
    if (newMode !== null && newMode !== "auto" ) {
        const response = await services.setHeatingDeviceMode(label, newMode);
        if(response === 200) {
          setMode(newMode)
          dispatch(setHeatingComponentMode(newMode));
          dispatch(setNotification(`The mode is set to ${newMode.toLocaleUpperCase()}`,5000));
          dispatch(refreshLogState(label!, null, null))
        }else{
          setMode(heatingComponentState.mode)
          dispatch(setErrorMessage(`Failed to set the mode to ${newMode}`, 5000))
        }
      }else {
        if(!newMode){
          if(heatingComponentState.mode === 'override'){
            const response = await services.setHeatingDeviceMode(label, 'auto');
            if(response === 200){
              setMode('auto')
              dispatch(initializeHeatingComponentData(label));
              dispatch(setNotification(`The mode is set to AUTO`,5000))
              dispatch(refreshLogState(label!, null, null))
            }else{
              setMode(heatingComponentState.mode)
              dispatch(setErrorMessage(`Failed to set the mode to AUTO`, 5000))
            }
          }
        }else{
          const response = await services.setHeatingDeviceMode(label, newMode);
          if(response === 200) {
            setMode(newMode)
            dispatch(initializeHeatingComponentData(label));
            dispatch(setNotification(`The mode is set to ${newMode.toLocaleUpperCase()}`,5000))
            dispatch(refreshLogState(label!, null, null))

          }else{
            setMode(heatingComponentState.mode)
            dispatch(setErrorMessage(`Failed to set the mode to ${newMode}`, 5000))

          }
        }
      }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={mode}
      exclusive
      onChange={handleChange}
      aria-label="device"
    >
      <ToggleButton size="small" value="on">On</ToggleButton>
      <ToggleButton size="small" value="auto" classes={heatingComponentState.mode === 'override' ? {selected: classes.ovverride} : {selected: classes.standardColour}}>Auto</ToggleButton>
      <ToggleButton size="small" value="off">Off</ToggleButton>
      {/* <ToggleButton size="small" value='novalue' disabled></ToggleButton> */}
    </ToggleButtonGroup>
  );
}


export default ToggleButtons


import * as React from 'react';
import axios from 'axios';
//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

//redux
import {useSelector, useDispatch} from 'react-redux'
import { initializeHeatingComponentData, setHeatingComponentMode } from '../../../Redux-reducers/heatingComponentReducer';
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
  }),
);

const ToggleButtons: React.FC<{heatingComponentState:any, label:String}> = ({heatingComponentState, label})  => {
  const [mode, setMode] = React.useState(heatingComponentState.mode === "override" ? "auto" :heatingComponentState.mode);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleChange = async (
    event: React.MouseEvent<HTMLElement>,
    newMode: string,

  ) => {
    if (newMode !== null && newMode !== "auto" ) {
        const response = await services.setHeatingDeviceMode(label, newMode);
        // console.log(newMode, response, 'blbl')
        if(response === 200) {
          setMode(newMode)
          //200 is servo update redux, jei ne tada atgal sustatyti kaip buvo, dabar laikinai kadangi servas off updatinu redux!!!!
          dispatch(setHeatingComponentMode(newMode));
        }else{
          setMode(heatingComponentState.mode)
        }
        // setMode(newMode)
        // //200 is servo update redux, jei ne tada atgal sustatyti kaip buvo, dabar laikinai kadangi servas off updatinu redux!!!!
        // dispatch(setHeatingComponentMode(newMode));
      }else {
        // const response = await services.setTemperature(label, newMode, heatingComponentState.target_temperature ? heatingComponentState.target_temperature : 17  ); //buvo
        const response = await services.setHeatingDeviceMode(label, newMode);
        if(response === 200) {
          setMode(newMode)
          //200 is servo update redux, jei ne tada atgal sustatyti kaip buvo, dabar laikinai kadangi servas off updatinu redux!!!!
          dispatch(initializeHeatingComponentData(label));
        }else{
          setMode(heatingComponentState.mode)
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
      <ToggleButton size="small" value={"auto"}>Auto</ToggleButton>
      <ToggleButton size="small" value="off">Off</ToggleButton>
      {/* <ToggleButton size="small" value='novalue' disabled></ToggleButton> */}
    </ToggleButtonGroup>
  );
}


export default ToggleButtons
import * as React from 'react';
import axios from 'axios';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

//redux
import {useSelector, useDispatch} from 'react-redux'
import { setHeatingComponentMode } from '../../../Redux-reducers/heatingComponentReducer';

const ToggleButtons: React.FC<{heatingComponentMode:string}> = ({heatingComponentMode})  => {
  const [mode, setMode] = React.useState(heatingComponentMode);
  const dispatch = useDispatch()

  const handleChange = async (
    event: React.MouseEvent<HTMLElement>,
    newMode: string,

  ) => {
    if (newMode !== null) {
        setMode(newMode)
        //200 is servo update redux, jei ne tada atgal sustatyti kaip buvo, dabar laikinai kadangi servas off updatinu redux!!!!
        dispatch(setHeatingComponentMode(newMode));
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
      <ToggleButton size="small" value="auto">Auto</ToggleButton>
      <ToggleButton size="small" value="off">Off</ToggleButton>
      {/* <ToggleButton size="small" value='novalue' disabled></ToggleButton> */}
    </ToggleButtonGroup>
  );
}


export default ToggleButtons
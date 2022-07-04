import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper } from '@mui/material/';



// redux
import {useSelector, useDispatch} from 'react-redux'
// import { initializeData } from './Redux-reducers/dataReducer';


//types
import chartDataType from '../../../Types/types'

//components
import SwitchButton from '../../Buttons/SwitchButton';
import DatePickerComponent from './DatePickerComponent';

// Styles 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      //  boxSizing: 'border-box',
       position: 'relative', //sitas!!!
       marginLeft: 'auto',
       marginRight: 'auto',
       top: '2%',
       width: '99%',
       height: '97%',
       border: '3px dashed #5ACBCC',
       overflow: 'auto',
      //  background: '#CFD8DC',
      //  left: '4%',
      //  top: '10%',
    },
    datepicker:{
      position: 'relative',
    },
    logs:{
      position: 'relative',
      marginLeft: 'auto',
      // marginRight: 'auto',
      // height: '100%',
      // width: '99%',
      border: '3px dashed red',
    }
  }),
);

const Logs: React.FC = () => {

    const logsai = [
      {
        date: '4/7/2002',
        time: '14:22',
        descripotion: 'User changed setpoint to 21° and the current price is 9.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      },
      {
        date: '1/7/2002',
        time: '11:22',
        descripotion: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      },
      {
        date: '1/7/2002',
        time: '11:22',
        descripotion: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      },
      {
        date: '1/7/2002',
        time: '11:22',
        descripotion: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      },
      {
        date: '1/7/2002',
        time: '11:22',
        descripotion: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      },
      {
        date: '1/7/2002',
        time: '11:22',
        descripotion: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      },
      {
        date: '1/7/2002',
        time: '11:22',
        descripotion: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      },
      {
        date: '1/7/2002',
        time: '11:22',
        descripotion: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      },
      {
        date: '1/7/2002',
        time: '11:22',
        descripotion: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      },
      {
        date: '1/7/2002',
        time: '11:22',
        descripotion: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      },
      {
        date: '1/7/2002',
        time: '11:22',
        descripotion: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      },
      {
        date: '1/7/2002',
        time: '11:22',
        descripotion: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      },
      {
        date: '1/7/2002',
        time: '11:22',
        descripotion: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      },
      {
        date: '1/7/2002',
        time: '11:22',
        descripotion: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      },
      {
        date: '1/7/2002',
        time: '11:22',
        descripotion: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      },
      {
        date: '1/7/2002',
        time: '11:22',
        descripotion: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      },
      {
        date: '1/7/2002',
        time: '11:22',
        descripotion: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      },
      {
        date: '1/7/2002',
        time: '11:22',
        descripotion: 'User changed setpoint to 17° and the current price is 4.99£. The AI has been updated. It now believes that you are <moderately> sensetive to the price and that your prefered temperature is currently 23°'
      }
    ]

    const classes = useStyles();
    const dispatch = useDispatch()

//   const getData = () => {
//     dispatch(initializeData())
//   }

  return (
    <div className={classes.main}>
      <div className={classes.datepicker}>
        <DatePickerComponent/>
      </div>
      {logsai.map((log)=>{
        return(
          <p className={classes.logs}>{log.descripotion}swxxxx</p>
        )
      })}
      {/* <h1>swx</h1> */}
    </div>
  );
};

export default Logs;

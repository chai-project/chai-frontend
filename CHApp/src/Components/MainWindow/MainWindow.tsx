import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper } from '@mui/material/';



// redux
import {useSelector, useDispatch} from 'react-redux'
// import { initializeData } from './Redux-reducers/dataReducer';


//types
import chartDataType from '../../Types/types'

//components
import SwitchButton from '../Buttons/SwitchButton';
import Logs from './Logs/Logs';
// Styles 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      //  boxSizing: 'border-box',
       position: 'relative', //sitas!!!
       width: '100%',
       height: '100%',
      //  background: '#CFD8DC',
      //  left: '4%',
      //  top: '10%',
    },
  }),
);

const MainWindow: React.FC = () => {

    const classes = useStyles();
    const dispatch = useDispatch()

//   const getData = () => {
//     dispatch(initializeData())
//   }

  return (
    <div className={classes.main}>
      {/* <Router> */}
        <Routes>
          <Route path='/' element={<p>Home</p>}/>
          <Route path='schedule' element={<p>Schedule</p>}/>
          <Route path='profiles' element={<p>Profiles</p>}/>
          <Route path='notifications' element={<Logs/>}/>
        </Routes>
      {/* </Router> */}
    </div>
  );
};

export default MainWindow;

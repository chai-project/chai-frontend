import React, {useState} from 'react';

//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper } from '@mui/material/';



// redux
import {useSelector, useDispatch} from 'react-redux'
// import { initializeData } from './Redux-reducers/dataReducer';


//types
import chartDataType from '../Types/types'

//components
import SwitchButton from '../Components/SwitchButton';

// Styles 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
       boxSizing: 'border-box',
       position: 'absolute',
       width: '65%',
       height: '80%',
       background: '#CFD8DC',
       border: '1px solid #000000',
       borderRadius: '4px',
       left: '4%',
       top: '10%',
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
          <h1>main window</h1>
          <Paper>swx</Paper>
    </div>
  );
};

export default MainWindow;

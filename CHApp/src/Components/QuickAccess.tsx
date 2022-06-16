import React, {useState} from 'react';
//mui 
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper } from '@mui/material/';

// redux
import {useSelector, useDispatch} from 'react-redux'
// import { initializeData } from './Redux-reducers/dataReducer';


//types
import chartDataType from '../Types/types'

// Styles 
    //Logo
    import Logo from '../IMG/logo.png'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      //  boxSizing: 'border-box',
       position: 'absolute', //sita iskelti i app.tsx css
       width: '100%',
       height: '100%',
      //  background: '#CFD8DC', // Paper has to go to app
      //  right: '4%',
      //  top: '5%',
    },
    logo: {
        position: 'relative',
        height: '20%',
        top:'1%',
    },
  }),
);


//JSX
const QuickAccess: React.FC = () => {

    const classes = useStyles();
    const dispatch = useDispatch()

//   const getData = () => {
//     dispatch(initializeData())
//   }

  return (
    <div className={classes.main}>
      <img className={classes.logo} src={Logo}></img>
      <h1>quick access</h1>
    </div>
  );
};

export default QuickAccess;

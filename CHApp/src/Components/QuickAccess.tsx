import React, {useState} from 'react';

import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';

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
       boxSizing: 'border-box',
       position: 'absolute',
       width: '25%',
       height: '90%',
       background: '#CFD8DC',
       border: '1px solid #000000',
       borderRadius: '4px',
       right: '4%',
       top: '5%',
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
    </div>
  );
};

export default QuickAccess;

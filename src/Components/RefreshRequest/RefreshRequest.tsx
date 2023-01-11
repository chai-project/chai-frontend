import React, {useState} from 'react';
//mui 
import {makeStyles, Theme, createStyles , useTheme} from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid, Box, IconButton } from '@mui/material/';
import RefreshIcon from '@mui/icons-material/Refresh';

// redux
import {useSelector, useDispatch} from 'react-redux'
// import { initializeData } from './Redux-reducers/dataReducer';


//types
import chartDataType from '../../Types/types'

//components

// Styles 
    //Logo
    import Logo from '../../IMG/logo.png'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      //  boxSizing: 'border-box',
    //    position: 'relative', //sita iskelti i app.tsx css
      //  width: '100%',
    //    height: '800px',
      //  background: '#CFD8DC', // Paper has to go to app
      //  right: '4%',
      //  top: '5%',
    }
  }),
);


//JSX
const RefreshRequest: React.FC<{showError:any,  action:any}> = ({showError, action}) => {

    const classes = useStyles();
    const dispatch = useDispatch()

  const getData = () => {
    action()
  }

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1} className={classes.main}>
        <Grid item >{showError ? showError: null }</Grid>
        <Grid item >
            <IconButton size='medium' edge='start' color='primary' onClick={getData}>
                <RefreshIcon/>
            </IconButton>
        </Grid>
    </Grid>
  );
};

export default RefreshRequest;

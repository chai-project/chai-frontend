import React, {useState} from 'react';
//mui 
import {makeStyles, Theme, createStyles , useTheme} from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid, Box } from '@mui/material/';

// redux
import {useSelector, useDispatch} from 'react-redux'
// import { initializeData } from './Redux-reducers/dataReducer';


//types
import chartDataType from '../../Types/types'

//components
import HeatingQA from './HeatingQA';
import BatteryQA from './BatteryQA';
import EnergyQA from './EnergyQA';

// Styles 
    //Logo
    import Logo from '../../IMG/logo.png'


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
        height: '115px',
        top: '5px',
    },
    test:{
      position: 'relative',
      height: '170px',
      minWidth: '90%',
      borderRadius: '25px'
      // backgroundColor: actualTheme.palette.background.default
    },
    gridItem:{
      width: '90%' // buvo 90%, manau 90 geriau atrodo !
    }
  }),
);


//JSX
const QuickAccess: React.FC = () => {
  const actualTheme = useTheme()

    const classes = useStyles();
    const dispatch = useDispatch()

//   const getData = () => {
//     dispatch(initializeData())
//   }

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={1}>
      <Grid item >
        <img className={classes.logo} src={Logo}></img>
      </Grid >
      <Grid item className={classes.gridItem} >
        <HeatingQA/>
      </Grid>
      <Grid item className={classes.gridItem}>
        <BatteryQA/>
      </Grid>
      <Grid item className={classes.gridItem}>
        <EnergyQA/>
      </Grid>
      {/* <Grid item>
        <Box component="span" width={200} className={classes.test} bgcolor="background.default">swx</Box>
      </Grid> */}
          {/* <Box className={classes.test} bgcolor="background.default">
      asd
          </Box>
          <Box className={classes.test} bgcolor="background.default">
      asd
          </Box>
          <Box className={classes.test} bgcolor="background.default">
      asd
          </Box> */}
    </Grid>
    // <div className={classes.main}>
    //   <img className={classes.logo} src={Logo}></img>
    //   <h1>quick access</h1>
    // </div>
  );
};

export default QuickAccess;

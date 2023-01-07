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
import HeatingQA from './Heating/HeatingQA';
import BatteryQA from './Battery/BatteryQA';
import EnergyQA from './Energy/EnergyQA';
import HeatingQATEST from './Heating/HeatingQATEST';

// Styles 
    //Logo
    import Logo from '../../IMG/logo.png'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      //  boxSizing: 'border-box',
       position: 'relative', //sita iskelti i app.tsx css
      //  width: '100%',
       height: '800px',
      //  background: '#CFD8DC', // Paper has to go to app
      //  right: '4%',
      //  top: '5%',
    },
    logo: {
        position: 'relative',
        height: '90px', //buvo 115px, sumazinau nes neuzteko vietos sutalpinti 6 iconas su info, atkeisi jeigu liks vietos po sudejimo.
        top: '5px',
        left: '8px'
    },
    gridItem:{
      width: '95%' // buvo 90%, manau 90 geriau atrodo !
    }
  }),
);


//JSX
const QuickAccess: React.FC<{homeLabel:String | null}> = ({homeLabel}) => {
  const actualTheme = useTheme()

    const classes = useStyles();
    const dispatch = useDispatch()

//   const getData = () => {
//     dispatch(initializeData())
//   }

  return (
    <Grid container direction="column" justifyContent="start" alignItems="center" spacing={1} className={classes.main}>
      <Grid item >
        <img className={classes.logo} src={Logo}></img>
      </Grid >
      <Grid item className={classes.gridItem} >
        <HeatingQATEST homeLabel={homeLabel}/>
      </Grid>
      {/* <Grid item className={classes.gridItem}>
        <BatteryQA/>
      </Grid> */}
      <Grid item className={classes.gridItem}>
        <EnergyQA/>
      </Grid>
    </Grid>
  );
};

export default QuickAccess;

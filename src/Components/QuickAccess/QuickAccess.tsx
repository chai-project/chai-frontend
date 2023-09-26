import React from 'react';
//mui 
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Grid } from '@mui/material/';

// redux

//components
import EnergyQA from './Energy/EnergyQA';
import HeatingQATEST from './Heating/HeatingQATEST';

// Styles 
    //Logo
    import Logo from '../../IMG/logo.png'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
       position: 'relative',
       height: '800px',
    },
    logo: {
        position: 'relative',
        height: '90px',
        top: '5px',
        left: '8px'
    },
    gridItem:{
      width: '95%'
    }
  }),
);


//JSX
const QuickAccess: React.FC<{homeLabel:String | null}> = ({homeLabel}) => {

  const classes = useStyles();

  return (
    <Grid container direction="column" justifyContent="start" alignItems="center" spacing={1} className={classes.main}>
      <Grid item >
        <img className={classes.logo} src={Logo}></img>
      </Grid >
      <Grid item className={classes.gridItem} >
        <HeatingQATEST homeLabel={homeLabel}/>
      </Grid>
      <Grid item className={classes.gridItem}>
        <EnergyQA/>
      </Grid>
    </Grid>
  );
};

export default QuickAccess;

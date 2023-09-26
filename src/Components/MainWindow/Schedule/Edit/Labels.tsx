import React from 'react';
//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Grid } from '@mui/material/';

// Styles 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer:{
      height: '100%',
      width: '100%'
    },
    profile:{
        fontSize: '15px',
        width: '14%',
        [theme.breakpoints.down('md')]: {
          width: '15%',
          fontSize: '14px',
        },
        [theme.breakpoints.down('sm')]: {
          width: '35%',
          fontSize: '14px',
        }
    },
    setpoint:{
        width: '7%',
        fontSize: '15px',
        [theme.breakpoints.down('md')]: {
            width: '15%',
            fontSize: '14px',
          }
    },
    period:{
        width: '35%',
        fontSize: '15px',
        [theme.breakpoints.down('md')]: {
          width: '35%',
          fontSize: '14px',
        },
        [theme.breakpoints.down('sm')]: {
          width: '40%',
          fontSize: '14px',
        }
    },
    delete:{

    },
    estimatedCosts:{
        width: '12%',
        fontSize: '15px',
        [theme.breakpoints.down('md')]: {
            width: '20%',
            fontSize: '14px',
        },
        [theme.breakpoints.down('sm')]: {
          width: '20%',
          fontSize: '14px',
        }
    }
  }),
);

const Labels: React.FC<{first:String, second:String, third:String}> = ({first, second, third}) => {

    const classes = useStyles();

  return (
    <Grid className={classes.mainContainer} container direction="row" alignItems="center" justifyContent="center" >
        <Grid  className={classes.profile}>{first}</Grid>
        <Grid  className={classes.period}>{second}</Grid>
    </Grid> 
  );
};

export default Labels;

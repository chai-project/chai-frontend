import React, {useEffect, useState} from 'react';
//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid, Divider, IconButton } from '@mui/material/';


import InfoIcon from '@mui/icons-material/Info';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


//chartjs 
import 'chart.js/auto'
import {Line} from 'react-chartjs-2'
import { Typography } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
    //    boxSizing: 'border-box',
    // zIndex: 3,

    //    position: 'fixed', //sitas!!!
       width: '100%',
       height: '100%',
    //    background: '#CFD8DC',
      //  left: '4%',
      //  top: '10%',
    },
    button:{

    },
    info:{
        // display:'none'
        
    //    background: '#CFD8DC',
       position:'fixed',
       zIndex: 3,
       borderRadius: 5,
        //   background: '#CFD8DC',
         background: 'rgba(43, 54, 72 ,0.9)',
         backdropFilter: 'blur(4px)',
       left: 0,
       top: 45,
    //    height: '100vh',
    //    width: '100vw',
       [theme.breakpoints.up('md')]: {
        height: '50vh',
        // width: '71.5vh'
      },
      [theme.breakpoints.down('md')]: {
        height: '64vh',
        // width: '161.1vh'
      },
      [theme.breakpoints.down('sm')]: {
          height: '72vh',
        //   width: '62.7vh'

        },
    //    height: '100%',
    //    width: '100%'
    },
    text:{
        // border: '1px solid red'
    }
  }),
);

const ToolTip: React.FC<{info:any}> = ({info}) => {
    const [showToolTip, setShowToolTip] = useState<boolean>(false)
  const classes = useStyles();



  return (
    <Grid container direction="row" className={classes.main}>
        <Grid xs={1} item className={classes.button}>
            <IconButton size='medium' edge='start' color='primary' onClick={()=>{setShowToolTip(true)}}>
                <InfoIcon/>
            </IconButton>
        </Grid>
        {showToolTip ? 
            <Grid item className={classes.info}>
                <Grid item container direction="row" justifyContent="center" alignItems="center">
                    <Grid item container direction="column" justifyContent="flex-end" alignItems="flex-end" padding={0}>
                        <IconButton size='medium' edge='start' color='primary' onClick={()=>{setShowToolTip(false)}}>
                            <HighlightOffIcon/>
                        </IconButton>
                    </Grid>
                    <Grid xs={9} item container direction="row" justifyContent="flex-end" alignItems="flex-end" padding={6} className={classes.text}>
                        <Typography>{info}</Typography>
                    </Grid>
                </Grid> 
            </Grid> : 
        null }
    </Grid>
  )
}


export default ToolTip
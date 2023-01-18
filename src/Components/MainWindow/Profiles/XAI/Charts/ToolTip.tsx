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
        // border : '1px dashed red',

    //    boxSizing: 'border-box',
    // zIndex: 3,

    //    position: 'fixed', //sitas!!!
    //    width: '100%',
    //    height: '100%',
    //    background: '#CFD8DC',
      //  left: '4%',
      //  top: '10%',

    },
    button:{

    },
    info:{
        position:'fixed',
        zIndex: 3,
        borderRadius: 5,
        background: 'rgba(43, 54, 72 ,0.9)',
        backdropFilter: 'blur(4px)',
        // width: "100%",
        // height: "75%",

        left: 0,
        top: 45,
        [theme.breakpoints.up('md')]: {
        height: '50vh',
        // width: '71.5vh'
        // height: "40%",
        },
        [theme.breakpoints.down('md')]: {
            // height: "80%",
        height: '64vh',
        // width: '161.1vh'
        },
        [theme.breakpoints.down('sm')]: {
          height: '72vh',
        //   width: '62.7vh'
        },
        // top: '50%',
        // left: '50%',
        // transform: 'translate(-50%, -50%)'
    },
    text:{
        // border: '1px solid red'
    }
  }),
);

const ToolTip: React.FC<{info:any}> = ({info}) => {
    const [showToolTip, setShowToolTip] = useState<boolean>(false)
    const classes = useStyles();


    const generateText = () => {
        switch(info){
            case "inputsChart":
                return <Typography>This chart visualises your profile <b>inputs</b> over time, since your last profile reset. Each input is comprised of a <b>target temperature</b> change and the <b>energy price</b> when the change was made. Each input serves to <b>update</b> your AI model.</Typography>
            case "updatedModeChart":
                return <Typography>This chart visualises your <b>AI model</b> over time. The <b>best guess</b> is a learned estimation of your <b>preferred temperature (if energy were free)</b> and your <b>price sensitivity</b>. The <b>confidence region</b> represents uncertainty over the best guess: a larger confidence region means more uncertainty. The AI model is used to make <b>predictions</b> about your ideal target temperature relative to energy price.</Typography>
            case "predictionsChart":
                return <Typography>This chart visualises your AI model <b>predictions</b> over time. The <b>best guess</b> is a learned estimation of your ideal target temperature relative to energy price. <b>The confidence</b> region represents uncertainty over the best guess: a larger confidence region means more uncertainty. The predictions are used in <b>auto mode</b> to choose your target temperature relative to the current energy price.</Typography>
            case "setpointScheduleChart":
                return <Typography>This chart visualises the <b>energy price shedule</b> for a given day along with your <b>target temperatures</b> in auto mode for that schedule and this current profile. In reality your target temperatures in auto mode will depend on both the energy price schedule and your <b>profile schedule</b>: each profile has its own AI model with its own predictions, even if energy prices remain the same.</Typography>
            default:
                return <Typography>{info}</Typography>
        }
    }



    return (
        <Grid container className={classes.main}>
            <Grid xs={1} item className={classes.button}>
                <IconButton size='medium' edge='start' color='primary' onClick={()=>{setShowToolTip(true)}}>
                    <InfoIcon/>
                </IconButton>
            </Grid>
            {showToolTip ? 
                <Grid xs={12}className={classes.info}>
                    <Grid item container direction="row" justifyContent="center" alignItems="center">
                        <Grid item container direction="column" justifyContent="flex-end" alignItems="flex-end" padding={0}>
                            <IconButton size='medium' edge='start' color='primary' onClick={()=>{setShowToolTip(false)}}>
                                <HighlightOffIcon/>
                            </IconButton>
                        </Grid>
                        <Grid xs={9} item container direction="row" justifyContent="flex-end" alignItems="flex-end" padding={6} className={classes.text}>
                            {/* <Typography>{info}</Typography> */}
                            {generateText()}
                        </Grid>
                    </Grid> 
                </Grid> : 
            null }
        </Grid>
    )
}


export default ToolTip
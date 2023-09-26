import React, {useState} from 'react';
//mui
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Grid, IconButton } from '@mui/material/';


import InfoIcon from '@mui/icons-material/Info';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


//chartjs 
import 'chart.js/auto'
import { Typography } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {

    },
    button:{

    },
    info:{
        position:'fixed',
        zIndex: 3,
        borderRadius: 5,
        background: 'rgba(43, 54, 72 ,0.9)',
        backdropFilter: 'blur(4px)',
        left: 0,
        top: 0,
        [theme.breakpoints.up('md')]: {
        height: "100%",
        },
        [theme.breakpoints.down('md')]: {
            top: 0,
            height: "100%",
        },
        [theme.breakpoints.down('sm')]: {
            top: 0,
            height: "100%",
        },
    },
    text:{

    },
    closeButton:{

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
                <Grid xs={12} container direction="column" justifyContent="center" alignItems="center" className={classes.info}>
                    <Grid xs={1} item container direction="row" justifyContent="flex-end" alignItems="center" className={classes.closeButton}>
                        <IconButton size='medium' edge='start' color='primary' onClick={()=>{setShowToolTip(false)}}>
                            <HighlightOffIcon/>
                        </IconButton>
                    </Grid>
                    <Grid xs={10.8} item container direction="row" justifyContent="center" alignItems="flex-start" padding={10} className={classes.text}>
                        {generateText()}
                    </Grid>
                </Grid>
            : null }
        </Grid>
    )
}


export default ToolTip
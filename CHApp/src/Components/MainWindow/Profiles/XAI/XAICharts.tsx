import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import dayjs from 'dayjs' 


//mui
import {makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import { CssBaseline, Button, Paper, Grid, Divider, IconButton } from '@mui/material/';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';



// redux
import {useSelector, useDispatch} from 'react-redux'
import { Typography } from '@material-ui/core';
import { setInputChartData, setSetpointScheduleChartPeriod, setSetpointScheduleChartBiasAndSlope } from '../../../../Redux-reducers/xaiFeaturesReducer';
// import { initializeData } from './Redux-reducers/dataReducer';
// import {setSelectedProfile, setEnergyPriceForSelectedProfile} from '../../../../../Redux-reducers/heatingProfilesReduces'



//types
// import timeslot from "../../../../../Types/types"

//components
// import ChartForSelectedTimeslot from './ChartForSelectedTimeslot';
// import ScatterChart from './Charts/InputsChart';
import InputsChart from './Charts/InputsChart';
import UpdateModelChart from './Charts/UpdateModelChart';
import PredictionsChart from './Charts/PredictionsChart';
import SetpointScheduleChart from './Charts/SetpointScheduleChart';

// Styles 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container:{
        // border: "2px dashed red",
        // width: '80%',
        position:'absolute',
        top:'4px',
        height: '100%',
        width: '100%',
        zIndex: 10,
        borderRadius: 5,
          //  background: '#CFD8DC',
          // background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(50px)',
        //    borderRadius:'25px'
    },
    schedule:{
        // border: "1px solid red",
        height: '95%',
        borderRadius: '25px',
        overflow: 'hidden',
        // height: '12%',
        // width: '100%',

    },
    timeslot:{
        // border: "1px solid lime",
        // borderRight: "1px solid #57CBCC",
        height: '100%',
        "&:hover, &:focus": {
            // borderRight: "10px solid red",
            background : "#57CBCC",
            cursor: 'pointer'
            
        },
        "& .timeslotInfo": {
            display: "none"
          },
          "&:hover .timeslotInfo": {
            display: "flex"
          }
    },
    labels: {
        // border: "1px solid orange",
        height: '40%',
        // background:'pink'
    },
    timeLabel:{
        fontSize: '9px',
    },
    temperatureLabel:{
        fontSize: '14px',
    },
    infoLabel:{
        fontSize: '13px',
        marginLeft: '10px',
        zIndex: 10,
    },
    closeButton:{
        border: "1px solid orange",

      // position:'absolute',
    },
    chartsComponent:{
    //   border: "1px solid pink",

    },
    charts:{
    //   border: "1px solid red",
      height: "100%"

    },
    scatterChart:{
        // height: 
    },
    bl:{
    //   border: "1px solid red",
    //   justifyContent:'center',
    //   alignItems:'center'
    // margin:'auto'
    // textAlign: 'center',
    // verticalAlign: 'middle',
    },
    charts1:{
    //   border: "1px solid red",

    },
    button:{
    //   border: "1px solid pink",

    },
    Chartcontainer:{
    //   border: "1px solid pink",

    },
    Chart:{
    //   border: "1px solid lime",

    }
  }),
);

const XAICharts: React.FC<{xaiFeaturesState:any, homeLabel:any}> = ({xaiFeaturesState, homeLabel}) => { // timeslots type timeslot[] | null

    const classes = useStyles();
    const dispatch = useDispatch();
    const theme = useTheme();
    const breakpoint = useMediaQuery(theme.breakpoints.down("md"));
    //inputs chart 
    const [dataSetForInputsChart, setDataSetForInputsChart] = useState<any>([]);
    const [mappedDataForInputsChart, setMappedDataForInputsChart] = useState<any>([]);
    const [frameCount, setFrameCount] = useState(0);
    //target temperature schedule chart
    const [skip, setSkip] = useState(0);
    const [startOfTheDay, setStartOfTheDay] = useState(dayjs().set('hour',0).set('minutes',0).set('seconds',0));
    const [startOfTheNextDay, setStartOfTheNextDay] = useState(dayjs().add(1, 'days').set('hour',0).set('minutes',0).set('seconds',0));

    // let startOfTheDay= dayjs().set('hour',0).set('minutes',0).set('seconds',0);
    // let startOfTheNextDay = dayjs().add(1, 'days').set('hour',0).set('minutes',0).set('seconds',0);
    // console.log(startOfToday.format(), endOfToday.format())

    // console.log(xaiFeaturesState.selectedProfile.profile)
    // const blbblbl = () => {
    //   const profilePeriodStart = dayjs().set('hour', 0).set('minutes',15).set('seconds', 0);
    //   const profilePeriodEnd = dayjs().set('hour', 0).set('minutes',45).set('seconds', 0);
    //   dispatch(setEnergyPriceForSelectedProfile(profilePeriodStart, profilePeriodEnd)) 
    // }
    
    useEffect(()=>{
        dispatch(setInputChartData(homeLabel, xaiFeaturesState.selectedProfile.profile));
        dispatch(setSetpointScheduleChartBiasAndSlope(homeLabel, xaiFeaturesState.selectedProfile.profile,skip));
        dispatch(setSetpointScheduleChartPeriod(startOfTheDay,startOfTheNextDay));
        // setMappedDataForInputsChart(xaiFeaturesState.inputsChart.entries?.map((entry:any)=>{return [entry.price,entry.temperature]}))


    },[])

    useEffect(()=>{
        const mappedData = xaiFeaturesState.inputsChart?.entries.map((entry:any)=>{return [entry.price,entry.temperature]})
        // setDataSetForInputsChart([[xaiFeaturesState.inputsChart?.entries[0].price, xaiFeaturesState.inputsChart?.entries[0]?.temperature]]);
        setMappedDataForInputsChart(mappedData);
        setDataSetForInputsChart(mappedData)
        setFrameCount(xaiFeaturesState.inputsChart?.entries.length)
        // setDataSetForInputsChart(mappedDataForInputsChart?.slice(0,1));


    },[xaiFeaturesState.inputsChart])
    // console.log(heatingProfiles.energyPriceForSelectedProfile)


    const closeOverlay = () => {
      // dispatch(setSelectedProfile(null))
    }


    const previousFrame = () => {
        const newFrameCount = frameCount-1
        setFrameCount(newFrameCount)

        //
        setDataSetForInputsChart(mappedDataForInputsChart.slice(0,newFrameCount));
        // setDataSetForInputsChart(mappedDataForInputsChart.slice(0,frameCount)); good one if first 

        const newSkip = skip + 1;
        setSkip(newSkip)
        dispatch(setSetpointScheduleChartBiasAndSlope(homeLabel, xaiFeaturesState.selectedProfile.profile,newSkip));

        // console.log(mappedDataForInputsChart.slice(0,frameCount));





    };


    const nextFrame = () => {
        // console.log('next')
        // console.log(frameCount)
        
        setFrameCount(frameCount+1);
        setDataSetForInputsChart(mappedDataForInputsChart.slice(0,frameCount+1));
        const newSkip = skip - 1;
        setSkip(newSkip)
        dispatch(setSetpointScheduleChartBiasAndSlope(homeLabel, xaiFeaturesState.selectedProfile.profile,newSkip));
        // setDataSetForInputsChart(mappedDataForInputsChart.slice(0,frameCount+2)); //good one
        // console.log(mappedDataForInputsChart.slice(0,frameCount+1));

        
        
    };

    const nextTimeslots = () => {
        //next two days
        const startOfTheDayPlusOneDay = startOfTheDay.add(1,'days')
        const startOfTheNextDayPlusOneDay = startOfTheNextDay.add(1,'days')
        setStartOfTheDay(startOfTheDayPlusOneDay)
        setStartOfTheNextDay(startOfTheNextDayPlusOneDay)
        dispatch(setSetpointScheduleChartPeriod(startOfTheDayPlusOneDay,startOfTheNextDayPlusOneDay))

    };

    const previousTimeslots = () => {
        const startOfTheDayMinusOneDay = startOfTheDay.subtract(1,'days')
        const startOfTheNextDayMinusOneDay = startOfTheNextDay.subtract(1,'days')
        setStartOfTheDay(startOfTheDayMinusOneDay)
        setStartOfTheNextDay(startOfTheNextDayMinusOneDay)
        dispatch(setSetpointScheduleChartPeriod(startOfTheDayMinusOneDay,startOfTheNextDayMinusOneDay))

    };
    // console.log(mappedDataForInputsChart,'naxui')



  return (
    <Grid item container xs={10.5} className={classes.chartsComponent} direction="column" justifyContent="center" alignItems="center">
        <Grid item container xs={10.5} className={classes.charts} direction={breakpoint ? "column" : 'column'} justifyContent="center" alignItems="center">
            <Grid item xs={6} container direction="row" justifyContent="center" alignItems="center" className={classes.Chartcontainer}>
                <Grid item xs={6} className={classes.Chart}>
                    <InputsChart dataSet={dataSetForInputsChart} mappedDataForInputsChart={mappedDataForInputsChart} inputs={frameCount}/>
                </Grid>
                <Grid item xs={6} className={classes.Chart}>
                    <UpdateModelChart/>
                </Grid>
            </Grid>
            <Grid item xs={6} container direction="row" justifyContent="center" alignItems="center" className={classes.Chartcontainer}>
                <Grid item xs={6} className={classes.Chart}>
                    <PredictionsChart/>
                </Grid>
                <Grid item xs={6} className={classes.Chart}>
                    <SetpointScheduleChart setpointScheduleChartData={xaiFeaturesState.setpointScheduleChart}/>
                </Grid>
            </Grid>
        </Grid>
        <Grid item container xs={1} className={classes.charts}  direction="row" justifyContent="center" alignItems="center">
            <Grid item container xs={6} direction="row" justifyContent="center" alignItems="center">
                <Grid item container direction="row" justifyContent="center" alignItems="center">
                    <Grid item>
                        <IconButton disabled={frameCount === 0} size='large'  color='primary' onClick={previousFrame}>
                            <NavigateBeforeIcon/>
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Typography variant='subtitle2' >Inputs</Typography>
                    </Grid>
                    <Grid item>
                        <IconButton disabled={frameCount >= xaiFeaturesState.inputsChart?.count } size='large'  color='primary' onClick={nextFrame}>
                            <NavigateNextIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container xs={6} direction="row" justifyContent="center" alignItems="center">
                <Grid item container direction="row" justifyContent="center" alignItems="center">
                    <Grid item>
                        <IconButton size='large'  color='primary' onClick={previousTimeslots}>
                            <NavigateBeforeIcon/>
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Typography variant='subtitle2' >Timeslots</Typography>
                    </Grid>
                    <Grid item>
                        <IconButton size='large'  color='primary' onClick={nextTimeslots}>
                            <NavigateNextIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
  );
};

export default XAICharts;

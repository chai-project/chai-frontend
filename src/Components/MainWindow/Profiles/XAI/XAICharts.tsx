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
import { setXaiScatterData, setPeriodPriceData, setXaiRegionData, setXaiBandData } from '../../../../Redux-reducers/xaiFeaturesReducer';
import { setErrorMessage } from '../../../../Redux-reducers/notificationsReducer';
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
import ProgressCircular from '../../../ProgressBar/ProgressCircular';
import RefreshRequest from '../../../RefreshRequest/RefreshRequest';


// Styles 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // container:{
    //     // border: "2px dashed red",
    //     // width: '80%',
    //     position:'absolute',
    //     top:'4px',
    //     height: '100%',
    //     width: '100%',
    //     zIndex: 10,
    //     borderRadius: 5,
    //       //  background: '#CFD8DC',
    //       // background: 'rgba(0,0,0,0.5)',
    //       backdropFilter: 'blur(50px)',
    //     //    borderRadius:'25px'
    // },
    // schedule:{
    //     // border: "1px solid red",
    //     height: '95%',
    //     borderRadius: '25px',
    //     overflow: 'hidden',
    //     // height: '12%',
    //     // width: '100%',

    // },
    // timeslot:{
    //     // border: "1px solid lime",
    //     // borderRight: "1px solid #57CBCC",
    //     height: '100%',
    //     "&:hover, &:focus": {
    //         // borderRight: "10px solid red",
    //         background : "#57CBCC",
    //         cursor: 'pointer'
            
    //     },
    //     "& .timeslotInfo": {
    //         display: "none"
    //       },
    //       "&:hover .timeslotInfo": {
    //         display: "flex"
    //       }
    // },
    // labels: {
    //     // border: "1px solid orange",
    //     height: '40%',
    //     // background:'pink'
    // },
    // timeLabel:{
    //     fontSize: '9px',
    // },
    // temperatureLabel:{
    //     fontSize: '14px',
    // },
    // infoLabel:{
    //     fontSize: '13px',
    //     marginLeft: '10px',
    //     zIndex: 10,
    // },
    navigateButtons:{
        // width: '10%',
        // height: '10%',
        // border: "1px solid orange",

      // position:'absolute',
    },
    chartsComponent:{
    //   border: "1px solid lime",
    //   height: '100%',
    //   flex: 0,


    },
    charts:{
    //   border: "1px solid red",
    //   height: "100%"

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
      height: '25vh',
      width: '95%',
      [theme.breakpoints.up('md')]: {
        height: '25vh',
      },
      [theme.breakpoints.down('md')]: {
        height: '32vh',
      },
      [theme.breakpoints.down('sm')]: {
          height: '36vh',
        },
        
    
        

    }
  }),
);

const XAICharts: React.FC<{xaiFeaturesState:any, homeLabel:any}> = ({xaiFeaturesState, homeLabel}) => { // timeslots type timeslot[] | null

    const classes = useStyles();
    const dispatch = useDispatch();
    const theme = useTheme();
    const breakpoint = useMediaQuery(theme.breakpoints.down("sm"));
    const breakpointMedium = useMediaQuery(theme.breakpoints.down("sm"));

    //inputs chart 
    const [dataSetForInputsChart, setDataSetForInputsChart] = useState<any>([]);
    const [mappedDataForInputsChart, setMappedDataForInputsChart] = useState<any>([]);
    const [frameCount, setFrameCount] = useState(0);
    //target temperature schedule chart
    const [skipXaiRegionData, setSkipXaiRegionData] = useState(0);
    const [skipXaiBandData, setSkipXaiBandData] = useState(0);


    const [startOfTheDay, setStartOfTheDay] = useState(dayjs().set('hour',0).set('minutes',0).set('seconds',0));
    const [startOfTheNextDay, setStartOfTheNextDay] = useState(dayjs().add(1, 'days').set('hour',0).set('minutes',0).set('seconds',0));

    useEffect(()=>{
        dispatch(setXaiScatterData(homeLabel, xaiFeaturesState.selectedProfile.profile));
        dispatch(setXaiRegionData(homeLabel, xaiFeaturesState.selectedProfile.profile,skipXaiRegionData));
        dispatch(setXaiBandData(homeLabel, xaiFeaturesState.selectedProfile.profile,skipXaiBandData));
        dispatch(setPeriodPriceData(startOfTheDay,startOfTheNextDay));
        // setMappedDataForInputsChart(xaiFeaturesState.inputsChart.entries?.map((entry:any)=>{return [entry.price,entry.temperature]}))
    },[])

    useEffect(()=>{
        const mappedData = xaiFeaturesState.xaiScatterData?.entries.map((entry:any)=>{return [entry.price,entry.temperature]}).reverse(); // because the first one is the latest
        // setDataSetForInputsChart([[xaiFeaturesState.inputsChart?.entries[0].price, xaiFeaturesState.inputsChart?.entries[0]?.temperature]]);
        setMappedDataForInputsChart(mappedData);
        setDataSetForInputsChart(mappedData)
        setFrameCount(xaiFeaturesState.xaiScatterData?.entries.length)
        // setDataSetForInputsChart(mappedDataForInputsChart?.slice(0,1));

    },[xaiFeaturesState.xaiScatterData])


    //useEffect for error notifications!
    useEffect(()=>{
        if(xaiFeaturesState.periodPriceDataError){
            dispatch(setErrorMessage(xaiFeaturesState.periodPriceDataError, 5000))
        }else if(xaiFeaturesState.xaiRegionDataError){
            dispatch(setErrorMessage(xaiFeaturesState.xaiRegionDataError, 5000))
        } else if (xaiFeaturesState.xaiBandDataError){
            dispatch(setErrorMessage(xaiFeaturesState.xaiBandDataError, 5000))
        }else if(xaiFeaturesState.xaiScatterDataError){
            dispatch(setErrorMessage(xaiFeaturesState.xaiScatterDataError, 5000))
        }
    },[xaiFeaturesState.periodPriceDataError, xaiFeaturesState.xaiRegionDataError, xaiFeaturesState.xaiBandDataError, xaiFeaturesState.xaiScatterDataError])

    // useEffect(()=>{
    //     console.log(frameCount, skipXaiBandData, skipXaiRegionData)
    // },[frameCount, skipXaiBandData, skipXaiRegionData])

    
    const previousFrame = () => {
        const newFrameCount = frameCount-1
        setFrameCount(newFrameCount)
        if(!xaiFeaturesState.xaiScatterDataError){
            setDataSetForInputsChart(mappedDataForInputsChart.slice(0,newFrameCount));
        }
        // setDataSetForInputsChart(mappedDataForInputsChart.slice(0,newFrameCount));
        if(xaiFeaturesState.xaiBandData?.status === 200 && !xaiFeaturesState.xaiBandDataError){
            const newSkipXaiBandData = skipXaiBandData + 1;
            setSkipXaiBandData(newSkipXaiBandData);
            dispatch(setXaiBandData(homeLabel, xaiFeaturesState.selectedProfile.profile,newSkipXaiBandData));
        };
        if(xaiFeaturesState.xaiRegionData?.status === 200 && !xaiFeaturesState.xaiRegionDataError){
            const newSkipXaiRegionData = skipXaiRegionData + 1;
            setSkipXaiRegionData(newSkipXaiRegionData);
            dispatch(setXaiRegionData(homeLabel, xaiFeaturesState.selectedProfile.profile,newSkipXaiRegionData));
        };
    };

    const nextFrame = () => {
        setFrameCount(frameCount+1);
        if(!xaiFeaturesState.xaiScatterDataError){
            setDataSetForInputsChart(mappedDataForInputsChart.slice(0,frameCount+1));
        }
        // setDataSetForInputsChart(mappedDataForInputsChart.slice(0,frameCount+1));
        if(skipXaiBandData > 0 && !xaiFeaturesState.xaiBandDataError){
            const newSkipXaiBandData = skipXaiBandData - 1;
            setSkipXaiBandData(newSkipXaiBandData);
            dispatch(setXaiBandData(homeLabel, xaiFeaturesState.selectedProfile.profile,newSkipXaiBandData));
        }
        if(skipXaiRegionData > 0 && !xaiFeaturesState.xaiRegionDataError){
            const newSkipXaiRegionData = skipXaiRegionData - 1;
            setSkipXaiRegionData(newSkipXaiRegionData);
            dispatch(setXaiRegionData(homeLabel, xaiFeaturesState.selectedProfile.profile,newSkipXaiRegionData));
        }  
    };

    const nextTimeslots = () => {
        const startOfTheDayPlusOneDay = startOfTheDay.add(1,'days')
        const startOfTheNextDayPlusOneDay = startOfTheNextDay.add(1,'days')
        setStartOfTheDay(startOfTheDayPlusOneDay)
        setStartOfTheNextDay(startOfTheNextDayPlusOneDay)
        dispatch(setPeriodPriceData(startOfTheDayPlusOneDay,startOfTheNextDayPlusOneDay))

    };

    const previousTimeslots = () => {
        const startOfTheDayMinusOneDay = startOfTheDay.subtract(1,'days')
        const startOfTheNextDayMinusOneDay = startOfTheNextDay.subtract(1,'days')
        setStartOfTheDay(startOfTheDayMinusOneDay)
        setStartOfTheNextDay(startOfTheNextDayMinusOneDay)
        dispatch(setPeriodPriceData(startOfTheDayMinusOneDay,startOfTheNextDayMinusOneDay))

    };

  return (
    <Grid xs={12} item container className={classes.chartsComponent} direction="column" justifyContent="center" alignItems="center">
        <Grid item container xs={breakpoint ? 11.1 : 10.4} className={classes.charts} direction={breakpoint ? "column" : 'column'} justifyContent="center" alignItems="center">
            <Grid item xs={6} container direction="row" justifyContent="center" alignItems="center" className={classes.Chartcontainer}>
                <Grid item xs={6} container className={classes.Chart} direction="row" justifyContent="center" alignItems="center">
                    {xaiFeaturesState.xaiScatterDataError ? <RefreshRequest showError={"Error"}  action={()=>{dispatch(setXaiScatterData(homeLabel, xaiFeaturesState.selectedProfile.profile));}}/> :
                        <InputsChart dataSet={dataSetForInputsChart} mappedDataForInputsChart={mappedDataForInputsChart} inputs={frameCount}/>
                    }
                </Grid>
                <Grid item xs={6} container className={classes.Chart} direction="row" justifyContent="center" alignItems="center">
                    {xaiFeaturesState.xaiRegionDataError  ? <RefreshRequest showError={"Error"} action={()=>{dispatch(setXaiRegionData(homeLabel, xaiFeaturesState.selectedProfile.profile,skipXaiRegionData));}}/>:
                        <UpdateModelChart xaiRegionData={xaiFeaturesState.xaiRegionData}/>
                    }
                </Grid>
            </Grid>
            <Grid item xs={6} container direction="row" justifyContent="center" alignItems="center" className={classes.Chartcontainer}>
                <Grid item xs={6} container className={classes.Chart} direction="row" justifyContent="center" alignItems="center">
                    {xaiFeaturesState.xaiBandDataError ? <RefreshRequest showError={"Error"} action={()=>{dispatch(setXaiBandData(homeLabel, xaiFeaturesState.selectedProfile.profile,skipXaiBandData));}}/> : 
                        <PredictionsChart xaiBandData={xaiFeaturesState.xaiBandData?.data}/>
                    }
                </Grid>
                <Grid item xs={6} container className={classes.Chart} direction="row" justifyContent="center" alignItems="center">
                    {xaiFeaturesState.periodPriceDataError || xaiFeaturesState.xaiRegionDataError ? <RefreshRequest showError={"Error"} action={()=>{dispatch(setPeriodPriceData(startOfTheDay,startOfTheNextDay)); dispatch(setXaiRegionData(homeLabel, xaiFeaturesState.selectedProfile.profile,skipXaiRegionData)) }}/>: 
                        <SetpointScheduleChart xaiRegionData={xaiFeaturesState.xaiRegionData} periodPriceData={xaiFeaturesState.periodPriceData}/>
                    }
                </Grid>
            </Grid>
        </Grid>
        <Grid item container xs={0.5} className={classes.navigateButtons}  direction="row" justifyContent="center" alignItems="center">
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
                        <IconButton disabled={frameCount >= xaiFeaturesState.xaiScatterData?.count } size='large'  color='primary' onClick={nextFrame}>
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
                        <Typography variant='subtitle2' >Day</Typography>
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

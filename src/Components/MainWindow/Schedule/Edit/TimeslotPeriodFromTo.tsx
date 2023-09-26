import React, {useEffect, useState} from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import dayjs from 'dayjs'
import { Grid, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent} from '@mui/material/';
import {makeStyles, Theme, createStyles, useTheme  } from '@material-ui/core/styles';

//styles 
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main:{

    },
    from:{

    },
    to:{

    },
    labelHours: {

      "&.MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#5ACBCC" 
        },
        "&:hover fieldset": {

        },
        "&.Mui-focused fieldset": {

        },
      },
      "&.Mui-focused": {

      },
      [theme.breakpoints.down('md')]: {
        height:'35px',
        width: '60px',
        "&.MuiOutlinedInput-root": {
          fontSize:'11px',
        }
      }
      
    },
    labelMinutes: {
      width:'70px',
      "&.MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#5ACBCC"
        },
        "&:hover fieldset": {

        },
        "&.Mui-focused fieldset": {

        },
      },
      "&.Mui-focused": {

      },
      [theme.breakpoints.down('md')]: {
        height:'35px',
        width: '60px',
        "&.MuiOutlinedInput-root": {
          fontSize:'11px',
        }
      }
      
    },
    icon:{
      color:"#5ACBCC !important"
    },
    textLabel: {
      fontSize:'10px',
      [theme.breakpoints.down('md')]: {
        fontSize:'9px',
      }
    }
  }),
);

const TimeslotPeriodFromTo: React.FC<{ timeslots:any, asignedTimeslot:any, sortTimeslots:any, setTimeslotToAdd:any, timeslotToAdd:any, isForAddingATimeslot:boolean  }> = ({ timeslots, asignedTimeslot, sortTimeslots, setTimeslotToAdd , timeslotToAdd, isForAddingATimeslot}) => {
  const [hoursFrom, setHoursFrom] = useState<string>("00");
  const [minutesFrom, setMinutesFrom] = useState<string>("00");
  const [hoursTo, setHoursTo] = useState<string>("24");
  const [minutesTo, setMinutesTo] = useState<string>("00");
  const [listHoursToSelectFrom,  setListHoursToSelectFrom] = useState<number[]|null>(null)
  const [listMinutesToSelectFrom,  setListMinutesToSelectFrom] = useState<number[]|null>(null)
  const [listHoursToSelectTo,  setListHoursToSelectTo] = useState<number[]|null>(null)
  const [listMinutesToSelectTo,  setListMinutesToSelectTo] = useState<number[]|null>(null)

  useEffect(()=>{
    if(asignedTimeslot.profileName != null){
      setHoursFrom(asignedTimeslot.profileStart.split(':')[0]);
      setMinutesFrom(asignedTimeslot.profileStart.split(':')[1]);
      setHoursTo(asignedTimeslot.profileEnd.split(':')[0]);
      setMinutesTo(asignedTimeslot.profileEnd.split(':')[1]);
    }

    let asignedTimeslotMinutesFrom = parseInt(asignedTimeslot.profileStart.split(':')[1])
    let asignedTimeslotMinutesTo = parseInt(asignedTimeslot.profileEnd.split(':')[1])
    let asignedTimeslotHoursFrom = parseInt(asignedTimeslot.profileStart.split(':')[0])
    let asignedTimeslotHoursTo = parseInt(asignedTimeslot.profileEnd.split(':')[0])

    if(asignedTimeslot.profileName === null){
      setListHoursToSelectFrom(Array.from(Array(24).keys()))
      setListMinutesToSelectFrom([0,15,30,45])
    } else {
      if( asignedTimeslotMinutesTo > 0){
        setListHoursToSelectFrom(Array.from(Array(parseInt(asignedTimeslot.profileEnd.split(':')[0])+1).keys()))
        if(asignedTimeslotHoursTo === asignedTimeslotHoursFrom){
          setListMinutesToSelectFrom(asignedTimeslotMinutesTo === 15 ? [0] : asignedTimeslotMinutesTo === 30 ? [0,15] : asignedTimeslotMinutesTo === 45 ? [0,15,30] : null )
        }else{
          setListMinutesToSelectFrom([0,15,30,45])
        }
      }else{
        setListHoursToSelectFrom(Array.from(Array(parseInt(asignedTimeslot.profileEnd.split(':')[0])).keys()))
        setListMinutesToSelectFrom(asignedTimeslotMinutesFrom === 0 ? [0,15,30,45] : asignedTimeslotMinutesFrom === 15 ? [15,30,45] : asignedTimeslotMinutesFrom === 30 ? [30,45] : asignedTimeslotMinutesFrom === 45 ? [45] : null)
      }
    }
    
    let hourList:any[] = []
    for(let i = asignedTimeslotHoursFrom; i<= 24; i++){
      hourList.push(i)
    }
    setListHoursToSelectTo(hourList)
    if(asignedTimeslotHoursTo === asignedTimeslotHoursFrom){
      setListMinutesToSelectTo(asignedTimeslotMinutesFrom === 0 ? [15,30,45] : asignedTimeslotMinutesFrom === 15 ? [30,45] : asignedTimeslotMinutesFrom === 30 ? [45] : null)
    }else{
      if(asignedTimeslotHoursTo === 24 && asignedTimeslot.profileName !== null){
        setListMinutesToSelectTo([0])
      }else{
        setListMinutesToSelectTo([0,15,30,45])
      }
    }

  },[asignedTimeslot]);

  const classes = useStyles();
  const theme = useTheme();
  const breakpoint = useMediaQuery(theme.breakpoints.down("sm"));

  const newTimeslotsTest = (period:any) => {
    const newTimeslots: any[] = []
    for(let i =0; i<timeslots.length; i++){
      if(asignedTimeslot.id === timeslots[i].id){
        if(i === timeslots.length -1){
          let startOfThePreviousTimeslot = dayjs().set('hour', timeslots[i-1].profileStart.split(":")[0]).set('minute', timeslots[i-1].profileStart.split(":")[1]).set('second', 0).add(15,'minutes')
          const hours:String = startOfThePreviousTimeslot.hour() < 10 ? `0${startOfThePreviousTimeslot.hour()}` : `${startOfThePreviousTimeslot.hour()}`
          const minutes:String = startOfThePreviousTimeslot.minute() < 10 ? `0${startOfThePreviousTimeslot.minute()}` : `${startOfThePreviousTimeslot.minute()}` 
          if(period.to !== asignedTimeslot.profileStart){
            if(period.from <= timeslots[i-1].profileStart ){
              newTimeslots[i-1].profileEnd = `${hours}:${minutes}`
              newTimeslots.push({...timeslots[i], profileStart: `${hours}:${minutes}` , profileEnd: "24:00"})
            }else{
              newTimeslots[i-1].profileEnd = period.from
              newTimeslots.push({...timeslots[i], profileStart: period.from , profileEnd: "24:00"})
            }
          }else{
            newTimeslots.push({...timeslots[i], profileStart: period.from , profileEnd: "24:00"})
        
          }
        }else if(i === 0 ){
          let endOfTheNextTimeslot = dayjs().set('hour', timeslots[i+1].profileEnd.split(":")[0]).set('minute', timeslots[i+1].profileEnd.split(":")[1]).set('second', 0).subtract(15,'minutes')
          const hours:String = endOfTheNextTimeslot.hour() < 10 ? `0${endOfTheNextTimeslot.hour()}` : `${endOfTheNextTimeslot.hour()}`
          const minutes:String = endOfTheNextTimeslot.minute() < 10 ? `0${endOfTheNextTimeslot.minute()}` : `${endOfTheNextTimeslot.minute()}` 
          if(period.from !== asignedTimeslot.profileStart){
            newTimeslots.push({...timeslots[i], profileStart: `00:00`})
          }else{
            if(period.to < timeslots[i+1].profileEnd){
              newTimeslots.push({...timeslots[i], profileStart: `00:00`, profileEnd: period.to })
            }else{
              newTimeslots.push({...timeslots[i], profileStart: `00:00`, profileEnd: `${hours}:${minutes}` })
            }
          }
        }else
        if(period.from <= newTimeslots[i-1].profileStart){
          let startOfPreviousTimeslotWith15MinExtra = dayjs().set('hour', newTimeslots[i-1].profileStart.split(":")[0]).set('minute', newTimeslots[i-1].profileStart.split(":")[1]).set('second', 0).add(15,'minutes')
          const hours:String = startOfPreviousTimeslotWith15MinExtra.hour() < 10 ? `0${startOfPreviousTimeslotWith15MinExtra.hour()}` : `${startOfPreviousTimeslotWith15MinExtra.hour()}`
          const minutes:String = startOfPreviousTimeslotWith15MinExtra.minute() < 10 ? `0${startOfPreviousTimeslotWith15MinExtra.minute()}` : `${startOfPreviousTimeslotWith15MinExtra.minute()}` 
          newTimeslots[i-1].profileEnd = `${hours}:${minutes}`
          newTimeslots.push({...timeslots[i], profileStart: `${hours}:${minutes}`, profileEnd: period.to })
        } else 
        if(period.to >= timeslots[i+1].profileEnd){
          let nextTimeslotEndTime = dayjs().set('hour', timeslots[i+1].profileEnd.split(":")[0]).set('minute', timeslots[i+1].profileEnd.split(":")[1]).set('second', 0).subtract(15,'minutes')
          const hours:String = nextTimeslotEndTime.hour() < 10 ? `0${nextTimeslotEndTime.hour()}` : `${nextTimeslotEndTime.hour()}`
          const minutes:String = nextTimeslotEndTime.minute() < 10 ? `0${nextTimeslotEndTime.minute()}` : `${nextTimeslotEndTime.minute()}` 
          newTimeslots.push({...timeslots[i], profileStart: period.from, profileEnd:  `${hours}:${minutes}` })
        }else if(period.to <= period.from){
          let startOfTimeslotStart = dayjs().set('hour', period.from.split(":")[0]).set('minute', period.from.split(":")[1]).set('second', 0).add(15,'minutes')
          const hours:String = startOfTimeslotStart.hour() < 10 ? `0${startOfTimeslotStart.hour()}` : `${startOfTimeslotStart.hour()}`
          const minutes:String = startOfTimeslotStart.minute() < 10 ? `0${startOfTimeslotStart.minute()}` : `${startOfTimeslotStart.minute()}` 
          newTimeslots.push({...timeslots[i], profileStart: period.from, profileEnd: `${hours}:${minutes}` })
        } else if(newTimeslots[i-1]){ 
            if(period.from <= newTimeslots[i-1].profileStart){
              let startOfPreviousTimeslotWith15MinExtra = dayjs().set('hour', newTimeslots[i-1].profileStart.split(":")[0]).set('minute', newTimeslots[i-1].profileStart.split(":")[1]).set('second', 0).add(15,'minutes')
              const hours:String = startOfPreviousTimeslotWith15MinExtra.hour() < 10 ? `0${startOfPreviousTimeslotWith15MinExtra.hour()}` : `${startOfPreviousTimeslotWith15MinExtra.hour()}`
              const minutes:String = startOfPreviousTimeslotWith15MinExtra.minute() < 10 ? `0${startOfPreviousTimeslotWith15MinExtra.minute()}` : `${startOfPreviousTimeslotWith15MinExtra.minute()}` 
              newTimeslots[i-1].profileEnd = `${hours}:${minutes}`
              newTimeslots.push({...timeslots[i], profileStart: `${hours}:${minutes}`, profileEnd: period.to })
            }else if(period.from >= timeslots[i+1].profileStart){
               // here checks if the current timeslot is later than the later one.
            }else{
              newTimeslots[i-1].profileEnd = period.from
              newTimeslots.push({...timeslots[i], profileStart: period.from, profileEnd: period.to })
            }
        }
        else{
          newTimeslots.push({...timeslots[i], profileStart: period.from, profileEnd: period.to })
        }
      }else{
        if(i === timeslots.length -1){
          newTimeslots.push({...timeslots[i], profileStart: period.to === "24:00" ? "23:45" : period.to, profileEnd: "24:00"})
        }else{
          newTimeslots.push({...timeslots[i]})
        }
      }
    }
    sortTimeslots(newTimeslots)
  };

  const checkAddNewTimeslot = (period:any) => {
    if(period.to <= period.from ){
      let fromPlus15Min = dayjs().set('hour', period.from.split(":")[0]).set('minute', period.from.split(":")[1]).set('second', 0).add(15,'minutes')
      const hours:string = fromPlus15Min.hour() < 10 ? `0${fromPlus15Min.hour()}` : `${fromPlus15Min.hour()}`
      const minutes:string = fromPlus15Min.minute() < 10 ? `0${fromPlus15Min.minute()}` : `${fromPlus15Min.minute()}` 
      setHoursTo(hours)
      setMinutesTo(minutes)
      setTimeslotToAdd({...timeslotToAdd, profileStart: period.from, profileEnd: `${hours}:${minutes}` })
    }else {
      setTimeslotToAdd({...timeslotToAdd, profileStart: period.from, profileEnd: period.to })
    }
  };

  const handleSetHoursFrom = (event: SelectChangeEvent) => {
    setHoursFrom(String(event.target.value));
    const period = {from: `${event.target.value}:${minutesFrom}`, to: `${hoursTo}:${minutesTo}`} 

    if(!isForAddingATimeslot){
      newTimeslotsTest(period)
    }else{
      checkAddNewTimeslot(period)
    }
  };

  const handleSetMinutesFrom = (event: SelectChangeEvent) => {
    setMinutesFrom(String(event.target.value));
    const period = {from: `${hoursFrom}:${event.target.value}`, to: `${hoursTo}:${minutesTo}`} 
    if(!isForAddingATimeslot){
      newTimeslotsTest(period)
    }else{
      checkAddNewTimeslot(period)
    }
  };

  const handleSetHoursTo = (event: SelectChangeEvent) => {
    setHoursTo(String(event.target.value));
    const period = {from: `${hoursFrom}:${minutesFrom}`, to: `${event.target.value}:${minutesTo}`} 
    if(!isForAddingATimeslot){
      newTimeslotsTest(period)
    }else{
      checkAddNewTimeslot(period)
    }
  };

  const handleSetMinutesTo = (event: SelectChangeEvent) => {
    setMinutesTo(String(event.target.value));
    const period = {from: `${hoursFrom}:${minutesFrom}`, to: `${hoursTo}:${event.target.value}`} 
    if(!isForAddingATimeslot){
      newTimeslotsTest(period)
    }else{
      checkAddNewTimeslot(period)
    }
  };
  
  return (
    <Grid container className={classes.main} direction={breakpoint ? "column" : "row"} justifyContent="center" alignItems="center"> {/**{breakpoint ? "column" : "row"} */}
      <Grid item container xs={6} className={classes.from} direction="column" justifyContent="center" alignItems="flex-start">
        <Grid item container direction="row" justifyContent="flex-start" alignItems="center">
          <Grid item>
            <FormControl sx={{ m: 1, maxWidth: 120 }} size="small">
              <InputLabel id="demo-select-small">From</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={hoursFrom}
                label="HoursFrom"
                onChange={handleSetHoursFrom}
                className={classes.labelHours}
                inputProps={{
                  classes: {
                    icon: classes.icon,
                      },
                  }}
              >
                {listHoursToSelectFrom?.map((hour)=>{
                  return(
                    <MenuItem value={hour < 10 ? "0"+hour : hour}>{hour < 10 ? "0"+hour : hour}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item className={classes.textLabel}>:</Grid>
          <Grid item>
            <FormControl sx={{ m: 1, maxWidth: 120 }} size="small">
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={minutesFrom}
                onChange={handleSetMinutesFrom}
                className={classes.labelMinutes}
                inputProps={{
                  classes: {
                    icon: classes.icon,
                      },
                  }}
              >
                {listMinutesToSelectFrom?.map((minutes)=>{
                  return(
                    <MenuItem value={minutes < 15 ? "0"+minutes : minutes}>{minutes < 15 ? "0"+minutes : minutes}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container xs={6} className={classes.to} direction="column" justifyContent="flex-start" alignItems="flex-start">
        <Grid item container direction="row" justifyContent="flex-start" alignItems="center">
          <Grid item>
            <FormControl sx={{ m: 1, maxWidth: 120 }} size="small">
              <InputLabel id="demo-select-small">To</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={hoursTo}
                label="HoursTo"
                onChange={handleSetHoursTo}
                className={classes.labelHours}
                inputProps={{
                  classes: {
                    icon: classes.icon,
                      },
                  }}
              >
                {listHoursToSelectTo?.map((hour)=>{
                  return(
                    <MenuItem value={hour < 10 ? "0"+hour : hour}>{hour < 10 ? "0"+hour : hour}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item className={classes.textLabel}>:</Grid>
          <Grid item>
            <FormControl sx={{ m: 1, maxWidth: 120 }} size="small">
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={minutesTo}
                onChange={handleSetMinutesTo}
                className={classes.labelMinutes}
                inputProps={{
                  classes: {
                    icon: classes.icon,
                      },
                  }}
              >
                {listMinutesToSelectTo?.map((minutes)=>{
                  return(
                    <MenuItem value={minutes < 15 ? "0"+minutes : minutes}>{minutes < 15 ? "0"+minutes : minutes}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default TimeslotPeriodFromTo
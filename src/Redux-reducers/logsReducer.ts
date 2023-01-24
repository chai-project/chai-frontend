import { Dispatch } from 'redux';
import services from '../Services/services';
import utils from '../Components/Utils/utils';
import dayjs from 'dayjs';


const currentTime = dayjs();
const today = currentTime.startOf('day');


const getPreviousNextAndLastValveSetTypeLog = (firstPart:any, secondPart:any) => {
  let previousIndex:any = null
  const previous = firstPart?.findLast((rawLog:any, index:number)=>{
    if(rawLog.category === 'VALVE_SET'){
      previousIndex = index
      return rawLog
    }
  })
  let nextIndex:any = null
  const next = secondPart?.find((rawLog:any, index:number)=>{
    if(rawLog.category === 'VALVE_SET'){
      nextIndex = index
      return rawLog
    }
  })
  let lastIndex:any = null
  const last = secondPart?.findLast((rawLog:any, index:number, arr:any)=>{
    if(rawLog.category === 'VALVE_SET'){
      lastIndex = index
      return rawLog
    }
  })
  return {previous:{rawLog:previous, index:previousIndex}, next:{rawLog: next, index:nextIndex}, last:{rawLog:last,index:lastIndex}}
};

const getLogsNoDuplicates = (rawLogs:any) => {
  let previousValveSetCategoryLog:any = null;
  let indexOfPreviousValveSetLog:any = null;
  let noDuplicates:any[] = [];

  rawLogs.forEach((rawLog:any, index:number, arr:any)=>{
    if(rawLog.category === 'VALVE_SET'){
        if(previousValveSetCategoryLog){
          const checkIfPreviousValveSetLogParametersAreEqual = utils.areEqualArray(rawLog.parameters, previousValveSetCategoryLog.parameters);
          if(checkIfPreviousValveSetLogParametersAreEqual){
            noDuplicates.splice(indexOfPreviousValveSetLog,1);
            indexOfPreviousValveSetLog = null;
            noDuplicates.push(rawLog);
            previousValveSetCategoryLog = rawLog
            indexOfPreviousValveSetLog = noDuplicates.length - 1;
          }else{
            indexOfPreviousValveSetLog = null;
            noDuplicates.push(rawLog);
            previousValveSetCategoryLog = rawLog
            indexOfPreviousValveSetLog = noDuplicates.length - 1;
          }
        }else{
          noDuplicates.push(rawLog)
          indexOfPreviousValveSetLog = noDuplicates.length -1 ;
          previousValveSetCategoryLog = rawLog
        }
    }else{
      return noDuplicates.push(rawLog);
    }
  });
  return noDuplicates
};

const transformLogs = (rawLogs:any[]) => {
  return rawLogs.map((rawLog:any, index:number, arr:any)=>{
    let priceSensitivity = null
    if(rawLog.parameters.length === 5 ){
        const segment = utils.getSegment(rawLog.parameters[3], rawLog.parameters[4] )
        priceSensitivity =  segment === 0 ? "Negative" : segment === 1 ? "Very low" : segment === 2 ? "Low" : segment === 3 ? "Moderate" : segment === 4 ? "High" : segment === 5 ?  "Very high" : "Unknown"
    }
    const profileName = rawLog.parameters[0] === 1 ? "Nights" :  rawLog.parameters[0] === 2 ? "Mornings" :  rawLog.parameters[0] === 3 ? "Weekdays" : rawLog.parameters[0] === 4 ? "Evenings" :  "Weekends"
    const timestamp = dayjs(rawLog.timestamp)
    const hours = timestamp.get('hour') 
    const minutes = timestamp.get('minute') 
    const date = timestamp.format('DD/MM/YYYY');
    const time =`${hours}:${minutes < 10 ? '0'+minutes : minutes }`;
    const price = Math.round(rawLog.parameters[1] * 100) / 100;
    const setpoint = Math.round(rawLog.parameters[2]*2)/2;
    const prefferedTemperature = rawLog.parameters[4]?.toFixed(2);
    
    switch(rawLog.category) {
      case "VALVE_SET":
        return {dateAndTime: rawLog.timestamp ,date: date ,time: time  , category: "System" , description: `The system set the target temperature to ${setpoint}°C because the current price is ${price} p/kWh and the active profile is ${profileName} where the AI believes your price sensitivity is ${priceSensitivity} and your preferred temperature (if energy were free) is ${prefferedTemperature}°C.`}
        break;
      case "SETPOINT_MODE":
        if(rawLog.parameters[0] === 'override' && rawLog.parameters[1] !== null ){
          return  {dateAndTime: rawLog.timestamp , date: date ,time: time , category: "User" , description: `You set the target temperature to ${Math.round(rawLog.parameters[1]*2)/2}°C (${rawLog.parameters[0]} mode is now active).` }
        }else {
          return  {dateAndTime: rawLog.timestamp ,date: date ,time: time  , category: "User" , description: `You switched to ${rawLog.parameters[0]} mode.` }
        }
        break;
      case "PROFILE_UPDATE":
        
        return {dateAndTime: rawLog.timestamp ,date: date ,time: time , category: "System" , description: `Profile ${profileName} has been updated because you set the target temperature to ${setpoint}°C when the price was ${price} p/kWh where the AI now believes your price sensitivity is ${priceSensitivity} and your preferred temperature (if energy were free) is ${prefferedTemperature}°C.`}
        break;
      case "PROFILE_RESET":
        return {dateAndTime: rawLog.timestamp ,date: date ,time: time  , category: "User" , description: `You reset profile ${profileName}.`}
        break;
      case "SCHEDULE_EDIT":
        return {dateAndTime: rawLog.timestamp ,date: date ,time: time  , category: "User" , description: `You edited the schedule.`}
        break;
      case "WELCOME":
        return {dateAndTime: rawLog.timestamp ,date: date ,time: time  , category: "System" , description: `Welcome to Squid ${rawLog.parameters[0]}!`}
        break;
      default:
        return {dateAndTime: rawLog.timestamp ,date: date ,time: time  , category: rawLog.category , description: ""}
        break;
    }
  })
};


const logsReducer = (state: any = {logs:null, skip:0, lastValveSetTypeRawLog:null, from: null , to: null} , action:any) => {
    switch(action.type) {
        case "INITIALISE_LOGS":
            return  state = {...state, ...action.data}
        case "GET_MORE_LOGS_ON_USER_CLICK":
            if(utils.areEqualArray(state.lastValveSetTypeRawLog.rawLog?.parameters, action.data.lastValveSetTypeRawLog.rawLog?.parameters) ){
              state.logs.splice(state.lastValveSetTypeRawLog.index,1) // buvo slice, taciau splcie iskerpa is previous array
            }
            return   state = {...state, logs: state.logs.concat(action.data.logs) ,skip:action.data.skip, lastValveSetTypeRawLog: {rawLog: action.data.lastValveSetTypeRawLog.rawLog ? action.data.lastValveSetTypeRawLog.rawLog : state.lastValveSetTypeRawLog.rawLog , index: action.data.lastValveSetTypeRawLog.index ? state.logs.length + action.data.lastValveSetTypeRawLog.index : state.lastValveSetTypeRawLog.index} } //state.logs.length + action.data.lastValveSetTypeRawLog.index
        case "REFRESH_LOG_STATE":
            // let newLogs = action.data.logs 
            let newLogs:any = []
            if(utils.areEqualArray(action.data.lastValveSetTypeRawLog.rawLog?.parameters, state.firstValveSetTypeRawLog.rawLog?.parameters)){
              action.data.logs.forEach((log:any,index:any)=>{
                if(index !== action.data.lastValveSetTypeRawLog.index){
                  newLogs.push(log)
                }
              })
            }else{
              newLogs = action.data.logs 
            }
            let newLogsToAdd:any = [];
            newLogs.forEach((log:any,index:any)=>{
              let found:any = false
              for(let i=0; i < state.logs.length ;i++){
                if(JSON.stringify(state.logs[i]) === JSON.stringify(log)){
                  found = true
                }
              }
              if(!found){
                newLogsToAdd.push(log)
              } 
            })
            return state = {...state, logs: newLogsToAdd.concat(state.logs) , firstValveSetTypeRawLog: action.data.firstValveSetTypeRawLog} 
        default:
            return state
    }
}

export const initialiseLogs = (label:String, from:any, to:any) => {

  const period = {
    from: from ? from : today.subtract(6,'day'),
    to: to ? to.add(1,'day') : currentTime.startOf('day').add(1,'day')
  }

    return async (dispatch : Dispatch) => {

        let logs:any[] = []
        let skip = 0;
        let limit = 200;
        let previousIndex = 0
        while (logs.length < limit + 1) {
          const rawLogsRequest = await services.getLogs(label, skip, limit, period.from, period.to );
          if(rawLogsRequest.length === 0){
            break;
          }else{
            const rawLogs = getLogsNoDuplicates(rawLogsRequest);
            const previousNextAndLast = getPreviousNextAndLastValveSetTypeLog(logs, rawLogs)
            const firstValveSetLog = getPreviousNextAndLastValveSetTypeLog(null, logs)
            if(utils.areEqualArray(previousNextAndLast.previous.rawLog?.parameters, previousNextAndLast.next.rawLog?.parameters)){
              logs.splice(previousNextAndLast.previous.index, 1);
            }
            logs =  logs.concat(rawLogs);
            const transformedLogs = transformLogs(logs)
            skip += limit;
            dispatch({
              type:"INITIALISE_LOGS",
              data: {logs:transformedLogs, skip:skip, firstValveSetTypeRawLog: { rawLog: firstValveSetLog.next.rawLog, index: firstValveSetLog.next.index}, lastValveSetTypeRawLog: { rawLog:previousNextAndLast.last.rawLog, index: logs.length - (rawLogs.length - previousNextAndLast.last.index) }, from: period.from, to: period.to > today ? today : period.to }
            })
          };
        };
    };
};


export const getMoreLogsOnUserClick = (label:String, previousSkip:any, previousLog:any, from:any, to:any) => { //cia bus datos nuo iki...
  return async (dispatch : Dispatch) => {
      let logs:any[] = []
      let skip = previousSkip;
      let limit:number|null = 200;
      let lastRawLog = previousLog
      let previousNextAndLast:any
      let previousValveSetIndex:any

      while (logs.length < limit + 1) {
        const rawLogsRequest = await services.getLogs(label, skip, limit, from, to.add(1,'day'), );
        if(rawLogsRequest.length === 0 ){
          limit = null
          lastRawLog = null
          break;
        }else {
          const rawLogs = getLogsNoDuplicates(rawLogsRequest);
          previousNextAndLast = getPreviousNextAndLastValveSetTypeLog(logs, rawLogs)
          if(utils.areEqualArray(previousNextAndLast.previous.rawLog?.parameters, previousNextAndLast.next.rawLog?.parameters)){
            logs.splice(previousNextAndLast.previous.index, 1)
            // console.log(previousNextAndLast.previous)
            // console.log(logs[previousNextAndLast.previous.index])
          }
          logs =  logs.concat(rawLogs);
          previousValveSetIndex =  rawLogs.length - previousNextAndLast.last.index
          skip += limit;
        }
      };
      const transformedLogs = transformLogs(logs)
      if(transformedLogs.length > 0){

        dispatch({
          type:"GET_MORE_LOGS_ON_USER_CLICK",
          data: {logs:transformedLogs, skip:skip, lastValveSetTypeRawLog: { rawLog: previousNextAndLast?.last ? previousNextAndLast.last.rawLog : null , index: previousNextAndLast?.last ? logs.length - previousValveSetIndex : null }}
        })
      }
  };
};



export const refreshLogState = (label:String, from:any, to:any) => {

  // const period = {
  //   from: from ? from : today.subtract(6,'day'),
  //   to: to ? to.add(1,'day') : currentTime.startOf('day').add(1,'day')
  // }

    return async (dispatch : Dispatch, getState: any) => {

        const timeOfTheFirstLog = dayjs(getState().logs.logs[0].dateAndTime);

        let logs:any[] = []
        let skip = 0;
        let limit = 200;
        let previousIndex = 0
        while (logs.length < limit + 1) {
          const rawLogsRequest = await services.getLogs(label, skip, limit, timeOfTheFirstLog, currentTime.startOf('day').add(1,'day') );
          if(rawLogsRequest?.length === 0){
            break;
          }else{
            const rawLogs = getLogsNoDuplicates(rawLogsRequest);
            const previousNextAndLast = getPreviousNextAndLastValveSetTypeLog(logs, rawLogs)
            if(utils.areEqualArray(previousNextAndLast.previous.rawLog?.parameters, previousNextAndLast.next.rawLog?.parameters)){
              logs.splice(previousNextAndLast.previous.index, 1);
            }
            logs =  logs.concat(rawLogs);
            const firstValveSetLog = getPreviousNextAndLastValveSetTypeLog(null, logs)
            const transformedLogs = transformLogs(logs)
            skip += limit;
            dispatch({
              type:"REFRESH_LOG_STATE",
              data: {logs: transformedLogs, firstValveSetTypeRawLog: { rawLog: firstValveSetLog.next.rawLog, index: firstValveSetLog.next.index}, lastValveSetTypeRawLog: { rawLog: firstValveSetLog.last.rawLog,  index:firstValveSetLog.last.index}}
            })
          };
        };
    };
};






export default logsReducer


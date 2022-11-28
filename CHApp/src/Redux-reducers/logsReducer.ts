import { Dispatch } from 'redux';
import services from '../Services/services';
import utils from '../Components/Utils/utils';
import dayjs from 'dayjs';

const currentTime = dayjs();
const today = currentTime.startOf('day');
const sevenDaysBack = today.subtract(7,'day');

const getLogs = (rawLogs:any, lastLogInTheArray:any) => {

  return rawLogs.filter((rawLog:any, index:any ,arr:any)=>{
    // console.log(rawLog, lastLogInTheArray)
    if(index === 0){
      if(rawLog.category === lastLogInTheArray?.category && rawLog.category === 'VALVE_SET' ){
        if(!utils.areEqualArray(rawLog.parameters, lastLogInTheArray?.parameters)){
          return rawLog
        }
      }else{
        return rawLog
      }
    }else {
      if(rawLog.category === arr[index-1]?.category && rawLog.category === 'VALVE_SET'){
        if(!utils.areEqualArray(rawLog.parameters, arr[index-1]?.parameters)){
          return rawLog
        }
      }else{
        return rawLog
      }
      // if(!utils.areEqualArray(rawLog.parameters, arr[index-1]?.parameters)){
      //   return rawLog
      // }
    }
  });
};

const transformLogs = (rawLogs:any[]) => {
  return rawLogs.map((rawLog:any, index:number, arr:any)=>{
    let priceSensitivity = null
    if(rawLog.parameters.length === 5 ){
        const segment = utils.getSegment(rawLog.parameters[3], rawLog.parameters[4] )
        priceSensitivity =  segment === 0 ? "Negative" : segment === 1 ? "Very low" : segment === 2 ? "Low" : segment === 3 ? "Moderate" : segment === 4 ? "High" :  "Very high" 
    }
    const profileName = rawLog.parameters[0] === 1 ? "Nights" :  rawLog.parameters[0] === 2 ? "Mornings" :  rawLog.parameters[0] === 3 ? "Weekdays" : rawLog.parameters[0] === 4 ? "Evenings" :  "Weekends"
    const timestamp = dayjs(rawLog.timestamp)
    const hours = timestamp.get('hour') 
    const minutes = timestamp.get('minute') 
    const date = timestamp.format('DD/MM/YYYY');
    const time =`${hours}:${minutes < 10 ? '0'+minutes : minutes }`;
    const price = Math.round(rawLog.parameters[1] * 100) / 100;
    const setpoint = Math.round(rawLog.parameters[2]*2)/2;
    // const prefferedTemperature = Math.round(rawLog.parameters[4]*2)/2;
    const prefferedTemperature = rawLog.parameters[4]?.toFixed(2);

    // console.log("timestamp: ",timestamp , "formated time",time)
    
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
        return {dateAndTime: rawLog.timestamp ,date: date ,time: time  , category: "User" , description: `You reset profile ${profileName}`}
        break;
      case "SCHEDULE_EDIT":
        return {dateAndTime: rawLog.timestamp ,date: date ,time: time  , category: "User" , description: `You edited the schedule.`}
        break;
      default:
        return {dateAndTime: rawLog.timestamp ,date: date ,time: time  , category: rawLog.category , description: ""}
        break;
    }
  })
};


const logsReducer = (state: any = {logs:null, skip:0, lastRawLog:null, from: null , to: null} , action:any) => {
    switch(action.type) {
        case "INITIALISE_LOGS":
            return  state = {...state, ...action.data}
        case "GET_MORE_LOGS_ON_USER_CLICK":
            return   state = {...state, logs: state.logs.concat(action.data.logs) ,skip:action.data.skip, lastRawLog: action.data.lastRawLog}
        default:
            return state
    }
}

export const initialiseLogs = (label:String, from:any, to:any) => {


    return async (dispatch : Dispatch) => {
        let logs:any[] = []
        let skip = 0;
        let limit = 200;

        while (logs.length < limit + 1) {
          const rawLogsRequest = await services.getLogs(label, skip, limit, from, to.add(1,'day') );
          if(rawLogsRequest.length === 0){
            break;
          }else{
            const rawLogs = getLogs(rawLogsRequest, logs[logs.length-1]);
            logs =  logs.concat(rawLogs);
            const transformedLogs = transformLogs(logs)
            skip += limit;
            dispatch({
              type:"INITIALISE_LOGS",
              data: {logs:transformedLogs, skip:skip, lastRawLog: rawLogs[rawLogs.length - 1], from: from, to: to> today ? today : to }
            })
          };
        };

        // const transformedLogs = transformLogs(twoHunderOneLog)

        // dispatch({
        //     type:"INITIALISE_LOGS",
        //     data: {logs:transformedLogs, skip:skip}
        // })
    };
};


export const getMoreLogsOnUserClick = (label:String, previousSkip:any, previousLog:any, from:any, to:any) => { //cia bus datos nuo iki...

  return async (dispatch : Dispatch) => {

      let logs:any[] = []
      let skip = previousSkip;
      let limit:number|null = 200;
      let lastRawLog = previousLog

      while (logs.length < limit + 1) {
        const rawLogsRequest = await services.getLogs(label, skip, limit, from, to.add(1,'day'), );
        if(rawLogsRequest.length === 0 ){
          limit = null
          break;
        }else {
          const rawLogs = getLogs(rawLogsRequest, lastRawLog);
          logs =  logs.concat(rawLogs);
          // const transformedLogs = transformLogs(logs)
          // console.log(transformedLogs.length)
          lastRawLog = rawLogs[rawLogs.length - 1]
          skip += limit;
        //   dispatch({
        //     type:"GET_MORE_LOGS_ON_USER_CLICK",
        //     data: {logs:transformedLogs, skip:skip}
        // })
        }
      };
      const transformedLogs = transformLogs(logs)
      // console.log(transformedLogs.length)

      dispatch({
          type:"GET_MORE_LOGS_ON_USER_CLICK",
          data: {logs:transformedLogs, skip:skip, lastRawLog: lastRawLog}
      })
  };
};






export default logsReducer
import { Dispatch } from 'redux';
import services from '../Services/services';
import utils from '../Components/Utils/utils';
import dayjs from 'dayjs';
// import { stat } from 'fs';

const currentTime = dayjs();
const today = currentTime.startOf('day');
// const sevenDaysBack = today.subtract(7,'day');
const getPreviousNextAndLastValveSetTypeLog = (firstPart:any, secondPart:any) => {

  // const reversedSecondPart = []secondPart.reverse();
  // let previous:any = null
  // let previousIndex:any =null
  // let next:any = null
  // let nextIndex:any = null
  // let last:any = null
  // let lastIndex:any = null
  // console.log(bl, reversed,'zeuru!!')
  let previousIndex:any =null
  const previous = firstPart.findLast((rawLog:any, index:number)=>{

    if(rawLog.category === 'VALVE_SET'){
      previousIndex = index
      // console.log(index, rawLog, arr[index], arr )
      return rawLog
    }
  })

  let nextIndex:any = null
  const next = secondPart.find((rawLog:any, index:number)=>{
    if(rawLog.category === 'VALVE_SET'){
      nextIndex = index
      // console.log(index, rawLog, arr[index], arr )
      return rawLog
    }
    
    // nextIndex = index

    // return rawLog.category === 'VALVE_SET'
  })
  let lastIndex:any = null
  const last = secondPart.findLast((rawLog:any, index:number, arr:any)=>{
    // console.log(index, rawLog, arr[index], arr )
    if(rawLog.category === 'VALVE_SET'){
      // console.log()
      lastIndex = index
      // console.log(index, arr.length, rawLog, arr[index], arr, arr.lenght, arr.lenght - index  )
      return rawLog
    }
    // console.log(index, rawLog, arr[index], arr )
    // lastIndex = index
    // return rawLog.category === 'VALVE_SET'
  })


  // console.log(last, lastIndex, secondPart.length)
  return {previous:{rawLog:previous, index:previousIndex}, next:{rawLog: next, index:nextIndex}, last:{rawLog:last,index:lastIndex}}
  // console.log(previous, previousIndex)
  // console.log(next, nextIndex)
  // console.log(last, lastIndex)

  // while(){}
  // while(){}


  // while (!previousValveSetLog){ //padaryti looop kad surastu ir pirma rawlogouse!!!
  //   if(!logs[logs.length -i]){
  //     break;
  //   }else{
  //     if(logs[logs.length -i].category === 'VALVE_SET'){ 
  //       previousValveSetLog = logs[logs.length -i]
  //     }else if (!logs[logs.length -i].category ){ //sito manau nereike 
  //       previousValveSetLog = null
  //       i = 1
  //       break;
  //     }else {
  //       i++
  //     }
  //   }
  // }
   



};

const getLogs = (rawLogs:any, lastLogInTheArray:any) => {
  let previousValveSetCategoryLog:any

  return rawLogs.filter((rawLog:any, index:any ,arr:any)=>{

    // console.log(rawLog)
    if(rawLog.category === arr[index+1]?.category && rawLog.category === 'VALVE_SET' ){
      // previousValveSetCategoryLog = rawLog
      if(!utils.areEqualArray(rawLog.parameters, arr[index+1].parameters)){
        previousValveSetCategoryLog = rawLog
        return rawLog
      }
    }else{
      if(rawLog.category === previousValveSetCategoryLog?.category && rawLog.category === 'VALVE_SET' ){
        if(!utils.areEqualArray(rawLog.parameters, previousValveSetCategoryLog?.parameters)){
          previousValveSetCategoryLog = rawLog
          return rawLog
        }
      }else{
        return rawLog
      }
      // return rawLog
    }
    // if(index === 0 ){
    //   if(rawLog.category === arr[index+1]?.category && rawLog.category === 'VALVE_SET' ){
    //     if(!utils.areEqualArray(rawLog.parameters, arr[index+1]?.parameters)){
    //       return rawLog
    //     }
    //   }else{
    //     return rawLog
    //   }
    // }else{

    // }
    // if(index === 0){
    //   if(rawLog.category === lastLogInTheArray?.category && rawLog.category === 'VALVE_SET' ){
    //     if(!utils.areEqualArray(rawLog.parameters, lastLogInTheArray?.parameters)){
    //       return rawLog
    //     }else {
          // if(!utils.areEqualArray(rawLog.parameters, arr[index+1]?.parameters)){
          //   return rawLog
          // }
    //     }
    //   }else{
    //     // return rawLog
    //     if(!utils.areEqualArray(rawLog.parameters, arr[index+1]?.parameters)){ //cia + taciau tada reikes kazka suziuret su last array.
    //       return rawLog
    //     }
    //   }
    // }else {
    //   if(rawLog.category === arr[index+1]?.category && rawLog.category === 'VALVE_SET'){
    //     if(!utils.areEqualArray(rawLog.parameters, arr[index+1]?.parameters)){ //cia + taciau tada reikes kazka suziuret su last array.
    //       return rawLog
    //     }
    //   }else{
    //     return rawLog
    //   }
    // }
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
        return {dateAndTime: rawLog.timestamp ,date: date ,time: time  , category: "User" , description: `You reset profile ${profileName}.`}
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


const logsReducer = (state: any = {logs:null, skip:0, lastValveSetTypeRawLog:null, from: null , to: null} , action:any) => {
    switch(action.type) {
        case "INITIALISE_LOGS":
            return  state = {...state, ...action.data}
        case "GET_MORE_LOGS_ON_USER_CLICK":
            if(utils.areEqualArray(state.lastValveSetTypeRawLog.rawLog?.parameters, action.data.lastValveSetTypeRawLog.rawLog?.parameters) ){
              // console.log(state.lastValveSetTypeRawLog.rawLog?.parameters, action.data.lastValveSetTypeRawLog.rawLog?.parameters)
              state.logs.slice(state.lastValveSetTypeRawLog.index,1)
              console.log('pop')
            }
            //need first in action dat! raw log that is valveset log!! 
            return   state = {...state, logs: state.logs.concat(action.data.logs) ,skip:action.data.skip, lastValveSetTypeRawLog: {rawLog: action.data.lastValveSetTypeRawLog.rawLog ? action.data.lastValveSetTypeRawLog.rawLog : state.lastValveSetTypeRawLog.rawLog , index: action.data.lastValveSetTypeRawLog.index ? state.logs.length + action.data.lastValveSetTypeRawLog.index : state.lastValveSetTypeRawLog.index} } //state.logs.length + action.data.lastValveSetTypeRawLog.index
        default:
            return state
    }
}

export const initialiseLogs = (label:String, from:any, to:any) => {

    return async (dispatch : Dispatch) => {
        let logs:any[] = []
        let skip = 0;
        let limit = 200;
        let previousIndex = 0
        while (logs.length < limit + 1) {
          const rawLogsRequest = await services.getLogs(label, skip, limit, from, to.add(1,'day') );
          if(rawLogsRequest.length === 0){
            //error notification here!!!
            break;
          }else{
            const rawLogs = getLogs(rawLogsRequest, logs[logs.length-1]);
            const previousNextAndLast = getPreviousNextAndLastValveSetTypeLog(logs, rawLogs)
            // console.log(logs.length , "+", previousNextAndLast.last.index, '=',  logs.length + previousNextAndLast.last.index)
            
            if(utils.areEqualArray(previousNextAndLast.previous.rawLog?.parameters, previousNextAndLast.next.rawLog?.parameters)){
              logs.slice(logs.length - previousNextAndLast.previous.index, 1)
            }
            logs =  logs.concat(rawLogs);
            const transformedLogs = transformLogs(logs) //transfor in the component instead of here 
            // console.log('afterconcat', logs.length , "+", previousNextAndLast.last.index, '=',  logs.length + previousNextAndLast.last.index)
            // previousIndex += previousNextAndLast.last.index
            // console.log(previousNextAndLast.last.index, rawLogs, rawLogs[previousNextAndLast.last.index])
            // console.log(rawLogs.length - previousNextAndLast.last.index)
            skip += limit;
            dispatch({
              type:"INITIALISE_LOGS",
              data: {logs:transformedLogs, skip:skip, lastValveSetTypeRawLog: { rawLog:previousNextAndLast.last.rawLog, index: logs.length - (rawLogs.length - previousNextAndLast.last.index) }, from: from, to: to> today ? today : to }
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
      let previousValveSetLog:any
      let i: number = 1; //index of previous raw log 
      let previousNextAndLast:any
      let previousValveSetIndex:any

      while (logs.length < limit + 1) {
        const rawLogsRequest = await services.getLogs(label, skip, limit, from, to.add(1,'day'), );
        if(rawLogsRequest.length === 0 ){
          limit = null
          lastRawLog = null
          break;
        }else {
          const rawLogs = getLogs(rawLogsRequest, lastRawLog);
          previousNextAndLast = getPreviousNextAndLastValveSetTypeLog(logs, rawLogs)
          // console.log(previousNextAndLast,' beleka')
          if(utils.areEqualArray(previousNextAndLast.previous.rawLog?.parameters, previousNextAndLast.next.rawLog?.parameters)){
            logs.slice(logs.length - previousNextAndLast.previous.index, 1)
            // console.log('popinam')
          }

          // while (!previousValveSetLog){
          //   if(!logs[logs.length -i]){
          //     break;
          //   }else{
          //     if(logs[logs.length -i].category === 'VALVE_SET'){
          //       previousValveSetLog = logs[logs.length -i]
          //     }else if (!logs[logs.length -i].category ){ //sito manau nereike !!!
          //       previousValveSetLog = null
          //       i = 1
          //       break;
          //     }else {
          //       i++
          //     }
          //   }
          // }
          // // console.log(i, logs[logs.length -i], logs[logs.length -1])
          // //check if the last item in array same as the first in the new array
          // if(rawLogs[0].category ===  previousValveSetLog?.category && rawLogs[0].category === "VALVE_SET"){
          //   if(utils.areEqualArray(rawLogs[0].parameters, previousValveSetLog?.parameters )){
          //     // logs.pop()
          //     logs.slice(logs.length - i, 1)
          //   }
          // }

          // if(rawLogs[0].category === logs[logs.length -1]?.category && logs[logs.length -1]?.category === "VALVE_SET"){
          //   if(utils.areEqualArray(rawLogs[0].parameters, logs[logs.length -1]?.parameters )){
          //     logs.pop()
          //   }
          //   // console.log(rawLogs[0].timestamp, logs[logs.length -1]?.timestamp)
          // }
          logs =  logs.concat(rawLogs);
          previousValveSetIndex =  rawLogs.length - previousNextAndLast.last.index
          // const transformedLogs = transformLogs(logs)
          // console.log(transformedLogs.length)
          // lastRawLog = rawLogs[rawLogs.length - 1]
          skip += limit;
        //   dispatch({
        //     type:"GET_MORE_LOGS_ON_USER_CLICK",
        //     data: {logs:transformedLogs, skip:skip}
        // })
        }
      };
      const transformedLogs = transformLogs(logs)
      // console.log(transformedLogs.length)
      // console.log(previousNextAndLast)
      // console.log(logs[logs.length -1],'lrlrlrl')
      // console.log(logs.length - previousNextAndLast?.last.index)

      if(transformedLogs.length > 0){

        dispatch({
          type:"GET_MORE_LOGS_ON_USER_CLICK",
          data: {logs:transformedLogs, skip:skip, lastValveSetTypeRawLog: { rawLog: previousNextAndLast?.last ? previousNextAndLast.last.rawLog : null , index: previousNextAndLast?.last ? logs.length - previousValveSetIndex : null }}
        })
      }
      // else{
      //   console.log('neralogu')
      // }

      // dispatch({
      //     type:"GET_MORE_LOGS_ON_USER_CLICK",
      //     data: {logs:transformedLogs, skip:skip, lastValveSetTypeRawLog: { rawLog: previousNextAndLast?.last ? previousNextAndLast.last.rawLog : null , index: previousNextAndLast?.last ? logs.length - previousNextAndLast.last.index : null }}
      // })
  };
};


// kai requestinu more logs, tada patikrinam pati pirma valve set log su paskutiniuoju kuris bus issaugotas reduseryje ir pareis is clicko!!! jeigu sutampa uzmetam index kuri reike iskirpti is reduser., jeigu ne null 



export default logsReducer



//perziureti indexus jau radau klaida kakzodel paskutinis nesimatchina su paskutiniu 396/ 393??? wtf???
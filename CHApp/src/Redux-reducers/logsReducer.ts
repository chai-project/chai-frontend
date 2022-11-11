import { Dispatch } from 'redux';
import services from '../Services/services';
import dayjs from 'dayjs';


const logsReducer = (state: any[]|null = null , action:any) => {
    switch(action.type) {
        case "INITIALISE_LOGS":
            return state = action.data
        default:
            return state
    }
}

export const initialiseLogs = (label:String) => {

    return async (dispatch : Dispatch) => {
        const rawLogs = await services.getLogs(label)
        const logs = rawLogs?.map((rawLog:any, index:number, arr:any)=>{

            let priceSensitivity = null
            if(rawLog.parameters.length === 5 ){
              const priceSensivityBoundaries = (bias:any ) => {
                const finiteIntervals = 4;
                const minSetpoint = 7;
                const maxPrice = 35;
                const upperBound = (bias - minSetpoint) / maxPrice;
                const intervalWidth = upperBound / finiteIntervals;
                let boundaries:any[] = []
          
                for(let i:number = 0; i<finiteIntervals+1; i++  ){
                  boundaries.push(intervalWidth*i)
                }
                return boundaries
              };
              let segment = 0
              const boundaries = priceSensivityBoundaries(rawLog.parameters[4]);
              for(let i:number = 0; i<boundaries.length; i++){
                if(-rawLog.parameters[3] >= boundaries[i]){
                  segment = i+1
                }
              };
              priceSensitivity =  segment === 0 ? "Negative" : segment === 1 ? "Very low" : segment === 2 ? "Low" : segment === 3 ? "Moderate" : segment === 4 ? "High" :  "Very high" 
            }
            const profileName = rawLog.parameters[0] === 1 ? "Nights" :  rawLog.parameters[0] === 2 ? "Mornings" :  rawLog.parameters[0] === 3 ? "Weekdays" : rawLog.parameters[0] === 4 ? "Evenings" :  "Weekends"
            const day = dayjs(rawLog.timestamp).get('day');
            const month = dayjs(rawLog.timestamp).get('month')
            const year = dayjs(rawLog.timestamp).get('year')
            const hours = dayjs(rawLog.timestamp).get('hour') 
            const minutes = dayjs(rawLog.timestamp).get('minute') 
            const date = `${day}/${month}/${year}`
            const time =`${hours}:${minutes < 10 ? '0'+minutes : minutes }`
            // const profile = currentState.heatingProfiles.heatingProfiles.find((profile:any)=>{return profile.profile === rawLog.parameters[0]})
            switch(rawLog.category) {
              case "VALVE_SET":
                // console.log(rawLog.parameters)
                // const profileName = currentState.heatingProfiles.heatingProfiles.find((profile:any)=>{return profile.profile === rawLog.parameters[0]})
                return {dateAndTime: rawLog.timestamp ,date: date ,time: time  , category: "System" , description: `The system set the target temperature to ${rawLog.parameters[2]}°C because the current price is ${rawLog.parameters[1]} p/kWh and the active profile is ${profileName} where the AI believes your price sensitivity is ${priceSensitivity} and your preferred temperature (if energy were free) is ${rawLog.parameters[4]}°C.`}
                break;
              case "SETPOINT_MODE":
                if(rawLog.parameters[0] === 'override' && rawLog.parameters[1] !== null ){
                  return  {dateAndTime: rawLog.timestamp , date: date ,time: time , category: "User" , description: `You set the target temperature to ${rawLog.parameters[1]}°C (${rawLog.parameters[0]} mode is now active).` }
                }else {
                  return  {dateAndTime: rawLog.timestamp ,date: date ,time: time  , category: "User" , description: `You switched to ${rawLog.parameters[0]} mode.` }
                }
                break;
              case "PROFILE_UPDATE":
                return {dateAndTime: rawLog.timestamp ,date: date ,time: time , category: "System" , description: `Profile ${profileName} has been updated because you set the target temperature to ${rawLog.parameters[2]}°C when the price was ${rawLog.parameters[1]} p/kWh where the AI now believes your price sensitivity is ${priceSensitivity} and your preferred temperature (if energy were free) is ${rawLog.parameters[4]}°C.`}
                  // code block
                break;
              case "PROFILE_RESET":
                  // code block
                return {dateAndTime: rawLog.timestamp ,date: date ,time: time  , category: "User" , description: `You reset profile ${profileName}`}
                break;
              case "SCHEDULE_EDIT":
                  // code block
                return {dateAndTime: rawLog.timestamp ,date: date ,time: time  , category: "User" , description: `You edited the schedule.`}
                break;
              default:
                break;
                // code block
            }
          })
        dispatch({
            type:"INITIALISE_LOGS",
            data: logs
        })
    };
};







export default logsReducer
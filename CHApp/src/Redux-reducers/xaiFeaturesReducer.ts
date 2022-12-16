import { Dispatch } from 'redux';
import services from '../Services/services';

const xaiFeaturesReducer = (state: any = { selectedProfile:null, inputsChart:null, updateModelChart:null, predictionsChart:null, setpointScheduleChart:{biasAndSlope:null, period:null}} , action:any) => {
    switch(action.type) {
        case 'SET_SELECTED_PROFILE':
            return state = {...state, ...action.data} 
        case 'SET_INPUTS_CHART_DATA':
            return state = {...state, ...action.data} 
            // return state = {...state, setpointSchdeuleChart:{...setpointSchdeuleChart, }}
        case 'SET_SETPOINT_SCHEDULE_CHART_PERIOD':
            return state = state = {...state, setpointScheduleChart:{...state.setpointScheduleChart, ...action.data}} 
        case 'SET_SETPOINT_SCHEDULE_CHART_BIAS_AND_SLOPE':
            return state = state = {...state, setpointScheduleChart:{...state.setpointScheduleChart, ...action.data}} 
        default:
            return state 
    }
};

export const setSelectedProfile = (profile:any) => {

    // console.log(profile)
    return async (dispatch : Dispatch) => {

        // const priceData = await services.getPriceData();
        // const electricityConsumptionData = await services.getConsumptionData();
        // const batteryData = await services.getBatteryData();

        dispatch({
            type:"SET_SELECTED_PROFILE",
            data: {selectedProfile: profile}
        })
    };
};

//1st chart
export const setInputChartData = (label:string, profile:number) => {

    // console.log(label, profile)
    return async (dispatch : Dispatch) => {

        const inputsChartData = await services.getInputsChartData(label,profile);

        dispatch({
            type:"SET_INPUTS_CHART_DATA",
            data: {inputsChart: inputsChartData}
        })
    };
};

// getSetpointScheduleChartData

//4th chart
export const setSetpointScheduleChartPeriod = (start:any, end:any) => {

    const period = {
        start: start.format(),
        end: end.format()
    }

    // console.log(label, profile)
    return async (dispatch : Dispatch) => {

        // const scheduleChartData = await services.getSetpointScheduleChartData(label,profile,skip);
        const pricesForPeriod = await services.getAverageHeatingPricePeriod(period);
        // console.log(period,pricesForPeriod)
        dispatch({
            type:"SET_SETPOINT_SCHEDULE_CHART_PERIOD",
            data: {period: pricesForPeriod}
        })
    };
};

export const setSetpointScheduleChartBiasAndSlope = (label:string, profile:number, skip:number) => {
    // console.log(label, profile, skip)
    return async (dispatch : Dispatch) => {

        const scheduleChartBiasAndSlope = await services.getSetpointScheduleChartData(label,profile,skip);

        dispatch({
            type:"SET_SETPOINT_SCHEDULE_CHART_PERIOD",
            data: {biasAndSlope: scheduleChartBiasAndSlope}
        })
    };
};

// SET_SETPOINT_SCHEDULE_CHART_BIAS_AND_SLOPE





export default xaiFeaturesReducer
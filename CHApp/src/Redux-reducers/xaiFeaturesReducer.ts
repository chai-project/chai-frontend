import { Dispatch } from 'redux';
import services from '../Services/services';
import dayjs from 'dayjs';

const xaiFeaturesReducer = (state: any = { selectedProfile:null, xaiScatterData:null, xaiRegionData:null,xaiBandData:null, periodPriceData:null} , action:any) => {
    switch(action.type) {
        case 'SET_SELECTED_PROFILE':
            return state = {...state, ...action.data} 
        case 'SET_XAI_SCATTER_DATA':
            return state = {...state, ...action.data} 
            // return state = {...state, setpointSchdeuleChart:{...setpointSchdeuleChart, }}
        case 'SET_PERIOD_PRICE_DATA':
            return state = {...state, ...action.data} 
            // return state = state = {...state, setpointScheduleChart:{...state.setpointScheduleChart, ...action.data}} 
        case 'SET_XAI_REGION_DATA':
            // return state = state = {...state, setpointScheduleChart:{...state.setpointScheduleChart, ...action.data}} 
            return state = {...state, ...action.data} 
        case 'SET_XAI_BAND_DATA':
            return state = {...state, ...action.data} 
        default:
            return state 
    }
};



export const setSelectedProfile = (profile:any) => {

    return async (dispatch : Dispatch) => {
        if(!profile){
            dispatch({
                type:"SET_SELECTED_PROFILE",
                data: {selectedProfile:null, xaiScatterData:null, xaiRegionData:null,xaiBandData:null, periodPriceData:null}
            })
        }else{
            dispatch({
                type:"SET_SELECTED_PROFILE",
                data: {selectedProfile: profile}
            })
        }

        // dispatch({
        //     type:"SET_SELECTED_PROFILE",
        //     data: {selectedProfile: profile}
        // })
    };
};

//1st chart
export const setXaiScatterData = (label:string, profile:number) => {

    // console.log(label, profile)
    return async (dispatch : Dispatch) => {

        const xaiScatterData = await services.getXaiScatterData(label,profile);

        dispatch({
            type:"SET_XAI_SCATTER_DATA",
            data: {xaiScatterData: xaiScatterData}
        })
    };
};

// getSetpointScheduleChartData

//4th chart
export const setPeriodPriceData = (start:any, end:any) => {

    const period = {
        start: start.format(),
        end: end.format()
    }

    // console.log(label, profile)
    return async (dispatch : Dispatch) => {

        // const scheduleChartData = await services.getSetpointScheduleChartData(label,profile,skip);
        let pricesForPeriod = await services.getAverageHeatingPricePeriod(period);
        // const endOfAtimeFrame = pricesForPeriod[pricesForPeriod.length - 1].end
        const timeFrameToAdd = {...pricesForPeriod[pricesForPeriod.length - 1], start: pricesForPeriod[pricesForPeriod.length - 1].end, end: dayjs(pricesForPeriod[pricesForPeriod.length - 1].end).add(30,'minutes').format()}
        pricesForPeriod.push(timeFrameToAdd)
        
        dispatch({
            type:"SET_PERIOD_PRICE_DATA",
            data: {periodPriceData: pricesForPeriod}
        })
    };
};

export const setXaiRegionData = (label:string, profile:number, skip:number) => {
    // console.log(label, profile, skip)
    return async (dispatch : Dispatch) => {

        const xaiRegionData = await services.getXaiRegionData(label,profile,skip);
        // const lastTimeframe = scheduleChartBiasAndSlope.data[scheduleChartBiasAndSlope.data.length-1];
        // console.log()

        dispatch({
            type:"SET_XAI_REGION_DATA",
            data: {xaiRegionData: xaiRegionData}
        })
    };
};


export const setXaiBandData = (label:string, profile:number, skip:number) => {
    // console.log(label, profile, skip)
    return async (dispatch : Dispatch) => {

        const xaiBandData = await services.getXaiBandData(label,profile,skip);
        // const lastTimeframe = scheduleChartBiasAndSlope.data[scheduleChartBiasAndSlope.data.length-1];
        // console.log(xaiBandData)

        dispatch({
            type:"SET_XAI_BAND_DATA",
            data: {xaiBandData: xaiBandData}
        })
    };
};
// SET_SETPOINT_SCHEDULE_CHART_BIAS_AND_SLOPE





export default xaiFeaturesReducer
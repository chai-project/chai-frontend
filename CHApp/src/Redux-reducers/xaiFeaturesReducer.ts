import { Dispatch } from 'redux';
import services from '../Services/services';

const xaiFeaturesReducer = (state: any = { selectedProfile:null, inputsChart:null, updateModelChart:null, predictionsChart:null, setpointSchdeuleChart:null} , action:any) => {
    switch(action.type) {
        case 'SET_SELECTED_PROFILE':
            return state = {...state, ...action.data} 
        case 'SET_INPUTS_CHART_DATA':
            return state = {...state, ...action.data}
        case 'NOTIFICATION_NULL':
            return state = null 
            
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


export const setInputChartData = (label:string, profile:number) => {

    // console.log(label, profile)
    return async (dispatch : Dispatch) => {

        const inputsChartData = await services.getInputsChartData(label,profile);

        dispatch({
            type:"SET_SELECTED_PROFILE",
            data: {inputsChart: inputsChartData}
        })
    };
};



export default xaiFeaturesReducer
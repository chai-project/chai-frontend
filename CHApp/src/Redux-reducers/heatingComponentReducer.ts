import { Dispatch } from 'redux';
import services from '../Services/services';


//Heating Component reducer
const heatingComponentReducer = (state = {mode:null, target_temperature: null, temperature: null, valve_open: null} , action:any) => {
    switch(action.type) {
        case "SET_HEATING_COMPONENT_DATA":
            return state = action.data
        case "SET_HEATING_MODE":
            state.mode = action.data
            return state
        case 'SET_TEMPERATURE':
            state.temperature = action.data
            return state
        default:
            return state
    }
}

export const initializeHeatingComponentData = () => {
    return async (dispatch : Dispatch) => {
        // console.log("hmm")
        const heatingComponentData = await services.getHeatingComponentData();
        // console.log(heatingComponentData)

        dispatch({
            type:"SET_HEATING_COMPONENT_DATA",
            data: heatingComponentData
        })
    };
};


export const setAutoHeatingMode = (mode:boolean | String) => {
    return async (dispatch : Dispatch) => {
        dispatch({
            type:"SET_HEATING_MODE",
            data: mode === 'auto' ? "auto" : mode === false ? 'off' : 'on'
        })
    };
};

export const setTemperature = (requestedTemperature:number) => {
    return async (dispatch : Dispatch) => {
        dispatch({
            type:"SET_TEMPERATURE",
            data: requestedTemperature
        })
    };
};








export default heatingComponentReducer
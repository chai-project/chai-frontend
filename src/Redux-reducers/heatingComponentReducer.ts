import { Dispatch } from 'redux';
import axios from 'axios';
import services from '../Services/services';

interface heatingComponent {
    mode:string,
    target_temperature:number,
    temperature:number,
    valve_open:boolean,
    expires_at:string
}
//state = {mode:null, target_temperature: null, temperature: null, valve_open: null}
//state:heatingComponent|null  = null
//Heating Component reducer
const heatingComponentReducer = (state = {mode:null, target_temperature: null, temperature: null, valve_open: null, activeProfile: null, isValid:null} , action:any) => {
    switch(action.type) {
        case "SET_HEATING_COMPONENT_DATA":
            return state = action.data
        case "SET_HEATING_MODE":
            state = {...state, ...action.data}
            // state.mode = action.data
            return state
        case 'SET_TEMPERATURE':
            state = {...state, ...action.data}
            // state.temperature = action.data
            return state
        case 'SET_ACTIVE_PROFILE':
            state = {...state, ...action.data}
            return state
        default:
            return state
    }
}

export const initializeHeatingComponentData = (label:String) => {
    return async (dispatch : Dispatch) => {
        // console.log("hmm")
        const heatingComponentData = await services.getHeatingComponentData(label);
        // console.log(heatingComponentData)
        if(heatingComponentData){
            dispatch({
                type:"SET_HEATING_COMPONENT_DATA",
                data: {...heatingComponentData, isValid:true}
            })
        }else{
            dispatch({
                type:"SET_HEATING_COMPONENT_DATA",
                data: {isValid:false}
            })
        }
        // dispatch({
        //     type:"SET_HEATING_COMPONENT_DATA",
        //     data: heatingComponentData
        // })
    };
};


export const setHeatingComponentMode = (mode:boolean | String) => { //boolean nutrinti.
    // console.log(mode)
    return async (dispatch : Dispatch) => {
            dispatch({
                type:"SET_HEATING_MODE",
                // data: mode === 'auto' ? "auto" : mode === false ? 'off' : 'on'
                data: {mode: mode}
            })
    };
};

export const setTemperature = (newTargetTemperature:number) => {
    return async (dispatch : Dispatch) => {
        dispatch({
            type:"SET_TEMPERATURE",
            data: {target_temperature:newTargetTemperature} 
        })
    };
};

export const setActiveProfile = (profile:any) => { //define type later
    return async (dispatch : Dispatch) => {
        dispatch({
            type:"SET_ACTIVE_PROFILE",
            data: {activeProfile:profile} 
        })
    };
};








export default heatingComponentReducer
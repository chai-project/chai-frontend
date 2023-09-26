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

// State for heating component reducer
const heatingComponentReducer = (state = {mode:null, target_temperature: null, temperature: null, valve_open: null, activeProfile: null, isValid:null, userChanged:false, error: null} , action:any) => {
    switch(action.type) {
        case "SET_HEATING_COMPONENT_DATA":
            state = {...state, ...action.data}
            return state
        case "SET_HEATING_MODE":
            state = {...state, ...action.data}
            return state
        case 'SET_TEMPERATURE':
            state = {...state, ...action.data}
            return state
        case 'SET_ACTIVE_PROFILE':
            state = {...state, ...action.data}
            return state
        case 'SET_USER_CHANGED_BACK_TO_FALSE':
            state = {...state, ...action.data}
            return state
        case 'SET_USER_CHANGED_TO_TRUE':
            state = {...state, ...action.data}
            return state
        case 'SET_ERROR':
            state = {...state, ...action.data}
            return state
        default:
            return state
    }
}

export const initializeHeatingComponentData = (label:String) => {

    return async (dispatch : Dispatch, getState: any) => {
        const heatingComponentData:any = await services.getHeatingComponentData(label);
        if(heatingComponentData.error && getState().heatingComponent.mode === null && getState().heatingComponent.target_temperature === null && getState().heatingComponent.temperature === null && getState().heatingComponent.valve_open === null ){
            dispatch({
                type:"SET_HEATING_COMPONENT_DATA",
                data: {isValid:false, error: heatingComponentData.error}
            })
        }else if(heatingComponentData.error){
            dispatch({
                type:"SET_HEATING_COMPONENT_DATA",
                data: {error: 'Failed to update heating component data'}
            })
        }else if(heatingComponentData){
            dispatch({
                type:"SET_HEATING_COMPONENT_DATA",
                data: {...heatingComponentData, isValid:true, error:null}
            })
        }
    };
};


export const setHeatingComponentMode = (mode: String) => {

    return async (dispatch : Dispatch) => {
            dispatch({
                type:"SET_HEATING_MODE",
                data: {mode: mode, userChanged:true}
            })
    };
};

export const setTemperature = (newTargetTemperature:number) => {
    return async (dispatch : Dispatch) => {
        dispatch({
            type:"SET_TEMPERATURE",
            data: {target_temperature:newTargetTemperature, userChanged:true} 
        })
    };
};

export const setActiveProfile = (profile:any) => {
    return async (dispatch : Dispatch) => {
        dispatch({
            type:"SET_ACTIVE_PROFILE",
            data: {activeProfile:profile} 
        })
    };
};


export const setUserChangedBackToFalse = () => {
    return async (dispatch : Dispatch) => {
        dispatch({
            type:"SET_USER_CHANGED_BACK_TO_FALSE",
            data: {userChanged:false} 
        })
    };
};


export const setUserChangedTrue = () => {
    return async (dispatch : Dispatch) => {
        dispatch({
            type:"SET_USER_CHANGED_TO_TRUE",
            data: {userChanged:true} 
        })
    };
};







export default heatingComponentReducer
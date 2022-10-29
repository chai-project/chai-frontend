import { Dispatch } from 'redux';
import services from '../Services/services';

interface heatingProfile {

}


//Heating Component reducer
const heatingProfilesReducer = (state = {heatingProfiles:[], selectedProfile:null, energyPriceForSelectedProfile: null} , action:any) => { //buvo empty array startas  (state: []| null = null , action:any)  state = {heatingProfiles:[], selectedProfile:null}
    switch(action.type) {
        case "SET_HEATING_PROFILES":
            return state = {...state, ...action.data}
        case "SET_SELECTED_PROFILE":
            return state = {...state, ...action.data}
        case "SET_ENERGY_PRICES_FOR_SELECTED_PROFILE":
            return state = {...state, ...action.data}
        default:
            return state
    }
}

export const initializeHeatingProfiles = (label:String) => {
    return async (dispatch : Dispatch) => {
        const profileLabels = ["Nights", "Mornings", "Weekdays", "Evenings", "Weekends"]
        const heatingProfiles = await services.getHeatingProfiles(label);
        const profilesWithLabels = heatingProfiles.map((profile:any)=>{ //define type later
            return {...profile, profileName: profileLabels[profile.profile-1]}
        });
        dispatch({
            type:"SET_HEATING_PROFILES",
            data: {heatingProfiles: profilesWithLabels}
        })
    };
};

export const setSelectedProfile = (selectedProfile:any) => {
    return async (dispatch : Dispatch) => {
        dispatch({
            type:"SET_SELECTED_PROFILE",
            data: {selectedProfile: selectedProfile}
        })
    };
};


export const setEnergyPriceForSelectedProfile = (start:any, end:any) => {
    return async (dispatch : Dispatch) => {
        const period = {
            start: start.format(),
            end: end.format()
        }
        const pricesForPeriod = await services.getAverageHeatingPricePeriod(period);
        dispatch({
            type:"SET_ENERGY_PRICES_FOR_SELECTED_PROFILE",
            data: {energyPriceForSelectedProfile: pricesForPeriod}
        })
    };
};







export default heatingProfilesReducer
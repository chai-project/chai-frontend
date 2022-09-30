import { Dispatch } from 'redux';
import services from '../Services/services';


//Heating Component reducer
const heatingProfilesReducer = (state: []| null = null , action:any) => { //buvo empty array startas
    switch(action.type) {
        case "SET_HEATING_PROFILES":
            return state = action.data
        default:
            return state
    }
}

export const initializeHeatingProfiles = () => {
    return async (dispatch : Dispatch) => {
        const profileLabels = ["Nights", "Mornings", "Weekdays", "Evenings", "Weekends"]
        const heatingProfiles = await services.getHeatingProfiles();
        const profilesWithLabels = heatingProfiles.map((profile:any)=>{ //define type later
            return {...profile, profileName: profileLabels[profile.profile-1]}
        });
        console.log(profilesWithLabels)
        dispatch({
            type:"SET_HEATING_PROFILES",
            data: profilesWithLabels
        })
    };
};










export default heatingProfilesReducer
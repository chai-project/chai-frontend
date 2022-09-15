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
        const heatingProfiles = await services.getHeatingProfiles();

        dispatch({
            type:"SET_HEATING_PROFILES",
            data: heatingProfiles
        })
    };
};










export default heatingProfilesReducer
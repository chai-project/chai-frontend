import { Dispatch } from 'redux';
import services from '../Services/services';
import dayjs from 'dayjs';

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
        console.log(start.format(),'startas')
        const pricesForPeriod = await services.getAverageHeatingPricePeriod(period);
        let pricePeriodWithSubIntervals:any[] = []
        pricesForPeriod.forEach((interval:any, index:number)=>{
            const subIntervalStart = dayjs(interval.start).add(15,'minutes').format()
            const subIntervalEnd = dayjs(interval.start).add(30,'minutes').format()
            if(index === 0 && interval.start !== start.format()){
                pricePeriodWithSubIntervals.push({start:subIntervalStart, end:subIntervalEnd, rate:interval.rate })
            }else if(index === pricesForPeriod.length -1) {
                const lastIntervalStart = dayjs(subIntervalStart).add(15,'minutes').format();
                const lastIntervalEnd = dayjs(subIntervalStart).add(30,'minutes').format();
                pricePeriodWithSubIntervals.push(interval)
                pricePeriodWithSubIntervals.push({start:subIntervalStart, end:subIntervalEnd, rate:interval.rate })
                pricePeriodWithSubIntervals.push({start:lastIntervalStart, end:lastIntervalEnd, rate:interval.rate })
                
            }else {
                pricePeriodWithSubIntervals.push(interval)
                pricePeriodWithSubIntervals.push({start:subIntervalStart, end:subIntervalEnd, rate:interval.rate })
            }
            // pricePeriodWithSubIntervals.push(interval)
            // pricePeriodWithSubIntervals.push({start:subIntervalStart, end:subIntervalEnd, rate:interval.rate })

        })

        dispatch({
            type:"SET_ENERGY_PRICES_FOR_SELECTED_PROFILE",
            data: {energyPriceForSelectedProfile: pricePeriodWithSubIntervals}
        })
    };
};







export default heatingProfilesReducer
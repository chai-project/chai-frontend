import { Dispatch } from 'redux';
import services from '../Services/services';
import utils from '../Components/Utils/utils';
import dayjs from 'dayjs';


interface heatingProfile {

}


//Heating Component reducer
const heatingProfilesReducer = (state:any = {heatingProfiles:[], selectedTimeslot:null, selectedProfile: null, energyPriceForSelectedTimeslot: null, error: null, userResetProfile:false} , action:any) => { //buvo empty array startas  (state: []| null = null , action:any)  state = {heatingProfiles:[], selectedProfile:null}
    switch(action.type) {
        case "SET_HEATING_PROFILES":
            return state = {...state, ...action.data}
        case "SET_SELECTED_TIMESLOT":
            return state = {...state, ...action.data}
        case "SET_ENERGY_PRICES_FOR_SELECTED_PROFILE":
            return state = {...state, ...action.data}
        case "SET_USER_RESET_PROFILE":
            return state = {...state, ...action.data}
        default:
            return state
    }
}

export const initializeHeatingProfiles = (label:String) => {

    return async (dispatch : Dispatch) => {
        const profileLabels = ["Nights", "Mornings", "Weekdays", "Evenings", "Weekends"]
        const colors = ["#57A6F0", "#d1ca69", "#F6946B", "#f03cdb" , "#FE6262"  ]

        const heatingProfiles:any = await services.getHeatingProfiles(label);

        if(heatingProfiles.error){
            dispatch({
                type:"SET_HEATING_PROFILES",
                data: {error: heatingProfiles.error}
            })
        }else if(heatingProfiles){
            const profilesWithLabels = heatingProfiles?.map((profile:any)=>{ //define type later
                const segment = utils.getSegment(profile.slope, profile.bias)
                let gaugeValue = segment === 0 ? 0.083333333 : segment === 1 ? 0.25 : segment === 2 ? 0.416666667 : segment === 3 ? 0.58 : segment === 4 ? 0.75 : segment === 5 ? 0.916666667 : null 
                let priceSensitivity =  segment === 0 ? "Negative" : segment === 1 ? "Very low" : segment === 2 ? "Low" : segment === 3 ? "Moderate" : segment === 4 ? "High" : segment === 5 ? "Very high" : "Unknown"
                return {...profile, profileName: profileLabels[profile.profile-1], profileColor: colors[profile.profile-1], gaugeValue: gaugeValue, priceSensitivity: priceSensitivity, prefferedTemperature: Math.round(profile.bias * 100)/100 , segment: segment   }
            });
            dispatch({
                type:"SET_HEATING_PROFILES",
                data: {heatingProfiles: profilesWithLabels, error:null}
            })
        }
    };
};

export const setSelectedTimeslot = (selectedTimeslot:any) => {
    return async (dispatch : Dispatch) => {
        if(!selectedTimeslot){
            dispatch({
                type:"SET_SELECTED_TIMESLOT",
                data: {selectedTimeslot:null, selectedProfile: null, energyPriceForSelectedTimeslot: null, error: null}
            })
        }else{
            dispatch({
                type:"SET_SELECTED_TIMESLOT",
                data: {selectedTimeslot: selectedTimeslot}
            })
        }
    };
};



export const setEnergyPriceForSelectedProfile = (start:any, end:any) => {

    return async (dispatch : Dispatch) => {
        const period = {
            start: start.format(),
            end: end.format()
        }

        const pricesForPeriod:any = await services.getAverageHeatingPricePeriod(period);
        if(pricesForPeriod.error){
            dispatch({
                type:"SET_ENERGY_PRICES_FOR_SELECTED_PROFILE",
                data: {energyPriceForSelectedTimeslot: null, error: pricesForPeriod.error  }
            })
        }else {
            let pricePeriodWithSubIntervals:any[] = []
            // console.log(pricesForPeriod)
            pricesForPeriod.forEach((interval:any, index:number, arr:any)=>{
                const subIntervalStart = dayjs(interval.start).add(15,'minutes').format()
                const subIntervalEnd = dayjs(interval.start).add(30,'minutes').format()
                // pricePeriodWithSubIntervals.push(interval)

                if(index === 0 && interval.start !== start.format()){
                    pricePeriodWithSubIntervals.push({start:subIntervalStart, end:subIntervalEnd, rate:interval.rate })
                } // original was after these two and the last else is uncommented
                else if (index === arr.length -1 && interval.end !== end.format() ){
                    pricePeriodWithSubIntervals.push(interval)
                    pricePeriodWithSubIntervals.push({start:subIntervalStart, end:subIntervalEnd, rate:interval.rate })
                }else if (index === arr.length -1 ){
                    const endOfLastInterval = dayjs(subIntervalEnd).add(30,'minutes').format()
                    pricePeriodWithSubIntervals.push(interval)
                    pricePeriodWithSubIntervals.push({start:subIntervalEnd, end:endOfLastInterval, rate:interval.rate })
                }
                // else if(index === pricesForPeriod.length -1) {
                //     const lastIntervalStart = dayjs(subIntervalStart).add(15,'minutes').format();
                //     const lastIntervalEnd = dayjs(subIntervalStart).add(30,'minutes').format();
                //     pricePeriodWithSubIntervals.push(interval)
                //     pricePeriodWithSubIntervals.push({start:subIntervalStart, end:subIntervalEnd, rate:interval.rate })
                //     pricePeriodWithSubIntervals.push({start:lastIntervalStart, end:lastIntervalEnd, rate:interval.rate })
                    
                // }
                else {
                    pricePeriodWithSubIntervals.push(interval)
                    // pricePeriodWithSubIntervals.push({start:subIntervalStart, end:subIntervalEnd, rate:interval.rate })
                }
            })
            dispatch({
                type:"SET_ENERGY_PRICES_FOR_SELECTED_PROFILE",
                data: {energyPriceForSelectedTimeslot: pricePeriodWithSubIntervals, error: null}
            })
        };
    }
};


export const setUserResetProfile = (status:boolean) => {
    return async (dispatch : Dispatch) => {
        dispatch({
            type:"SET_USER_RESET_PROFILE",
            data: {userResetProfile:status} 
        })
    };
};








export default heatingProfilesReducer
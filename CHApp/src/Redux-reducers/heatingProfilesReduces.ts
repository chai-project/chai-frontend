import { Dispatch } from 'redux';
import services from '../Services/services';
import utils from '../Components/Utils/utils';
import dayjs from 'dayjs';


interface heatingProfile {

}


//Heating Component reducer
const heatingProfilesReducer = (state:any = {heatingProfiles:[], selectedTimeslot:null, selectedProfile: null, energyPriceForSelectedTimeslot: null} , action:any) => { //buvo empty array startas  (state: []| null = null , action:any)  state = {heatingProfiles:[], selectedProfile:null}
    switch(action.type) {
        case "SET_HEATING_PROFILES":
            return state = {...state, ...action.data}
        case "SET_SELECTED_TIMESLOT":
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
        const colors = ["#57A6F0", "#d1ca69", "#F6946B", "#f03cdb" , "#FE6262"  ]
        const heatingProfiles = await services.getHeatingProfiles(label);
        const profilesWithLabels = heatingProfiles.map((profile:any)=>{ //define type later
            const segment = utils.getSegment(profile.slope, profile.bias)
            // const priceSensivityBoundaries = (bias:any ) => {
            //     const finiteIntervals = 4;
            //     const minSetpoint = 7;
            //     const maxPrice = 35;
            //     const upperBound = (bias - minSetpoint) / maxPrice;
            //     const intervalWidth = upperBound / finiteIntervals;
            //     let boundaries:any[] = []
          
            //     for(let i:number = 0; i<finiteIntervals+1; i++  ){
            //       boundaries.push(intervalWidth*i)
            //     }
            //     return boundaries
            //   };
            //   let segment = 0
            //   const boundaries = priceSensivityBoundaries(profile.bias);
            //   for(let i:number = 0; i<boundaries.length; i++){
            //     if(-profile.slope >= boundaries[i]){
            //       segment = i+1
            //     }
            //   };
            //   0	Negative
            //     1	Very low
            //     2	Low
            //     3	Moderate
            //     4	High
            //     5	Very high
              let gaugeValue = segment === 0 ? 0.083333333 : segment === 1 ? 0.25 : segment === 2 ? 0.416666667 : segment === 3 ? 0.58 : segment === 4 ? 0.75 : segment === 5 ? 0.916666667 : 0 
              let priceSensitivity =  segment === 0 ? "Negative" : segment === 1 ? "Very low" : segment === 2 ? "Low" : segment === 3 ? "Moderate" : segment === 4 ? "High" :  "Very high" 
            return {...profile, profileName: profileLabels[profile.profile-1], profileColor: colors[profile.profile-1], gaugeValue: gaugeValue, priceSensitivity: priceSensitivity, prefferedTemperature: Math.round(profile.bias * 100)/100 , segment: segment   }
        });
        dispatch({
            type:"SET_HEATING_PROFILES",
            data: {heatingProfiles: profilesWithLabels}
        })
    };
};

export const setSelectedTimeslot = (selectedTimeslot:any) => {
    return async (dispatch : Dispatch) => {
        dispatch({
            type:"SET_SELECTED_TIMESLOT",
            data: {selectedTimeslot: selectedTimeslot}
        })
    };
};

// export const setPriceSensitivityAndPreferedTemperature = (profile:any) => {
//     return async (dispatch : Dispatch) => {
//         dispatch({
//             type:"SET_PROFILE_PRICE_SENSITIVITY_AND_PREFFERED_TEMPERATURE",
//             data: profile
//         })
//     };
// };


export const setEnergyPriceForSelectedProfile = (start:any, end:any) => {
    return async (dispatch : Dispatch) => {
        const period = {
            start: start.format(),
            end: end.format()
        }

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
            data: {energyPriceForSelectedTimeslot: pricePeriodWithSubIntervals}
        })
    };
};







export default heatingProfilesReducer
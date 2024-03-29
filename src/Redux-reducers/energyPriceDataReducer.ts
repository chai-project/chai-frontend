import { Dispatch } from 'redux';
import services from '../Services/services';
import dayjs from 'dayjs' 
import { setNotification } from './notificationsReducer';

interface energyPriceData {
    currentEnergyPrice: any,
    averagePriceToday: any,
    averagePriceThisWeek: any,
    averagePriceThisMonth: any,
    error: any
}



//State of energy price data reducer
const energyPriceDataReducer = (state: energyPriceData | null = null , action:any) => {
    switch(action.type) {
        case "SET_ENERGY_PRICE_DATA":
            return state = action.data
        default:
            return state
    }
}


// Initialise energy price data
export const initializeEnergyPriceData = () => {

    return async (dispatch : Dispatch, getState:any) => {
        const currentTime = dayjs();
        //PERIOD TODAY
        const startOfToday = currentTime.startOf('day');
        const startOfTomorrow = startOfToday.add(1, 'day');
        const periodToday = {
            start: startOfToday.format(),
            end: startOfTomorrow.format(),
        };
        //PERIOD THIS WEEK
        const startOfWeek = currentTime.startOf('week').add(1, 'day');
        const startOfNextWeek = startOfWeek.add(1, 'week');
        const periodThisWeek = {
            start: startOfWeek.format(),
            end: startOfNextWeek.format(),
        }
        //PERIOD THIS MONTH
        const startOfMonth = currentTime.startOf('month');
        const startOfNextMonth = startOfMonth.add(1, 'month');
        const periodThisMonth = {
            start: startOfMonth.format(),
            end: startOfNextMonth.format()
        }

        const energyPrice = await services.getCurrentHeatingPriceLimit();
        const avgEnergyPriceToday = await services.getAverageHeatingPricePeriod(periodToday);
        const avgEnergyPriceThisWeek = await services.getAverageHeatingPricePeriod(periodThisWeek);
        const avgEnergyPriceThisMonth = await services.getAverageHeatingPricePeriod(periodThisMonth);
        

        if(getState().energyPriceData){
            if(getState().energyPriceData.currentEnergyPrice !== energyPrice ){
                setNotification(`Current price is ${energyPrice[0].rate.toFixed(2)} p/kWh`,5000)(dispatch)
            }
        }else{
            setNotification(`Current price is ${energyPrice[0].rate.toFixed(2)} p/kWh`,5000)(dispatch)
        }


        if(avgEnergyPriceToday.error || avgEnergyPriceThisWeek.error || avgEnergyPriceThisMonth.error){
            dispatch({
                type:"SET_ENERGY_PRICE_DATA",
                data: {
                    error: "Server error, failed to load heating price data",
                }
            })
        }else{
            dispatch({
                type:"SET_ENERGY_PRICE_DATA",
                data: {
                    currentEnergyPrice: energyPrice,
                    averagePriceToday: avgEnergyPriceToday,
                    averagePriceThisWeek: avgEnergyPriceThisWeek,
                    averagePriceThisMonth: avgEnergyPriceThisMonth,
                    error: null
                }
            })
        }
    };
};



export default energyPriceDataReducer
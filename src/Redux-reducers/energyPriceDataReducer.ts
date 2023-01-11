import { Dispatch } from 'redux';
import services from '../Services/services';
import dayjs from 'dayjs' 

interface energyPriceData {
    currentEnergyPrice: any,
    averagePriceToday: any,
    averagePriceThisWeek: any,
    averagePriceThisMonth: any


}

const energyPriceDataReducer = (state: energyPriceData | null = null , action:any) => {
    switch(action.type) {
        case "SET_ENERGY_PRICE_DATA":
            return state = action.data
        default:
            return state
    }
}

export const initializeEnergyPriceData = () => {
    console.log("energy price update")
    return async (dispatch : Dispatch) => {
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

        // console.log("energy: ",energyPrice)
        // console.log("avgEnergyPriceToday: ",avgEnergyPriceToday)

        // console.log("avgEnergyPriceThisWeek: ",avgEnergyPriceThisWeek)
        // console.log("avgEnergyPriceThisMonth: ",avgEnergyPriceThisMonth)



        dispatch({
            type:"SET_ENERGY_PRICE_DATA",
            data: {
                currentEnergyPrice: energyPrice,
                averagePriceToday: avgEnergyPriceToday,
                averagePriceThisWeek: avgEnergyPriceThisWeek,
                averagePriceThisMonth: avgEnergyPriceThisMonth
            }
        })
    };
};







export default energyPriceDataReducer
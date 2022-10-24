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
    return async (dispatch : Dispatch) => {
        const currentTime = dayjs();
        //PERIOD TODAY
        const startOfToday = currentTime.startOf('day');
        const startOfTomorrow = startOfToday.add(1, 'day');
        const periodToday = {
            start: startOfToday.format().split('+')[0],
            end: startOfTomorrow.format().split('+')[0],
        };
        //PERIOD THIS WEEK
        const startOfWeek = currentTime.startOf('week').add(1, 'day');
        const startOfNextWeek = startOfWeek.add(1, 'week');
        const periodThisWeek = {
            start: startOfWeek.format().split('+')[0],
            end: startOfNextWeek.format().split('+')[0]
        }
        //PERIOD THIS MONTH
        const startOfMonth = currentTime.startOf('month');
        const startOfNextMonth = startOfMonth.add(1, 'month');
        const periodThisMonth = {
            start: startOfMonth.format().split('+')[0],
            end: startOfNextMonth.format().split('+')[0]
        }



        // const today = new Date();
        // today.setUTCHours(0,0,0,0,);

        // const tomorrow = new Date(today)
        // tomorrow.setDate(tomorrow.getDate() + 1);
        // tomorrow.setUTCHours(0,0,0,0,);

        // const periodToday = {
        //     start: today.toISOString().split('.')[0],
        //     end: tomorrow.toISOString().split('.')[0]
        // }
        //PERIOD THIS WEEK
        // let currentTime = dayjs();
        // let startOfWeek = currentTime.startOf('week').add(1, 'day');
        // let startOfNextWeek = startOfWeek.add(1, 'week');
        // console.log(startOfNextWeek.format().split('+')[0], 'nextweek')
        // console.log(startOfWeek.format().split('+')[0],'this week')
        // const dayOfTheWeek = today.getDay(); 
        // const diff = today.getDate() - dayOfTheWeek + (dayOfTheWeek === 0 ? -6 : 1);
        // const firstDayOfTheWeek = new Date(today.setDate(diff));
        // firstDayOfTheWeek.setHours(0,0,0,0,);
        // console.log(firstDayOfTheWeek,'savaite diena pirm ? ???');

        //PERIOD THIS MONTH

        // console.log(tomorrow.toISOString().split('.')[0],'siandien')
        const energyPrice = await services.getCurrentHeatingPriceLimit();
        const avgEnergyPriceToday = await services.getAverageHeatingPricePeriod(periodToday);
        const avgEnergyPriceThisWeek = await services.getAverageHeatingPricePeriod(periodThisWeek);
        const avgEnergyPriceThisMonth = await services.getAverageHeatingPricePeriod(periodThisMonth);

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
import { Dispatch } from 'redux';
import services from '../Services/services';


//Chart Data reducer
const chartDataReducer = (state = null , action:any) => {
    switch(action.type) {
        case "SET_CHART_DATA":
            return state = action.data
        default:
            return state
    }
}

export const initializeChartData = () => {
    return async (dispatch : Dispatch) => {

        // const priceData = await services.getPriceData();
        // const electricityConsumptionData = await services.getConsumptionData();
        // const batteryData = await services.getBatteryData();

        dispatch({
            type:"SET_CHART_DATA",
            data: {
                priceData: 'priceData',
                electricityConsumption: 'electricityConsumptionData',
                batteryData: 'batteryData'
            }
        })
    };
};







export default chartDataReducer
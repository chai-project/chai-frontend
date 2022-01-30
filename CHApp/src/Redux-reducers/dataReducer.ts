import { Dispatch } from 'redux';
import services from '../Services/services';

const dataReducer = (state = null , action:any) => {
    switch(action.type) {
        case "SET_DATA":
            return state = action.data
        default:
            return state
    }
}




export const initializeData = () => {
    return async (dispatch : Dispatch) => {

        const priceData = await services.getPriceData();
        const electricityConsumptionData = await services.getConsumptionData();
        const batteryData = await services.getBatteryData();

        dispatch({
            type:"SET_DATA",
            data: {
                priceData: priceData,
                electricityConsumption: electricityConsumptionData,
                batteryData: batteryData
            }
        })
    };
};



export default dataReducer
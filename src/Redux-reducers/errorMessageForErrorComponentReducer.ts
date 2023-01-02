import { Dispatch } from 'redux';
import services from '../Services/services';


const errorMessageForErrorComponentReducer = (state: String|null = null , action:any) => {
    switch(action.type) {
        case "SET_ERROR_MESSAGE_FOR_ERROR_COMPONENT":
            return state = action.data
        default:
            return state
    }
}

export const setErrorMessageForErrorComponentReducer = (errorMessage:String) => {
    return async (dispatch : Dispatch) => {

        dispatch({
            type:"SET_ERROR_MESSAGE_FOR_ERROR_COMPONENT",
            data: errorMessage
        })
    };
};







export default errorMessageForErrorComponentReducer
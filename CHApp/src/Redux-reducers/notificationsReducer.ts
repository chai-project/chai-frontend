import { Dispatch } from 'redux';

const notificationReducer = (state = null , action:any) => {
    switch(action.type) {
        case 'NOTIFICATION_SET':
            return state = action.data 
        case 'NOTIFICATION_ERROR':
            return state = action.data 
        case 'NOTIFICATION_NULL':
            return state = null 
            
        default:
            return state 
    }
}


let timeoutId:any

export const setNotification = (content:String , timeout:number) => {
    const severity = "success"
    
    return async (dispatch : Dispatch) => {
        await dispatch({
            type: 'NOTIFICATION_SET',
            data: {
                content,
                severity
            }
        })
        if(timeoutId){
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(()=>{
            dispatch({
                type: 'NOTIFICATION_NULL'
            })
        }, timeout)
    }
}


export const setErrorMessage = (content:String , timeout:number) => {

    const severity = "error"

    return async (dispatch : Dispatch) => {
        await dispatch({
            type: 'NOTIFICATION_ERROR',
            data:{
                content,
                severity
            }
        })
        if(timeoutId){
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(()=>{
            dispatch({
                type: 'NOTIFICATION_NULL'
            })
        }, timeout)
    }
}



export const setNotificationNull = () => {
    return async (dispatch : Dispatch) => {
        if(timeoutId){
            clearTimeout(timeoutId)
            await dispatch({
                type:'NOTIFICATION_NULL'
            })
        }else{
            dispatch({
                type:"NOTIFICATION_NULL"
            })
        }
    }
}
export default notificationReducer
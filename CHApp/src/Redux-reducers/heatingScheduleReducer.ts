import { weekdays } from 'moment';
import { Dispatch } from 'redux';
// import services from '../Services/services';


//Heating Component reducer
const heatingScheduleReducer = (state :any = null , action:any) => { //define types
    switch(action.type) {
        case "SET_HEATING_SCHEDULE_DATA":
            return state = action.data;
        case "SET_NEW_HEATING_SCHEDULE":
            return state = action.data;
        default:
            return state
    }
}

export const initializeHeatingSchedule = () => {
    return async (dispatch : Dispatch) => {
        let schedule = [
            {
                weekday: 'Monday',
                schedule:[      {
                    id: 0,
                    profileName: "Morning",
                    profileStart:'00:00',
                    profileEnd: '04:15',
                    temperature: '19'
                },
                {
                    id: 1,
                    profileName: "Empty",
                    profileStart:'04:15',
                    profileEnd: '08:30',
                    temperature: '0'
                },
                {
                    id: 2,
                    profileName: "Morning",
                    profileStart:'08:30',
                    profileEnd: '12:00',
                    temperature: '21'
                },
                {
                    id: 3,
                    profileName: "Empty",
                    profileStart:'12:00',
                    profileEnd: '17:30',
                    temperature: '0'
                },
                {
                    id: 4,
                    profileName: "Evening",
                    profileStart:'17:30',
                    profileEnd: '20:00',
                    temperature: '24'
                },
                {
                    id: 5,
                    profileName: "Night",
                    profileStart:'20:00',
                    profileEnd: '24:00',
                    temperature: '17'
                },
                ]
            },    
            {
                weekday: 'Tuesday',
                schedule:[      {
                    id: 0,
                    profileName: "Morning",
                    profileStart:'00:00',
                    profileEnd: '04:15',
                    temperature: '19'
                },
                {
                    id: 1,
                    profileName: "Empty",
                    profileStart:'04:15',
                    profileEnd: '08:30',
                    temperature: '0'
                },
                {
                    id: 2,
                    profileName: "Morning",
                    profileStart:'08:30',
                    profileEnd: '12:00',
                    temperature: '21'
                },
                {
                    id: 3,
                    profileName: "Empty",
                    profileStart:'12:00',
                    profileEnd: '17:30',
                    temperature: '0'
                },
                {
                    id: 4,
                    profileName: "Evening",
                    profileStart:'17:30',
                    profileEnd: '20:00',
                    temperature: '24'
                },
                {
                    id: 5,
                    profileName: "Night",
                    profileStart:'20:00',
                    profileEnd: '24:00',
                    temperature: '17'
                },
                ]
            },  
            {
                weekday: 'Wednesday',
                schedule:[      {
                    id: 0,
                    profileName: "Night",
                    profileStart:'00:00',
                    profileEnd: '04:15',
                    temperature: '19'
                },
                {
                    id: 1,
                    profileName: "Morning",
                    profileStart:'04:15',
                    profileEnd: '09:15',
                    temperature: '0'
                },
                {
                    id: 2,
                    profileName: "Empty",
                    profileStart:'09:15',
                    profileEnd: '13:15',
                    temperature: '21'
                },
                {
                    id: 3,
                    profileName: "Afternoon",
                    profileStart:'13:15',
                    profileEnd: '14:30',
                    temperature: '0'
                },
                {
                    id: 4,
                    profileName: "Empty",
                    profileStart:'14:30',
                    profileEnd: '17:00',
                    temperature: '24'
                },
                {
                    id: 5,
                    profileName: "Evening",
                    profileStart:'17:00',
                    profileEnd: '19:00',
                    temperature: '17'
                },
                {
                    id: 6,
                    profileName: "Empty",
                    profileStart:'19:00',
                    profileEnd: '20:45',
                    temperature: '22'
                },
                {
                    id: 7,
                    profileName: "Night",
                    profileStart:'20:45',
                    profileEnd: '24:00',
                    temperature: '17'
                },
                ]
            },
            {
                weekday: 'Thursday',
                schedule:[      
                {
                    id: 0,
                    profileName: "Morning",
                    profileStart:'00:00',
                    profileEnd: '04:15',
                    temperature: '19'
                },
                {
                    id: 1,
                    profileName: "Empty",
                    profileStart:'04:15',
                    profileEnd: '09:30',
                    temperature: '0'
                },
                {
                    id: 2,
                    profileName: "Morning",
                    profileStart:'09:30',
                    profileEnd: '13:15',
                    temperature: '21'
                },
                {
                    id: 3,
                    profileName: "Empty",
                    profileStart:'13:15',
                    profileEnd: '18:30',
                    temperature: '0'
                },
                {
                    id: 4,
                    profileName: "Evening",
                    profileStart:'18:30',
                    profileEnd: '21:00',
                    temperature: '24'
                },
                {
                    id: 5,
                    profileName: "Empty",
                    profileStart:'21:00',
                    profileEnd: '22:15',
                    temperature: '0'
                },
                {
                    id: 6,
                    profileName: "Evening",
                    profileStart:'22:15',
                    profileEnd: '23:30',
                    temperature: '21'
                },
                {
                    id: 7,
                    profileName: "Night",
                    profileStart:'23:30',
                    profileEnd: '24:00',
                    temperature: '24'
                },
                ]
            },
            {
                weekday: 'Friday',
                schedule:[      
                {
                    id: 0,
                    profileName: "Morning",
                    profileStart:'00:00',
                    profileEnd: '07:15',
                    temperature: '19'
                },
                {
                    id: 1,
                    profileName: "Empty",
                    profileStart:'07:15',
                    profileEnd: '11:45',
                    temperature: '0'
                },
                {
                    id: 2,
                    profileName: "Afternoon",
                    profileStart:'11:45',
                    profileEnd: '13:15',
                    temperature: '21'
                },
                {
                    id: 3,
                    profileName: "Empty",
                    profileStart:'13:15',
                    profileEnd: '16:30',
                    temperature: '0'
                },
                {
                    id: 4,
                    profileName: "Afternoon",
                    profileStart:'16:30',
                    profileEnd: '19:00',
                    temperature: '19'
                },
                {
                    id: 5,
                    profileName: "Evening",
                    profileStart:'19:00',
                    profileEnd: '22:00',
                    temperature: '24'
                },
                {
                    id: 6,
                    profileName: "Empty",
                    profileStart:'22:00',
                    profileEnd: '23:00',
                    temperature: '0'
                },
                {
                    id: 7,
                    profileName: "Night",
                    profileStart:'23:00',
                    profileEnd: '24:00',
                    temperature: '19'
                },
                ]
            },
            {
                weekday: 'Saturday',
                schedule:[      
                {
                    id: 0,
                    profileName: "Morning",
                    profileStart:'00:00',
                    profileEnd: '07:15',
                    temperature: '19'
                },
                {
                    id: 1,
                    profileName: "Empty",
                    profileStart:'07:15',
                    profileEnd: '08:30',
                    temperature: '0'
                },
                {
                    id: 2,
                    profileName: "Morning",
                    profileStart:'08:30',
                    profileEnd: '11:15',
                    temperature: '21'
                },
                {
                    id: 3,
                    profileName: "Empty",
                    profileStart:'11:15',
                    profileEnd: '14:30',
                    temperature: '0'
                },
                {
                    id: 4,
                    profileName: "Afternoon",
                    profileStart:'14:30',
                    profileEnd: '16:00',
                    temperature: '24'
                },
                {
                    id: 5,
                    profileName: "Evening",
                    profileStart:'16:00',
                    profileEnd: '19:00',
                    temperature: '22'
                },
                {
                    id: 6,
                    profileName: "Empty",
                    profileStart:'19:00',
                    profileEnd: '20:45',
                    temperature: '0'
                },
                {
                    id: 7,
                    profileName: "Night",
                    profileStart:'20:45',
                    profileEnd: '24:00',
                    temperature: '17'
                },
                ]
            },
            {
                weekday: 'Sunday',
                schedule:[      
                {
                    id: 0,
                    profileName: "Night",
                    profileStart:'00:00',
                    profileEnd: '02:15',
                    temperature: '21'
                },
                {
                    id: 1,
                    profileName: "Empty",
                    profileStart:'02:15',
                    profileEnd: '06:30',
                    temperature: '0'
                },
                {
                    id: 2,
                    profileName: "Morning",
                    profileStart:'06:30',
                    profileEnd: '12:15',
                    temperature: '21'
                },
                {
                    id: 3,
                    profileName: "Empty",
                    profileStart:'12:15',
                    profileEnd: '14:30',
                    temperature: '0'
                },
                {
                    id: 4,
                    profileName: "Afternoon",
                    profileStart:'14:30',
                    profileEnd: '16:45',
                    temperature: '24'
                },
                {
                    id: 5,
                    profileName: "Evening",
                    profileStart:'16:45',
                    profileEnd: '24:00',
                    temperature: '19'
                },
                ]
            },
        
        ]
        // console.log("hmm")
        // const heatingComponentData = await services.getHeatingComponentData();
        // console.log(heatingComponentData)

        dispatch({
            type:"SET_HEATING_SCHEDULE_DATA",
            data: schedule
        })
    };
};


export const setNewHeatingSchedule = (newSchedule:any) => { //define type
    // console.log(newSchedule)
    return async (dispatch : Dispatch) => {
            dispatch({
                type:"SET_NEW_HEATING_SCHEDULE",
                // data: mode === 'auto' ? "auto" : mode === false ? 'off' : 'on'
                data: newSchedule
            })
    };
};

// export const setTemperature = (requestedTemperature:number) => {
//     return async (dispatch : Dispatch) => {
//         dispatch({
//             type:"SET_TEMPERATURE",
//             data: requestedTemperature
//         })
//     };
// };








export default heatingScheduleReducer
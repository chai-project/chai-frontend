import {createStore, applyMiddleware, combineReducers} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

// Reducers for all API endpoints
import heatingComponentReducer from './Redux-reducers/heatingComponentReducer';
import heatingScheduleReducer from './Redux-reducers/heatingScheduleReducer';
import heatingProfilesReducer from './Redux-reducers/heatingProfilesReduces';
import errorMessageForErrorComponentReducer from './Redux-reducers/errorMessageForErrorComponentReducer';
import energyPriceDataReducer from './Redux-reducers/energyPriceDataReducer';
import logsReducer from './Redux-reducers/logsReducer';
import notificationReducer from './Redux-reducers/notificationsReducer';
import xaiFeaturesReducer from './Redux-reducers/xaiFeaturesReducer';

import stateDummy from './dummyState/state.json';


//combined reducer for state 
const reducer = combineReducers({
    heatingComponent: heatingComponentReducer,
    energyPriceData : energyPriceDataReducer,
    heatingSchedule: heatingScheduleReducer,
    heatingProfiles: heatingProfilesReducer,
    errorMessageForErrorComponent: errorMessageForErrorComponentReducer,
    logs: logsReducer,
    notification: notificationReducer,
    xaiFeatures: xaiFeaturesReducer,
    //more if needed...
});

// reducer with dummy state for visual testing 
// const reducer = combineReducers({
//     heatingComponent: (state: any = stateDummy.heatingComponent, action: any) => heatingComponentReducer(state, action),
//     energyPriceData : (state: any = stateDummy.energyPriceData, action: any) => energyPriceDataReducer(state, action),
//     heatingSchedule: (state: any = stateDummy.heatingSchedule, action: any) => heatingScheduleReducer(state, action),
//     heatingProfiles: (state: any = stateDummy.heatingProfiles, action: any) => heatingProfilesReducer(state, action),
//     errorMessageForErrorComponent: (state: any = stateDummy.errorMessageForErrorComponent, action: any) => errorMessageForErrorComponentReducer(state, action),
//     logs: (state: any = stateDummy.logs, action: any) => logsReducer(state, action),
//     notification: (state: any = stateDummy.notification, action: any) => notificationReducer(state, action),
//     xaiFeatures: (state: any = stateDummy.xaiFeatures, action: any) => xaiFeaturesReducer(state, action),
//     //more if needed...
// });

//store
const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);

export default store

//types 
export type RootState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch
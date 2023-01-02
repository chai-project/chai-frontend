import {createStore, applyMiddleware, combineReducers} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

// Reducers
import chartDataReducer from './Redux-reducers/chartDataReducer';
import heatingComponentReducer from './Redux-reducers/heatingComponentReducer';
import heatingScheduleReducer from './Redux-reducers/heatingScheduleReducer';
import heatingProfilesReducer from './Redux-reducers/heatingProfilesReduces';
import errorMessageForErrorComponentReducer from './Redux-reducers/errorMessageForErrorComponentReducer';
import energyPriceDataReducer from './Redux-reducers/energyPriceDataReducer';
import logsReducer from './Redux-reducers/logsReducer';
import notificationReducer from './Redux-reducers/notificationsReducer';
import xaiFeaturesReducer from './Redux-reducers/xaiFeaturesReducer';

const reducer = combineReducers({
    chartData: chartDataReducer,
    heatingComponent: heatingComponentReducer,
    energyPriceData : energyPriceDataReducer,
    heatingSchedule: heatingScheduleReducer,
    heatingProfiles: heatingProfilesReducer,
    errorMessageForErrorComponent: errorMessageForErrorComponentReducer,
    logs: logsReducer,
    notification: notificationReducer,
    xaiFeatures: xaiFeaturesReducer,
    //more if needed
});

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);

export default store

export type RootState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch
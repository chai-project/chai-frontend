import {createStore, applyMiddleware, combineReducers} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

// Reducers
import chartDataReducer from './Redux-reducers/chartDataReducer';
import heatingComponentReducer from './Redux-reducers/heatingComponentReducer';

const reducer = combineReducers({
    chartData: chartDataReducer,
    heatingComponent: heatingComponentReducer,
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
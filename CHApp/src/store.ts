import {createStore, applyMiddleware, combineReducers} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

// Reducers
import dataReducer from './Redux-reducers/dataReducer'

const reducer = combineReducers({
    chartData: dataReducer,
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
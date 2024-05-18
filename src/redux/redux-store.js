import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import mainReducer from './mainReducer'


let reducers = combineReducers({
    main: mainReducer
});



let store = legacy_createStore(reducers, applyMiddleware(thunkMiddleware));



export default store
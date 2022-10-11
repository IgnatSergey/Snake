import { legacy_createStore, combineReducers } from "redux";
import { fieldReducers} from "./field-reducers.js";
import { snakeReducers } from "./snake-reducers.js";

const reducers = combineReducers({
    field: fieldReducers,
    snake: snakeReducers 
})

export const store = legacy_createStore(reducers);


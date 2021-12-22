import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from '../reducers/index';

export default class Store {
    public static create() {
        const reducer = combineReducers(rootReducer);
        let store = createStore(reducer,
            compose(applyMiddleware(thunk))
        );
        return store
    }
}
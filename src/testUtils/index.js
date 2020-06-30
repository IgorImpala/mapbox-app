import {createStore, applyMiddleware} from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";
import checkPropTypes from 'check-prop-types';
import configureStore from 'redux-mock-store'

export const testStore = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
    return createStoreWithMiddleware(rootReducer, initialState);
};


export const findByTestAtrr = (component, attr) => {
    const wrapper = component.find(`[data-test='${attr}']`);
    return wrapper;
};

export const checkProps = (component, expectedProps) => {
    const propsError = checkPropTypes(component.propTypes, expectedProps, 'props', component.name);
    return propsError;
};

const mockStore = configureStore([thunk]);
export const makeMockStore = ( state = {} ) => {
    return mockStore({
        ...state
    });
};
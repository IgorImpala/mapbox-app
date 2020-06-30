import { types } from '../actions/types';

const initialState = {
    fetchingData: false,
    apiError: null,
    response:{
        status: "",
        path: [],
        total_distance: null,
        total_time: null,
        error: null
    },
    viewState: {
        longitude: 114.177216,
        latitude: 22.302711,
        zoom: 12
    },
    pathLayerData:
        [{
            path: [],
            name: "",
            color: []
        }],
    iconLayerData:
        [{
            name: '1',
            coordinates: []
        }],
    textLayerData:
        [{
            text: '',
            position: [],
            color:[]
        }]

};


export default function locationReducer (state = initialState, {type, payload}){
    switch (type){

        case types.FETCHING_DATA_IN_PROGRESS:
            return {
                ...state,
                fetchingData: true
            };

        case types.FETCHING_DATA_COMPLETED:
            return {
                ...state,
                fetchingData: false
            };

        case types.RESPONSE_DATA_SUCCESSFULLY_RECEIVED:
            return {
                ...state,
                response: {
                    ...state.response,
                    status: payload.status || state.response.status,
                    path: payload.path || state.response.path,
                    total_distance: payload.total_distance || state.response.total_distance,
                    total_time: payload.total_time || state.response.total_time,
                    error: payload.error || state.response.error

                }
            };

        case types.API_ERROR_RECEIVED:
            return {
                ...state,
                apiError: payload
            };

        case types.RESET_RESPONSE_DATA:
            return {
                ...state,
                response: initialState.response,
                apiError: initialState.apiError
            };

        case types.PATHLAYER_DATA_SET:
            return {
                ...state,
                pathLayerData: payload
            };

        case types.ICONLAYER_DATA_SET:
            return {
                ...state,
                iconLayerData: payload
            };

        case types.TEXTLAYER_DATA_SET:
            return {
                ...state,
                textLayerData: payload
            };

        case types.VIEWSTATE_DATA_SET:
            return {
                ...state,
                viewState: payload
            };

        case types.RESET:
            return initialState;


        default:
            return state
    }
}

import axios from 'axios';
import { types } from './types';
import { createPathLayerDataSet, createIconLayerDataSet, createTextLayerDataSet, createDirectionsCoordinates, createViewStateDataSet } from '../utils';


export const getDirections = (coordinates) => (dispatch) => {


    return axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
        .then(response => {

            if (response.data.code === "Ok"){
                dispatch({
                    type: types.PATHLAYER_DATA_SET,
                    payload: createPathLayerDataSet(response.data.routes[0].geometry)
                });
            } else {
                const error = {
                    message: response.data.code,
                    name: "Error",
                    stack: ""
                };

                dispatch({
                    type: types.API_ERROR_RECEIVED,
                    payload: error
                });

                dispatch({
                    type: types.FETCHING_DATA_COMPLETED
                });

            }

        })

        .catch((err) => {

            let errorMessage = "Server side error. Server respond with status code 500";

            if(err.response.status < 500) {

                errorMessage = err.response.code;

            }

            const error = {
                message: errorMessage,
                name: "Error",
                stack: ""
            };

            dispatch({
                type: types.API_ERROR_RECEIVED,
                payload: error
            });

            dispatch({
                type: types.FETCHING_DATA_COMPLETED
            });

        })
};

export const getPath = (token, requestCount) => (dispatch) => {

    return axios.get(`https://mock-api.dev.lalamove.com/route/${token}`)
        .then(response => {

            if(response.data.status === "in progress"){

                const nextRequestCount = requestCount + 1;


                if (nextRequestCount > 5){

                    const err = {
                        message: "Please re-submit again. Server is still processing. The data has been requested five times.",
                        name: "Error",
                        stack: ""
                    };

                    dispatch({
                        type: types.API_ERROR_RECEIVED,
                        payload: err
                    });

                    dispatch({
                        type: types.FETCHING_DATA_COMPLETED
                    });

                }
                else {
                    dispatch(getPath(token, nextRequestCount))
                }

            }

            else {

                dispatch({
                    type: types.RESPONSE_DATA_SUCCESSFULLY_RECEIVED,
                    payload: response.data
                });


                if(response.data.status === "success") {

                    dispatch({
                        type: types.VIEWSTATE_DATA_SET,
                        payload: createViewStateDataSet(response.data.path)
                    });

                    dispatch({
                        type: types.ICONLAYER_DATA_SET,
                        payload: createIconLayerDataSet(response.data.path)
                    });

                    dispatch({
                        type: types.TEXTLAYER_DATA_SET,
                        payload: createTextLayerDataSet(response.data.path)
                    });

                    const coordinates = createDirectionsCoordinates(response.data.path);

                    dispatch(getDirections(coordinates));

                }

                dispatch({
                    type: types.FETCHING_DATA_COMPLETED
                });

            }

        })
        .catch((err) => {

            dispatch({
                type: types.API_ERROR_RECEIVED,
                payload: err
            });

            dispatch({
                type: types.FETCHING_DATA_COMPLETED
            });

        })
};


export const fetchToken = postData => dispatch => {

    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return axios
        .post('https://mock-api.dev.lalamove.com/route', postData, axiosConfig)
        .then((res) => {

            dispatch({
                type: types.RESET_RESPONSE_DATA
            });

            dispatch({
                type: types.FETCHING_DATA_IN_PROGRESS
            });

            dispatch(getPath(res.data.token, 1))

        })
        .catch((err) => {


            dispatch({
                type: types.API_ERROR_RECEIVED,
                payload: err
            });

            dispatch({
                type: types.FETCHING_DATA_COMPLETED
            });

        })

};

export const reset = () => {
    return({
        type: types.RESET
    })
};
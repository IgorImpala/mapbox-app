import { types } from '../actions/types';
import locationReducer from './locationReducer';

const initialState = {
    fetchingData: false,
    apiError: null,
    response:{
        path: [],
        status: "",
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

describe('Location Reducer', () => {

    it('Should return default state', () => {
        const newState = locationReducer(undefined, {});
        expect(newState).toEqual(initialState)
    });

    it('Should return fetchingData: true, if receiving FETCHING_DATA_IN_PROGRESS type', () => {

        const fetchingData = true;

        const newState = locationReducer(undefined, {
           type: types.FETCHING_DATA_IN_PROGRESS
        });

        expect(newState.fetchingData).toEqual(fetchingData)
    });

    it('Should return fetchingData: false, if receiving FETCHING_DATA_COMPLETED type', () => {

        const fetchingData = false;

        const newState = locationReducer(undefined, {
            type: types.FETCHING_DATA_COMPLETED
        });

        expect(newState.fetchingData).toEqual(fetchingData)
    });

    it('Should update response: {status: "", path: [], total_distance: null, total_time: null, error: null}, if receiving RESPONSE_DATA_SUCCESSFULLY_RECEIVED type', () => {

        const response = [
            {
                path: [
                    ["22.372081", "114.107877"],
                    ["22.326442", "114.167811"],
                    ["22.284419", "114.159510"]
                ],
                status: "success",
                total_distance: 20000,
                total_time: 1800
            },
            {
                error: "Location not accessible by car",
                status: "failure"
            }
        ];

        const state = [
            {
                path: [
                    ["22.372081", "114.107877"],
                    ["22.326442", "114.167811"],
                    ["22.284419", "114.159510"]
                ],
                status: "success",
                total_distance: 20000,
                total_time: 1800,
                error: null
            },
            {
                path: [],
                status: "failure",
                total_distance: null,
                total_time: null,
                error: "Location not accessible by car"
            }
        ];

        for (let i = 0; i < 2; i++) {

            const newState = locationReducer(undefined, {
                type: types.RESPONSE_DATA_SUCCESSFULLY_RECEIVED,
                payload: response[i]
            });

            expect(newState.response).toEqual(state[i]);
        }

    });

    it('Should update apiError: null, if receiving API_ERROR_RECEIVED type', () => {

        const response = {
            message:"Request failed with status code 500",
            name:"Error",
            stack:"Error: Request failed with status code 500 at createError "
        };

        const newState = locationReducer(undefined, {
            type: types.API_ERROR_RECEIVED,
            payload: response
        });

        expect(newState.apiError).toEqual(response)
    });

    it('Should return initialState.response and initialState.apiError, if receiving RESET_RESPONSE_DATA type', () => {

        const newState = locationReducer(undefined, {
            type: types.RESET_RESPONSE_DATA
        });

        expect(newState.response).toEqual(initialState.response);
        expect(newState.apiError).toEqual(initialState.apiError);

    });

    it('Should update pathLayerData:[], if receiving PATHLAYER_DATA_SET type', () => {

        const response = [
            {
                path: [
                    [
                        114.10784,
                        22.37203
                    ],
                    [
                        114.10764,
                        22.37214
                    ],
                    [
                        114.10683,
                        22.37141
                    ],
                    [
                        114.10839,
                        22.37051
                    ],
                    [
                        114.10887,
                        22.37051
                    ],
                    [
                        114.11125,
                        22.36814
                    ],
                    [
                        114.1181,
                        22.36267
                    ],
                    [
                        114.12055,
                        22.35828
                    ],
                    [
                        114.12605,
                        22.35303
                    ],
                    [
                        114.12506,
                        22.34648
                    ],
                    [
                        114.12589,
                        22.34501
                    ],
                    [
                        114.12779,
                        22.34395
                    ],
                    [
                        114.13046,
                        22.34271
                    ],
                    [
                        114.13298,
                        22.339
                    ],
                    [
                        114.13418,
                        22.33821
                    ],
                    [
                        114.14424,
                        22.33635
                    ],
                    [
                        114.14613,
                        22.335
                    ],
                    [
                        114.14986,
                        22.33561
                    ],
                    [
                        114.15122,
                        22.33333
                    ],
                    [
                        114.1623,
                        22.32488
                    ],
                    [
                        114.16411,
                        22.3236
                    ],
                    [
                        114.16448,
                        22.32349
                    ],
                    [
                        114.16775,
                        22.32405
                    ],
                    [
                        114.16753,
                        22.32501
                    ],
                    [
                        114.16812,
                        22.32512
                    ],
                    [
                        114.16778,
                        22.32642
                    ],
                    [
                        114.16772,
                        22.32649
                    ],
                    [
                        114.16098,
                        22.33167
                    ],
                    [
                        114.15792,
                        22.32825
                    ],
                    [
                        114.15548,
                        22.32551
                    ],
                    [
                        114.15573,
                        22.32462
                    ],
                    [
                        114.15984,
                        22.31933
                    ],
                    [
                        114.16179,
                        22.31418
                    ],
                    [
                        114.16194,
                        22.31221
                    ],
                    [
                        114.16155,
                        22.30941
                    ],
                    [
                        114.15876,
                        22.30322
                    ],
                    [
                        114.14622,
                        22.2898
                    ],
                    [
                        114.14431,
                        22.28917
                    ],
                    [
                        114.14239,
                        22.28972
                    ],
                    [
                        114.14093,
                        22.29019
                    ],
                    [
                        114.1409,
                        22.28904
                    ],
                    [
                        114.14626,
                        22.28899
                    ],
                    [
                        114.15354,
                        22.28705
                    ],
                    [
                        114.15718,
                        22.28725
                    ],
                    [
                        114.15936,
                        22.28601
                    ],
                    [
                        114.15943,
                        22.28594
                    ],
                    [
                        114.16009,
                        22.28548
                    ],
                    [
                        114.15953,
                        22.28438
                    ]
                ],
                name: '',
                color: [
                    26,
                    93,
                    249
                ]
            }
        ];

        const newState = locationReducer(undefined, {
            type: types.PATHLAYER_DATA_SET,
            payload: response
        });

        expect(newState.pathLayerData).toEqual(response)
    });

    it('Should update iconLayerData:[], if receiving ICONLAYER_DATA_SET type', () => {

        const response = [
            {
                name: '1',
                coordinates: [
                    114.107877,
                    22.372081
                ]
            },
            {
                name: '2',
                coordinates: [
                    114.167811,
                    22.326442
                ]
            },
            {
                name: '3',
                coordinates: [
                    114.15951,
                    22.284419
                ]
            }
        ];

        const newState = locationReducer(undefined, {
            type: types.ICONLAYER_DATA_SET,
            payload: response
        });

        expect(newState.iconLayerData).toEqual(response)
    });

    it('Should update textLayerData:[], if receiving TEXTLAYER_DATA_SET type', () => {

        const response = [
            {
                text: '1',
                position: [
                    114.107877,
                    22.372081
                ],
                color: [
                    0,
                    0,
                    255
                ]
            },
            {
                text: '2',
                position: [
                    114.167811,
                    22.326442
                ],
                color: [
                    0,
                    0,
                    255
                ]
            },
            {
                text: '3',
                position: [
                    114.15951,
                    22.284419
                ],
                color: [
                    0,
                    0,
                    255
                ]
            }
        ];

        const newState = locationReducer(undefined, {
            type: types.TEXTLAYER_DATA_SET,
            payload: response
        });

        expect(newState.textLayerData).toEqual(response)
    });

    it('Should update viewState:{}, if receiving VIEWSTATE_DATA_SET type', () => {

        const response = {
            longitude: 114.137844,
            latitude: 22.32825,
            zoom: 12,
            pitch: 0,
            bearing: 0,
            transitionDuration: 8000,
            transitionInterpolator: {
                _propsToCompare: [
                    'longitude',
                    'latitude',
                    'zoom',
                    'bearing',
                    'pitch'
                ],
                _propsToExtract: [
                    'width',
                    'height',
                    'longitude',
                    'latitude',
                    'zoom',
                    'bearing',
                    'pitch'
                ],
                _requiredProps: [
                    'width',
                    'height',
                    'latitude',
                    'longitude',
                    'zoom'
                ]
            }
        };

        const newState = locationReducer(undefined, {
            type: types.VIEWSTATE_DATA_SET,
            payload: response
        });

        expect(newState.viewState).toEqual(response)
    });


    it('Should return initial state, if receiving RESET type', () => {

        const newState = locationReducer(undefined, {
            type: types.RESET
        });

        expect(newState).toEqual(initialState)

    });

});
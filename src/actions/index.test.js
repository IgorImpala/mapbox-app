import { fetchToken } from './index';
import { types } from './types'
import moxios from 'moxios';
import { makeMockStore } from '../testUtils';

const store = makeMockStore({
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

});

describe('actions', () => {
    it('should create an action to reset the state', () => {

        const expectedAction = {
            type: types.RESET
        };

        expect(actions.reset()).toEqual(expectedAction)
    })
});


describe('async actions', () => {
    beforeEach(() =>  moxios.install() );
    afterEach(() => moxios.uninstall() );

    it('fetchToken successfull api request calls RESET_RESPONSE_DATA, FETCHING_DATA_IN_PROGRESS', (done) => {

        //expected response from successful api call
        const token ={
            token: '9d3503e0-7236-4e47-a62f-8b01b5646c16'
        };
        //response from moxios after the call is made
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({ status:200, response: token});

            done();

        });

        const data = `{destination: "Destination address", origin: "Origin address"}`;

        store.dispatch(fetchToken(data))
            .then(()=> {

                //Array of actual called actions
                const actionsCalled = store.getActions();

                //Array of expected called actions
                const expectedActions = [
                    {type: types.RESET_RESPONSE_DATA},
                    {type: types.FETCHING_DATA_IN_PROGRESS}
                ];
                expect(actionsCalled).toEqual(expectedActions);

            })
            .catch((err) => {
                console.log(err)
            })

    });

});



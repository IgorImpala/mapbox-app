import React from 'react';
import { shallow } from 'enzyme';
import Map from './index';
import { findByTestAtrr, testStore} from '../../testUtils';

const setUp = (initialState={}) => {
    const store = testStore(initialState);

    const wrapper = shallow(<Map store={store} />).childAt(0).dive();

    return wrapper;
};

describe ('Map Component', () => {

    let wrapper;
    beforeEach(() => {
        const initialState = {
            location: {
                pathLayerData: [],
                iconLayerData: [],
                textLayerData: [],
                viewState: {
                    longitude: 114.177216,
                    latitude: 22.302711,
                    zoom: 12
                }
            }

        };

       wrapper = setUp(initialState);

    });

    it('Should render without errors', () => {

        const component = findByTestAtrr(wrapper, 'mapComponent');

        expect(component.length).toBe(1);
    });

    it('Should render a DeckGL Component', () => {
        const component = findByTestAtrr(wrapper, 'deckGL');
        expect(component.length).toBe(1);
    });


    it('Should render a StaticMap component', () => {
        const component = findByTestAtrr(wrapper, 'staticMap');
        expect(component.length).toBe(1);
    });

});
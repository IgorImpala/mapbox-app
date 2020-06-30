import React from 'react';
import { shallow } from 'enzyme';
import SearchAndMapDisplayComponent from './index';
import { findByTestAtrr } from '../../testUtils';

const setUp = () => {
    const component = shallow(<SearchAndMapDisplayComponent />);
    return component;
};

describe('SearchAndMapDisplayComponent', () => {

    let component;
    beforeEach(() => {
        component = setUp();
    });


   it('Should render without errors', () => {
       const wrapper = findByTestAtrr(component, 'searchAndMapDisplayComponent');
       expect(wrapper.length).toBe(1);
   });


   it('Should render a SearchForm Component', () => {
       const wrapper = findByTestAtrr(component, 'searchFormComponent');
       expect(wrapper.length).toBe(1);
   });


   it('Should render a Map component', () => {
       const wrapper = findByTestAtrr(component, 'mapComponent');
       expect(wrapper.length).toBe(1);
   });
});

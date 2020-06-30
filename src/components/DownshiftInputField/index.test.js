import React from 'react';
import { mount } from 'enzyme';
import DownshiftInputField from './index';
import { findByTestAtrr, checkProps} from '../../testUtils';

describe('DownshiftInputField Component', () => {
    describe ('Checking PropTypes', () => {

        it('Should not throw a warning', () => {

            const expectedProps = {
                inputValue : "",
                items: [],
                label: "Starting location",
                name: "origin",
                onInputValueChanged: () => {},
                onItemSelected: () => {},
                placeholder: "Enter starting location",
                resetInput: () => {}
            };

            const propsError = checkProps(DownshiftInputField, expectedProps);
            expect(propsError).toBeUndefined();
        });

        describe ('Renders empty input field', () => {
            let wrapper;
            beforeEach(() => {
                const props = {
                    inputValue: "",
                    items: [],
                    label: "Starting location",
                    name: "origin",
                    onInputValueChanged: () => {},
                    onItemSelected: () => {},
                    placeholder: "Enter starting location",
                    resetInput: () => {}
                };

                wrapper = mount (<DownshiftInputField {...props} />)

            });

            it('Should render a DownshiftInputField', () => {
                const downshiftInputField = findByTestAtrr(wrapper, 'downshiftInputField');
                expect(downshiftInputField.length).toBe(1);
            });

            it('Should render an input', () => {
                const inputField = findByTestAtrr(wrapper, 'inputField');
                expect(inputField.length).toBe(1);
            });

            it('Should render a clear input Button', () => {
                const clearInputButton = findByTestAtrr(wrapper, 'clearInputButton');
                expect(clearInputButton.length).toBe(0);
            });

            it('Should NOT render a dropdown Menu', () => {
                const dropdownMenu = findByTestAtrr(wrapper, 'dropdownMenu');
                expect(dropdownMenu.length).toBe(0);
            });

            it('Should NOT render a dropdown menu elements', () => {
                const dropdownMenuElement = findByTestAtrr(wrapper, 'dropdownMenuElement');
                expect(dropdownMenuElement.length).toBe(0);
            });

        });

        describe ('Renders input field in not empty', () => {
            let wrapper;
            beforeEach(() => {
                const props = {
                    inputValue: "123",
                    items: [],
                    label: "Starting location",
                    name: "origin",
                    onInputValueChanged: () => {},
                    onItemSelected: () => {},
                    placeholder: "Enter starting location",
                    resetInput: () => {}
                };

                wrapper = mount (<DownshiftInputField {...props} />)

            });

            it('Should render a DownshiftInputField', () => {
                const downshiftInputField = findByTestAtrr(wrapper, 'downshiftInputField');
                expect(downshiftInputField.length).toBe(1);
            });

            it('Should render an input', () => {
                const inputField = findByTestAtrr(wrapper, 'inputField');
                expect(inputField.length).toBe(1);
            });

            it('Should render a clear input Button', () => {
                const clearInputButton = findByTestAtrr(wrapper, 'clearInputButton');
                expect(clearInputButton.length).toBe(1);
            });

            it('Should NOT render a dropdown Menu', () => {
                const dropdownMenu = findByTestAtrr(wrapper, 'dropdownMenu');
                expect(dropdownMenu.length).toBe(0);
            });

            it('Should NOT render a dropdown menu elements', () => {
                const dropdownMenuElement = findByTestAtrr(wrapper, 'dropdownMenuElement');
                expect(dropdownMenuElement.length).toBe(0);
            });

        });

        describe ('Renders input field when downShift state.isOpen == true ', () => {
            let wrapper;
            beforeEach(() => {
                const props = {
                    inputValue: "123",
                    items: [],
                    label: "Starting location",
                    name: "origin",
                    onInputValueChanged: () => {},
                    onItemSelected: () => {},
                    placeholder: "Enter starting location",
                    resetInput: () => {}
                };

                wrapper = mount (<DownshiftInputField {...props} />);

                wrapper.childAt(0).setState({ isOpen: true })

            });

            it('Should render a DownshiftInputField', () => {
                const downshiftInputField = findByTestAtrr(wrapper, 'downshiftInputField');
                expect(downshiftInputField.length).toBe(1);
            });

            it('Should render an input', () => {
                const inputField = findByTestAtrr(wrapper, 'inputField');
                expect(inputField.length).toBe(1);
            });

            it('Should render a clear input Button', () => {
                const clearInputButton = findByTestAtrr(wrapper, 'clearInputButton');
                expect(clearInputButton.length).toBe(1);
            });

            it('Should render a dropdown Menu', () => {
                const dropdownMenu = findByTestAtrr(wrapper, 'dropdownMenu');
                expect(dropdownMenu.length).toBe(1);
            });

            it('Should NOT render a dropdown menu elements', () => {
                const dropdownMenuElement = findByTestAtrr(wrapper, 'dropdownMenuElement');
                expect(dropdownMenuElement.length).toBe(0);
            });

        });

        describe ('Renders input field and dropdown menu when downShift state.isOpen == true and input field value length > 3', () => {
            let wrapper;
            beforeEach(() => {
                const props = {
                    inputValue: "1234",
                    items: [
                        {place_name: "Hong Kong"},
                        {place_name: "Kowloon"},
                        {place_name: "New Territories"},
                    ],
                    label: "Starting location",
                    name: "origin",
                    onInputValueChanged: () => {},
                    onItemSelected: () => {},
                    placeholder: "Enter starting location",
                    resetInput: () => {}
                };

                wrapper = mount (<DownshiftInputField {...props} />);

                wrapper.childAt(0).setState({ isOpen: true })

            });

            it('Should render a DownshiftInputField', () => {
                const downshiftInputField = findByTestAtrr(wrapper, 'downshiftInputField');
                expect(downshiftInputField.length).toBe(1);
            });

            it('Should render an input', () => {
                const inputField = findByTestAtrr(wrapper, 'inputField');
                expect(inputField.length).toBe(1);
            });

            it('Should render a clear input Button', () => {
                const clearInputButton = findByTestAtrr(wrapper, 'clearInputButton');
                expect(clearInputButton.length).toBe(1);
            });

            it('Should render a dropdown Menu', () => {
                const dropdownMenu = findByTestAtrr(wrapper, 'dropdownMenu');
                expect(dropdownMenu.length).toBe(1);
            });

            it('Should render a dropdown menu elements', () => {
                const dropdownMenuElement = findByTestAtrr(wrapper, 'dropdownMenuElement');
                expect(dropdownMenuElement.length).toBe(3);
            });

        });


    })
});
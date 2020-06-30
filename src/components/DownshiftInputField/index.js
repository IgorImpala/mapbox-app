import React from 'react'
import Downshift from 'downshift';
import PropTypes from 'prop-types';


const DownshiftInputField = ({ inputValue, onItemSelected, items, label, placeholder, name, onInputValueChanged, resetInput }) => {

    return (
        <Downshift
            inputValue={inputValue}
            onChange={onItemSelected}
            itemToString={items => (items ? items.place_name : '')}
            data-test="downshiftInputField"
        >
            {({ getLabelProps, getInputProps, getItemProps, isOpen, selectedItem, highlightedIndex }) => (
                <div className="form-group">
                    <label style={{ marginTop: '1rem', display: 'block' }} {...getLabelProps()}>{label}</label>
                    <div className="input-group">
                        <input className="form-control" name={name} {...getInputProps({ placeholder, onChange: onInputValueChanged})} data-test="inputField"/>
                        {inputValue ?
                            <button type="button" className="btn bg-transparent py-0" name={name} onClick={()=>(resetInput(name))} data-test="clearInputButton">
                                <i className="fa fa-times fa-2x"></i>
                            </button>
                         : null}
                        {isOpen ? (

                            <div className={"dropdown-menu "+ (inputValue.length > 3 ? "show":"")} data-test="dropdownMenu">
                                {
                                    items
                                        .map((item, index) => (
                                            <button
                                                type="button"
                                                className="dropdown-item"
                                                {...getItemProps({ key: item.place_name, index, item })}
                                                data-test="dropdownMenuElement"
                                                >
                                                {item.place_name}
                                            </button>
                                        ))
                                }
                            </div>

                        ) : null}
                    </div>
                </div>
            )}
        </Downshift>
    )
};

DownshiftInputField.propTypes = {
    inputValue : PropTypes.string,
    items: PropTypes.array,
    label: PropTypes.string,
    name: PropTypes.string,
    onInputValueChanged: PropTypes.func,
    onItemSelected: PropTypes.func,
    placeholder: PropTypes.string,
    resetInput: PropTypes.func
};

export default DownshiftInputField;
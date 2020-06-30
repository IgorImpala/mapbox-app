import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import axios from 'axios';
import { bindActionCreators } from "redux";
import * as actions from "../../actions";
import DownshiftInputField from '../DownshiftInputField';

class SearchForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            origins: [],
            destinations: [],
            originInputValue: '',
            destinationInputValue: '',
            buttonCaption: 'Submit'
        };

        this.onInputValueChanged = this.onInputValueChanged.bind(this);
        this.onItemSelected = this.onItemSelected.bind(this);
        this.resetInput= this.resetInput.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onInputValueChanged(event) {

        this.setState({
            ...this.state,
            [event.target.name + 'InputValue']: event.target.value
        });

        const value = event.target.value;

        if (value.length > 3) {

            const keyName = event.target.name + 's';

            const geocodingURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?country=hk&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`;
            axios.get(geocodingURL).then(response => {
                this.setState({[keyName]: response.data.features});

            })
        }

    };

    onItemSelected(selectedItem, stateAndHelpers){

        const element = document.querySelector(`#${stateAndHelpers.id}-input`);

        this.setState({
            ...this.state,
            [element.name + 'InputValue']: selectedItem.place_name
        });

    };

    resetInput(name) {
        this.setState({
            ...this.state,
            [ name + 'InputValue' ]: ''
        })
    };

    resetForm() {
        this.setState({
            origins: [],
            destinations: [],
            originInputValue: '',
            destinationInputValue: '',
            buttonCaption: 'Submit'
        });

        this.props.actions.reset();
    };

    onSubmit(event) {
        event.preventDefault();

        //Form validation could be added if needed

        const data = `{"origin":"${this.state.originInputValue}","destination":"${this.state.destinationInputValue}"}`;
        this.props.actions.fetchToken(data);

        this.setState({
            ...this.state,
            buttonCaption: 'Re-Submit'
        })
    };


    render() {

        const { totalDistance, totalTime, fetchingData, error, apiError } = this.props;

        const {origins, originInputValue, destinations, destinationInputValue, buttonCaption} = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <DownshiftInputField
                    items={origins}
                    onItemSelected={this.onItemSelected}
                    onInputValueChanged={this.onInputValueChanged}
                    resetInput={this.resetInput}
                    label="Starting location"
                    name="origin"
                    placeholder="Enter starting location"
                    inputValue={originInputValue}
                />
                <DownshiftInputField
                    items={destinations}
                    onItemSelected={this.onItemSelected}
                    onInputValueChanged={this.onInputValueChanged}
                    resetInput={this.resetInput}
                    label="Drop-off point"
                    name="destination"
                    placeholder="Enter drop-off point"
                    inputValue={destinationInputValue}
                />
                <div className="form-group">
                    {totalDistance &&
                        <label className="row col">total distance: {totalDistance}</label>
                    }
                    {totalTime &&
                        <label className="row col">total time: {totalTime}</label>
                    }
                    {error &&
                        <label className="row col text-danger">{error}</label>
                    }
                </div>
                <button type="submit" className="btn btn-primary mb-2 mr-3" disabled={fetchingData}>{buttonCaption}</button>
                <button type="button" className="btn btn-secondary mb-2" onClick={this.resetForm} disabled={fetchingData}>Reset</button>

                {apiError &&
                    <div className="alert alert-warning" role="alert">
                        {apiError.message}
                        {apiError.stack}
                    </div>
                }
            </form>
        )
    }
}

const mapStateToProps = state => ({
    totalDistance: state.location.response.total_distance,
    totalTime: state.location.response.total_time,
    error: state.location.response.error,
    fetchingData: state.location.fetchingData,
    apiError: state.location.apiError
});

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
};


SearchForm.propTypes = {
    totalDistance: PropTypes.number,
    totalTime: PropTypes.number,
    error: PropTypes.string,
    fetchingData: PropTypes.bool,
    apiError:PropTypes.object
};

SearchForm.defaultProps = {
    totalDistance: null,
    totalTime: null,
    error: null,
    fetchingData: false,
    apiError: null
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);


import React from 'react';
import SearchForm from '../SearchForm';
import Map from '../Map';

const SearchAndMapDisplayComponent = () => {

    return (
        <div className="container-fluid h-100" data-test="searchAndMapDisplayComponent">
            <div className="row h-100">
                <div className="col-md-3">
                    <SearchForm data-test="searchFormComponent"/>
                </div>
                <div className="col-md-9 ">
                    <Map data-test="mapComponent"/>
                </div>
            </div>
        </div>
    )

};

export default SearchAndMapDisplayComponent;

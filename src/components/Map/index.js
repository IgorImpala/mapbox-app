import "../../../node_modules/mapbox-gl/dist/mapbox-gl.css"
import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import DeckGL from "deck.gl";
import { StaticMap } from "react-map-gl";
import { PathLayer, IconLayer, TextLayer } from "@deck.gl/layers";
import WayPointIcon from '../../assets/graphics/waypoint-icon.png'

class Map extends Component {

    render(){

        const { pathLayerData, iconLayerData, textLayerData, viewState } = this.props;

        const ICON_MAPPING = {
            marker: {x: 0, y: 0, width: 128, height: 256, mask: true}
        };

        //adding layers we need to overlay on the map
        const layers = [
            new PathLayer({
                id: "path-layer",
                data: [...pathLayerData],
                getWidth: data => 5,
                getColor: data => data.color,
                widthMinPixels: 5
            }),
            new IconLayer({
                id: 'icon-layer',
                data: [...iconLayerData],
                pickable: true,
                // iconAtlas and iconMapping are required
                // getIcon: return a string
                iconAtlas: WayPointIcon,
                iconMapping: ICON_MAPPING,
                getIcon: d => 'marker',

                sizeScale: 15,
                getPosition: d => d.coordinates,
                getSize: d => 5,
                getColor: d => [255,0,0],
            }),
            new TextLayer({
                id: 'text-layer',
                data: [...textLayerData],
                pickable: true,
                getPosition: d => d.position,
                getText: d => d.text,
                getPixelOffset: [0, 20],

            })
        ];

        return (
            <div className="flex-grow-1" data-test="mapComponent">
                <DeckGL
                    data-test="deckGL"
                    viewState={viewState}
                    height="100%"
                    width="100%"
                    controller={true}
                    layers={layers}
                >
                    <StaticMap
                        data-test="staticMap"
                        mapStyle="mapbox://styles/mapbox/streets-v11"
                        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                    />
                </DeckGL>
            </div>
        )
    }
}

Map.propTypes = {
    pathLayerData: PropTypes.array,
    iconLayerData: PropTypes.array,
    textLayerData: PropTypes.array,
    viewState:PropTypes.object
};

Map.defaultProps = {
    pathLayerData: [],
    iconLayerData: [],
    textLayerData: [],
    viewState:{
        longitude: 114.177216,
        latitude: 22.302711,
        zoom: 12
    }
};

const mapStateToProps = state => ({
    pathLayerData: state.location.pathLayerData,
    iconLayerData: state.location.iconLayerData,
    textLayerData: state.location.textLayerData,
    viewState: state.location.viewState
});

export default connect(mapStateToProps)(Map);

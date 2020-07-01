import polyline  from '@mapbox/polyline';
import {FlyToInterpolator} from "deck.gl";

export function swapTwoDimArrayElements(array){
    for (let i = 0; i < array.length; i++){
        [array[i][0], array[i][1]] = [array[i][1], array[i][0]];
    }
    return  array;
}


export function createPathLayerDataSet(encodedString){

// returns an array of lat, lon pairs
// polyline.decode('_p~iF~ps|U_ulLnnqC_mqNvxq`@');

    const numberCoordinatesArray = swapTwoDimArrayElements(polyline.decode(encodedString));

    const result = [
        {
            path: numberCoordinatesArray,
            name: "",
            color: [26, 93, 249]
        }
    ];

    return result;
}


export function createIconLayerDataSet(stringCoordinatesArray) {

    /**
     * Data format:
     * [
     *   {name: '', coordinates: [-122.425586, 37.775049] }
     *   ...
     * ]
     */

    const result = [];

    for (let i = 0; i < stringCoordinatesArray.length; i++){

        const dot = {
            name: `${i+1}`,
            coordinates: [ +stringCoordinatesArray[i][1], +stringCoordinatesArray[i][0] ]
        };

        result.push(dot)

    }

    return result;

}



export function createTextLayerDataSet(stringCoordinatesArray) {

    /**
     * Data format:
     * [
     *   {text: '', position: [-122.425586, 37.775049], color: [0, 0, 255]}
     *   ...
     * ]
     */

    const result = [];

    for (let i = 0; i < stringCoordinatesArray.length; i++){


        const wayPointIconText = {
            text: `${i+1}`,
            position: [ +stringCoordinatesArray[i][1], +stringCoordinatesArray[i][0] ],
            color: [0, 0, 255]
        };

        result.push(wayPointIconText)

    }

    return result;

}

export function createDirectionsCoordinates(stringCoordinatesArray) {
    let result = '';

    for (let i = 0; i < stringCoordinatesArray.length; i++){
        result += stringCoordinatesArray[i][1] + "," + stringCoordinatesArray[i][0];
        if (i < stringCoordinatesArray.length  - 1) {
            result += ";"
        }

    }

    return result;

}


export function createViewStateDataSet(array){

    function findCenterCoordinates(arr){
        let minX = null, maxX = null, minY = null, maxY = null;
        for (let i = 0; i < arr.length; i++)
        {
            minX = (+arr[i][1] < minX || minX == null) ? +arr[i][1] : minX;
            maxX = (+arr[i][1] > maxX || maxX == null) ? +arr[i][1] : maxX;
            minY = (+arr[i][0] < minY || minY == null) ? +arr[i][0] : minY;
            maxY = (+arr[i][0] > maxY || maxY == null) ? +arr[i][0] : maxY;
        }

        return [(minX + maxX) / 2, (minY + maxY) / 2];
    }

    const centerCoordinates = findCenterCoordinates(array);

    return {

        longitude: centerCoordinates[0],
        latitude: centerCoordinates[1],
        zoom: 12,
        pitch: 0,
        bearing: 0,
        transitionDuration: 8000,
        transitionInterpolator: new FlyToInterpolator()
    }

}
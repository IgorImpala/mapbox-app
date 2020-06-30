/*import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({
    adapter: new EnzymeAdapter(),
    disableLifecycleMethods: true
});*/
var enzyme = require('enzyme');
var Adapter = require('enzyme-adapter-react-16');

enzyme.configure({
    adapter: new Adapter(),
    disableLifecycleMethods: true
});
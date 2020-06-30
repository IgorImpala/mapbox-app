import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import ViewPageComponent from './components/ViewPageComponent';

function App() {
    return (
        <Provider store={store}>
            <ViewPageComponent/>
        </Provider>
    );
}

/*import SearchableMap from './components/searchableMap/SearchableMap';
import './App.css';

function App() {
  return (
    <div className="App">
      <SearchableMap/>
    </div>
  );
}*/

export default App;

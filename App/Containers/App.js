import store from '../Redux/CreateStore';

import React from 'react';

import { Provider } from 'react-redux';

import RootContainer from './RootContainer';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'App';
    }
    render() {
      return (
        <Provider store={store}>
          <RootContainer />
        </Provider>
      )
    }
}

export default App;

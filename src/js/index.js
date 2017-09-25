import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import mainStore from './main/redux/reducer';

import App from './main/app';

let store = createStore(mainStore);

class Index extends React.Component {
  constructor(props){
    super(props);
  }
  
  render() {
    return (<Provider store={store}>
        <App/>
      </Provider>);
  }
}

ReactDOM.render(<Index/>, document.getElementById('root'));

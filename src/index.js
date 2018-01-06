import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import * as firebase from 'firebase'
import store from './store';
import registerServiceWorker from './registerServiceWorker';
// import './assets/css/bundle.css';
import { init } from './utils/firebase'

class  Root extends React.Component {

 constructor(props) {
   super(props)
    init()
 }
  render () {
    return (<Provider store={store}>
    <App />
</Provider>) 
  }
}
ReactDOM.render(
  <Root />
  , document.getElementById('root'));
registerServiceWorker();

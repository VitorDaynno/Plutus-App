import React from 'react';
import ReactDOM from 'react-dom';
import Login from './login';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Login />, document.getElementById('app'));
registerServiceWorker()
 
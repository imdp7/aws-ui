import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Authenticator } from '@aws-amplify/ui-react';

ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);

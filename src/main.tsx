import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Authenticator } from '@aws-amplify/ui-react';

// https://reactrouter.com/docs/en/v6/getting-started/concepts
ReactDOM.render(
  <React.StrictMode>
    <Authenticator.Provider>
      <App />
    </Authenticator.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

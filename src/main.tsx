import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '@awsui/global-styles/index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './features/home/Home';
import { Feature1 } from './features/feature1/Feature1';
import { Feature2 } from './features/feature2/Feature2';

// https://reactrouter.com/docs/en/v6/getting-started/concepts
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="feature1" element={<Feature1 />} />
          <Route path="feature2" element={<Feature2 />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

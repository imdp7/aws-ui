import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '@awsui/global-styles/index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EC2_Instance from './features/EC2/EC2';
import { Feature2 } from './features/S3/S3';
import HomePage from './HomPage';
import { Instances } from './features/EC2/Instances';
import EC2_HOME from './features/EC2/EC2_HOME';
// https://reactrouter.com/docs/en/v6/getting-started/concepts
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route index element={<App />} />
        <Route path="ec2_instance/dashboard" element={<EC2_Instance />} />
        <Route path="ec2_instance/instances" element={<EC2_HOME />} />
        <Route path="s3" element={<Feature2 />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

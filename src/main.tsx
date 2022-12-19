import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '@awsui/global-styles/index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EC2_Instance from './features/EC2/EC2';
import { S3 } from './features/S3/S3';
import EC2_Instances_List from './features/EC2/EC2_Instances_List';
import { EC2_Instances_Detail } from './features/EC2/EC2_Instance_Detail';
import LaunchEC2 from './features/EC2/LaunchEC2/LaunchEC2';
import EC2 from './features/EC2/EC2';
import PageNotFound from './PageNotFound';
import AllServices from './features/home/AllServices';
// https://reactrouter.com/docs/en/v6/getting-started/concepts
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="s3" element={<S3 />} />
        <Route path="console/services" element={<AllServices />} />
        <Route path="ec2_instance/dashboard" element={<EC2_Instance />} />
        <Route path="ec2_instance/instances" element={<EC2_Instances_List />} />
        <Route path="ec2_instance/:id" element={<EC2_Instances_Detail />} />
        <Route path="ec2_instance/launchEC2" element={<LaunchEC2 />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

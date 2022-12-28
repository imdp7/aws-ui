/* eslint-disable react/prop-types */
import React from 'react';
import { Amplify, API, graphqlOperation, I18n } from 'aws-amplify';
import { withAuthenticator, translations } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import './App.css';
import classes from './app.module.scss';
import HomePage from './HomPage';
import '@awsui/global-styles/index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EC2 from './features/EC2/EC2';
import { S3 } from './features/S3/S3';
import EC2_Instances_List from './features/EC2/EC2_Instances_List';
import { EC2_Instances_Detail } from './features/EC2/EC2_Instance_Detail';
import LaunchEC2 from './features/EC2/LaunchEC2/LaunchEC2';
import PageNotFound from './PageNotFound';
import AllServices from './features/home/AllServices';
import { applyMode, Mode } from '@awsui/global-styles';

I18n.putVocabularies(translations);
I18n.setLanguage('en');

Amplify.configure(awsExports);

const App = ({ user, signOut }): JSX.Element => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="*"
            element={<PageNotFound user={user.username} signOut={signOut} />}
          />
          <Route
            path="/"
            element={<HomePage user={user.username} signOut={signOut} />}
          />
          <Route path="s3" element={<S3 />} />
          <Route
            path="console/services"
            element={<AllServices user={user.username} signOut={signOut} />}
          />
          <Route path="/ec2_instance">
            <Route
              path="dashboard"
              index
              element={<EC2 user={user.username} signOut={signOut} />}
            />
            <Route
              path="instances"
              element={
                <EC2_Instances_List user={user.username} signOut={signOut} />
              }
            />
            <Route
              path=":id"
              element={
                <EC2_Instances_Detail user={user.username} signOut={signOut} />
              }
            />
            <Route
              path="launchEC2"
              element={<LaunchEC2 user={user.username} signOut={signOut} />}
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default withAuthenticator(App);

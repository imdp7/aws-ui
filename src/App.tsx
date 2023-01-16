/* eslint-disable react/prop-types */
import React from 'react';
import { Amplify, I18n } from 'aws-amplify';
import { withAuthenticator, translations } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import './App.css';
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
import Profile from './Auth/Profile';
import EC2_HomePage from './features/EC2/EC2_HomePage';

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
          <Route path="s3">
            <Route
              path="home"
              element={
                <S3
                  user={user.username}
                  signOut={signOut}
                  title="Amazon S3"
                  head="Create Bucket"
                  link="bucket/create"
                  instances="bucket"
                />
              }
            />
          </Route>
          <Route
            path="console/services"
            element={<AllServices user={user.username} signOut={signOut} />}
          />
          <Route path="account">
            <Route
              path="profile"
              element={<Profile user={user.username} signOut={signOut} />}
            />
          </Route>
          <Route path="/ec2_instance">
            <Route
              path="home"
              index
              element={
                <EC2_HomePage
                  user={user.username}
                  signOut={signOut}
                  title="Elastic Cloud Server (EC2) "
                  head="Launch an EC2 Server"
                  link="launchEC2"
                  instances="instances"
                />
              }
            />
            <Route
              path="dashboard"
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

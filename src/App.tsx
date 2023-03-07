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
import BucketList from './features/S3/bucketList';
import BucketDetail from './features/S3/BucketDetail';
import Upload from './features/S3/Upload';
import EC2TypesList from './features/EC2/Instance-types-list';
import CreateS3 from './features/S3/CreateS3';
import EditBucket from './features/S3/components/EditBucket';
import CreateComponent from './features/S3/components/CreateComponent';
import SingleComponent from './features/EC2/components/SingleComponent';
import LaunchTemplate from './features/EC2/components/LaunchTemplate';
import Instance_type_detail from './features/EC2/Instance_type_detail';

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
              index
              element={
                <S3
                  user={user.username}
                  signOut={signOut}
                  title="Amazon S3"
                  head="Create Bucket"
                  link="buckets/create"
                  instances="buckets"
                />
              }
            />
            <Route
              path="buckets"
              element={<BucketList user={user.username} signOut={signOut} />}
            />
            <Route
              path="buckets/:id"
              element={<BucketDetail user={user.username} signOut={signOut} />}
            />
            <Route
              path="buckets/:id/upload"
              element={<Upload user={user.username} signOut={signOut} />}
            />
            <Route
              path="buckets/:id/:info/:subInfo/edit"
              element={<EditBucket user={user.username} signOut={signOut} />}
            />
            <Route
              path="buckets/:id/:info/:subInfo/create"
              element={
                <CreateComponent user={user.username} signOut={signOut} />
              }
            />
            <Route
              path="buckets/:id/:info/:subInfo"
              element={
                <SingleComponent user={user.username} signOut={signOut} />
              }
            />
            <Route
              path="buckets/create"
              element={<CreateS3 user={user.username} signOut={signOut} />}
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
                  link="LaunchInstances"
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
              path="InstanceTypes"
              element={<EC2TypesList user={user.username} signOut={signOut} />}
            />
            <Route
              path="InstanceTypes/:type/d"
              element={
                <Instance_type_detail user={user.username} signOut={signOut} />
              }
            />
            <Route
              path="instances/:id"
              element={
                <EC2_Instances_Detail user={user.username} signOut={signOut} />
              }
            />
            <Route
              path="instances/:id/:info"
              element={
                <SingleComponent user={user.username} signOut={signOut} />
              }
            />
            <Route
              path="LaunchInstances"
              element={<LaunchEC2 user={user.username} signOut={signOut} />}
            />
            <Route
              path="LaunchInstanceFromTemplate"
              element={
                <LaunchTemplate user={user.username} signOut={signOut} />
              }
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default withAuthenticator(App);

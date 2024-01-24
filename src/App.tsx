/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Amplify, I18n } from 'aws-amplify';
import { withAuthenticator, translations } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import './App.css';
import HomePage from './HomPage';
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
import SingleComp from './features/S3/components/SingleComponent';
import CreateComponent from './features/S3/components/CreateComponent';
import SingleComponent from './features/EC2/components/SingleComponent';
import LaunchTemplate from './features/EC2/components/LaunchTemplate';
import Instance_type_detail from './features/EC2/Instance_type_detail';
import Bills from './Auth/Bills';
import PaymentPreferences from './Auth/PaymentPreferences';
import AddPayment from './Auth/Components/SingleComponent';
import SinglePaymentComponent from './Auth/Components/SingleComponent';
import Cloudwatch_Home from './features/Cloudwatch/Cloudwatch_Home';
import Dashboard from './features/Cloudwatch/Dashboard';
import { url } from './features/common/endpoints/url';
import { IUser } from './features/common/models/IUser.model';
import Settings from './Auth/Settings';

I18n.putVocabularies(translations);
I18n.setLanguage('en');

Amplify.configure(awsExports);
const App = ({ user, signOut }): JSX.Element => {
  const checkUserExistence = async (sub: IUser) => {
    try {
      const response = await fetch(`${url.accounts}/${sub}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.status !== 404) {
        return data;
      }
    } catch (error) {
      console.error('Error checking sub existence:', error);
      throw error; // Propagate the error to the caller
    }
  };

  const postUserDataToServer = async (userData: IUser) => {
    try {
      const userExists = await checkUserExistence(userData.user.sub);

      if (userExists) return;

      const postResponse = await fetch(url.accounts, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!postResponse.ok) {
        console.error('Failed to post user data to the server');
      }
    } catch (error) {
      console.error('Error while posting user data:', error);
    }
  };

  const storeUserLocally = (userData) => {
    // Store user information in local storage
    localStorage.setItem('user', JSON.stringify(userData));
  };

  useEffect(() => {
    // Check if the user is already logged in
    if (user) {
      // If user is logged in and not processed yet, store the user information locally
      const userData = {
        user: {
          email: user?.attributes.email,
          email_verified: user?.attributes.email_verified,
          sub: user?.attributes.sub,
        },
        preferences: {
          mode: 'Light', // Provide default values or retrieve from local storage
          density: 'Comfortable',
          motion: false,
        },
        region: 'us-east-1',
      };

      storeUserLocally(userData);
      postUserDataToServer(userData);
    }
  }, [user]);

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
          <Route path="cloudwatch">
            <Route
              path="home"
              index
              element={
                <Cloudwatch_Home
                  user={user.username}
                  signOut={signOut}
                  title="CloudWatch Home"
                />
              }
            />
            <Route
              path="dashboard"
              element={<Dashboard user={user.username} signOut={signOut} />}
            />
          </Route>
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
              element={<SingleComp user={user.username} signOut={signOut} />}
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
          <Route
            path="settings/home"
            element={<Settings user={user.username} signOut={signOut} />}
          />
          <Route path="account">
            <Route
              path="profile"
              element={<Profile user={user.username} signOut={signOut} />}
            />
            <Route
              path="bills"
              element={<Bills user={user.username} signOut={signOut} />}
            />
            <Route
              path="billing/paymentPreferences"
              element={
                <PaymentPreferences user={user.username} signOut={signOut} />
              }
            />
            <Route
              path="billing/paymentPreferences/:info/:subInfo/*"
              element={
                <SinglePaymentComponent
                  user={user.username}
                  signOut={signOut}
                />
              }
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

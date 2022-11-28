import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppHeader } from './features/common/TopNavigations';
import './App.css';
import { store } from './app/store';
import classes from './app.module.scss';
import { applyMode, Mode } from '@awsui/global-styles';
import ec2 from '../assets/ec2/Res_Amazon-EC2_A1-Instance_48_Dark.png';
import s3 from '../assets/s3/Res_Amazon-Simple-Storage-Service_Bucket_48_Dark.png';
import rds from '../assets/rds/Res_Amazon-Aurora_Amazon-RDS-Instance_48_Dark.png';
import {
  Box,
  ColumnLayout,
  Container,
  Link,
  Header,
  HelpPanel,
  Icon,
  LinkProps,
  AppLayout,
} from '@awsui/components-react';
import { useOutletContext } from 'react-router';
import { InfoLink, ValueWithLabel } from './features/common/common';
import { Alert } from '@cloudscape-design/components';

const arrayData = [
  ['EC2 Instance', `${ec2}`, 'ec2_instance/dashboard'],
  ['S3', `${s3}`, 's3'],
  ['Amazon RDS', `${rds}`, 'rds'],
  ['Cloudfront', `${ec2}`, 'cloudfront'],
  ['SQS', `${ec2}`, 'sqs'],
  ['Amazon Connect', `${ec2}`, 'connect'],
  ['VPC', `${ec2}`, 'vpc'],
  ['IAM', `${ec2}`, 'iam'],
  ['Rekognition', `${ec2}`, 'rekognition'],
  ['Cloudshell', `${ec2}`, 'cloudshell'],
  ['Amazon Kendra', `${ec2}`, 'kendra'],
  ['Route 53', `${ec2}`, 'route53'],
  ['API Gateway', `${ec2}`, 'apigateway'],
  ['AWS Amplify', `${ec2}`, 'awsamplify'],
  ['CodeStar', `${ec2}`, 'codestar'],
  ['AWS MGN', `${s3}`, 'awsmgn'],
];

const navItems = [
  {
    type: 'section',
    text: 'Manage',
    items: [
      { type: 'link', text: 'Pages', href: '#/pages' },
      { type: 'link', text: 'Users', href: '#/users' },
    ],
  },
  {
    type: 'section',
    text: 'Set up',
    items: [
      { type: 'link', text: 'Database', href: '#/database' },
      { type: 'link', text: 'Authentication', href: '#/authentication' },
      { type: 'link', text: 'Analytics', href: '#/analytics' },
      { type: 'link', text: 'Predictions', href: '#/predictions' },
      { type: 'link', text: 'Interactions', href: '#/interactions' },
      { type: 'link', text: 'Notifications', href: '#/notifications' },
    ],
  },
];

const AppFooter = (): JSX.Element => {
  return (
    <Box variant="div" id="f" className={classes.app_header_footer}>
      <Box
        variant="div"
        float="right"
        padding={{ left: 'm' }}
        color="inherit"
        fontWeight="light"
      >
        <span>Help</span>
      </Box>
    </Box>
  );
};

const HomeHeader = (): JSX.Element => {
  const updateTools = useOutletContext<(element: JSX.Element) => void>();
  return (
    <Box
      margin={{ bottom: 'l' }}
      padding={{ horizontal: 'xxxl', vertical: 'l' }}
      className={classes.home_header}
    >
      <Header
        variant="h1"
        info={<InfoLink onFollow={() => updateTools(<Feature1HelpPanel />)} />}
      >
        Console Home
      </Header>
      <Box
        variant="p"
        fontWeight="light"
        color="inherit"
        className={classes.home_header_secondary}
      >
        Descriptive sentence about the impressive AWS UI App
      </Box>
    </Box>
  );
};

export const Feature1HelpPanel = (): JSX.Element => {
  return (
    <HelpPanel
      footer={
        <div>
          <h3>
            Learn more <Icon name="external" />
          </h3>
          <ul>
            <li>
              <Link external href="https://docs.example.com/feature1">
                Feature 1 docs
              </Link>
            </li>
          </ul>
        </div>
      }
      header={<h2>Feature 1</h2>}
    >
      <Box variant="p">
        Paragraph containing informative help info about Feature 1
      </Box>
    </HelpPanel>
  );
};

const HomeFeatures = (): JSX.Element => {
  const [visible, setVisible] = React.useState(true);

  const navigate = useNavigate();

  const defaultOnFollowHandler = (
    event: CustomEvent<LinkProps.FollowDetail>
  ): void => {
    navigate(event.detail.href as string);
    event.preventDefault();
  };
  const updateTools = useOutletContext<(element: JSX.Element) => void>();
  return (
    <Container>
      <HomeHeader />
      <div style={{ padding: '10px 20px' }}>
        <Alert
          onDismiss={() => setVisible(false)}
          visible={visible}
          dismissAriaLabel="Close alert"
          dismissible
          header="Introducing the new widgets Applications."
        >
          {' '}
        </Alert>
      </div>
      <Container
        header={
          <Header
            variant="h2"
            info={
              <InfoLink onFollow={() => updateTools(<Feature1HelpPanel />)} />
            }
          >
            Recently visited
          </Header>
        }
      >
        <Box variant="h1" tagOverride="h2" padding={{ bottom: 's', top: 'l' }}>
          {/* <Header
            variant="h2"
            info={
              <InfoLink onFollow={() => updateTools(<Feature1HelpPanel />)} />
            }
          >
            Console Home
          </Header> */}
        </Box>
        <ColumnLayout columns={4} borders="vertical">
          {arrayData.map((d) => (
            <div
              key={d[0]}
              style={{
                display: 'block',
                justifyItems: 'center',
                textAlign: 'center',
              }}
            >
              <img src={`${d[1]}`} alt="logo" />
              <Box variant="h3" padding={{ top: 'n', left: 'l' }}>
                {d[0]}
              </Box>
              <Box variant="p">
                Call to action sentence about benefits of{' '}
                <Link
                  variant="secondary"
                  href={`/${d[2]}`}
                  onFollow={defaultOnFollowHandler}
                >
                  {d[0]}
                </Link>{' '}
              </Box>
            </div>
          ))}
        </ColumnLayout>
      </Container>
    </Container>
  );
};

const HomeData = (updateTools): JSX.Element => {
  return (
    <>
      <ColumnLayout columns={2} borders="horizontal">
        <Container
          header={
            <Header
              variant="h2"
              description="Container description 1"
              info={
                <InfoLink onFollow={() => updateTools(<Feature1HelpPanel />)} />
              }
            >
              AWS Health
            </Header>
          }
        >
          <HomeFeatures />
        </Container>
      </ColumnLayout>
      <ColumnLayout columns={3}>
        <Container
          header={
            <Header
              variant="h2"
              description="Container description 2"
              info={
                <InfoLink onFollow={() => updateTools(<Feature1HelpPanel />)} />
              }
            >
              Container title
            </Header>
          }
        >
          <HomeFeatures />
        </Container>
      </ColumnLayout>
    </>
  );
};
const HomePage = (): JSX.Element => {
  const [tools, setTools] = useState<JSX.Element>();
  const [toolsOpen, setToolsOpen] = useState<boolean>(false);

  const updateTools = (element: JSX.Element): void => {
    setTools(element);
    setToolsOpen(true);
  };
  // https://reactrouter.com/docs/en/v6/api#outlet
  return (
    <div>
      <div>
        <AppHeader />
        <div>
          <HomeFeatures />
          <HomeData />
          {/* <AppLayout
            content={
              <Provider store={store}>
                <Outlet context={updateTools} />
              </Provider>
            }
            tools={tools}
            //toolsOpen={toolsOpen}
            disableContentHeaderOverlap={false}
            onToolsChange={({ detail }) => setToolsOpen(detail.open)}
          /> */}
        </div>
        <AppFooter />
      </div>
      <AppFooter />
    </div>
  );
};

export default HomePage;

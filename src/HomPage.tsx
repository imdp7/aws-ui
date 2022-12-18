/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-empty-function */
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
  Icon,
  LinkProps,
  Alert,
  AppLayout,
  SpaceBetween,
  Grid,
} from '@cloudscape-design/components';
import { useOutletContext } from 'react-router';
import { InfoLink, ValueWithLabel } from './features/common/common';
import { HelpPanels } from './features/EC2/components/header';
import { appLayoutLabels } from './features/common/labels';
import { Notifications } from './features/EC2/commons/common-components';

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

const HomeHeader = ({ loadHelpPanelContent }): JSX.Element => {
  const updateTools = useOutletContext<(element: JSX.Element) => void>();
  return (
    <SpaceBetween size="s">
      <Box
        margin={{ bottom: 'l' }}
        padding={{ horizontal: 'xxxl', vertical: 'l' }}
        className={classes.home_header}
      >
        <Header
          variant="h1"
          info={
            <InfoLink
              onFollow={() =>
                loadHelpPanelContent(
                  <HelpPanels
                    title="Console Home"
                    info="Console Home displays widgets with important information about your AWS environment."
                    des="Amazon EC2 allows you to create virtual machines, or instances, that run on the AWS Cloud. Quickly get started by following the simple steps below."
                    ul={[
                      {
                        h5: 'Customize your Console Home',
                        text: 'You can add a widget from the actions menu, change its size from the widget menu, or drag and drop it to change its position. Changes you make do not affect others using your shared account.',
                      },
                      {
                        h5: 'Change the language of the console',
                        text: 'You can now change the display language for the AWS Management Console in the Unified Settings page. For more information, see Changing the language of the AWS Management Console.',
                      },
                    ]}
                  />
                )
              }
            />
          }
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
    </SpaceBetween>
  );
};

const HomeFeatures = ({ loadHelpPanelContent }): JSX.Element => {
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
    <>
      <HomeHeader loadHelpPanelContent={loadHelpPanelContent} />

      <Alert
        onDismiss={() => setVisible(false)}
        visible={visible}
        dismissAriaLabel="Close alert"
        dismissible
        header="Introducing the new widgets Applications."
      >
        {' '}
      </Alert>
      <SpaceBetween size="m" direction="vertical">
        <Container
          header={
            <Header
              variant="h2"
              info={
                <InfoLink
                  onFollow={() =>
                    loadHelpPanelContent(
                      <HelpPanels
                        title="Recently Visited"
                        des="Jump in where you left off and navigate to the AWS services you most recently worked with."
                        h5="To view all AWS services choose View all AWS services at the bottom of the widget."
                      />
                    )
                  }
                />
              }
            >
              Recently visited
            </Header>
          }
          footer={
            <Box
              variant="h5"
              tagOverride="h5"
              //padding={{ bottom: 's', top: 'l' }}
              textAlign="center"
            >
              <Link href="/console/services">View all AWS services</Link>
            </Box>
          }
        >
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
                    href={`${d[2]}`}
                    onFollow={defaultOnFollowHandler}
                  >
                    {d[0]}
                  </Link>{' '}
                </Box>
              </div>
            ))}
          </ColumnLayout>
        </Container>
        <Grid
          gridDefinition={[
            { colspan: { default: 12, xxs: 4 } },
            { colspan: { default: 12, xxs: 8 } },
          ]}
        >
          <Container
            header={
              <Header
                variant="h2"
                info={
                  <InfoLink
                    onFollow={() =>
                      loadHelpPanelContent(
                        <HelpPanels
                          title="Recently Visited"
                          des="Jump in where you left off and navigate to the AWS services you most recently worked with."
                          h5="To view all AWS services choose View all AWS services at the bottom of the widget."
                        />
                      )
                    }
                  />
                }
              >
                AWS Health
              </Header>
            }
            footer={
              <Box
                variant="h5"
                tagOverride="h5"
                //padding={{ bottom: 's', top: 'l' }}
                textAlign="center"
              >
                <Link href="/console/services">Go to AWS Health</Link>
              </Box>
            }
          >
            <ColumnLayout borders="horizontal">
              <Box variant="pre">Open Issues</Box>
              <ColumnLayout columns={2}>
                <Box>0</Box>
                <Box>Past 7 days</Box>
              </ColumnLayout>
              <div>Content</div>
              <div>Content</div>
              <div>Content</div>
              <div>Content</div>
              <div>Content</div>
              <div>Content</div>
              <div>Content</div>
            </ColumnLayout>
          </Container>
          <Container
            header={
              <Header
                variant="h2"
                info={
                  <InfoLink
                    onFollow={() =>
                      loadHelpPanelContent(
                        <HelpPanels
                          title="Recently Visited"
                          des="Jump in where you left off and navigate to the AWS services you most recently worked with."
                          h5="To view all AWS services choose View all AWS services at the bottom of the widget."
                        />
                      )
                    }
                  />
                }
              >
                Cost and Usage
              </Header>
            }
            footer={
              <Box
                variant="h5"
                tagOverride="h5"
                //padding={{ bottom: 's', top: 'l' }}
                textAlign="center"
              >
                <Link href="/console/services">Go to AWS Cost Management</Link>
              </Box>
            }
          >
            Hellu
          </Container>
        </Grid>
      </SpaceBetween>
    </>
  );
};

const HomePage = (): JSX.Element => {
  const [tools, setTools] = useState<JSX.Element>();
  const [toolsOpen, setToolsOpen] = useState<boolean>(false);
  const [toolsContent, setToolsContent] = useState(
    <HelpPanels
      title="Console Home"
      info="Console Home displays widgets with important information about your AWS environment."
      des="Amazon EC2 allows you to create virtual machines, or instances, that run on the AWS Cloud. Quickly get started by following the simple steps below."
      ul={[
        {
          h5: 'Customize your Console Home',
          text: 'You can add a widget from the actions menu, change its size from the widget menu, or drag and drop it to change its position. Changes you make do not affect others using your shared account.',
        },
        {
          h5: 'Change the language of the console',
          text: 'You can now change the display language for the AWS Management Console in the Unified Settings page. For more information, see Changing the language of the AWS Management Console.',
        },
      ]}
    />
  );
  const loadHelpPanelContent = (toolsContent) => {
    setToolsOpen(true);
    setToolsContent(toolsContent);
  };
  const updateTools = (element: JSX.Element): void => {
    setTools(element);
    setToolsOpen(true);
  };
  // https://reactrouter.com/docs/en/v6/api#outlet
  return (
    <div>
      <AppHeader />
      <AppLayout
        content={
          <SpaceBetween size="s">
            <HomeFeatures loadHelpPanelContent={loadHelpPanelContent} />
          </SpaceBetween>
        }
        contentType="wizard"
        stickyNotifications={true}
        // disableContentPaddings={true}
        toolsOpen={toolsOpen}
        tools={toolsContent}
        navigationHide={true}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        ariaLabels={appLayoutLabels}
        notifications={<Notifications />}
        footerSelector="#f"
      />
    </div>
  );
};

export default HomePage;

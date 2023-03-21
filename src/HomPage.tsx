/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppHeader } from './features/common/TopNavigations';
import './App.css';
import classes from './app.module.scss';
import ec2 from '../assets/ec2/Res_Amazon-EC2_A1-Instance_48_Dark.png';
import s3 from '../assets/s3/Res_Amazon-Simple-Storage-Service_Bucket_48_Dark.png';
import rds from '../assets/rds/Res_Amazon-Aurora_Amazon-RDS-Instance_48_Dark.png';
import {
  Box,
  ColumnLayout,
  Container,
  Link,
  Header,
  LinkProps,
  Alert,
  AppLayout,
  SpaceBetween,
  Grid,
  Button,
  Spinner,
  Modal,
} from '@awsui/components-react';
import { useOutletContext } from 'react-router';
import { InfoLink, ValueWithLabel } from './features/common/common';
import { HelpPanels } from './features/EC2/components/header';
import { appLayoutLabels } from './features/common/labels';
import { AppFooter } from './features/common/AppFooter';
import Card from './components/Card';

const arrayData = [
  ['EC2 Instance', `${ec2}`, 'ec2_instance/home'],
  ['S3', `${s3}`, 's3/home'],
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

const HomeHeader = ({ loadHelpPanelContent }): JSX.Element => {
  const updateTools = useOutletContext<(element: JSX.Element) => void>();
  const [visible, setVisible] = useState(false);

  const onDismissHandler = () => {
    setVisible(false);
  };
  const onSubmit = () => {
    setVisible(false);
  };

  return (
    <SpaceBetween size="s">
      <Box
        margin={{ bottom: 's' }}
        padding={{ horizontal: 'xxl', vertical: 'm' }}
        className={classes.home_header}
      >
        <Modal
          onDismiss={onDismissHandler}
          visible={visible}
          closeAriaLabel="Close modal"
          size="large"
          footer={
            <Box float="right">
              <SpaceBetween direction="horizontal" size="xs">
                <Button variant="link" onClick={onDismissHandler}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={onSubmit}>
                  Ok
                </Button>
              </SpaceBetween>
            </Box>
          }
          header="Add Widgets"
        >
          <Card />
        </Modal>
        <Header
          variant="h1"
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button>Reset to default layout</Button>
              <Button
                ariaLabel="AddWidget"
                variant="primary"
                iconName="add-plus"
                loadingText="loading"
                onClick={() => setVisible(true)}
              >
                Add Widgets
              </Button>
            </SpaceBetween>
          }
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
      </Box>
    </SpaceBetween>
  );
};

function strReduce(string = '') {
  return string.substring(0, length);
}

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

  const RecenltyVisited = () => {
    return (
      <>
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
          <ColumnLayout columns={4} borders="horizontal">
            {arrayData.map((d) => (
              <div
                key={d[0]}
                style={{
                  display: 'flex',
                  justifyItems: 'center',
                  textAlign: 'center',
                  fontSize: '10px',
                }}
              >
                <img src={`${d[1]}`} alt="logo" height="35" width="35" />
                <Box variant="div" padding={{ top: 'n', left: 'xs' }}>
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
      </>
    );
  };

  const Health = () => {
    return (
      <>
        <Container
          header={
            <Header
              variant="h2"
              info={
                <InfoLink
                  onFollow={() =>
                    loadHelpPanelContent(
                      <HelpPanels
                        title="AWS Health"
                        des="View events that might affect your AWS infrastructure and account. Use these alerts to get notified about changes that can affect your AWS resources, then follow the guidance to diagnose and resolve issues."
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
          <Box variant="awsui-key-label" color="text-status-inactive">
            Open Issues
          </Box>
          <Grid gridDefinition={[{ colspan: 4 }, { colspan: 8 }]}>
            <Box color="text-status-info" variant="h1" textAlign="center">
              0
            </Box>
            <Box float="right" textAlign="center">
              7 days ago
            </Box>
          </Grid>
          <Box variant="awsui-key-label" color="text-status-inactive">
            Scheduled changes
          </Box>
          <Grid gridDefinition={[{ colspan: 4 }, { colspan: 8 }]}>
            <Box color="text-status-info" variant="h1" textAlign="center">
              0
            </Box>
            <Box float="right" textAlign="center">
              7 days ago
            </Box>
          </Grid>
          <Box variant="awsui-key-label" color="text-status-inactive">
            Other notifications
          </Box>
          <Grid gridDefinition={[{ colspan: 4 }, { colspan: 8 }]}>
            <Box color="text-status-info" variant="h1" textAlign="center">
              0
            </Box>
            <Box float="right" textAlign="center">
              7 days ago
            </Box>
          </Grid>
        </Container>
      </>
    );
  };

  const CostUsage = () => {
    return (
      <>
        <Container
          header={
            <Header
              variant="h2"
              info={
                <InfoLink
                  onFollow={() =>
                    loadHelpPanelContent(
                      <HelpPanels
                        title="Cost and usage"
                        des="Visualize, manage, and understand your AWS costs and usage. Compare your current and previous month’s costs, and view a cost breakdown for each of your AWS services. Upon registering for Cost Explorer, the current month's data will be available for viewing in about 24 hours. The rest of your data will take a few days to populate."
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
          <SpaceBetween size="s">
            <Box variant="awsui-key-label" color="text-status-inactive">
              Open Issues
            </Box>
            <ColumnLayout columns={4}>
              {arrayData.map((d) => (
                <div
                  key={d[0]}
                  style={{
                    display: 'flex',
                    justifyItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <img src={`${d[1]}`} alt="logo" height="35" width="35" />
                  <Box variant="div" padding={{ top: 'n', left: 'xs' }}>
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
          </SpaceBetween>
        </Container>
      </>
    );
  };

  const BuildSolution = () => {
    return (
      <>
        <Container
          header={
            <Header
              variant="h2"
              description="Start building with simple tables and automated workflows."
              info={
                <InfoLink
                  onFollow={() =>
                    loadHelpPanelContent(
                      <HelpPanels
                        title="Build a solution"
                        des="Access workflows and tables that introduce you to AWS services. You can use these tools to create the resources required to build your intended solution."
                      />
                    )
                  }
                />
              }
            >
              Build a solution
            </Header>
          }
        >
          <SpaceBetween size="s">
            <Box variant="awsui-key-label" color="text-status-inactive">
              Open Issues
            </Box>
            <ColumnLayout columns={4}>
              {arrayData.map((d) => (
                <div
                  key={d[0]}
                  style={{
                    display: 'flex',
                    justifyItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <img src={`${d[1]}`} alt="logo" height="35" width="35" />
                  <Box variant="div" padding={{ top: 'n', left: 'xs' }}>
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
          </SpaceBetween>
        </Container>
      </>
    );
  };

  const TrustedAdviser = () => {
    return (
      <>
        <Container
          header={
            <Header
              variant="h2"
              info={
                <InfoLink
                  onFollow={() =>
                    loadHelpPanelContent(
                      <HelpPanels
                        title="Trusted Advisor"
                        des="Accounts with AWS Business Support or AWS Enterprise Support can see an overview of automated checks on the Trusted Advisor widget. Core security checks and checks for service quotas are available to all accounts on the Trusted Advisor console, inclusive of AWS Developer Support and AWS Basic Support plans."
                      />
                    )
                  }
                />
              }
            >
              Trusted Advisor
            </Header>
          }
          footer={
            <Box
              variant="h5"
              tagOverride="h5"
              //padding={{ bottom: 's', top: 'l' }}
              textAlign="center"
            >
              <Link href="/console/services">Go to Trusted Advisor</Link>
            </Box>
          }
        >
          <Box variant="awsui-key-label" color="text-status-error">
            Action recommended
          </Box>
          <Grid gridDefinition={[{ colspan: 4 }, { colspan: 8 }]}>
            <Box color="text-status-error" variant="h1" textAlign="center">
              0
            </Box>
            <Box float="right" textAlign="center">
              <Link href="#" variant="primary">
                Details
              </Link>
            </Box>
          </Grid>
          <Box variant="awsui-key-label" color="text-status-info">
            Investigation recommended
          </Box>
          <Grid gridDefinition={[{ colspan: 4 }, { colspan: 8 }]}>
            <Box color="text-status-info" variant="h1" textAlign="center">
              0
            </Box>
            <Box float="right" textAlign="center">
              <Link href="#" variant="primary">
                Details
              </Link>
            </Box>
          </Grid>
          <Box variant="awsui-key-label" color="text-status-success">
            Other notifications
          </Box>
          <Grid gridDefinition={[{ colspan: 4 }, { colspan: 8 }]}>
            <Box color="text-status-success" variant="h1" textAlign="center">
              0
            </Box>
            <Box float="right" textAlign="center">
              <Link href="#" variant="primary">
                Details
              </Link>
            </Box>
          </Grid>
        </Container>
      </>
    );
  };

  const ExlporeAWS = () => {
    return (
      <>
        <Container
          header={
            <Header
              variant="h2"
              info={
                <InfoLink
                  onFollow={() =>
                    loadHelpPanelContent(
                      <HelpPanels
                        title="Explore AWS"
                        des="Explore AWS products, services, resources, events, and more."
                      />
                    )
                  }
                />
              }
            >
              Explore AWS
            </Header>
          }
        >
          <SpaceBetween size="m">
            <Box variant="awsui-key-label" color="text-status-inactive">
              <Link external fontSize="heading-s">
                {' '}
                AWS Certifications
              </Link>
              <Box>Propel your career forward with AWS Certification.</Box>
            </Box>
            <Box variant="awsui-key-label" color="text-status-inactive">
              <Link external fontSize="heading-s">
                {' '}
                Free AWS Training
              </Link>
              <Box>
                Advance your career with AWS Cloud Practitioner Essentials—a
                free, six-hour, foundational course.
              </Box>
            </Box>
            <Box variant="awsui-key-label" color="text-status-inactive">
              <Link external fontSize="heading-s">
                AWS Training
              </Link>
              <Box>Free digital courses to help you develop your skills.</Box>
            </Box>
            <Box variant="awsui-key-label" color="text-status-inactive">
              <Link external fontSize="heading-s">
                Free AWS Digital Training
              </Link>
              <Box>
                Learn the AWS Cloud today to create opportunities tomorrow: find
                out how.
              </Box>
            </Box>
          </SpaceBetween>
        </Container>
      </>
    );
  };

  const LatestAnnouncement = () => {
    return (
      <>
        <Container
          header={
            <Header
              variant="h2"
              info={
                <InfoLink
                  onFollow={() =>
                    loadHelpPanelContent(
                      <HelpPanels
                        title="Latest announcements"
                        des="View the latest announcement for the AWS services you're using. Learn about new capabilities that you can use to experiment and innovate. These announcements are personalized to your account."
                      />
                    )
                  }
                />
              }
            >
              Latest Announcements
            </Header>
          }
          footer={
            <Box
              variant="h5"
              tagOverride="h5"
              //padding={{ bottom: 's', top: 'l' }}
              textAlign="center"
            >
              <Link href="/console/services">View all Announcements</Link>
            </Box>
          }
        >
          <Box color="text-status-info" variant="h2">
            <Link>
              {strReduce(
                'Amazon AppFlow now supports Microsoft SharePoint Online as a source'
              )}
            </Link>
            <Link>
              {strReduce(
                'Amazon AppFlow now supports Microsoft SharePoint Online as a source'
              )}
            </Link>
          </Box>
        </Container>
      </>
    );
  };

  const AWSBlogs = () => {
    return (
      <>
        <Container
          header={
            <Header
              variant="h2"
              info={
                <InfoLink
                  onFollow={() =>
                    loadHelpPanelContent(
                      <HelpPanels
                        title="Cost and usage"
                        des="Visualize, manage, and understand your AWS costs and usage. Compare your current and previous month’s costs, and view a cost breakdown for each of your AWS services. Upon registering for Cost Explorer, the current month's data will be available for viewing in about 24 hours. The rest of your data will take a few days to populate."
                      />
                    )
                  }
                />
              }
            >
              Recent AWS Blogs
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
          <Box variant="awsui-key-label" color="text-status-inactive">
            Open Issues
          </Box>
          <Grid gridDefinition={[{ colspan: 4 }, { colspan: 8 }]}>
            <Box color="text-status-info" variant="h1" textAlign="center">
              0
            </Box>
            <Box float="right" textAlign="center">
              7 days ago
            </Box>
          </Grid>
          <Box variant="awsui-key-label" color="text-status-inactive">
            Scheduled changes
          </Box>
          <Grid gridDefinition={[{ colspan: 4 }, { colspan: 8 }]}>
            <Box color="text-status-info" variant="h1" textAlign="center">
              0
            </Box>
            <Box float="right" textAlign="center">
              7 days ago
            </Box>
          </Grid>
          <Box variant="awsui-key-label" color="text-status-inactive">
            Other notifications
          </Box>
          <Grid gridDefinition={[{ colspan: 4 }, { colspan: 8 }]}>
            <Box color="text-status-info" variant="h1" textAlign="center">
              0
            </Box>
            <Box float="right" textAlign="center">
              7 days ago
            </Box>
          </Grid>
        </Container>
      </>
    );
  };
  return (
    <>
      <HomeHeader loadHelpPanelContent={loadHelpPanelContent} />
      <SpaceBetween size="l">
        <Alert
          onDismiss={() => setVisible(false)}
          visible={visible}
          dismissAriaLabel="Close alert"
          dismissible
          header="Introducing the new widgets Applications."
        >
          {' '}
        </Alert>
        <Grid
          gridDefinition={[
            { colspan: { default: 12, m: 8 } },
            { colspan: { default: 12, xs: 4 } },
            { colspan: { default: 12, xs: 4 } },
            { colspan: { default: 12, m: 8 } },
            { colspan: { default: 12, m: 8 } },
            { colspan: { default: 12, xs: 4 } },
            { colspan: { default: 12, xs: 4 } },
            { colspan: { default: 12, xs: 4 } },
            { colspan: { default: 12, xs: 4 } },
          ]}
        >
          <RecenltyVisited />
          <AWSBlogs />
          <Health />
          <CostUsage />
          <BuildSolution />
          <TrustedAdviser />
          <ExlporeAWS />
          {/*<LatestAnnouncement />*/}
          <ExlporeAWS />
          <AWSBlogs />
        </Grid>
      </SpaceBetween>
    </>
  );
};

const HomePage = (props): JSX.Element => {
  const [tools, setTools] = useState<JSX.Element>();
  const [toolsOpen, setToolsOpen] = useState<boolean>(false);
  const [loading, setLoading] = React.useState(true);
  const [visible, setVisible] = useState(false);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  // https://reactrouter.com/docs/en/v6/api#outlet
  return (
    <>
      <div id="h" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
        <AppHeader {...props} />
      </div>
      <AppLayout
        content={
          <>
            {!loading ? (
              <SpaceBetween size="s">
                <HomeFeatures loadHelpPanelContent={loadHelpPanelContent} />
              </SpaceBetween>
            ) : (
              <Spinner size="large" className="spinner" />
            )}
          </>
        }
        headerSelector="#h"
        contentType="table"
        toolsOpen={toolsOpen}
        tools={toolsContent}
        navigationHide={true}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        ariaLabels={appLayoutLabels}
        footerSelector="#f"
      />
      <AppFooter />
    </>
  );
};

export default HomePage;

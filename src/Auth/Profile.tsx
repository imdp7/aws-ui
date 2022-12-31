/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { AppFooter } from '../features/common/AppFooter';
import { AppHeader } from '../features/common/TopNavigations';
import {
  AppLayout,
  Button,
  Container,
  ContentLayout,
  Header,
  BreadcrumbGroup,
  SpaceBetween,
  ExpandableSection,
  Spinner,
  Table,
  ColumnLayout,
  Box,
  FormField,
  Form,
  Input,
  Alert,
  Flashbar,
  Link,
} from '@cloudscape-design/components';
import { DashboardHeader, HelpPanels } from '../features/EC2/components/header';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { appLayoutLabels } from '../features/common/labels';
import { InfoLink } from '../features/common/common';

const Account = (props) => {
  const [edit, setEdit] = useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const editHandler = () => {
    setEdit(true);
  };
  const handleSubmit = (e) => {
    setEdit(false);
    // alert('An essay was submitted: ' + email + password);
    e.preventDefault();
  };
  return (
    <>
      <Container
        header={
          <Header
            variant="h2"
            info={
              <InfoLink
                onFollow={() =>
                  props.loadHelpPanelContent(
                    <HelpPanels
                      title="Account Settings"
                      des="Jump in where you left off and navigate to the AWS services you most recently worked with."
                      h5="To view all AWS services choose View all AWS services at the bottom of the widget."
                    />
                  )
                }
              />
            }
            actions={
              <>
                {!edit ? (
                  <Button onClick={editHandler} variant="normal">
                    Edit
                  </Button>
                ) : null}
              </>
            }
          >
            Account Settings
          </Header>
        }
      >
        {edit ? (
          <>
            <form onSubmit={handleSubmit}>
              <Form
                actions={
                  <SpaceBetween direction="horizontal" size="xs">
                    <Button
                      formAction="none"
                      variant="link"
                      onClick={() => {
                        setEdit(false);
                        setEmail('');
                        setPassword('');
                      }}
                    >
                      Cancel
                    </Button>
                    <Button variant="primary" formAction="submit">
                      Submit
                    </Button>
                  </SpaceBetween>
                }
              >
                <SpaceBetween size="xs">
                  <ColumnLayout borders="horizontal">
                    <ColumnLayout columns={2}>
                      <FormField label="Account ID:">
                        <Input value="610741917922" disabled />
                      </FormField>
                      <FormField label="Seller:">
                        <Input value="Amazon Web Services" disabled />
                      </FormField>
                      <FormField label="Account Name:">
                        <Input
                          value={email}
                          inputMode="email"
                          ariaRequired
                          onChange={({ detail }) => setEmail(detail.value)}
                          placeholder="Enter New Email"
                        />
                      </FormField>
                      <FormField label="Account Name:">
                        <Input
                          value={password}
                          type="password"
                          onChange={({ detail }) => setPassword(detail.value)}
                          placeholder="Set New Password"
                        />
                      </FormField>
                    </ColumnLayout>
                  </ColumnLayout>
                </SpaceBetween>
              </Form>
            </form>
          </>
        ) : (
          <SpaceBetween size="xs">
            <ColumnLayout borders="horizontal">
              <ColumnLayout columns={4}>
                <Box variant="awsui-key-label">Account ID:</Box>
                <Box textAlign="center">610741917922</Box>
                <Box></Box>
              </ColumnLayout>
              <ColumnLayout columns={4}>
                <Box variant="awsui-key-label">Seller:</Box>
                <Box textAlign="center">Amazon Web Services, Inc.</Box>
                <Box></Box>
              </ColumnLayout>
              <ColumnLayout columns={4}>
                <Box variant="awsui-key-label">Account Name:</Box>
                <Box textAlign="center">{email || '-'}</Box>
                <Box></Box>
              </ColumnLayout>
              <ColumnLayout columns={4}>
                <Box variant="awsui-key-label">Password:</Box>
                <Box textAlign="center">**********</Box>
                <Box></Box>
              </ColumnLayout>
            </ColumnLayout>
          </SpaceBetween>
        )}
      </Container>
    </>
  );
};

const Information = (props) => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postal, setPostal] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');

  const editHandler = () => {
    setEdit(true);
  };

  const handleSubmit = (e) => {
    setEdit(false);
    // alert('An essay was submitted: ' + email + password);
    e.preventDefault();
  };
  return (
    <>
      <Container
        header={
          <Header
            variant="h2"
            info={
              <InfoLink
                onFollow={() =>
                  props.loadHelpPanelContent(
                    <HelpPanels
                      title="Contact Information"
                      des="Jump in where you left off and navigate to the AWS services you most recently worked with."
                      h5="To view all AWS services choose View all AWS services at the bottom of the widget."
                    />
                  )
                }
              />
            }
            actions={
              <>
                {!edit ? (
                  <Button onClick={editHandler} variant="normal">
                    Edit
                  </Button>
                ) : null}
              </>
            }
          >
            Contact Information
          </Header>
        }
      >
        {edit ? (
          <>
            <form onSubmit={handleSubmit}>
              <Form
                actions={
                  <SpaceBetween direction="horizontal" size="xs">
                    <Button
                      formAction="none"
                      variant="link"
                      onClick={() => {
                        setEdit(false);
                        setName('');
                        setAddress('');
                        setCity('');
                        setState('');
                        setPostal('');
                        setCountry('');
                        setPhone('');
                        setCompany('');
                        setWebsite('');
                      }}
                    >
                      Cancel
                    </Button>
                    <Button variant="primary" formAction="submit">
                      Submit
                    </Button>
                  </SpaceBetween>
                }
              >
                <SpaceBetween size="xs">
                  <ColumnLayout borders="horizontal">
                    <ColumnLayout columns={4}>
                      <FormField label="Account Name:">
                        <Input
                          value={name}
                          inputMode="text"
                          ariaRequired
                          onChange={({ detail }) => setName(detail.value)}
                          placeholder="Enter Name"
                        />
                      </FormField>
                      <FormField label="Address:">
                        <Input
                          value={address}
                          inputMode="text"
                          ariaRequired
                          onChange={({ detail }) => setAddress(detail.value)}
                          placeholder="Enter Address"
                        />
                      </FormField>
                      <FormField label="City:">
                        <Input
                          value={city}
                          inputMode="text"
                          ariaRequired
                          onChange={({ detail }) => setCity(detail.value)}
                          placeholder="Enter City"
                        />
                      </FormField>
                      <FormField label="State:">
                        <Input
                          value={state}
                          inputMode="text"
                          ariaRequired
                          onChange={({ detail }) => setState(detail.value)}
                          placeholder="Enter State"
                        />
                      </FormField>

                      <FormField label="Postal Code:">
                        <Input
                          value={postal}
                          inputMode="numeric"
                          ariaRequired
                          onChange={({ detail }) => setPostal(detail.value)}
                          placeholder="Enter Postal"
                        />
                      </FormField>
                      <FormField label="Country:">
                        <Input
                          value={country}
                          inputMode="text"
                          ariaRequired
                          onChange={({ detail }) => setCountry(detail.value)}
                          placeholder="Enter Country"
                        />
                      </FormField>
                      <FormField label="Phone Number:">
                        <Input
                          value={phone}
                          inputMode="tel"
                          ariaRequired
                          onChange={({ detail }) => setPhone(detail.value)}
                          placeholder="Enter Phone"
                        />
                      </FormField>
                      <FormField label="Company Name:">
                        <Input
                          value={company}
                          inputMode="text"
                          ariaRequired
                          onChange={({ detail }) => setCompany(detail.value)}
                          placeholder="Enter Company"
                        />
                      </FormField>
                      <FormField label="Website URL:">
                        <Input
                          value={website}
                          inputMode="url"
                          ariaRequired
                          onChange={({ detail }) => setWebsite(detail.value)}
                          placeholder="Enter Website URL"
                        />
                      </FormField>
                    </ColumnLayout>
                  </ColumnLayout>
                </SpaceBetween>
              </Form>
            </form>
          </>
        ) : (
          <SpaceBetween size="xs">
            <ColumnLayout borders="horizontal">
              <ColumnLayout columns={4}>
                <Box variant="awsui-key-label">Full Name:</Box>
                <Box textAlign="center">{name || '-'}</Box>
                <Box></Box>
              </ColumnLayout>
              <ColumnLayout columns={4}>
                <Box variant="awsui-key-label">Address:</Box>
                <Box textAlign="center">{address || '12abc W road'}</Box>
                <Box></Box>
              </ColumnLayout>
              <ColumnLayout columns={4}>
                <Box variant="awsui-key-label">City:</Box>
                <Box textAlign="center">{city || 'Newark'}</Box>
                <Box></Box>
              </ColumnLayout>
              <ColumnLayout columns={4}>
                <Box variant="awsui-key-label">State:</Box>
                <Box textAlign="center">{state || 'NJ'}</Box>
                <Box></Box>
              </ColumnLayout>
              <ColumnLayout columns={4}>
                <Box variant="awsui-key-label">Postal Code:</Box>
                <Box textAlign="center">{postal || '010101'}</Box>
                <Box></Box>
              </ColumnLayout>
              <ColumnLayout columns={4}>
                <Box variant="awsui-key-label">Country:</Box>
                <Box textAlign="center">{country || 'US'}</Box>
                <Box></Box>
              </ColumnLayout>
              <ColumnLayout columns={4}>
                <Box variant="awsui-key-label">Phone Number:</Box>
                <Box textAlign="center">{phone || '9998886628'}</Box>
                <Box></Box>
              </ColumnLayout>
              <ColumnLayout columns={4}>
                <Box variant="awsui-key-label">Company Name:</Box>
                <Box textAlign="center">{company || 'Amazon'}</Box>
                <Box></Box>
              </ColumnLayout>
              <ColumnLayout columns={4}>
                <Box variant="awsui-key-label">Website URL:</Box>
                <Box textAlign="center">
                  <Link href={website} external>
                    {website || 'www.aws.com'}
                  </Link>
                </Box>
                <Box></Box>
              </ColumnLayout>
            </ColumnLayout>
          </SpaceBetween>
        )}
      </Container>
    </>
  );
};

const Payment = (props) => {
  return (
    <Container
      header={
        <Header
          variant="h3"
          info={
            <InfoLink
              onFollow={() =>
                props.loadHelpPanelContent(
                  <HelpPanels
                    title="Payment Currency Preference"
                    des="Jump in where you left off and navigate to the AWS services you most recently worked with."
                    h5="To view all AWS services choose View all AWS services at the bottom of the widget."
                  />
                )
              }
            />
          }
          actions={<Button>Edit</Button>}
        >
          Payment Currency Preference
        </Header>
      }
    >
      <SpaceBetween size="xs">
        <ColumnLayout borders="horizontal">
          <ColumnLayout columns={4}>
            <Box variant="awsui-key-label">Selected Currency:</Box>
            <Box textAlign="center">{'USD - US Dollar' || '-'}</Box>
            <Box></Box>
          </ColumnLayout>
        </ColumnLayout>
      </SpaceBetween>
    </Container>
  );
};

const Profiler = (props) => {
  console.log(props);
  return (
    <>
      <SpaceBetween size="m">
        <Account {...props} />
        <Information {...props} />
        <Payment {...props} />
      </SpaceBetween>
    </>
  );
};

function Profile(props) {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [activeHref, setActiveHref] = React.useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const [toolsContent, setToolsContent] = useState(
    <HelpPanels
      title="Profile"
      des="Amazon Elastic Compute Cloud (Amazon EC2) is a web service that provides
        resizeable computing capacity&mdash;literally, servers in Amazon's data
        centers&mdash;that you use to build and host your software systems."
    />
  );

  const loadHelpPanelContent = (toolsContent) => {
    setToolsOpen(true);
    setToolsContent(toolsContent);
  };
  useEffect(() => {
    document.title = 'AWS Console Profile';
  }, [location]);

  return (
    <>
      <div id="h" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
        <AppHeader {...props} />
      </div>
      <AppLayout
        content={
          <Provider store={store}>
            {!loading ? (
              <ContentLayout
                header={
                  <DashboardHeader
                    loadHelpPanelContent={loadHelpPanelContent}
                    title="Profile"
                    des="Amazon Elastic Compute Cloud (Amazon EC2) is a web service that provides
                         resizeable computing capacity&mdash;literally, servers in Amazon's data
                         centers&mdash;that you use to build and host your software systems."
                  />
                }
              >
                <SpaceBetween size={'m'}>
                  <Profiler
                    loadHelpPanelContent={loadHelpPanelContent}
                    {...props}
                  />
                </SpaceBetween>
              </ContentLayout>
            ) : (
              <Spinner size="large" className="spinner" />
            )}
          </Provider>
        }
        headerSelector="#h"
        footerSelector="#f"
        // navigation={
        //   <Navigation
        //     activeHref={activeHref}
        //     onFollow={(event) => {
        //       if (!event.detail.external) {
        //         event.preventDefault();
        //         setActiveHref(event.detail.href);
        //       }
        //     }}
        //     items={ec2navItems}
        //   />
        // }
        tools={toolsContent}
        toolsOpen={toolsOpen}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        ariaLabels={appLayoutLabels}
        contentType="wizard"
        breadcrumbs={
          <BreadcrumbGroup
            items={[
              { text: 'Account', href: '/account' },
              { text: 'Profile', href: 'profile' },
            ]}
          />
        }
      />
      <AppFooter />
    </>
  );
}

export default Profile;

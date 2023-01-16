import React, { useState, useEffect } from 'react';
import { AppHeader } from '../common/TopNavigations';
import { AppFooter } from '../common/AppFooter';
import {
  AppLayout,
  Container,
  ContentLayout,
  SpaceBetween,
  Spinner,
  Header,
  BreadcrumbGroup,
  Grid,
  Button,
  Link,
  ColumnLayout,
  Box,
} from '@cloudscape-design/components';
import { Provider } from 'react-redux';
import { appLayoutLabels, externalLinkProps } from '../common/labels';
import { store } from '../../app/store';
import {
  Navigation,
  ec2navItems,
  EC2Header,
} from './commons/common-components';

const Content = () => {
  return (
    <Grid
      gridDefinition={[
        { colspan: { l: 8, m: 8, default: 12 } },
        { colspan: { l: 4, m: 4, default: 12 } },
        { colspan: { l: 8, m: 8, default: 12 } },
        { colspan: { l: 4, m: 4, default: 12 } },
        { colspan: { l: 6, m: 6, default: 12 } },
        { colspan: { l: 6, m: 6, default: 12 } },
        { colspan: { l: 6, m: 6, default: 12 } },
        { colspan: { l: 6, m: 6, default: 12 } },
        { colspan: { l: 8, m: 8, default: 12 } },
        { colspan: { l: 4, m: 4, default: 12 } },
      ]}
    >
      <Container header={<Header variant="h2">How it works</Header>}>
        <img
          width="100%"
          src="https://a.b.cdn.console.awsstatic.com/37f2fa6ed76790c8ecb6173c28a30d0e32bab3638328cddcf88c0e326ef357cd/f5b4e08b6ac20aa83057aa93ee14554e.png"
        />
      </Container>
      <Container header={<Header variant="h2">Learn more</Header>}>
        <div>
          <Box variant="h4">Secure data integration</Box>
          With Amazon AppFlow, your flows are always encrypted. You can even
          choose your own encryption keys. You can also create private flows
          between AWS services and SaaS applications that have integrated with
          AWS PrivateLink. Amazon AppFlow will automatically route private flows
          over the AWS infrastructure without exposing the data to the public
          internet, reducing the risk of sensitive data leakage.
        </div>
        <Link external>Learn more about AWS PrivateLink </Link>
      </Container>
      <Container header={<Header variant="h2">Benefits and features</Header>}>
        <SpaceBetween size="m">
          <ColumnLayout columns={2} variant="text-grid">
            <div>
              <Box variant="h4">Speed and automation</Box>
              Use Amazon AppFlow to integrate applications in a few minutes – no
              more waiting days or weeks to code custom connectors. Features
              like data pagination, error logging, and network connection
              retries are included by default so there’s no coding or
              management. With Amazon Appflow, data flow quality is built in,
              and you can enrich the flow of data through masking, mapping,
              merging, filtering, and validation as part of the flow itself.
            </div>
            <div>
              <Box variant="h4">Security and privacy</Box>
              All data flowing through Amazon AppFlow is encrypted at rest and
              in transit. You can encrypt data with AWS keys, or bring your own
              custom keys. With Amazon AppFlow, you can use your existing
              identity and access management policies to enforce fine-grained
              permissions, rather than creating new policies. For applications
              that have integrated with AWS PrivateLink, data is secured from
              the public internet by default.
            </div>
            <div>
              <Box variant="h4">Scalability</Box>
              Amazon AppFlow easily scales up without the need to plan or
              provision resources, so you can move large volumes of data without
              breaking it down into multiple batches. Using Amazon AppFlow, you
              can easily transfer millions of Salesforce records or Zendesk
              tickets - all while running a single flow.
            </div>
            <div>
              <Box variant="h4">Reliability</Box>
              Amazon AppFlow is built with a highly available architecture to
              prevent single points of failure. Amazon AppFlow takes advantage
              of AWS scaling, monitoring, auditing, and billing features.
            </div>
          </ColumnLayout>
        </SpaceBetween>
      </Container>
      <Container header={<Header variant="h2">Pricing</Header>}>
        <div>
          Pay only for what you use. There are no minimum or subscription fees.
          Your cost depends on how often your flows run, and the volume of data
          transferred.
        </div>{' '}
        <Link external>Learn More</Link>
      </Container>
    </Grid>
  );
};
function EC2_HomePage(props) {
  const [loading, setLoading] = useState(false);
  const [activeHref, setActiveHref] = useState('Homepage');

  useEffect(() => {
    document.title = 'AWS Console Profile';
  }, [location]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div id="h" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
        <AppHeader {...props} />
      </div>
      <AppLayout
        headerSelector="#h"
        footerSelector="#f"
        ariaLabels={appLayoutLabels}
        contentType="wizard"
        toolsHide={true}
        breadcrumbs={<BreadcrumbGroup items={[]} />}
        navigation={
          <Navigation
            activeHref={activeHref}
            onFollow={(event) => {
              if (!event.detail.external) {
                event.preventDefault();
                setActiveHref(event.detail.href);
              }
            }}
            items={ec2navItems}
            header={EC2Header}
          />
        }
        content={
          <Provider store={store}>
            {!loading ? (
              <ContentLayout
                header={
                  <Header
                    variant="h1"
                    description="Create your first flow. Select the app to connect, and a trigger for starting your flow."
                    actions={
                      <SpaceBetween size="m">
                        <Container
                          variant="stacked"
                          header={
                            <Header
                              variant="h3"
                              description="Create your first instance server. Select and a trigger for flow."
                            >
                              Launch an EC2 Server
                            </Header>
                          }
                        >
                          <SpaceBetween size="m" direction="horizontal">
                            <Button
                              variant="primary"
                              onClick={() =>
                                (window.location.href = 'LaunchEC2')
                              }
                            >
                              Create Instance
                            </Button>
                            <Button
                              onClick={() =>
                                (window.location.href = 'instances')
                              }
                            >
                              View Instances
                            </Button>
                          </SpaceBetween>
                        </Container>
                      </SpaceBetween>
                    }
                  >
                    Elastic Cloud Server (EC2)
                  </Header>
                }
              >
                <SpaceBetween size={'m'}>
                  <Content {...props} />
                </SpaceBetween>
              </ContentLayout>
            ) : (
              <Spinner size="large" className="spinner" />
            )}
          </Provider>
        }
      />
      <AppFooter />
    </>
  );
}

export default EC2_HomePage;

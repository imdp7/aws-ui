/* eslint-disable react/prop-types */
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
  Button,
} from '@awsui/components-react';
import { Provider } from 'react-redux';
import { appLayoutLabels } from '../common/labels';
import { store } from '../../app/store';
import {
  Navigation,
  ec2navItems,
  EC2Header,
} from './commons/common-components';
import { Content } from './commons/Home';
import { useNavigate } from 'react-router-dom';
function EC2_HomePage(props) {
  const [loading, setLoading] = useState(false);
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('Homepage');

  useEffect(() => {
    document.title = 'EC2 Management Console';
  }, [location]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <div id="h" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
        <AppHeader {...props} />
      </div>
      <AppLayout
        headerSelector="#h"
        footerSelector="#f"
        ariaLabels={appLayoutLabels}
        contentType="table"
        toolsHide={true}
        navigationOpen={navigationOpen}
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
                          header={
                            <Header
                              variant="h2"
                              description="Create your first instance server. Select and a trigger for flow."
                            >
                              {props.head}
                            </Header>
                          }
                        >
                          <SpaceBetween size="m" direction="horizontal">
                            <Button
                              variant="primary"
                              onClick={() =>
                                navigate(`/ec2_instance/${props.link}`)
                              }
                            >
                              Create Instance
                            </Button>
                            <Button
                              onClick={() =>
                                navigate(`/ec2_instance/${props.instances}`)
                              }
                            >
                              View Instances
                            </Button>
                          </SpaceBetween>
                        </Container>
                      </SpaceBetween>
                    }
                  >
                    {props.title}
                  </Header>
                }
              >
                <SpaceBetween size={'m'}>
                  <Content
                    {...props}
                    pricing=" Pay only for what you use. There are no minimum or subscription fees.
          Your cost depends on how often your flows run, and the volume of data
          transferred."
                    image="https://a.b.cdn.console.awsstatic.com/37f2fa6ed76790c8ecb6173c28a30d0e32bab3638328cddcf88c0e326ef357cd/f5b4e08b6ac20aa83057aa93ee14554e.png"
                    useCase={false}
                  />
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

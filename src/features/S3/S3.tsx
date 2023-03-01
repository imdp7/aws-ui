/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Content } from '../EC2/commons/Home';
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
} from '@cloudscape-design/components';
import { Provider } from 'react-redux';
import { appLayoutLabels } from '../common/labels';
import { store } from '../../app/store';
import {
  Navigation,
  S3navItems,
  S3Header,
} from '../EC2/commons/common-components';
import { useNavigate } from 'react-router-dom';

export const S3 = (props): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [activeHref, setActiveHref] = useState('home');

  useEffect(() => {
    document.title = 'S3 Management Console';
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
            items={S3navItems}
            header={S3Header}
          />
        }
        content={
          <Provider store={store}>
            {!loading ? (
              <ContentLayout
                header={
                  <Header
                    variant="h1"
                    description="Amazon S3 is an object storage service that offers industry-leading scalability, data availability, security, and performance."
                    actions={
                      <SpaceBetween size="m">
                        <Container
                          variant="stacked"
                          header={
                            <Header
                              variant="h3"
                              description="Every object in S3 is stored in a bucket. To upload files and folders to S3."
                            >
                              {props.head}
                            </Header>
                          }
                        >
                          <SpaceBetween size="m" direction="horizontal">
                            <Button
                              variant="primary"
                              onClick={() => navigate(`/s3/${props.link}`)}
                            >
                              Create Bucket
                            </Button>
                            <Button
                              onClick={() => navigate(`/s3/${props.instances}`)}
                            >
                              View Bucket
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
                    pricing="With S3, there are no minimum fees. You only pay for what you use. Prices are based on the location of your S3 bucket. Estimate your monthly bill using the AWS Simple Monthly Calculator "
                    useCase={true}
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
};

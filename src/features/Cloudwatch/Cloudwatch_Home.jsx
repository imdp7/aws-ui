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
  Box,
  Header,
  BreadcrumbGroup,
  Button,
} from '@awsui/components-react';
import { Provider } from 'react-redux';
import { appLayoutLabels } from '../common/labels';
import { store } from '../../app/store';
import {
  Navigation,
  cloudWatchNavItems,
  CloudWatchHeader,
} from '../EC2/commons/common-components';
import { Content } from '../EC2/commons/Home';
import { useNavigate } from 'react-router-dom';
function Cloudwatch_Home(props) {
  const [loading, setLoading] = useState(false);
  const [activeHref, setActiveHref] = useState('home');
  useEffect(() => {
    document.title = 'CloudWatch Management Console';
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
            items={cloudWatchNavItems}
            header={CloudWatchHeader}
          />
        }
        content={
          <Provider store={store}>
            {!loading ? (
              <ContentLayout
                header={
                  <SpaceBetween size="xxs">
                    <Box
                      variant="span"
                      fontSize="display-l"
                      fontWeight="heavy"
                      padding={{ top: 's', left: 'l', bottom: 'n' }}
                    >
                      CloudWatch
                    </Box>

                    <Box
                      variant="span"
                      fontSize="heading-xl"
                      fontWeight="heavy"
                      color="text-label"
                      padding={{ top: 's', left: 'l', bottom: 'n' }}
                      className="header-context"
                    >
                      Observability of your AWS resources and applications on
                      AWS and on-premises.
                    </Box>
                    <Box
                      variant="span"
                      fontSize="heading-m"
                      fontWeight="light"
                      padding={{ top: 's', left: 'l', bottom: 'n' }}
                      className="header-context"
                    >
                      CloudWatch provides you with data and actionable insights
                      to monitor your applications, respond to system-wide
                      performance changes, optimize resource utilization, and
                      get a unified view of operational health.
                    </Box>
                  </SpaceBetween>
                }
              >
                <SpaceBetween size={'m'}>
                  <Content
                    {...props}
                    pricing=" Pay only for what you use. There are no minimum or subscription fees.
          Your cost depends on how often your flows run, and the volume of data
          transferred."
                    description="CloudWatch collects monitoring and operational data in the form of logs, metrics, and events, and visualizes it using automated dashboards so you can get a unified view of your AWS resources, applications, and services that run in AWS and on-premises. You can correlate your metrics and logs to better understand the health and performance of your resources. You can also create alarms based on metric value thresholds you specify, or that can watch for anomalous metric behavior based on machine learning algorithms. To take action quickly, you can set up automated actions to notify you if an alarm is triggered and automatically start auto scaling, for example, to help reduce mean-time-to-resolution. You can also dive deep and analyze your metrics, logs, and traces, to better understand how to improve application performance."
                    image="https://a.b.cdn.console.awsstatic.com/a/v1/6M7KASYKGPRKCJEDASEQ45GK7OGF3ZTJDFAFWDA4JJQAF2GMRLWA/73616e05c9de4d1bce24.svg"
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

export default Cloudwatch_Home;

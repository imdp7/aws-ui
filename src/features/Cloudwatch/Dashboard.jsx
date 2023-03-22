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
  Tabs,
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
  Notifications,
} from '../EC2/commons/common-components';
import { useNavigate } from 'react-router-dom';
import CustomDashboard from './Components/CustomDashboard';

const Content = () => {
  return (
    <Tabs
      tabs={[
        {
          label: 'Custom dashboards',
          id: 'first',
          content: <CustomDashboard />,
        },
        {
          label: 'Automatic dashboards',
          id: 'second',
          content: 'Second tab content area',
        },
      ]}
    />
  );
};
function Dashboard(props) {
  const [loading, setLoading] = useState(false);
  const [activeHref, setActiveHref] = useState('dashboard');

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
        breadcrumbs={
          <BreadcrumbGroup
            items={[
              {
                text: 'CloudWatch',
                href: 'dashboard',
              },
              {
                text: 'Dashboards',
                href: '#',
              },
            ]}
          />
        }
        content={
          <Provider store={store}>
            <Content />
          </Provider>
        }
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
      />
      <AppFooter />
    </>
  );
}

export default Dashboard;

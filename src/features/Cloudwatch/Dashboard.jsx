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
} from '@cloudscape-design/components';
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
import { InfoLink, ValueWithLabel } from '../common/common';
import { HelpPanels } from '../EC2/components/header';
import AutomaticDashboards from './Components/AutomaticDashboards';

const Content = ({ loadHelpPanelContent }) => {
  return (
    <Tabs
      tabs={[
        {
          label: 'Custom dashboards',
          id: 'first',
          content: (
            <CustomDashboard loadHelpPanelContent={loadHelpPanelContent} />
          ),
        },
        {
          label: 'Automatic dashboards',
          id: 'second',
          content: (
            <AutomaticDashboards loadHelpPanelContent={loadHelpPanelContent} />
          ),
        },
      ]}
    />
  );
};
function Dashboard(props) {
  const [loading, setLoading] = useState(false);
  const [activeHref, setActiveHref] = useState('dashboard');
  const [toolsOpen, setToolsOpen] = useState(false);
  const [toolsContent, setToolsContent] = useState(
    <HelpPanels
      title="Dashboards"
      info="Amazon CloudWatch dashboards are customizable home pages in the CloudWatch console that you can use to monitor your resources in a single view, even those resources that are spread across different Regions. You can use CloudWatch dashboards to create customized views of the metrics and alarms for your AWS resources."
      des="To get started with CloudWatch dashboards, you must first create a dashboard. You can create multiple dashboards. There is no limit on the number of CloudWatch dashboards in your AWS account. All dashboards are global and can contain metrics from all Regions."
    />
  );
  const loadHelpPanelContent = (toolsContent) => {
    setToolsOpen(true);
    setToolsContent(toolsContent);
  };

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
        toolsOpen={toolsOpen}
        tools={toolsContent}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
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
            <Content loadHelpPanelContent={loadHelpPanelContent} />
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

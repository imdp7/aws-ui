/* eslint-disable react/prop-types */
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Grid from '@cloudscape-design/components/grid';
import SpaceBetween from '@cloudscape-design/components/space-between';
import '@cloudscape-design/global-styles/dark-mode-utils.css';
import './styles/dashboard.scss';
import './styles/density-switch-images.scss';
import { appLayoutLabels } from '../common/labels';
import { DashboardHeader, HelpPanels } from './components/header';
import {
  FeaturesSpotlight,
  AccountAttributes,
} from './components/related-resources';
import ServiceOverview from './components/overview';
import ServiceHealth from './components/service-health';
import ZoneStatus from './components/zone-status';
import Alarms from './components/alarms';
import InstancesLimits from './components/instance-limits';
import Events from './components/events';
import CPUUtilisation from './components/cpu-utilisation';
import NetworkTraffic from './components/network-traffic';
import useNotifications from './commons/use-notifications';
import {
  Notifications,
  ec2navItems,
  Navigation,
} from './commons/common-components';
import { AppHeader } from '../common/TopNavigations';
import { Provider } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { store } from '../../app/store';
import { AppFooter } from '../common/AppFooter';
import { Flashbar } from '@cloudscape-design/components';

function Breadcrumbs() {
  const breadcrumbItems = [
    {
      text: 'EC2',
      href: 'dashboard',
    },
    {
      text: 'Dashboard',
      href: '/',
    },
  ];

  return (
    <BreadcrumbGroup
      items={breadcrumbItems}
      expandAriaLabel="Show path"
      ariaLabel="Breadcrumbs"
    />
  );
}

function Content(props) {
  return (
    <Grid
      gridDefinition={[
        { colspan: { l: 8, m: 8, default: 12 } },
        { colspan: { l: 4, m: 4, default: 12 } },
        { colspan: { l: 6, m: 6, default: 12 } },
        { colspan: { l: 6, m: 6, default: 12 } },
        { colspan: { l: 6, m: 6, default: 12 } },
        { colspan: { l: 6, m: 6, default: 12 } },
        { colspan: { l: 6, m: 6, default: 12 } },
        { colspan: { l: 6, m: 6, default: 12 } },
        { colspan: { l: 8, m: 8, default: 12 } },
        { colspan: { l: 4, m: 4, default: 12 } },
      ]}
    >
      <ServiceOverview />
      <ServiceHealth loadHelpPanelContent={props.loadHelpPanelContent} />
      <CPUUtilisation />
      <NetworkTraffic />
      <Alarms />
      <InstancesLimits />
      <Events />
      <ZoneStatus />
      <FeaturesSpotlight />
      <AccountAttributes />
    </Grid>
  );
}

export default function EC2(props): JSX.Element {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [activeHref, setActiveHref] = React.useState('dashboard');
  const [loading, setLoading] = useState(false);
  const { notifications, notifyInProgress } = useNotifications({
    resourceName: 'instance',
  });
  const [toolsContent, setToolsContent] = useState(
    <HelpPanels
      title="EC2 Instances"
      des="Amazon Elastic Compute Cloud (Amazon EC2) is a web service that provides
        resizeable computing capacity&mdash;literally, servers in Amazon's data
        centers&mdash;that you use to build and host your software systems."
    />
  );

  const loadHelpPanelContent = (toolsContent) => {
    setToolsOpen(true);
    setToolsContent(toolsContent);
  };
  const [homePage, setHomePage] = useState<boolean>();
  useEffect(() => {
    setHomePage(location.pathname == '/');

    document.title = 'EC2 Management Console';
  }, [location]);

  // https://reactrouter.com/docs/en/v6/apioutlet
  return (
    <>
      <div id="h" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
        <AppHeader {...props} />
      </div>
      <AppLayout
        content={
          <Provider store={store}>
            <ContentLayout
              header={
                <DashboardHeader
                  loadHelpPanelContent={loadHelpPanelContent}
                  title="EC2 Dashboard"
                  buttonText="Launch instance"
                  href="launchEC2"
                  des="Amazon Elastic Compute Cloud (Amazon EC2) is a web service that provides
                         resizeable computing capacity&mdash;literally, servers in Amazon's data
                         centers&mdash;that you use to build and host your software systems."
                />
              }
            >
              <Content loadHelpPanelContent={loadHelpPanelContent} />
            </ContentLayout>

            <SpaceBetween size={'xxs'}>
              <Outlet context={loadHelpPanelContent} />
            </SpaceBetween>
          </Provider>
        }
        headerSelector="#h"
        footerSelector="#f"
        contentType="table"
        breadcrumbs={!homePage && <Breadcrumbs />}
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
          />
        }
        tools={toolsContent}
        toolsOpen={toolsOpen}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        ariaLabels={appLayoutLabels}
        notifications={<Flashbar items={notifications} />}
      />
      <AppFooter />
    </>
  );
}

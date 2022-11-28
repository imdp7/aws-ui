/* eslint-disable react/prop-types */
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from '@cloudscape-design/components/app-layout';
import Box from '@cloudscape-design/components/box';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import ContentLayout from '@cloudscape-design/components/content-layout';
import FormField from '@cloudscape-design/components/form-field';
import Grid from '@cloudscape-design/components/grid';
import Link from '@cloudscape-design/components/link';
import Modal from '@cloudscape-design/components/modal';
import Popover from '@cloudscape-design/components/popover';
import SpaceBetween from '@cloudscape-design/components/space-between';
import SideNavigation from '@cloudscape-design/components/side-navigation';
import Tiles from '@cloudscape-design/components/tiles';
import '@cloudscape-design/global-styles/dark-mode-utils.css';
import './styles/dashboard.scss';
import './styles/density-switch-images.scss';
import { appLayoutLabels } from '../common/labels';
import {
  densityStorage,
  densityLocalStorageKey,
  updateDensity,
} from '../common/apply-mode';
import * as localStorage from '../common/localStorage';

import { DashboardHeader, EC2Info } from './components/header';
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
import { navHeader, Notifications } from './commons/common-components';
import { AppHeader } from '../common/TopNavigations';
import { Provider } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { store } from '../../app/store';
import classes from '../../app.module.scss';
import EC2_HOME from './EC2_HOME';

function Breadcrumbs() {
  const breadcrumbItems = [
    {
      text: 'EC2',
      href: '/ec2_instance/dashboard',
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

export function Navigation() {
  const savePreference = (value) => densityStorage.save(value);
  const storedPreference = localStorage.load(densityLocalStorageKey);

  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(storedPreference ?? 'comfortable');

  useEffect(() => {
    setValue(storedPreference ?? 'comfortable');
    updateDensity(storedPreference);
  }, [storedPreference]);

  const onFollowHandler = (e) => {
    e.preventDefault();
    e.detail.href === '/density_settings' ? setVisible(true) : null;
  };

  const onDismissHandler = () => {
    setValue(storedPreference ?? 'comfortable');
    setVisible(false);
  };

  const onSubmit = (value) => {
    setValue(value);
    updateDensity(value);
    savePreference(value);
    setVisible(false);
  };

  const navItems = [
    { type: 'link', text: 'Dashboard', href: '/ec2_instance/dashboard' },
    {
      type: 'link',
      text: 'Events',
      href: '/events',
      info: (
        <Box color="text-status-info" display="inline">
          <Popover
            header="Introducing events"
            size="medium"
            triggerType="text"
            content={
              <>
                AWS can schedule events for your instances, such as reboot,
                stop/start, or retirement.{' '}
                <Link external={true} href="">
                  Learn more
                </Link>
              </>
            }
            renderWithPortal={true}
            dismissAriaLabel="Close"
          >
            <Box
              color="text-status-info"
              fontSize="body-s"
              fontWeight="bold"
              data-testid="new-feature-announcement-trigger"
            >
              New
            </Box>
          </Popover>
        </Box>
      ),
    },
    { type: 'link', text: 'Tags', href: '/tags' },
    { type: 'link', text: 'Reports', href: '/reports' },
    { type: 'link', text: 'Limits', href: '/limits' },
    {
      text: 'Instances',
      type: 'section',
      defaultExpanded: true,
      items: [
        { type: 'link', text: 'Instances', href: '/ec2_instance/instances' },
        {
          type: 'link',
          text: 'Launch templates',
          href: '/launch_templates',
          info: (
            <Box color="text-status-info" display="inline">
              <Popover
                header="Introducing launch templates"
                size="medium"
                triggerType="text"
                content={
                  <>
                    Launch templates is a new capability that enables a new way
                    to templatize your launch requests. Launch templates
                    streamline and simplify the launch process for auto scaling,
                    spot fleet, spot, and on-demand instances.{' '}
                    <Link external>Learn more</Link>
                  </>
                }
                renderWithPortal={true}
                dismissAriaLabel="Close"
              >
                <Box
                  color="text-status-info"
                  fontSize="body-s"
                  fontWeight="bold"
                >
                  New
                </Box>
              </Popover>
            </Box>
          ),
        },
        { type: 'link', text: 'Spot requests', href: '/spot_requests' },
        {
          type: 'link',
          text: 'Reserved instances',
          href: '/reserved_instances',
        },
        { type: 'link', text: 'Dedicated hosts', href: '/dedicated_hosts' },
        {
          type: 'link',
          text: 'Scheduled instances',
          href: '/scheduled_instances',
          info: (
            <Box color="text-status-info" display="inline">
              <Popover
                data-testid="beta"
                header="Beta feature"
                size="medium"
                triggerType="text"
                content={
                  <>
                    We are improving the way to create scheduled instances.{' '}
                    <Link external>Learn more</Link>
                  </>
                }
                renderWithPortal={true}
                dismissAriaLabel="Close"
              >
                <Box
                  color="text-status-info"
                  fontSize="body-s"
                  fontWeight="bold"
                >
                  Beta
                </Box>
              </Popover>
            </Box>
          ),
        },
        {
          type: 'link',
          text: 'Capacity reservations',
          href: '/capacity_reservations',
        },
      ],
    },
    {
      text: 'Images',
      type: 'section',
      defaultExpanded: true,
      items: [
        { type: 'link', text: 'AMIs', href: '/amis' },
        { type: 'link', text: 'Bundle tasks', href: '/bundle_tasks' },
      ],
    },
    {
      text: 'Elastic block store',
      type: 'section',
      defaultExpanded: true,
      items: [
        { type: 'link', text: 'Volumes', href: '/volumes' },
        { type: 'link', text: 'Snapshots', href: '/snapshots' },
        {
          type: 'link',
          text: 'Lifecycle manager',
          href: '/lifecycle_manager',
        },
      ],
    },
    {
      text: ' Network & security',
      type: 'section',
      defaultExpanded: true,
      items: [
        { type: 'link', text: 'Security groups', href: '/security_groups' },
        { type: 'link', text: 'Elastic IPs', href: '/elastic_ips' },
        { type: 'link', text: 'Placement groups', href: '/placement_groups' },
        { type: 'link', text: 'Key pairs', href: '/key_pairs' },
        {
          type: 'link',
          text: 'Network interfaces',
          href: '/network_interfaces',
        },
      ],
    },
    {
      text: 'Load balancing',
      type: 'section',
      defaultExpanded: true,
      items: [
        { type: 'link', text: 'Load balancers', href: '/load_balancers' },
        { type: 'link', text: 'Target groups', href: '/target_groups' },
      ],
    },
    {
      text: 'Auto scaling',
      type: 'section',
      defaultExpanded: true,
      items: [
        {
          type: 'link',
          text: 'Launch configurations',
          href: '/launch_configurations',
        },
        {
          type: 'link',
          text: 'Auto scaling groups',
          href: '/auto_scaling_groups',
        },
      ],
    },
    { type: 'divider' },
    {
      type: 'link',
      href: '/density_settings',
      text: 'Density settings',
    },
  ];

  return (
    <>
      <SideNavigation
        header={navHeader}
        items={navItems}
        activeHref="/ec2_instance/dashboard"
        onFollow={(e) => onFollowHandler(e)}
      />
      <Modal
        onDismiss={() => onDismissHandler()}
        visible={visible}
        size="medium"
        closeAriaLabel="Close modal"
        footer={
          <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="link" onClick={() => onDismissHandler()}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => onSubmit(value)}>
                Confirm
              </Button>
            </SpaceBetween>
          </Box>
        }
        header="Density settings"
      >
        <FormField
          label="Content density"
          description="Choose the preferred level of content density for this console."
        >
          <Tiles
            onChange={({ detail }) => setValue(detail.value)}
            value={value}
            items={[
              {
                value: 'comfortable',
                label: 'Comfortable',
                description:
                  'Default spacing that optimizes information consumption.',
                image: '',
              },
              {
                value: 'compact',
                label: 'Compact',
                description:
                  'Reduced spacing that provides more visibility over content.',
                image: '',
              },
            ]}
          />
        </FormField>
      </Modal>
    </>
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

export default function EC2(): JSX.Element {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [toolsContent, setToolsContent] = useState(<EC2Info />);
  const appLayout = useRef();

  const loadHelpPanelContent = (toolsContent) => {
    setToolsOpen(true);
    setToolsContent(toolsContent);
    appLayout.current?.focusToolsClose();
  };
  const [homePage, setHomePage] = useState<boolean>();
  useEffect(() => {
    setHomePage(location.pathname == '/');
  }, [location]);

  // https://reactrouter.com/docs/en/v6/apioutlet
  return (
    <>
      <AppHeader />
      <AppLayout
        content={
          <>
            <ContentLayout
              header={
                <DashboardHeader loadHelpPanelContent={loadHelpPanelContent} />
              }
            >
              <Content loadHelpPanelContent={loadHelpPanelContent} />
            </ContentLayout>
            <Provider store={store}>
              <SpaceBetween size={'m'}>
                <Outlet context={loadHelpPanelContent} />
              </SpaceBetween>
            </Provider>
          </>
        }
        headerSelector="header"
        breadcrumbs={!homePage && <Breadcrumbs />}
        navigation={<Navigation />}
        tools={toolsContent}
        toolsOpen={toolsOpen}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        ariaLabels={appLayoutLabels}
        notifications={<Notifications />}
      />
      <AppFooter />
    </>
  );
}

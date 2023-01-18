/* eslint-disable react/display-name */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { forwardRef } from 'react';
import {
  AppLayout,
  Badge,
  Box,
  Button,
  Flashbar,
  Header,
  Link,
  SideNavigation,
  Popover,
  SpaceBetween,
} from '@cloudscape-design/components';
import { appLayoutLabels, externalLinkProps } from '../../common/labels';
import {
  getHeaderCounterText,
  getServerHeaderCounterText,
} from '../../common/tableCounterStrings';
import useNotifications from './use-notifications';

export const EC2Header = {
  text: 'EC2 Instance',
  href: 'home',
};

export const S3Header = {
  text: 'Amazon S3',
  href: 'home',
};

export const ProfileHeader = {
  text: 'Account',
  href: 'dashboard',
};

export const S3navItems = [
  { type: 'link', text: 'Buckets', href: 'buckets' },
  { type: 'link', text: 'Access points', href: 'access_point' },
  { type: 'link', text: 'Object Lambda Access Points', href: 'profile' },
  { type: 'link', text: 'Multi Region Access Apoints', href: 'profile' },
  { type: 'link', text: 'Batch Operations', href: 'profile' },
  { type: 'link', text: 'Access Analyzer for S3', href: 'profile' },
  { type: 'divider' },
  {
    type: 'link',
    text: 'Block Public Access settings for this account',
    href: 'profile',
  },
  {
    text: 'Storage Lens',
    type: 'section',
    defaultExpanded: true,
    items: [
      { type: 'link', text: 'Dashboard', href: 'bills' },
      { type: 'link', text: 'AWS Organizations settings', href: 'payments' },
    ],
  },
  { type: 'divider' },
  {
    type: 'link',
    text: 'Feature spotlight',
    link: 'feature',
    info: <Badge color="blue">3</Badge>,
  },
  { type: 'divider' },
  {
    text: 'AWS Marketplace for S3',
    type: 'section',
    defaultExpanded: false,
    items: [
      { type: 'link', text: 'Storage, Back-up and Recovery', href: 'bills' },
      {
        type: 'link',
        text: 'Data Integration and Analytics',
        href: 'payments',
      },
      { type: 'link', text: 'Observability and Monitoring', href: 'payments' },
      { type: 'link', text: 'Security and Threat Detection', href: 'payments' },
      { type: 'link', text: 'Permission', href: 'payments' },
    ],
  },
];

export const userNav = [
  { type: 'link', text: 'Profile', href: 'profile' },
  {
    text: 'Billing',
    type: 'section',
    defaultExpanded: true,
    items: [
      { type: 'link', text: 'Bills', href: 'bills' },
      { type: 'link', text: 'Payments', href: 'payments' },
      { type: 'link', text: 'Credits', href: 'credits' },
      { type: 'link', text: 'Purchase Orders', href: 'purchase_orders' },
      {
        type: 'link',
        text: 'Cost & Usage Reports',
        href: 'Cost_usage_reports',
      },
      { type: 'link', text: 'Cost Categories', href: 'cost_categories' },
      {
        type: 'link',
        text: 'Cost Allocation Tags',
        href: 'cost_allocation_tags',
      },
      { type: 'link', text: 'Free Tier', href: 'free_tier' },
      {
        type: 'link',
        text: 'Billing Conductor',
        href: 'billing_conductor',
        info: <Link external variant="link" />,
      },
    ],
  },
  {
    text: 'Cost Management',
    type: 'section',
    defaultExpanded: true,
    items: [
      { type: 'link', text: 'Cost Explorer', href: 'cost_explorer' },
      { type: 'link', text: 'Budgets', href: 'budgets' },
      { type: 'link', text: 'Budget Reports', href: 'budget_reports' },
      {
        type: 'link',
        text: 'Savings Plans',
        href: 'savings_plans',
        info: <Link external variant="link" />,
      },
    ],
  },
  {
    text: 'Preferences',
    type: 'section',
    defaultExpanded: true,
    items: [
      {
        type: 'link',
        text: 'Billing Preferences',
        href: 'billing_preferences',
      },
      {
        type: 'link',
        text: 'Payment Preferences',
        href: 'payment_preferences',
      },
      {
        type: 'link',
        text: 'Consolidated Billing',
        href: 'consolidated_billing',
        info: <Link external variant="link" />,
      },
      { type: 'link', text: 'tax Settings', href: 'tax_settings' },
    ],
  },
];
export const ec2navItems = [
  { type: 'link', text: 'Dashboard', href: 'dashboard' },
  {
    type: 'link',
    text: 'Events',
    href: 'events',
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
  { type: 'link', text: 'Tags', href: 'tags' },
  { type: 'link', text: 'Reports', href: 'reports' },
  { type: 'link', text: 'Limits', href: 'limits' },
  {
    text: 'Instances',
    type: 'section',
    defaultExpanded: true,
    items: [
      { type: 'link', text: 'Instances', href: 'instances' },
      {
        type: 'link',
        text: 'Launch templates',
        href: 'launchEC2',
        info: (
          <Box color="text-status-info" display="inline">
            <Popover
              header="Introducing launch templates"
              size="medium"
              triggerType="text"
              content={
                <>
                  Launch templates is a new capability that enables a new way to
                  templatize your launch requests. Launch templates streamline
                  and simplify the launch process for auto scaling, spot fleet,
                  spot, and on-demand instances.{' '}
                  <Link external>Learn more</Link>
                </>
              }
              renderWithPortal={true}
              dismissAriaLabel="Close"
            >
              <Box color="text-status-info" fontSize="body-s" fontWeight="bold">
                New
              </Box>
            </Popover>
          </Box>
        ),
      },
      { type: 'link', text: 'Spot requests', href: 'spot_requests' },
      {
        type: 'link',
        text: 'Reserved instances',
        href: 'reserved_instances',
      },
      { type: 'link', text: 'Dedicated hosts', href: 'dedicated_hosts' },
      {
        type: 'link',
        text: 'Scheduled instances',
        href: 'scheduled_instances',
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
              <Box color="text-status-info" fontSize="body-s" fontWeight="bold">
                Beta
              </Box>
            </Popover>
          </Box>
        ),
      },
      {
        type: 'link',
        text: 'Capacity reservations',
        href: 'capacity_reservations',
      },
    ],
  },
  {
    text: 'Images',
    type: 'section',
    defaultExpanded: true,
    items: [
      { type: 'link', text: 'AMIs', href: 'amis' },
      { type: 'link', text: 'Bundle tasks', href: 'bundle_tasks' },
    ],
  },
  {
    text: 'Elastic block store',
    type: 'section',
    defaultExpanded: true,
    items: [
      { type: 'link', text: 'Volumes', href: 'volumes' },
      { type: 'link', text: 'Snapshots', href: 'snapshots' },
      {
        type: 'link',
        text: 'Lifecycle manager',
        href: 'lifecycle_manager',
      },
    ],
  },
  {
    text: ' Network & security',
    type: 'section',
    defaultExpanded: true,
    items: [
      { type: 'link', text: 'Security groups', href: 'security_groups' },
      { type: 'link', text: 'Elastic IPs', href: 'elastic_ips' },
      { type: 'link', text: 'Placement groups', href: 'placement_groups' },
      { type: 'link', text: 'Key pairs', href: 'key_pairs' },
      {
        type: 'link',
        text: 'Network interfaces',
        href: 'network_interfaces',
      },
    ],
  },
  {
    text: 'Load balancing',
    type: 'section',
    defaultExpanded: true,
    items: [
      { type: 'link', text: 'Load balancers', href: 'load_balancers' },
      { type: 'link', text: 'Target groups', href: 'target_groups' },
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
        href: 'launch_configurations',
      },
      {
        type: 'link',
        text: 'Auto scaling groups',
        href: 'auto_scaling_groups',
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

export const InfoLink = ({ id, onFollow, ariaLabel }) => (
  <Link variant="info" id={id} onFollow={onFollow} ariaLabel={ariaLabel}>
    Info
  </Link>
);

// a special case of external link, to be used within a link group, where all of them are external
// and we do not repeat the icon
export const ExternalLinkItem = ({ href, text }) => (
  <Link
    href={href}
    ariaLabel={`${text} ${externalLinkProps.externalIconAriaLabel}`}
    target="_blank"
  >
    {text}
  </Link>
);

export const TableNoMatchState = (props) => (
  <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
    <SpaceBetween size="xxs">
      <div>
        <b>No matches</b>
        <Box variant="p" color="inherit">
          We can't find a match.
        </Box>
      </div>
      <Button onClick={props.onClearFilter}>Clear filter</Button>
    </SpaceBetween>
  </Box>
);

export const TableEmptyState = ({ resourceName, link }) => (
  <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
    <SpaceBetween size="xxs">
      <div>
        <b>No {resourceName.toLowerCase()}s</b>
        <Box variant="p" color="inherit">
          No {resourceName.toLowerCase()}s associated with this resource.
        </Box>
      </div>
      <Button onClick={() => (window.location.href = `${link}`)}>
        Create {resourceName.toLowerCase()}
      </Button>
    </SpaceBetween>
  </Box>
);

function getCounter(props) {
  if (props.counter) {
    return props.counter;
  }
  if (!props.totalItems) {
    return null;
  }
  if (props.serverSide) {
    return getServerHeaderCounterText(props.totalItems, props.selectedItems);
  }
  return getHeaderCounterText(props.totalItems, props.selectedItems);
}

export const TableHeader = (props) => {
  return (
    <Header
      variant={props.variant}
      counter={getCounter(props)}
      info={
        props.loadHelpPanelContent && (
          <InfoLink
            onFollow={props.loadHelpPanelContent}
            ariaLabel={`Information about ${props.title}.`}
          />
        )
      }
      description={props.description}
      actions={props.actionButtons}
    >
      {props.title}
    </Header>
  );
};

const defaultOnFollowHandler = (e) => {
  e.preventDefault();
  if (!error.detail.external) {
    e.preventDefault();
    setActiveHref(e.detail.href);
  }
};

export function Navigation({
  activeHref,
  header,
  items,
  onFollowHandler = defaultOnFollowHandler,
}) {
  return (
    <SideNavigation
      items={items}
      header={header}
      activeHref={activeHref}
      onFollow={onFollowHandler}
    />
  );
}

export function Notifications({
  successNotification,
  deletedTotal,
  resourceName,
}) {
  const notifications = useNotifications(successNotification);
  return <Flashbar items={notifications} />;
}

export const CustomAppLayout = forwardRef((props, ref) => {
  return (
    <AppLayout
      ref={ref}
      {...props}
      headerSelector="#header"
      ariaLabels={appLayoutLabels}
      onNavigationChange={(event) => {
        if (props.onNavigationChange) {
          props.onNavigationChange(event);
        }
      }}
      onToolsChange={(event) => {
        if (props.onToolsChange) {
          props.onToolsChange(event);
        }
      }}
    />
  );
});

export const CounterLink = ({ link, children }) => {
  return (
    <Link variant="awsui-value-large" href={link}>
      {children}
    </Link>
  );
};

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState, useEffect } from 'react';
import {
  Header,
  Table,
  BreadcrumbGroup,
  ColumnLayout,
  Box,
} from '@cloudscape-design/components';
import {
  COLUMN_DEFINITIONS_PANEL_CONTENT_SINGLE,
  SELECTION_LABELS,
} from './table-config';
import { CounterLink } from '../EC2/commons/common-components';
import { TabsSection } from './EC2_Instance_Detail';
import { TabsContent } from './Instance_type_detail';

const EMPTY_PANEL_CONTENT = {
  header: 'Select an instance',
  body: 'Select an instance to see its details.',
};
const EMPTY_PANEL_CONTENTS = {
  header: 'Select an instance type',
  body: 'Select an instance type to see its details.',
};

export const getPanelContent = (items, type) => {
  if (type === 'single') {
    return getPanelContentSingle(items);
  } else if (type === 'multiple') {
    return getPanelContentMultiple(items);
  } else if (type === 'type') {
    return getPanelContentSingles(items);
  } else {
    return getPanelContentComparison(items);
  }
};

export const getPanelContentSingle = (items) => {
  if (!items.length) {
    return EMPTY_PANEL_CONTENT;
  }

  const item = items[0];

  return {
    header: item.id,
    body: <TabsSection />,
  };
};
export const getPanelContentSingles = (items) => {
  if (!items.length) {
    return EMPTY_PANEL_CONTENTS;
  }

  const item = items[0];

  return {
    header: item.type && `Instance type: ${item.type}`,
    body: <TabsContent item={item} />,
  };
};

export const getPanelContentMultiple = (items) => {
  if (!items.length) {
    return EMPTY_PANEL_CONTENT;
  }

  if (items.length === 1) {
    return getPanelContentSingle(items);
  }

  const enabled = items.filter(({ state }) => state === 'Deactivated').length;
  const volumes = items.reduce((volumes, { volume }) => {
    volumes += volume;
    return volumes;
  }, 0);
  const securityGroups = items.reduce(
    (numOfSecurityGroups, { securityGroups }) => {
      numOfSecurityGroups += securityGroups.length;
      return numOfSecurityGroups;
    },
    0
  );
  const loadBalancers = items.reduce(
    (numOfLoadBalancers, { loadBalancers }) => {
      numOfLoadBalancers += loadBalancers.length;
      return numOfLoadBalancers;
    },
    0
  );

  return {
    header: `${items.length} instances selected`,
    body: (
      <ColumnLayout columns="4" variant="text-grid">
        <div>
          <Box variant="awsui-key-label">Running instances</Box>
          <CounterLink>{enabled}</CounterLink>
        </div>
        <div>
          <Box variant="awsui-key-label">Volumes</Box>
          <CounterLink>{volumes}</CounterLink>
        </div>
        <div>
          <Box variant="awsui-key-label">Instance Type</Box>
          <CounterLink>{type}</CounterLink>
        </div>
        <div>
          <Box variant="awsui-key-label">Load Balancers</Box>
          <CounterLink>{loadBalancers}</CounterLink>
        </div>
        <div>
          <Box variant="awsui-key-label">Security groups</Box>
          <CounterLink>{securityGroups}</CounterLink>
        </div>
        <div>
          <Box variant="awsui-key-label">Load balancers</Box>
          <CounterLink>{loadBalancers}</CounterLink>
        </div>
        <div>
          <Box variant="awsui-key-label">Instance State</Box>
          <CounterLink>{state}</CounterLink>
        </div>
        <div>
          <Box variant="awsui-key-label">Inbound Rules</Box>
          <CounterLink>{inboundRules}</CounterLink>
        </div>
        <div>
          <Box variant="awsui-key-label">Monitoring</Box>
          <CounterLink>{monitoring}</CounterLink>
        </div>
      </ColumnLayout>
    ),
  };
};

export const getPanelContentComparison = (items) => {
  if (!items.length) {
    return {
      header: 'Select an instance',
      body: 'Select an instance to see its details. Select multiple instances to compare.',
    };
  }

  if (items.length === 1) {
    return getPanelContentSingle(items);
  }
  const keyHeaderMap = {
    platformDetails: 'Platform details',
    numOfvCpu: 'Number of vCPUs',
    launchTime: 'Launch time',
    availabilityZone: 'Availability zone',
    type: 'Instance Type',
    loadBalancers: 'Load Balancers',
    securityGroups: 'Security groups',
    state: 'Instance State',
    inboundRules: 'Inbound Rules',
    monitoring: 'Monitoring',
  };
  const transformedData = [
    'platformDetails',
    'numOfvCpu',
    'launchTime',
    'availabilityZone',
    'monitoring',
    'securityGroups',
    'state',
    'inboundRules',
    'monitoring',
    'type',
    'loadBalancers',
  ].map((key) => {
    const data = { comparisonType: keyHeaderMap[key] };

    for (const item of items) {
      data[item.id] = item[key];
    }

    return data;
  });

  const columnDefinitions = [
    {
      id: 'comparisonType',
      header: '',
      cell: ({ comparisonType }) => <b>{comparisonType}</b>,
    },
    ...items.map(({ id }) => ({
      id,
      header: id,
      cell: (item) =>
        Array.isArray(item[id]) ? item[id].join(', ') : item[id],
    })),
  ];

  return {
    header: `${items.length} instances selected`,
    body: (
      <Box padding={{ bottom: 'l' }}>
        <Table
          ariaLabels={SELECTION_LABELS}
          header={<Header variant="h2">Compare details</Header>}
          items={transformedData}
          columnDefinitions={columnDefinitions}
          variant="embedded"
        />
      </Box>
    ),
  };
};

export const Breadcrumbs = () => (
  <BreadcrumbGroup
    expandAriaLabel="Show path"
    ariaLabel="Breadcrumbs"
    items={[
      { text: 'EC2', href: 'dashboard' },
      { text: 'Instances', href: '/ec2_instance/instances' },
    ]}
  />
);

export const useSplitPanel = (selectedItems) => {
  const [splitPanelSize, setSplitPanelSize] = useState(350);
  const [splitPanelOpen, setSplitPanelOpen] = useState(false);
  const [hasManuallyClosedOnce, setHasManuallyClosedOnce] = useState(false);

  const onSplitPanelResize = ({ detail: { size } }) => {
    setSplitPanelSize(size);
  };

  const onSplitPanelToggle = ({ detail: { open } }) => {
    setSplitPanelOpen(open);

    if (!open) {
      setHasManuallyClosedOnce(true);
    }
  };

  useEffect(() => {
    if (selectedItems.length && !hasManuallyClosedOnce) {
      setSplitPanelOpen(true);
    }
  }, [selectedItems.length, hasManuallyClosedOnce]);

  return {
    splitPanelOpen,
    onSplitPanelToggle,
    splitPanelSize,
    onSplitPanelResize,
  };
};

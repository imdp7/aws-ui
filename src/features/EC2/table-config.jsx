// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { Link, StatusIndicator } from '@cloudscape-design/components';
import { Preferences } from './tableConfig.jsx';

export const EC2Preferences = (props) => (
  <Preferences
    pageSizeOptions={[
      { value: 10, label: '10 instances' },
      { value: 30, label: '30 instances' },
      { value: 50, label: '50 instances' },
    ]}
    visibleContentOptions={[
      {
        label: 'Main instance properties',
        options: [
          { id: 'id', label: 'Instance ID', editable: false },
          { id: 'type', label: 'Instance type' },
          { id: 'publicDns', label: 'Public DNS' },
          { id: 'monitoring', label: 'Monitoring' },
          { id: 'state', label: 'Instance state' },
        ],
      },
    ]}
    {...props}
  />
);

export const COLUMN_DEFINITIONS_MAIN = [
  {
    id: 'id',
    header: 'Instance ID',
    cell: (item) => <Link href={`${item.id}`}>{item.id}</Link>,
    minWidth: 180,
  },
  {
    id: 'state',
    header: 'Instance state',
    cell: (item) => (
      <>
        <StatusIndicator
          type={item.state === 'Activated' ? 'success' : 'error'}
        >
          {' '}
          {item.state}{' '}
        </StatusIndicator>
      </>
    ),
    minWidth: 120,
  },
  {
    id: 'type',
    header: 'Instance type',
    cell: (item) => item.type,
    minWidth: 140,
  },
  {
    id: 'launchTime',
    header: 'Launch Time',
    cell: (item) => item.launchTime,
    minWidth: 120,
  },
  {
    id: 'availabilityZone',
    header: `AZ's`,
    cell: (item) => item.availabilityZone,
    minWidth: 120,
  },
  {
    id: 'volume',
    header: 'Volume',
    cell: (item) => item.volume,
    minWidth: 60,
  },
  {
    id: 'loadBalancers',
    header: 'Load Balancers',
    cell: (item) => item.loadBalancers,
    minWidth: 100,
  },
  {
    id: 'publicDns',
    header: 'Public DNS',
    cell: (item) => item.publicDns,
    minWidth: 160,
    minWidth: 100,
  },
  {
    id: 'inboundRules',
    header: 'Inbound Rules',
    cell: (item) => item.inboundRules.map(i => i.protocol),
    minWidth: 160,
    minWidth: 100,
  },
  {
    id: 'monitoring',
    header: 'Monitoring',
    cell: (item) => item.monitoring,
    minWidth: 100,
  },
];

export const COLUMN_DEFINITIONS_PANEL_CONTENT_SINGLE = [
  {
    id: 'type',
    header: 'Type',
    cell: (item) => item.type,
  },
  {
    id: 'protocol',
    header: 'Protocol',
    cell: (item) => item.protocol,
  },
  {
    id: 'portRange',
    header: 'Port range',
    cell: (item) => item.portRange,
  },
  {
    id: 'source',
    header: 'Source',
    cell: (item) => item.source,
  },
  {
    id: 'description',
    header: 'Description',
    cell: (item) => item.description,
  },
];

export const SELECTION_LABELS = {
  itemSelectionLabel: (data, row) => `select ${row.id}`,
  allItemsSelectionLabel: () => 'select all',
  selectionGroupLabel: 'Instance selection',
};

export const DEFAULT_PREFERENCES = {
  pageSize: 30,
  visibleContent: ['id', 'type', 'publicDns', 'monitoring', 'state'],
  wrapLines: false,
};

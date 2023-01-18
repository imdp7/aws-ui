
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { Link, Box, StatusIndicator } from '@cloudscape-design/components';
import { addColumnSortLabels } from '../../common/labels';

export const StatusComponent = ({ status }) => {
  if (status === 'Objects can be public') {
    return <StatusIndicator type="success">Available</StatusIndicator>;
  } else {
    return <StatusIndicator type="error">Unavailable</StatusIndicator>;
  }
};


export const COLUMN_DEFINITIONS = addColumnSortLabels([
  {
    id: 'name',
    header: 'Name',
    cell: item => <Link href="#">{item.name}</Link>,
    sortingComparator: (item1, item2) => item1.name.substring(13, item2.length) - item2.name.substring(13, item1.length),
  },
  {
    id: 'privateAccess',
    header: 'Access',
    cell: item => <StatusComponent status={item.privateAccess} />,
    sortingField: 'privateAccess',
  },
  {
    id: 'awsRegion',
    header: 'AWS Region',
    cell: item => item.awsRegion,
    sortingField: 'awsRegion',
  },
  {
    id: 'version',
    header: 'Version',
    cell: item => item.version,
    sortingField: 'version',
  },
  {
    id: 'bucketKey',
    header: 'Bucket Key',
    cell: item => <Box textAlign="right">{item.bucketKey}</Box>,
    sortingField: 'bucketKey',
  },
  {
    id: 'createdAt',
    header: 'Created At',
    cell: item => item.createdAt,
    sortingField: 'createdAt',
  },
  
]);

export const SEARCHABLE_COLUMNS = ['name', 'awsRegion', 'version', 'status'];

export const VISIBLE_CONTENT_OPTIONS = [
  {
    label: 'Main instance properties',
    options: [
      { id: 'name', label: 'Bucket', editable: false },
      { id: 'awsRegion', label: 'AWS Region' },
      { id: 'version', label: 'Version Controlling' },
      { id: 'status', label: 'Status' },
      { id: 'createdAt', label: 'Created At' },
    ],
  },
];

export const PAGE_SIZE_OPTIONS = [
{ value: 10, label: '10 Buckets' },
  { value: 30, label: '30 Buckets' },
  { value: 50, label: '50 Buckets' },
];
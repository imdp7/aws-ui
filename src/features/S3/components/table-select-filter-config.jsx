// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { Link, Box, StatusIndicator, Popover } from '@cloudscape-design/components';
import { addColumnSortLabels } from '../../common/labels';

export const StatusComponent = ({ status }) => {
  if (status === 'Enable') {
    return <StatusIndicator type="success">Enabled</StatusIndicator>;
  } else {
    return <StatusIndicator type="error">Disabled</StatusIndicator>;
  }
};

export const COLUMN_DEFINITIONS = addColumnSortLabels([
  {
    id: 'name',
    header: 'Name',
    cell: (item) => <Link href={`buckets/${item.id}`}>{item.name}</Link>,
    sortingField: 'name',
  },
  {
    id: 'privateAccess',
    header: 'Access',
    cell: (item) => (
      <Box color="text-status-info" display="inline">
        <Popover
          header={
            item.privateAccess == 'Objects can be public'
              ? 'Objects can be public'
              : 'Bucket and objects not public'
          }
          size="medium"
          triggerType="text"
          content={
            <>
              {item.privateAccess !== 'Objects can be public' ? (
                'The bucket and objects do not have any public access. Note that this does not evaluate if public access is granted using a Multi-region Access Point.'
              ) : (
                <div>
                  <div>
                    The bucket is not public but anyone with appropriate
                    permissions can grant public access to objects.
                  </div>
                  <div>
                    You can enable Block Public Access to prevent public access
                    to your objects. <Link external>Learn More</Link>
                  </div>
                </div>
              )}
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
            {item.privateAccess}
          </Box>
        </Popover>
      </Box>
    ),
    sortingField: 'privateAccess',
  },
  {
    id: 'awsRegion',
    header: 'AWS Region',
    cell: (item) => item.awsRegion,
    sortingField: 'awsRegion',
  },
  {
    id: 'version',
    header: 'Version Control',
    cell: (item) => <StatusComponent status={item.version} />,
    sortingField: 'version',
  },
  {
    id: 'platformDetails',
    header: 'Platform',
    cell: (item) => <Box>{item.platformDetails}</Box>,
    sortingField: 'platformDetails',
  },
  {
    id: 'bucketKey',
    header: 'Bucket Key',
    cell: (item) => <Box>{item.bucketKey}</Box>,
    sortingField: 'bucketKey',
  },
  {
    id: 'createdAt',
    header: 'Created At',
    cell: (item) => item.createdAt,
    sortingField: 'createdAt',
  },
]);

export const SEARCHABLE_COLUMNS = [
  'name',
  'awsRegion',
  'version',
  'platformDetails',
];

export const VISIBLE_CONTENT_OPTIONS = [
  {
    label: 'Main instance properties',
    options: [
      { id: 'name', label: 'Bucket Name', editable: false },
      { id: 'awsRegion', label: 'AWS Region' },
      { id: 'privateAccess', label: 'Access' },
      { id: 'version', label: 'Version Control' },
      { id: 'platformDetails', label: 'Platform' },
      { id: 'createdAt', label: 'Created At' },
    ],
  },
];

export const PAGE_SIZE_OPTIONS = [
  { value: 10, label: '10 Buckets' },
  { value: 100, label: '100 Buckets' },
];

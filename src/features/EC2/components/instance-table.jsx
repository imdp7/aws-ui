/* eslint-disable react/prop-types */
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { useCollection } from '@cloudscape-design/collection-hooks';
import {
  Button,
  Pagination,
  Table,
  TextFilter,
  SpaceBetween,
  Link,
} from '@cloudscape-design/components';
import {
  TableEmptyState,
  TableNoMatchState,
  TableHeader,
} from '../commons/common-components';
import { paginationLabels } from '../../common/labels';
import { getFilterCounterText } from '../../common/tableCounterStrings';
import ItemState from './item-state';
import { useNavigate } from 'react-router-dom';

const COLUMN_DEFINITIONS = [
  {
    id: 'id',
    header: 'Instance ID',
    cell: (item) => <Link href={`${item.id}`}>{item.id}</Link>,
  },
  {
    id: 'name',
    header: 'Instance Name',
    cell: (item) => <Link href={`${item.id}`}>{item.name}</Link>,
  },
  {
    id: 'state',
    header: 'Instance state',
    cell: (item) => <ItemState state={item.state} />,
  },
  {
    id: 'type',
    header: 'Instance type',
    cell: (item) => item.type,
  },
  {
    id: 'launchTime',
    header: 'Launch Time',
    cell: (item) => item.launchTime,
  },
  {
    id: 'availabilityZone',
    header: `AZ's`,
    cell: (item) => item.availabilityZone,
  },
  {
    id: 'volume',
    header: 'Volume',
    cell: (item) => item.volume,
  },
  {
    id: 'loadBalancers',
    header: 'Load Balancers',
    cell: (item) => item.loadBalancers,
  },
  {
    id: 'publicDns',
    header: 'Public DNS',
    cell: (item) => item.publicDns,
  },
  {
    id: 'inboundRules',
    header: 'Inbound Rules',
    cell: (item) => item.inboundRules.map((i) => i.protocol),
  },
  {
    id: 'monitoring',
    header: 'Monitoring',
    cell: (item) => item.monitoring,
  },
];

export default function InstancesTable({
  instances,
  selectedItems,
  onSelectionChange,
  onDelete,
}) {
  const {
    items,
    actions,
    filteredItemsCount,
    collectionProps,
    filterProps,
    paginationProps,
  } = useCollection(instances, {
    filtering: {
      empty: <TableEmptyState resourceName="Instance" link="launchEC2" />,
      noMatch: (
        <TableNoMatchState onClearFilter={() => actions.setFiltering('')} />
      ),
    },
    pagination: { pageSize: 50 },
    selection: {},
  });

  const deletingItemsSelected =
    selectedItems.filter((it) => it.state === 'deleting').length > 0;

  const navigate = useNavigate();
  return (
    <Table
      {...collectionProps}
      selectedItems={selectedItems}
      onSelectionChange={onSelectionChange}
      columnDefinitions={COLUMN_DEFINITIONS}
      items={items}
      selectionType="multi"
      resizableColumns={true}
      stripedRows
      visibleColumns={[
        'name',
        'state',
        'type',
        'availabilityZone',
        'volume',
        'loadBalancers',
      ]}
      ariaLabels={{
        itemSelectionLabel: (_data, row) => `select ${row.id}`,
        allItemsSelectionLabel: () => 'select all',
        selectionGroupLabel: 'Instance selection',
      }}
      variant="full-page"
      stickyHeader={true}
      header={
        <TableHeader
          variant="awsui-h1-sticky"
          title="Instances"
          actionButtons={
            <SpaceBetween size="xs" direction="horizontal">
              <Button
                disabled={selectedItems.length !== 1}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = `${selectedItems[0]?.id}`;
                }}
              >
                View details
              </Button>
              <Button disabled={selectedItems.length !== 1}>Edit</Button>
              <Button
                disabled={selectedItems.length === 0 || deletingItemsSelected}
                onClick={onDelete}
              >
                Delete
              </Button>
              <Button
                variant="primary"
                onClick={(e) => {
                  navigate('/ec2_instance/launchEC2');
                  e.defaultPrevented();
                }}
              >
                Create instance
              </Button>
            </SpaceBetween>
          }
          totalItems={instances}
          selectedItems={selectedItems}
        />
      }
      filter={
        <TextFilter
          {...filterProps}
          filteringAriaLabel="Filter instances"
          filteringPlaceholder="Find instances"
          countText={getFilterCounterText(filteredItemsCount)}
        />
      }
      pagination={
        <Pagination {...paginationProps} ariaLabels={paginationLabels} />
      }
    />
  );
}

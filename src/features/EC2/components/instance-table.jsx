/* eslint-disable react/prop-types */
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import { useCollection } from '@cloudscape-design/collection-hooks';
import {
  Button,
  Pagination,
  Table,
  TextFilter,
  SpaceBetween,
  CollectionPreferences,
  ButtonDropdown,
  Link,
} from '@cloudscape-design/components';
import {
  TableEmptyState,
  TableNoMatchState,
  TableHeader,
} from '../commons/common-components';
import { paginationLabels } from '../../common/labels';
import { getFilterCounterText } from '../../common/tableCounterStrings';
import { useLocalStorage } from '../../common/localStorage';

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
  loading,
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
  const [refresh, setRefresh] = useState(false);
  const [preferences, setPreferences] = useLocalStorage(
    'React-DBInstancesTable-Preferences',
    {
      pageSize: 10,
      visibleContent: [
        'id',
        'name',
        'state',
        'type',
        'availabilityZone',
        'volume',
        'loadBalancers',
        'launchTime',
        'publicDns',
        'inboundRules',
        'monitoring',
      ],
      wrapLines: false,
      stripedRows: true,
      custom: 'table',
    }
  );

  const handleRefresh = () => {
    setRefresh(true);
    const timer = setTimeout(() => {
      setRefresh(false);
    }, 1000);
    return () => clearTimeout(timer);
  };

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
      visibleColumns={preferences.visibleContent}
      wrapLines={preferences.wrapLines}
      stripedRows={preferences.stripedRows}
      loading={refresh}
      loadingText="Loading instances"
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
                iconName="refresh"
                loading={refresh}
                onClick={handleRefresh}
              />
              <Button disabled={selectedItems.length !== 1}>Connect</Button>
              <ButtonDropdown
                items={[
                  {
                    text: 'Stop instance',
                    id: 'stop',
                    disabled: items.state === 'Deactivated' ? false : true,
                  },
                  {
                    text: 'Start instance',
                    id: 'start',
                  },
                  {
                    text: 'Reboot instance',
                    id: 'reboot',
                    disabled: 'true',
                  },
                  {
                    text: 'Hibernate instance',
                    id: 'hibernate',
                    disabled: 'true',
                  },
                  {
                    text: 'Terminate instance',
                    id: 'terminate',
                    disabled: 'true',
                  },
                ]}
                disabled={selectedItems.length == 0}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = `${selectedItems[0]?.id}`;
                }}
              >
                Instance state
              </ButtonDropdown>
              <ButtonDropdown
                onItemClick={(e) => {
                  e.defaultPrevented();
                  navigate(items.href);
                  id: items.id;
                }}
                items={[
                  {
                    text: 'Stop instance',
                    id: 'stop',
                    disabled: 'true',
                  },
                  {
                    text: 'Start instance',
                    id: 'start',
                  },
                  {
                    text: 'Reboot instance',
                    id: 'reboot',
                    disabled: 'true',
                  },
                  {
                    text: 'Hibernate instance',
                    id: 'hibernate',
                    disabled: 'true',
                  },
                  {
                    text: 'Terminate instance',
                    id: 'terminate',
                    disabled: 'true',
                  },
                ]}
                disabled={selectedItems.length !== 1}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = `${selectedItems[0]?.id}`;
                }}
              >
                Actions
              </ButtonDropdown>
              <Button
                disabled={selectedItems.length === 0 || deletingItemsSelected}
                onClick={onDelete}
              >
                Delete
              </Button>
              <ButtonDropdown
                onItemClick={(e) => {
                  e.defaultPrevented();
                  navigate(items.href);
                }}
                items={[
                  {
                    text: 'Launch instances',
                    id: 'launchInstance',
                    href: '/ec2_instance/LaunchInstances',
                  },
                  {
                    text: 'Launch instance from template',
                    id: 'launchInstanceTemplate',
                    href: '/ec2_instance/LaunchInstanceFromTemplate',
                  },
                  {
                    text: 'Migrate a server',
                    id: 'migrate',
                    href: '/mgn/home',
                  },
                ]}
                variant="primary"
              >
                Create instance
              </ButtonDropdown>
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
      preferences={
        <CollectionPreferences
          title="Preferences"
          confirmLabel="Confirm"
          cancelLabel="Cancel"
          preferences={preferences}
          onConfirm={({ detail }) => setPreferences(detail)}
          pageSizePreference={{
            title: 'Page size',
            options: [
              { value: 10, label: '10' },
              { value: 20, label: '20' },
              { value: 50, label: '50' },
            ],
          }}
          wrapLinesPreference={{
            label: 'Wrap lines',
            description: 'Check to see all the text and wrap the lines',
          }}
          stripedRowsPreference={{
            label: 'Striped rows',
            description: 'Check to add alternating shaded rows',
          }}
          visibleContentPreference={{
            title: 'Select visible content',
            options: [
              {
                label: 'Main distribution properties',
                options: [
                  { id: 'id', label: 'Instance ID', editable: false },
                  { id: 'name', label: 'Name' },
                  { id: 'state', label: 'Instance State' },
                  { id: 'type', label: 'Instance Type' },
                  { id: 'availabilityZone', label: 'Availability Zone' },
                  { id: 'volume', label: 'Instance Volumes' },
                  { id: 'loadBalancers', label: 'Load Balancers' },
                  { id: 'launchTime', label: 'Launch Time' },
                  { id: 'publicDns', label: 'Public DNS' },
                  { id: 'inboundRules', label: 'Inbound Rules' },
                  { id: 'monitoring', label: 'Monitoring' },
                ],
              },
            ],
          }}
        />
      }
    />
  );
}

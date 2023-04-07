/* eslint-disable react/prop-types */
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState, useEffect } from 'react';
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
  Modal,
  Input,
  Alert,
  Box,
  Select,
  ColumnLayout,
  FormField,
  Icon,
} from '@cloudscape-design/components';
import {
  TableEmptyState,
  TableNoMatchState,
  TableHeader,
} from '../commons/common-components';
import { paginationLabels } from '../../common/labels';
import { getFilterCounterText } from '../../common/tableCounterStrings';
import { useLocalStorage } from '../../common/localStorage';

import { ItemState, StatusCheck } from './item-state';
import { useNavigate } from 'react-router-dom';
import CopyText from '../commons/copy-text';

const split = (item, index) => {
  let name = item.split('.');
  return name[index];
};

const COLUMN_DEFINITIONS = [
  {
    id: 'type',
    header: 'Instance Type',
    cell: (item) => (
      <Link href={`InstanceTypes/${item.type}/d`}>{item.type}</Link>
    ),
  },

  {
    id: 'family',
    header: 'Instance family',
    cell: (item) => split(item.type, 0),
    sortingField: 'family',
  },
  {
    id: 'size',
    header: 'Instance size',
    cell: (item) => split(item.type, 1),
    sortingField: 'size',
  },
  {
    id: 'availabilityZone',
    header: `Availability Zones`,
    cell: (item) => item.availabilityZone,
    sortingField: 'availabilityZone',
  },
  {
    id: 'hypervisor',
    header: 'Hypervisor',
    cell: (item) => item.hypervisor,
    sortingField: 'hypervisor',
  },
  {
    id: 'freeTier',
    header: 'Free Tier Eligibility',
    cell: (item) => item.freeTier,
    sortingField: 'freeTier',
  },
  {
    id: 'freeTrial',
    header: 'Free Trial available',
    cell: (item) => item.freeTrial,
  },
  {
    id: 'bareMetal',
    header: 'Bare metal',
    cell: (item) => item.bareMetal,
    sortingField: 'bareMetal',
  },
  {
    id: 'numOfvCpu',
    header: 'vCPUs',
    cell: (item) => item.numOfvCpu,
    sortingField: 'numOfvCpu',
  },
  {
    id: 'monitoring',
    header: 'Monitoring',
    cell: (item) => item.monitoring,
    sortingField: 'monitoring',
  },
];

export default function InstancesTypes({
  instances,
  selectedItems,
  onSelectionChange,
  onDelete,
  loading,
}) {
  const [preferences, setPreferences] = useLocalStorage(
    'React-DistributionsTable-Preferences',
    {
      pageSize: 50,
      visibleContent: [
        'type',
        'family',
        'size',
        'availabilityZone',
        'hypervisor',
        'freeTier',
        'freeTrial',
        'bareMetal',
        'numOfvCpu',
      ],
      wrapLines: false,
      stripedRows: true,
      custom: 'table',
      contentDensity: 'comfortable',
    }
  );
  const {
    items,
    actions,
    filteredItemsCount,
    collectionProps,
    filterProps,
    paginationProps,
  } = useCollection(instances, {
    filtering: {
      empty: <TableEmptyState resourceName="Instance" link="LaunchInstances" />,
      noMatch: (
        <TableNoMatchState onClearFilter={() => actions.setFiltering('')} />
      ),
    },
    pagination: { pageSize: preferences.pageSize },
    selection: {},
  });
  const [refresh, setRefresh] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleRefresh = () => {
    setRefresh(true);
    const timer = setTimeout(() => {
      setRefresh(false);
    }, 1000);
    return () => clearTimeout(timer);
  };

  const [deleteInputText, setDeleteInputText] = useState('');

  useEffect(() => {
    setDeleteInputText('');
  }, [visible]);
  const deletingItemsSelected =
    selectedItems.filter((it) => it.state === 'deleting').length > 0;

  const deleteConsentText = 'delete';

  const navigate = useNavigate();

  const [data, setData] = useState({});
  const handleClick = (e) => {
    return;
  };
  return (
    <>
      <Table
        {...collectionProps}
        selectedItems={selectedItems}
        onSelectionChange={onSelectionChange}
        columnDefinitions={COLUMN_DEFINITIONS}
        items={items}
        resizableColumns="true"
        contentDensity={preferences.contentDensity}
        selectionType="multi"
        visibleColumns={preferences.visibleContent}
        wrapLines={preferences.wrapLines}
        stripedRows={preferences.stripedRows}
        loading={refresh}
        loadingText="Loading instance types"
        trackBy="type"
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
            title="Instance Types"
            actionButtons={
              <SpaceBetween size="xs" direction="horizontal">
                <Button
                  iconName="refresh"
                  loading={refresh}
                  onClick={handleRefresh}
                />
                <ButtonDropdown
                  onItemClick={(e) => {
                    handleClick(e);
                  }}
                  expandableGroups
                  expandToViewport
                  items={[
                    {
                      id: 'security',
                      text: 'Security',
                      items: [
                        {
                          id: 'changeSecurityGroups',
                          text: 'Change security groups',
                        },
                        {
                          id: 'getWindowsPassword',
                          text: 'Get windows password',
                          disabled: true,
                        },
                        {
                          id: 'modifyIAMRole',
                          text: 'Modify IAM role',
                        },
                      ],
                    },
                  ]}
                  disabled={selectedItems.length !== 1}
                  onClick={(e) => {
                    window.location.href = `${selectedItems[0]?.id}`;
                  }}
                >
                  Actions
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
            filteringAriaLabel="Filter resources by attribute or tag"
            filteringPlaceholder="Find resources by attribute or tag"
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
            contentDensityPreference={{
              label: 'Compact mode',
              description: 'Content density description',
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
                    { id: 'type', label: 'Instance Type', editable: false },
                    { id: 'family', label: 'Instance Family' },
                    { id: 'size', label: 'Instance Size' },
                    { id: 'hypervisor', label: 'Hypervisor' },
                    { id: 'availabilityZone', label: 'Availability Zones' },
                    { id: 'freeTier', label: 'Free Tier Eligibility' },
                    { id: 'freeTrial', label: 'Free trail available' },
                    { id: 'bareMetal', label: 'Bare metal' },
                    { id: 'numOfvCpu', label: 'vCPUs' },
                  ],
                },
              ],
            }}
          />
        }
      />

      <Modal
        onDismiss={() => setVisible(false)}
        visible={visible}
        closeAriaLabel="Close modal"
        header={data.title}
        size="medium"
        footer={
          <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="link" onClick={() => setVisible(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setVisible(false)}>
                {data.btn}
              </Button>
            </SpaceBetween>
          </Box>
        }
      >
        <SpaceBetween size="m">
          {data.term == true && (
            <Alert type="error">
              On an EBS-backed instance, the default action is for the root EBS
              volume to be deleted when the instance is terminated. Storage on
              any local drives will be lost.
            </Alert>
          )}
          {data.term == false ? (
            <Box variant="span">Instance IDs.</Box>
          ) : (
            <Box variant="span">
              Are you sure you want to terminate these instances?
            </Box>
          )}
          <Box>
            <CopyText
              copyText={selectedItems[0]?.id}
              copyButtonLabel="Copy Instance ID"
              successText="Instance ID copied"
              errorText="Instance ID failed to copy"
            />
          </Box>
          <Box>{data.des}</Box>
        </SpaceBetween>
      </Modal>
    </>
  );
}

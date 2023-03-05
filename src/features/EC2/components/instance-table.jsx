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
import CopyText from '../commons/copy-text';

const COLUMN_DEFINITIONS = [
  {
    id: 'id',
    header: 'Instance ID',
    sortingColumn: 'id',
    cell: (item) => <Link href={`instances/${item.id}`}>{item.id}</Link>,
  },
  {
    id: 'name',
    header: 'Instance name',
    sortingField: 'name',
    minWidth: 176,
    cell: (item) => {
      return item.name;
    },
    editConfig: {
      ariaLabel: 'Name',
      editIconAriaLabel: 'editable',
      errorIconAriaLabel: 'Name Error',
      editingCell: (item, { currentValue, setValue }) => {
        return (
          <Input
            autoFocus={true}
            value={currentValue ?? item.name}
            onChange={(event) => setValue(event.detail.value)}
          />
        );
      },
    },
    cell: (item) => {
      return item.name;
    },
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
    id: 'statusCheck',
    header: 'Status Check',
    cell: (item) => <ItemState statusCheck={item.statusCheck} />,
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
      empty: <TableEmptyState resourceName="Instance" link="LaunchInstances" />,
      noMatch: (
        <TableNoMatchState onClearFilter={() => actions.setFiltering('')} />
      ),
    },
    pagination: { pageSize: 50 },
    selection: {},
  });
  const [refresh, setRefresh] = useState(false);
  const [visible, setVisible] = useState(false);
  const [preferences, setPreferences] = useLocalStorage(
    'React-DBInstancesTable-Preferences',
    {
      pageSize: 10,
      visibleContent: [
        'id',
        'name',
        'state',
        'type',
        'statusCheck',
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

  const [deleteInputText, setDeleteInputText] = useState('');

  useEffect(() => {
    setDeleteInputText('');
  }, [visible]);
  const deletingItemsSelected =
    selectedItems.filter((it) => it.state === 'deleting').length > 0;

  const deleteConsentText = 'delete';

  const navigate = useNavigate();

  const handleSubmit = async (currentItem, column, value) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    let fullCollection = tableItems;

    serverSideErrorsStore.delete(currentItem);

    if (column.id === 'domainName' && !domainNameRegex.test(value)) {
      serverSideErrorsStore.set(currentItem, INVALID_DOMAIN_MESSAGE);
      throw new Error('Inline error');
    }

    const newItem = { ...currentItem, [column.id]: value };

    if (collectionProps.sortingColumn === column) {
      actions.setSorting(null);
      fullCollection = allPageItems;
    }

    if (filterProps.filteringText) {
      fullCollection = tableItems;
    }

    if (collectionProps.sortingColumn === column || filterProps.filteringText) {
      setCurrentPageItemsSnapshot(
        items.map((item) => (item === currentItem ? newItem : item))
      );
    }

    setTableItems(
      fullCollection.map((item) => (item === currentItem ? newItem : item))
    );
  };

  const [data, setData] = useState({});
  const handleClick = (e) => {
    {
      e.detail.id === 'view_details'
        ? navigate(`${selectedItems[0]?.id}`)
        : null;
    }
    {
      e.detail.id === 'stop'
        ? (setVisible(true),
          setData({
            title: 'Stop Instance?',
            btn: 'Stop',
            des: 'To confirm that you want to stop the instance, choose the Stop button below.',
            term: false,
          }))
        : null;
    }
    {
      e.detail.id === 'start'
        ? (setVisible(true),
          setData({
            title: 'Start Instance?',
            btn: 'Start',
            des: 'To confirm that you want to start the instance, choose the Start button below.',
            term: false,
          }))
        : null;
    }
    {
      e.detail.id === 'terminate'
        ? (setVisible(true),
          setData({
            title: 'Terminate Instance?',
            btn: 'Terminate',
            des: 'To confirm that you want to terminate the instances, choose the terminate button below. Terminating the instance cannot be undone.',
            term: true,
          }))
        : null;
    }
    {
      e.detail.id === 'hibernate'
        ? (setVisible(true),
          setData({
            title: 'Hibernate Instance?',
            btn: 'Hibernate',
            des: 'To confirm that you want to hibernate the instance, choose the Hibernate button below.',
            term: false,
          }))
        : null;
    }
    {
      e.detail.id === 'reboot'
        ? (setVisible(true),
          setData({
            title: 'Reboot Instance?',
            btn: 'Reboot',
            des: 'To confirm that you want to reboot the instance, choose the Reboot button below.',
            term: false,
          }))
        : null;
    }
    {
      e.detail.id === 'manage' &&
        navigate(`${selectedItems[0]?.id}/ManageInstanceState`, {
          state: {
            name: 'Manage instance state',
            head: 'Instance details',
            event: selectedItems[0]?.state,
          },
        });
    }
    {
      e.detail.id === 'connect' &&
        navigate(`${selectedItems[0]?.id}/connect`, {
          state: {
            name: 'Connect to instance',
            description: `Connect to your instance ${selectedItems[0]?.id} using any of these options`,
            event: selectedItems[0]?.state,
          },
        });
    }
    {
      e.detail.id === 'LaunchInstanceFromTemplate' &&
        navigate('/ec2_instance/LaunchInstanceFromTemplate', {
          state: {
            name: 'Launch instance from template',
            description:
              'Launching from a template allows you to launch from an instance configuration that you would have saved in the past. These saved configurations can be reused and shared with other users to standardize launches across an organisation.',
          },
        });
    }
  };
  return (
    <>
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
        trackBy="name"
        submitEdit={handleSubmit}
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
                <Button
                  disabled={
                    selectedItems.length !== 1 ||
                    selectedItems[0]?.state === 'Stopped' ||
                    selectedItems[0]?.state === 'Terminated' ||
                    selectedItems[0]?.state === 'Pending'
                  }
                  onClick={() =>
                    navigate(`${selectedItems[0]?.id}/connect`, {
                      state: {
                        name: 'Connect to instance',
                        description: `Connect to your instance ${selectedItems[0]?.id} using any of these options`,
                        event: selectedItems[0]?.state,
                      },
                    })
                  }
                >
                  Connect
                </Button>
                <ButtonDropdown
                  items={[
                    {
                      text: 'Stop instance',
                      id: 'stop',
                      disabled:
                        selectedItems[0]?.state === 'Stopped' ||
                        selectedItems[0]?.state === 'Terminated'
                          ? true
                          : false,
                    },
                    {
                      text: 'Start instance',
                      id: 'start',
                      disabled:
                        selectedItems[0]?.state === 'Running' ? true : false,
                    },
                    {
                      text: 'Reboot instance',
                      id: 'reboot',
                      disabled:
                        selectedItems[0]?.state === 'Running' ||
                        selectedItems[0]?.state === 'Terminated'
                          ? false
                          : true,
                    },
                    {
                      text: 'Hibernate instance',
                      id: 'hibernate',
                      disabled:
                        selectedItems[0]?.state === 'Running' ||
                        selectedItems[0]?.state === 'Terminated'
                          ? false
                          : true,
                    },
                    {
                      text: 'Terminate instance',
                      id: 'terminate',
                      disabled:
                        selectedItems[0]?.state === 'Terminated' ? true : false,
                    },
                  ]}
                  disabled={selectedItems.length !== 1}
                  onItemClick={(e) => {
                    handleClick(e);
                  }}
                >
                  Instance state
                </ButtonDropdown>
                <ButtonDropdown
                  onItemClick={(e) => {
                    handleClick(e);
                  }}
                  expandableGroups
                  expandToViewport
                  items={[
                    {
                      text: 'Connect',
                      id: 'connect',
                      disabled:
                        selectedItems.length !== 1 ||
                        selectedItems[0]?.state === 'Stopped' ||
                        selectedItems[0]?.state === 'Terminated' ||
                        selectedItems[0]?.state === 'Pending',
                    },
                    {
                      text: 'View details',
                      id: 'view_details',
                    },
                    {
                      text: 'Manage instance state',
                      id: 'manage',
                    },
                    {
                      id: 'instanceSettings',
                      text: 'Instance Settings',
                      items: [
                        {
                          id: 'attachAutoScaling',
                          text: 'Attach to Autoscaling Group',
                        },
                        {
                          id: 'terminationProtection',
                          text: 'Change Termination Protection',
                        },
                        {
                          id: 'changeStopProtection',
                          text: 'Change stop protection',
                        },
                        {
                          id: 'changeShutdownBehavior',
                          text: 'Change Shutdown behavior',
                        },
                        {
                          id: 'changeAutoRecoveringBehavior',
                          text: 'Change auto-recovering behavior',
                        },
                        {
                          id: 'changeInstanceType',
                          text: 'Change instance type',
                          disabled: true,
                        },
                        {
                          id: 'changeNitroEnclaves',
                          text: 'Change Nitro Enclaves',
                          disabled: true,
                        },
                        {
                          id: 'changeCreditSpecification',
                          text: 'Change Credit Specification',
                        },
                        {
                          id: 'changeResourceBasedNamingOptions',
                          text: 'Change resource based naming options',
                        },
                        {
                          id: 'modifyInstancePlacement',
                          text: 'Modify instance placement',
                          disabled: true,
                        },
                        {
                          id: 'modifyCapacityReservationSettings',
                          text: 'Modify Capacity Reservation settings',
                          disabled: true,
                        },
                        {
                          id: 'editUserData',
                          text: 'Edit user data',
                        },
                        {
                          id: 'allowTagsInstanceMetadata',
                          text: 'Allow tags in instance metadata',
                        },
                        {
                          id: 'manageTags',
                          text: 'Manage tags',
                        },
                      ],
                    },
                    {
                      id: 'networking',
                      text: 'Networking',
                      items: [
                        {
                          id: 'attachNetworkInterface',
                          text: 'Attach network interface',
                        },
                        {
                          id: 'detachNetworkInterface',
                          text: 'Detach network interface',
                        },
                        {
                          id: 'connectRDSDatabase',
                          text: 'Connect RDS database',
                        },
                        {
                          id: 'changeSourceDestinationCheck',
                          text: 'Change source/destination check',
                        },
                        {
                          id: 'disAssociateElasticIPAddress',
                          text: 'Disassociate elastic IP Address',
                          disabled: true,
                        },
                        {
                          id: 'manageIPAddress',
                          text: 'Manage IP Address',
                        },
                        {
                          id: 'manageENAExpress',
                          text: 'Manage ENA Express',
                          disabled: true,
                        },
                      ],
                    },
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
                    {
                      id: 'imageAndTemplates',
                      text: 'Image and templates',
                      items: [
                        {
                          id: 'createImage',
                          text: 'Create image',
                        },
                        {
                          id: 'createTemplateFromInstance',
                          text: 'Create template from instance',
                        },
                        {
                          id: 'launchMore',
                          text: 'Launch more like this',
                        },
                      ],
                    },
                    {
                      id: 'monitorAndTroubleshoot',
                      text: 'Monitor and troubleshoot',
                      items: [
                        {
                          id: 'getSystemLog',
                          text: 'Get system log',
                        },
                        {
                          id: 'getInstanceScreenshot',
                          text: 'Get instance screenshot',
                        },
                        {
                          id: 'manageDetailedMonitoring',
                          text: 'Manage Detailed monitoring',
                        },
                        {
                          id: 'manageCloudwatchAlarms',
                          text: 'Manage CloudWatch Alarms',
                        },
                        {
                          id: 'ec2SerialConsole',
                          text: 'EC2 serial console',
                        },
                        {
                          id: 'replaceRootVolume',
                          text: 'Replace root volume',
                        },
                        {
                          id: 'fleetManager',
                          text: 'Fleet Manager',
                          external: true,
                          externalIconAriaLabel: 'external',
                          iconName: 'external',
                          iconAlign: 'right',
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
                <Button
                  disabled={selectedItems.length === 0 || deletingItemsSelected}
                  onClick={onDelete}
                >
                  Delete
                </Button>
                <ButtonDropdown
                  onItemClick={(e) => {
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
                    { id: 'statusCheck', label: 'Status Check' },
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

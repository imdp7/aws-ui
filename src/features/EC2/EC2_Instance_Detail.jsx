/* eslint-disable react/prop-types */
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { createRef, useState, useRef, useEffect } from 'react';
import { useNavigation, useParams } from 'react-router-dom';
import {
  AppLayout,
  Button,
  Container,
  ContentLayout,
  Header,
  Pagination,
  StatusIndicator,
  SpaceBetween,
  Table,
  FormField,
  Box,
  Icon,
  Alert,
  ColumnLayout,
  ButtonDropdown,
  Flashbar,
  Link,
  Modal,
  Tabs,
  TextFilter,
  Spinner,
} from '@cloudscape-design/components';
import { useCollection } from '@cloudscape-design/collection-hooks';
import { useAsyncData } from './commons/use-async-data';
import DataProvider from './commons/data-provider';
import CopyText from './commons/copy-text';
import {
  INSTANCE_DROPDOWN_ITEMS,
  LOGS_COLUMN_DEFINITIONS,
  INVALIDATIONS_COLUMN_DEFINITIONS,
} from './commons/details-config.jsx';
import {
  BehaviorsTable,
  Breadcrumbs,
  EmptyTable,
  OriginsTable,
  PageHeader,
  SettingsDetails,
  TagsTable,
} from './commons/detail-common.jsx';
import {
  Navigation,
  TableEmptyState,
  TableNoMatchState,
  TableHeader,
  ec2navItems,
  EC2Header,
} from './commons/common-components';
import {
  appLayoutLabels,
  logsSelectionLabels,
  paginationLabels,
} from '../../features/common/labels';
import { getFilterCounterText } from '../../features/common/tableCounterStrings';
import ToolsContent from './components/tools-content';
// import './styles/base.scss';
import { DashboardHeader, HelpPanels } from './components/header';
import useNotifications from './commons/use-notifications';
import { AppHeader } from '../common/TopNavigations';
import { AppFooter } from '../common/AppFooter';

const Details = ({ loadHelpPanelContent, id }) => (
  <Container
    header={
      <Header
        variant="h2"
        info={
          <DashboardHeader
            loadHelpPanelContent={loadHelpPanelContent}
            title="Details"
            des="Amazon Elastic Compute Cloud (Amazon EC2) is a web service that provides
                         resizeable computing capacity&mdash;literally, servers in Amazon's data
                         centers&mdash;that you use to build and host your software systems."
          />
        }
        actions={<Button>Edit</Button>}
      />
    }
  >
    <SettingsDetails id={id} isInProgress={false} />
  </Container>
);

const GeneralConfig = ({id}) => {
  const [state, setState] = useState("Running");
  const [loading, setLoading] = useState(false);

 const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <SpaceBetween size="m">
     <Container 
      header={
                  <Header
                    variant="h2"
                    info={<Link>Info</Link>}
                    description={
                       loading ? 
                        <>
                      <Spinner/>
                        <span style={{paddingLeft:"5px"}}>Refreshing instance data</span>
                      </>
                       : "Updated less than a minute ago"}
                    actions={
                      <SpaceBetween size="s" direction="horizontal">
                        <Button iconName="refresh" loading={loading} onClick={handleRefresh} />
                        <Button>
                          Connect
                        </Button>
                        <ButtonDropdown
                        items={[
                            { text: "Stop instance", id: "stop", disabled: false },
                            { text: "Start instance", id: "start", disabled: true },
                            { text: "Reboot instance", id: "reboot", disabled: false },
                            { text: "Hibernate instance", id: "hibernate", disabled: true },
                            { text: "Terminate instance", id: "terminate", disabled: false },
                          ]}
                        >
                          Instance state
                        </ButtonDropdown>
                         <ButtonDropdown
                        items={[
                            { text: "Connect", id: "connect", disabled: false },
                            { text: "Manage instance state", id: "manage", disabled: false },
                            { text: "Instance settings", id: "settings", disabled: true },
                            {
                              id: "networking",
                              text: "Networking",
                              items: [
                                { id: "attach", text: "Attach nwtwork interface" },
                                { id: "detach", text: "Detach nwtwork interface"},
                                {
                                  id: "connect",
                                  text: "Connect RDS database",
                                },
                                {
                                  id: "change",
                                  text: "Change source/destination check",
                                },
                                { id: "disassciate", text: "Disassociate Elastic IP address", disabled: 'true' },
                                { id: "manageIP", text: "Manage IP addresses" },
                              ]
                            },
                            { text: "Security", id: "security", disabled: true },
                            { text: "Image and templates", id: "security", disabled: true },
                            { text: "Monitor and troubleshoot", id: "monitor", disabled: true },
                          ]}
                          expandableGroups
                        >
                          Actions
                        </ButtonDropdown>
                      </SpaceBetween>
                    }
                  >
                    Instance summary for {id}
                  </Header>
                }
                >
                
    <ColumnLayout columns={3} variant="text-grid">
        <FormField label="Instance ID">
        <CopyText
          copyText={`arn:aws:cloudfront::a123`}
          copyButtonLabel="Copy ID"
          successText="Instance ID copied"
          errorText="Instance ID failed to copy"
        />
        </FormField>
      <FormField label="Public IPv4 address">
        <CopyText
          copyText={`100.25.222.196`}
          copyButtonLabel="Copy Public Address"
          successText="Public IPv4 copied"
          errorText="Public IPv4 failed to copy"
        />
        </FormField>
      <FormField label="Private IPv4 address">
        <CopyText
          copyText={`172.31.60.65`}
          copyButtonLabel="Copy Private Address"
          successText="Private IPv4 copied"
          errorText="Private IPv4 failed to copy"
        />
        </FormField>
        <FormField label="IPv6 address">
        <Box>{loading ? <Spinner /> : '-' }</Box>
        </FormField>
        <FormField label="Instance state">
           <StatusIndicator
          type={state === 'Running' ? 'success' : 'stopped'}
        >
          {state}
        </StatusIndicator>
        </FormField>
        <FormField label="Public IPv4 DNS">
        <CopyText
          copyText={`ec2-100-25-222-196.compute-1.amazonaws.com`}
          copyButtonLabel="Copy Public DNS"
          successText="Public DNS copied"
          errorText="Public DNS failed to copy"
        />
        </FormField>
        <FormField label="Hostname type">
        <Box variant="span">IP name: ip-172-31-60-65.ec2.internal</Box>
        </FormField>
        <FormField label="Private IP DNS name (IPv4 only)">
        <CopyText
          copyText={`ip-172-31-60-65.ec2.internal`}
          copyButtonLabel="Copy Private DNS name"
          successText="Private DNS name copied"
          errorText="Private DNS name failed to copy"
        />
        </FormField>
        <FormField label="Answer private resource DNS name">
        <Box variant="span">IPv4 (A)</Box>
        </FormField>
        <FormField label="Instance type">
        <Box variant="span">t2.micro</Box>
        </FormField>
         <FormField label="Elastic IP addresses">
          <Box>{loading ? <Spinner /> : '-' }</Box>
        </FormField>
         <FormField label="Auto-assigned IP address">
        <CopyText
          copyText={`100.25.222.196`}
          copyButtonLabel="Copy Auto-assigned IP address"
          successText="Auto-assigned IP address copied"
          errorText="Auto-assigned IP address failed to copy"
        />
        </FormField>
        <FormField label="VPC ID">
        <CopyText
          copyText={`vpc-070015eaa47ab026e`}
          copyButtonLabel="Copy VPC ID"
          successText="VPC ID copied"
          errorText="VPC ID failed to copy"
        />
        </FormField>
        <FormField label="AWS Compute Optimizer finding">
        <Icon name="status-info"/><span style={{paddingLeft: "5px", color:"#0273BA"}}>Opt-in to AWS Compute Optimizer for recommendations.</span>
        </FormField>
        <FormField label="IAM Role">
        <Box>{loading ? <Spinner /> : '-' }</Box>
        </FormField>
        <FormField label="Subnet ID">
        <CopyText
          copyText={`vpc-070015eaa47ab026e`}
          copyButtonLabel="CopySubnet ID"
          successText="Subnet ID copied"
          errorText="Subnet ID failed to copy"
        />
        </FormField>
        <FormField label="Auto Scaling Group name">
        <Box>{loading ? <Spinner /> : '-' }</Box>
        </FormField>
    </ColumnLayout>
  </Container>
  </SpaceBetween>
  );
}

function LogsTable() {
  const [logs, logsLoading] = useAsyncData(() =>
    new DataProvider().getData('logs')
  );
  const [selectedItems, setSelectedItems] = useState([]);
  const isOnlyOneSelected = selectedItems.length === 1;
  const atLeastOneSelected = selectedItems.length > 0;
  const {
    items,
    actions,
    filteredItemsCount,
    collectionProps,
    filterProps,
    paginationProps,
  } = useCollection(logs, {
    filtering: {
      empty: <TableEmptyState resourceName="Log" />,
      noMatch: (
        <TableNoMatchState onClearFilter={() => actions.setFiltering('')} />
      ),
    },
    pagination: { pageSize: 10 },
  });

  return (
    <Table
      className="logs-table"
      {...collectionProps}
      loading={logsLoading}
      loadingText="Loading logs"
      columnDefinitions={LOGS_COLUMN_DEFINITIONS}
      items={items}
      ariaLabels={logsSelectionLabels}
      selectionType="multi"
      selectedItems={selectedItems}
      resizableColumns
      onSelectionChange={(evt) => setSelectedItems(evt.detail.selectedItems)}
      header={
        <TableHeader
          title="Logs"
          selectedItems={selectedItems}
          totalItems={logs}
          actionButtons={
            <SpaceBetween direction="horizontal" size="xs">
              <Button disabled={!isOnlyOneSelected}>View</Button>
              <Button disabled={!atLeastOneSelected}>Watch</Button>
              <Button disabled={!atLeastOneSelected}>Download</Button>
            </SpaceBetween>
          }
        />
      }
      filter={
        <TextFilter
          {...filterProps}
          filteringAriaLabel="Find logs"
          filteringPlaceholder="Find logs"
          countText={getFilterCounterText(filteredItemsCount)}
        />
      }
      pagination={
        <Pagination {...paginationProps} ariaLabels={paginationLabels} />
      }
    />
  );
}

function DeleteModal({ distributions, visible, onDiscard, onDelete }) {
  const isMultiple = distributions.length > 1;
  return (
    <Modal
      visible={visible}
      onDismiss={onDiscard}
      header={isMultiple ? 'Delete distributions' : 'Delete distribution'}
      closeAriaLabel="Close dialog"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={onDiscard}>
              Cancel
            </Button>
            <Button variant="primary" onClick={onDelete}>
              Delete
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      {distributions.length > 0 && (
        <SpaceBetween size="m">
          {isMultiple ? (
            <Box variant="span">
              Delete{' '}
              <Box variant="span" fontWeight="bold">
                {distributions.length} distributions
              </Box>{' '}
              permanently? This action cannot be undone.
            </Box>
          ) : (
            <Box variant="span">
              Delete distribution{' '}
              <Box variant="span" fontWeight="bold">
                {distributions[0].id}
              </Box>{' '}
              permanently? This action cannot be undone.
            </Box>
          )}

          <Alert statusIconAriaLabel="Info">
            Proceeding with this action will delete distribution(s) with all
            content and can impact related resources.{' '}
            <Link external={true} href="#">
              Learn more
            </Link>
          </Alert>
        </SpaceBetween>
      )}
    </Modal>
  );
}

export function EC2_Instances_Detail(props) {
  const { id } = useParams();
  const [toolsOpen, setToolsOpen] = useState(false);
  const [toolsIndex, setToolsIndex] = useState(0);
  const { notifications, notifyInProgress } = useNotifications({
    resourceName: 'instance',
  });
  const [loading, setLoading] = useState(true);

  const [toolsContent, setToolsContent] = useState(
    <HelpPanels
      title={id}
      des="Amazon Elastic Compute Cloud (Amazon EC2) is a web service that provides
        resizeable computing capacity&mdash;literally, servers in Amazon's data
        centers&mdash;that you use to build and host your software systems."
    />
  );

  useEffect(() => {
    document.title = `${id}`;
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const loadHelpPanelContent = (toolsContent) => {
    setToolsOpen(true);
    setToolsContent(toolsContent);
  };

  const tabs = [
    {
      label: 'Details',
      id: 'details',
      content: <Details id={id} loadHelpPanelContent={loadHelpPanelContent} />,
    },
    {
      label: 'Security',
      id: 'security',
      content: <LogsTable />,
    },
    {
      label: 'Networking',
      id: 'networking',
      content: <OriginsTable />,
    },
    {
      label: 'Storage',
      id: 'storage',
      content: <BehaviorsTable />,
    },
    {
      label: 'Status checks',
      id: 'statusChecks',
      content: (
        <EmptyTable
          title="Invalidation"
          columnDefinitions={INVALIDATIONS_COLUMN_DEFINITIONS}
        />
      ),
    },
    {
      label: 'Monitoring',
      id: 'monitoring',
      content: <TagsTable loadHelpPanelContent={loadHelpPanelContent} />,
    },
    {
      label: 'Tags',
      id: 'tsga',
      content: <BehaviorsTable />,
    },
  ];

  return (
    <>
      <div id="h" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
        <AppHeader {...props} />
      </div>

      <AppLayout
        content={
          <>
            {!loading ? (
                <SpaceBetween size="s">
                  <GeneralConfig id={id} />
                  <Tabs tabs={tabs} ariaLabel="Resource details" />
                </SpaceBetween>
            ) : (
              <Spinner size="large" className="spinner" />
            )}
          </>
        }
        headerSelector="#h"
        breadcrumbs={<Breadcrumbs id={id} />}
        navigation={
          <Navigation
            activeHref="instances"
            header={EC2Header}
            items={ec2navItems}
          />
        }
        tools={toolsContent}
        toolsOpen={toolsOpen}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        ariaLabels={appLayoutLabels}
        notifications={<Flashbar items={notifications} stackItems/>}
        contentType="wizard"
      />
      <AppFooter />
    </>
  );
}

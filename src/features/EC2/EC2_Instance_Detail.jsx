/* eslint-disable react/prop-types */
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { createRef, useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  AppLayout,
  Button,
  Container,
  Header,
  Pagination,
  FormField,
  Box,
  Alert,
  ExpandableSection,
  ColumnLayout,
  ButtonDropdown,
  SpaceBetween,
  Icon,
  Flashbar,
  Link,
  Modal,
  Tabs,
  TextFilter,
  ContentLayout,
  Table,
  Spinner,
} from '@awsui/components-react';
import CopyText from './commons/copy-text';
import {
  Storage,
  Breadcrumbs,
  StatusCheck,
  Networking,
  Tags,
  SettingsDetails,
} from './commons/detail-common.jsx';
import {
  Navigation,
  ec2navItems,
  EC2Header,
} from './commons/common-components';
import { appLayoutLabels } from '../../features/common/labels';
import { HelpPanels, DashboardHeader } from './components/header';
import useNotifications from './commons/use-notifications';
import { AppHeader } from '../common/TopNavigations';
import { AppFooter } from '../common/AppFooter';
import { ItemState } from './components/item-state';

const Details = ({ loadHelpPanelContent, id }) => (
  <Container>
    <SettingsDetails id={id} isInProgress={false} />
  </Container>
);

const GeneralConfig = ({ id }) => {
  const [state, setState] = useState('Running');
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const Summary = ({ id }) => {
    const navigate = useNavigate();
    const handleClick = (e) => {
      {
        e.detail.id === 'manage' &&
          navigate(`ManageInstanceState`, {
            state: {
              name: 'Manage instance state',
              head: 'Instance details',
              //event: selectedItems[0]?.state,
            },
          });
      }
      {
        e.detail.id === 'connect' &&
          navigate(`connect`, {
            state: {
              name: 'Connect to instance',
              description: `Connect to your instance ${id} using any of these options`,
              event: state,
            },
          });
      }
    };
    return (
      <Container
        header={
          <Header
            variant="h2"
            info={<Link>Info</Link>}
            description={
              loading ? (
                <>
                  <Spinner />
                  <span style={{ paddingLeft: '5px' }}>
                    Refreshing instance data
                  </span>
                </>
              ) : (
                'Updated less than a minute ago'
              )
            }
            actions={
              <SpaceBetween size="s" direction="horizontal">
                <Button
                  iconName="refresh"
                  loading={loading}
                  onClick={handleRefresh}
                />
                <Button
                  onClick={() =>
                    navigate(`connect`, {
                      state: {
                        name: 'Connect to instance',
                        description: `Connect to your instance ${id} using any of these options`,
                        event: id,
                      },
                    })
                  }
                >
                  Connect
                </Button>
                <ButtonDropdown
                  items={[
                    { text: 'Stop instance', id: 'stop', disabled: false },
                    { text: 'Start instance', id: 'start', disabled: true },
                    { text: 'Reboot instance', id: 'reboot', disabled: false },
                    {
                      text: 'Hibernate instance',
                      id: 'hibernate',
                      disabled: true,
                    },
                    {
                      text: 'Terminate instance',
                      id: 'terminate',
                      disabled: false,
                    },
                  ]}
                >
                  Instance state
                </ButtonDropdown>
                <ButtonDropdown
                  onItemClick={(e) => {
                    handleClick(e);
                  }}
                  items={[
                    { text: 'Connect', id: 'connect', disabled: false },
                    {
                      text: 'Manage instance state',
                      id: 'manage',
                      disabled: false,
                    },
                    {
                      text: 'Instance settings',
                      id: 'settings',
                      disabled: true,
                    },
                    {
                      id: 'networking',
                      text: 'Networking',
                      items: [
                        { id: 'attach', text: 'Attach network interface' },
                        { id: 'detach', text: 'Detach network interface' },
                        {
                          id: 'connect',
                          text: 'Connect RDS database',
                        },
                        {
                          id: 'change',
                          text: 'Change source/destination check',
                        },
                        {
                          id: 'disassociate',
                          text: 'Disassociate Elastic IP address',
                          disabled: 'true',
                        },
                        { id: 'manageIP', text: 'Manage IP addresses' },
                      ],
                    },
                    { text: 'Security', id: 'security', disabled: true },
                    {
                      text: 'Image and templates',
                      id: 'security',
                      disabled: true,
                    },
                    {
                      text: 'Monitor and troubleshoot',
                      id: 'monitor',
                      disabled: true,
                    },
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
              copyText={`${id}`}
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
            <Box>{loading ? <Spinner /> : '-'}</Box>
          </FormField>
          <FormField label="Instance state">
            <ItemState state={state} />
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
            <Box>{loading ? <Spinner /> : '-'}</Box>
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
            <Icon name="status-info" />
            <span style={{ paddingLeft: '5px', color: '#0273BA' }}>
              Opt-in to AWS Compute Optimizer for recommendations.
            </span>
          </FormField>
          <FormField label="IAM Role">
            <Box>{loading ? <Spinner /> : '-'}</Box>
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
            <Box>{loading ? <Spinner /> : '-'}</Box>
          </FormField>
        </ColumnLayout>
      </Container>
    );
  };

  return (
    <SpaceBetween size="m">
      <Summary id={id} />
    </SpaceBetween>
  );
};

function Security() {
  const [selectedItems, setSelectedItems] = React.useState([]);

  return (
    <SpaceBetween size="s">
      <Container>
        <ExpandableSection headerText="Security details" defaultExpanded>
          <ColumnLayout columns={3} variant="text-grid">
            <FormField label="IAM Role">
              <Box>-</Box>
            </FormField>
            <FormField label="Owner ID">
              <CopyText
                copyText={`610741917922`}
                copyButtonLabel="Copy Owner ID"
                successText="Owner ID copied"
                errorText="Owner ID failed to copy"
              />
            </FormField>
            <FormField label="Launch time">
              <Box>
                Tue Feb 28 2023 04:44:10 GMT-0500 (Eastern Standard Time)
              </Box>
            </FormField>
            <FormField label="Security groups">
              <CopyText
                copyText={`sg-00eb617e30b7ccb09`}
                copyButtonLabel="Copy Security group ID"
                successText="Security group ID copied"
                errorText="Security group ID failed to copy"
              />
            </FormField>
          </ColumnLayout>
        </ExpandableSection>

        {/* Inbound Ruels */}

        <ExpandableSection headerText="Inbound rules" defaultExpanded>
          <Table
            columnDefinitions={[
              {
                id: 'name',
                header: 'Name',
                cell: (e) => e.name,
              },
              {
                id: 'ruleID',
                header: 'Security group rule ID',
                cell: (e) => e.ruleID,
              },
              { id: 'port', header: 'Port Range', cell: (e) => e.port },
              {
                id: 'protocol',
                header: 'Protocol',
                cell: (e) => e.protocol,
              },
              {
                id: 'source',
                header: 'Source',
                cell: (e) => e.source,
              },
            ]}
            items={[
              {
                name: '-',
                ruleID: 'sgr-03ea8e97bb1c9bc7c',
                port: '22',
                protocol: 'TCP',
                source: '0.0.0.0/0',
              },
            ]}
            loadingText="Loading resources"
            trackBy="name"
            visibleColumns={['name', 'ruleID', 'port', 'protocol', 'source']}
            empty={
              <Box textAlign="center" color="inherit">
                <b>No resources</b>
                <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                  No resources to display.
                </Box>
                <Button>Create resource</Button>
              </Box>
            }
            filter={
              <TextFilter
                filteringAriaLabel="Filter rules"
                filteringPlaceholder="Find rules"
              />
            }
            pagination={
              <Pagination
                currentPageIndex={1}
                pagesCount={1}
                ariaLabels={{
                  nextPageLabel: 'Next page',
                  previousPageLabel: 'Previous page',
                  pageLabel: (pageNumber) => `Page ${pageNumber} of all pages`,
                }}
              />
            }
          />
        </ExpandableSection>

        {/* Inbound Ruels */}

        <ExpandableSection headerText="Outbound rules" defaultExpanded>
          <Table
            columnDefinitions={[
              {
                id: 'name',
                header: 'Name',
                cell: (e) => e.name,
              },
              {
                id: 'ruleID',
                header: 'Security group rule ID',
                cell: (e) => e.ruleID,
              },
              { id: 'port', header: 'Port Range', cell: (e) => e.port },
              {
                id: 'protocol',
                header: 'Protocol',
                cell: (e) => e.protocol,
              },
              {
                id: 'destination',
                header: 'Destination',
                cell: (e) => e.destination,
              },
            ]}
            items={[
              {
                name: '-',
                ruleID: 'sgr-07445af86bf6b7233',
                port: 'All',
                protocol: 'All',
                destination: '0.0.0.0/0',
              },
            ]}
            loadingText="Loading resources"
            trackBy="name"
            visibleColumns={[
              'name',
              'ruleID',
              'port',
              'protocol',
              'destination',
            ]}
            empty={
              <Box textAlign="center" color="inherit">
                <b>No resources</b>
                <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                  No resources to display.
                </Box>
                <Button>Create resource</Button>
              </Box>
            }
            filter={
              <TextFilter
                filteringAriaLabel="Filter rules"
                filteringPlaceholder="Find rules"
              />
            }
            pagination={
              <Pagination
                currentPageIndex={1}
                pagesCount={1}
                ariaLabels={{
                  nextPageLabel: 'Next page',
                  previousPageLabel: 'Previous page',
                  pageLabel: (pageNumber) => `Page ${pageNumber} of all pages`,
                }}
              />
            }
          />
        </ExpandableSection>
      </Container>
    </SpaceBetween>
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
export const TabsSection = ({ id, loadHelpPanelContent }) => {
  const tabs = [
    {
      label: 'Details',
      id: 'details',
      content: <Details id={id} loadHelpPanelContent={loadHelpPanelContent} />,
    },
    {
      label: 'Security',
      id: 'security',
      content: <Security />,
    },
    {
      label: 'Networking',
      id: 'networking',
      content: <Networking />,
    },
    {
      label: 'Storage',
      id: 'storage',
      content: <Storage />,
    },
    {
      label: 'Status checks',
      id: 'statusChecks',
      content: <StatusCheck />,
    },
    {
      label: 'Monitoring',
      id: 'monitoring',
      content: <StatusCheck />,
    },
    {
      label: 'Tags',
      id: 'tsga',
      content: <Tags />,
    },
  ];
  return <Tabs tabs={tabs} ariaLabel="Resource details" />;
};

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

  return (
    <>
      <div id="h" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
        <AppHeader {...props} />
      </div>
      <AppLayout
        content={
          <>
            {!loading ? (
              <SpaceBetween size="m">
                <ContentLayout />
                <GeneralConfig id={id} />
                <TabsSection
                  id={id}
                  loadHelpPanelContent={loadHelpPanelContent}
                />
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
            activeHref="/ec2_instance/instances"
            header={EC2Header}
            items={ec2navItems}
          />
        }
        tools={toolsContent}
        toolsOpen={toolsOpen}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        ariaLabels={appLayoutLabels}
        notifications={<Flashbar items={notifications} stackItems />}
        contentType="table"
      />
      <AppFooter />
    </>
  );
}

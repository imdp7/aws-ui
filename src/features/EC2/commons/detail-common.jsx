/* eslint-disable react/prop-types */
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import {
  Box,
  Alert,
  BreadcrumbGroup,
  Button,
  ButtonDropdown,
  ColumnLayout,
  Container,
  Header,
  Link,
  TextFilter,
  CollectionPreferences,
  Pagination,
  ExpandableSection,
  FormField,
  ProgressBar,
  StatusIndicator,
  SpaceBetween,
  Table,
} from '@cloudscape-design/components';
import { useAsyncData } from '../commons/use-async-data';
import DataProvider from '../commons/data-provider';
import { TableHeader, TableEmptyState } from '../commons/common-components';
import { useLocalStorage } from '../../common/localStorage';
import {
  ORIGINS_COLUMN_DEFINITIONS,
  BEHAVIORS_COLUMN_DEFINITIONS,
  TAGS_COLUMN_DEFINITIONS,
} from './details-config';
import { resourceDetailBreadcrumbs } from '../../common/breadcrumbs';
import {
  behaviorsSelectionLabels,
  originsSelectionLabels,
} from '../../common/labels';
import CopyText from './copy-text';
import { DashboardHeader } from '../components/header';
import {
  COLUMN_DEFINITIONS,
  VISIBLE_CONTENT_OPTIONS,
  PAGE_SIZE_OPTIONS,
  SEARCHABLE_COLUMNS,
} from '../../S3/components/table-select-filter-config';

export const DEMO_DISTRIBUTION = {
  id: 'SLCCSMWOHOFUY0',
  domainName: 'abcdef01234567890.cloudfront.net',
  arn: 'arn:aws:cloudfront::abcdef01234567890.cloudfront.net/SLCCSMWOHOFUY0',
  priceClass: 'Use only US, Canada, Europe, and Asia',
  sslCertificate: 'Default CloudFront SSL certificate',
  logging: 'Off',
};

export const Breadcrumbs = ({ id }) => (
  <BreadcrumbGroup
    items={[
      { text: 'EC2', href: '/ec2_instance/dashboard' },
      { text: 'Instances', href: '/ec2_instance/instances' },
      { text: id, href: '#' + id },
    ]}
    expandAriaLabel="Show path"
    ariaLabel="Breadcrumbs"
  />
);

export const PageHeader = ({ buttons, id }) => {
  return (
    <Header
      variant="h1"
      actions={
        <SpaceBetween direction="horizontal" size="xs">
          {buttons.map((button, key) =>
            !button.items ? (
              <Button
                href={button.href || ''}
                disabled={button.disabled || false}
                key={key}
              >
                {button.text}
              </Button>
            ) : (
              <ButtonDropdown items={button.items} key={key}>
                {button.text}
              </ButtonDropdown>
            )
          )}
        </SpaceBetween>
      }
    >
      {id}
    </Header>
  );
};

export const GeneralConfig = () => (
  <Container header={<Header variant="h2">General configuration</Header>}>
    <ColumnLayout columns={4} variant="text-grid">
      <div>
        <Box variant="awsui-key-label">Engine</Box>
        <div>Oracle Enterprise Edition 12.1.0.2.v7</div>
      </div>
      <div>
        <Box variant="awsui-key-label">DB instance class</Box>
        <div>db.t2.large</div>
      </div>
      <div>
        <Box variant="awsui-key-label">DB instance status</Box>
        <StatusIndicator type="success">Available</StatusIndicator>
      </div>
      <div>
        <Box variant="awsui-key-label">Pending maintenance</Box>
        <div>None</div>
      </div>
    </ColumnLayout>
  </Container>
);

export const SettingsDetails = ({
  distribution = DEMO_DISTRIBUTION,
  isInProgress,
  id,
}) => (
  <SpaceBetween size="s">
    <ExpandableSection headerText="Instance details" defaultExpanded>
      <ColumnLayout columns={3} variant="text-grid">
        <FormField label="Platform">
          <CopyText
            copyText={`Amazon Linux (Inferred)`}
            copyButtonLabel="Copy Platfrom"
            successText="Platform copied"
            errorText="Platform failed to copy"
          />
        </FormField>
        <FormField label="AMI ID">
          <CopyText
            copyText={`ami-0dfcb1ef8550277af`}
            copyButtonLabel="Copy AMI ID"
            successText="AMI ID copied"
            errorText="AMI ID failed to copy"
          />
        </FormField>
        <FormField label="Monitoring">
          <Box>disabled</Box>
        </FormField>
        <FormField label="Platform details">
          <CopyText
            copyText={`Linux/UNIX`}
            copyButtonLabel="Copy Platform details"
            successText="Platform details copied"
            errorText="Platform details failed to copy"
          />
        </FormField>
        <FormField label="AMI name">
          <CopyText
            copyText={`amzn2-ami-kernel-5.10-hvm-2.0.20230207.0-x86_64-gp2`}
            copyButtonLabel="Copy AMI name"
            successText="AMI name copied"
            errorText="AMI name failed to copy"
          />
        </FormField>
        <FormField label="Termination protection">
          <Box>Disabled</Box>
        </FormField>
        <FormField label="Stop protection">
          <Box>Disabled</Box>
        </FormField>
        <FormField label="Launch time">
          <CopyText
            copyText={`Tue Feb 28 2023 04:44:10 GMT-0500 (Eastern Standard Time) (about 18 hours)`}
            copyButtonLabel="Copy Launch time"
            successText="Launch time copied"
            errorText="Launch time failed to copy"
          />
        </FormField>
        <FormField label="AMI location">
          <CopyText
            copyText={`amazon/amzn2-ami-kernel-5.10-hvm-2.0.20230207.0-x86_64-gp2`}
            copyButtonLabel="Copy AMI location"
            successText="AMI location coped"
            errorText="AMI location failed to copy"
          />
        </FormField>
        <FormField label="Instance auto-recovery">
          <Box>Default</Box>
        </FormField>
        <FormField label="Lifecycle">
          <Box>normal</Box>
        </FormField>
        <FormField label="Stop-hibernate behavior">
          <Box>disabled</Box>
        </FormField>
        <FormField label="AMI Launch index">
          <Box>0</Box>
        </FormField>
        <FormField label="Key pair name">
          <CopyText
            copyText={`test`}
            copyButtonLabel="Copy Key pair name"
            successText="Key pair name copied"
            errorText="Key pair name failed to copy"
          />
        </FormField>
        <FormField label="State transition reason">
          <Box>-</Box>
        </FormField>
        <FormField label="Credit specification">
          <Box>standard</Box>
        </FormField>
        <FormField label="Kernel ID">
          <Box>-</Box>
        </FormField>
        <FormField label="State transition message">
          <Box>-</Box>
        </FormField>
        <FormField label="Usage operation">
          <CopyText
            copyText={`RunInstances`}
            copyButtonLabel="Copy Usage operation"
            successText="Usage operation copied"
            errorText="Usage operation failed to copy"
          />
        </FormField>
        <FormField label="RAM disk ID">
          <Box>-</Box>
        </FormField>
        <FormField label="Owner">
          <CopyText
            copyText={`610741917922`}
            copyButtonLabel="Copy Owner"
            successText="Owner copied"
            errorText="Owner failed to copy"
          />
        </FormField>
        <FormField label="ClassicLink">
          <Box>-</Box>
        </FormField>
        <FormField label="Enclaves Support">
          <Box>-</Box>
        </FormField>
        <FormField label="Boot mode">
          <Box>-</Box>
        </FormField>
        <FormField label="Allow tags in instance metadata">
          <Box>Disabled</Box>
        </FormField>
        <FormField label="Use RBN as guest OS hostname">
          <CopyText
            copyText={`Disabled`}
            copyButtonLabel="Copy Use RBN as guest OS hostname "
            successText="Use RBN as guest OS hostname copied"
            errorText="Use RBN as guest OS hostname failed to copy"
          />
        </FormField>
        <FormField label="Answer RBN DNS hostname IPv4">
          <CopyText
            copyText={`Enabled`}
            copyButtonLabel="Copy Answer RBN DNS hostname IPv4"
            successText="Answer RBN DNS hostname IPv4 copied"
            errorText="Answer RBN DNS hostname IPv4 failed to copy"
          />
        </FormField>
      </ColumnLayout>
    </ExpandableSection>

    <ExpandableSection headerText="Host and placement group" defaultExpanded>
      <ColumnLayout columns={3} variant="text-grid">
        <FormField label="Host ID">
          <Box>-</Box>
        </FormField>
        <FormField label="Affinity">
          <Box>-</Box>
        </FormField>
        <FormField label="Placement group">
          <Box>-</Box>
        </FormField>
        <FormField label="Host resource group name">
          <Box>-</Box>
        </FormField>
        <FormField label="Tenancy">
          <CopyText
            copyText={`default`}
            copyButtonLabel="Copy Tenancy"
            successText="Tenancy copied"
            errorText="Tenancy failed to copy"
          />
        </FormField>
        <FormField label="Placement group ID">
          <Box>-</Box>
        </FormField>
        <FormField label="Virtualization type">
          <CopyText
            copyText={`hvm`}
            copyButtonLabel="Copy Virtualization type"
            successText="Virtualization type copied"
            errorText="Virtualization type failed to copy"
          />
        </FormField>
        <FormField label="Reservation">
          <CopyText
            copyText={`r-09fabeee65e3db5c8`}
            copyButtonLabel="Copy Reservation"
            successText="Reservation copied"
            errorText="Reservation failed to copy"
          />
        </FormField>
        <FormField label="Partition number">
          <Box>-</Box>
        </FormField>
        <FormField label="Number of vCPUs">
          <Box>1</Box>
        </FormField>
      </ColumnLayout>
    </ExpandableSection>

    <ExpandableSection headerText="Capacity reservation" defaultExpanded>
      <ColumnLayout columns={3} variant="text-grid">
        <FormField label="Capacity Reservation ID">
          <Box>-</Box>
        </FormField>
        <FormField label="Capacity Reservation setting">
          <Box>open</Box>
        </FormField>
      </ColumnLayout>
    </ExpandableSection>

    <ExpandableSection headerText="Accelerators" defaultExpanded>
      <ColumnLayout columns={3} variant="text-grid">
        <FormField label="Elastic Graphics ID">
          <Box>-</Box>
        </FormField>
        <FormField label="Elastic inference accelerator ID">
          <Box>-</Box>
        </FormField>
      </ColumnLayout>
    </ExpandableSection>
  </SpaceBetween>
);

export const StatusCheck = (props) => {
  return (
    <Container
      header={
        <Header
          variant="h3"
          description="Status checks detect problems that may impair i-0f878c0d33c858284 (test) from running 
     your applications."
          info={<Link>Info</Link>}
          actions={
            <ButtonDropdown
              items={[
                {
                  text: 'Create status check alarm',
                  id: 'create',
                  disabled: false,
                },
                {
                  text: 'Report Instance status',
                  id: 'report',
                  disabled: false,
                },
              ]}
            >
              Actions
            </ButtonDropdown>
          }
        >
          Status checks
        </Header>
      }
    >
      <SpaceBetween size="s">
        <ColumnLayout columns={2} variant="text-grid">
          <FormField label="System status checks">
            <StatusIndicator type="success">
              System reachability check passed
            </StatusIndicator>
          </FormField>
          <FormField label="Instance status checks">
            <StatusIndicator type="success">
              Instance reachability check passed
            </StatusIndicator>
          </FormField>
        </ColumnLayout>
        <Box>
          Report the instance status if our checks do not reflect your
          experience with this instance or if they do not detect issues you are
          having.
        </Box>
        <Button>Report instance status</Button>
      </SpaceBetween>
    </Container>
  );
};

export const Tags = () => {
  const [preferences, setPreferences] = useLocalStorage(
    'React-DBInstancesTable-Preferences',
    {
      pageSize: 10,
      visibleContent: ['key', 'value'],
      wrapLines: false,
      stripedRows: true,
      custom: 'table',
    }
  );

  return (
    <Table
      visibleColumns={preferences.visibleContent}
      wrapLines={preferences.wrapLines}
      stripedRows={preferences.stripedRows}
      loadingText="Loading resources"
      columnDefinitions={[
        {
          id: 'key',
          header: 'Key',
          cell: (e) => e.key,
        },
        {
          id: 'value',
          header: 'Value',
          cell: (e) => e.value,
        },
      ]}
      items={[
        {
          key: 'name',
          value: 'test',
        },
      ]}
      empty={
        <Box textAlign="center" color="inherit">
          <b>No tags</b>
          <Box padding={{ bottom: 's' }} variant="p" color="inherit">
            No tags to display.
          </Box>
          <Button>Create tags</Button>
        </Box>
      }
      filter={<TextFilter filteringPlaceholder="Find tags" filteringText="" />}
      header={<Header actions={<Button>Manage tags</Button>}>Tags</Header>}
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
                  {
                    id: 'key',
                    label: 'Key',
                  },
                  { id: 'value', label: 'Value' },
                ],
              },
            ],
          }}
        />
      }
    />
  );
};

export function Networking() {
  return (
    <Container>
      <SpaceBetween size="s">
        <Alert
          statusIconAriaLabel="Info"
          action={<Button>Run Reachability Analyzer</Button>}
        >
          You can now check network connectivity with Reachability Analyzer.
        </Alert>
        <ExpandableSection headerText="Networking details" defaultExpanded>
          <ColumnLayout columns={3} variant="text-grid">
            <FormField label="Public IPv4 address">
              <CopyText
                copyText={`100.25.222.196`}
                copyButtonLabel="Copy Public IPv4 address"
                successText="Public IPv4 address copied"
                errorText="Public IPv4 address failed to copy"
              />
            </FormField>
            <FormField label="Private IPv4 address">
              <CopyText
                copyText={`172.31.60.65`}
                copyButtonLabel="Copy Private IPv4 address"
                successText="Private IPv4 address copied"
                errorText="Private IPv4 address failed to copy"
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
            <FormField label="Public IPv4 DNS">
              <CopyText
                copyText={`ec2-100-25-222-196.compute-1.amazonaws.com`}
                copyButtonLabel="Copy Public IPv4 DNS"
                successText="VPC Public IPv4 DNS copied"
                errorText="Public IPv4 DNS failed to copy"
              />
            </FormField>
            <FormField label="Private IP DNS name (IPv4 only)">
              <CopyText
                copyText={`ip-172-31-60-65.ec2.internal`}
                copyButtonLabel="Copy Private IP DNS name (IPv4 only)"
                successText="Private IP DNS name (IPv4 only) copied"
                errorText="Private IP DNS name (IPv4 only) failed to copy"
              />
            </FormField>
            <FormField label="Subnet ID">
              <CopyText
                copyText={`subnet-01288b924ee9a1659`}
                copyButtonLabel="Copy Subnet ID"
                successText="Subnet ID copied"
                errorText="Subnet ID failed to copy"
              />
            </FormField>
            <FormField label="IPV6 addresses">
              <Box>-</Box>
            </FormField>
            <FormField label="Secondary private IPv4 addresses">
              <Box>-</Box>
            </FormField>
            <FormField label="Availability zone">
              <CopyText
                copyText={`us-east-1e`}
                copyButtonLabel="Copy Availability zone"
                successText="Availability zone copied"
                errorText="Availability zone failed to copy"
              />
            </FormField>
            <FormField label="Carrier IP addresses (ephemeral)">
              <Box>-</Box>
            </FormField>
            <FormField label="Outpost ID">
              <Box>-</Box>
            </FormField>
            <FormField label="Use RBN as guest OS hostname">
              <CopyText
                copyText={`Disabled`}
                copyButtonLabel="Copy Use RBN as guest OS hostname"
                successText="Use RBN as guest OS hostname copied"
                errorText="Use RBN as guest OS hostname failed to copy"
              />
            </FormField>
            <FormField label="Answer RBN DNS hostname IPv4">
              <CopyText
                copyText={`Enabled`}
                copyButtonLabel="Copy Answer RBN DNS hostname IPv4"
                successText="Answer RBN DNS hostname IPv4 copied"
                errorText="Answer RBN DNS hostname IPv4 failed to copy"
              />
            </FormField>
          </ColumnLayout>
        </ExpandableSection>
        <ExpandableSection
          headerText="Network Interfaces"
          headerCounter="1"
          defaultExpanded
        >
          <Table
            columnDefinitions={[
              {
                id: 'id',
                header: 'Interface ID',
                cell: (e) => (
                  <CopyText
                    copyText={`${e.id}`}
                    copyButtonLabel="Copy Interface ID"
                    successText="Interface ID copied"
                    errorText="Interface ID failed to copy"
                  />
                ),
              },
              {
                id: 'description',
                header: 'Description',
                cell: (e) => e.description,
              },
              { id: 'IPv4', header: 'IPv4 Prefixes', cell: (e) => e.IPv4 },
              {
                id: 'IPv6',
                header: 'IPv6 Prefixes',
                cell: (e) => e.IPv6,
              },
              {
                id: 'PublicIPv4address',
                header: 'Public IPv4 address',
                cell: (e) => e.PublicIPv4address,
              },
              {
                id: 'PrivateIPv4address',
                header: 'Private IPv4 address',
                cell: (e) => e.PrivateIPv4address,
              },
              {
                id: 'PrivateIPv4DNS',
                header: 'Private IPv4 DNS',
                cell: (e) => e.PrivateIPv4DNS,
              },
              {
                id: 'IPv6addresses',
                header: 'IPv6 addresses',
                cell: (e) => e.IPv6addresses,
              },
              {
                id: 'AttachmentTime',
                header: 'Attachment time',
                cell: (e) => e.AttachmentTime,
              },
              {
                id: 'InterfaceOwner',
                header: 'Interface owner',
                cell: (e) => e.InterfaceOwner,
              },
              {
                id: 'AttachmentStatus',
                header: 'Attachment status',
                cell: (e) => e.AttachmentStatus,
              },
              {
                id: 'vpcID',
                header: 'VPC ID',
                cell: (e) => (
                  <CopyText
                    copyText={`${e.vpcID}`}
                    copyButtonLabel="Copy Interface ID"
                    successText="Interface ID copied"
                    errorText="Interface ID failed to copy"
                  />
                ),
              },
              {
                id: 'SubnetID',
                header: 'Subnet ID',
                cell: (e) => (
                  <CopyText
                    copyText={`${e.SubnetID}`}
                    copyButtonLabel="Copy Interface ID"
                    successText="Interface ID copied"
                    errorText="Interface ID failed to copy"
                  />
                ),
              },
              {
                id: 'DeleteTerminate',
                header: 'Delete on terminate',
                cell: (e) => e.DeleteTerminate,
              },
              {
                id: 'SourceDestinationCheck',
                header: 'Source / destination check',
                cell: (e) => e.SourceDestinationCheck,
              },
              {
                id: 'SecurityGroups',
                header: 'Security groups',
                cell: (e) => (
                  <CopyText
                    copyText={`${e.SecurityGroups}`}
                    copyButtonLabel="Copy Security groups"
                    successText="Security groups copied"
                    errorText="Security groups failed to copy"
                  />
                ),
              },
              {
                id: 'InterfaceType',
                header: 'Interface type',
                cell: (e) => e.InterfaceType,
              },
              {
                id: 'ENAExpress',
                header: 'ENA Express',
                cell: (e) => e.ENAExpress,
              },
              {
                id: 'ENAExpressUDP',
                header: 'ENA Express UDP',
                cell: (e) => e.ENAExpressUDP,
              },
            ]}
            items={[
              {
                id: 'eni-0eaeab7311d0a9297',
                description: '-',
                IPv4: '-',
                IPv6: '-',
                PublicIPv4address: '100.25.222.196',
                PrivateIPv4address: '172.31.60.65	',
                PrivateIPv4DNS: 'ip-172-31-60-65.ec2.internal',
                IPv6addresses: '-',
                AttachmentTime:
                  'Tue Feb 28 2023 04:44:10 GMT-0500 (Eastern Standard Time) (about 22 hours)',
                InterfaceOwner: '610741917922',
                AttachmentStatus: 'attached',
                vpcID: 'vpc-070015eaa47ab026e',
                SubnetID: 'subnet-01288b924ee9a1659',
                DeleteTerminate: 'enabled',
                SourceDestinationCheck: 'enabled',
                SecurityGroups: 'sg-00eb617e30b7ccb09',
                InterfaceType: 'Elastic network interface',
                ENAExpress: '-',
                ENAExpressUDP: '-',
              },
            ]}
            loadingText="Loading resources"
            trackBy="name"
            visibleColumns={[
              'id',
              'description',
              'IPv4',
              'IPv6',
              'PublicIPv4address',
              'PrivateIPv4address',
              'PrivateIPv4DNS',
              'IPv6addresses',
              'AttachmentTime',
              'InterfaceOwner',
              'AttachmentStatus',
              'vpcID',
              'SubnetID',
              'DeleteTerminate',
              'SourceDestinationCheck',
              'SecurityGroups',
              'InterfaceType',
              'ENAExpress',
              'ENAExpressUDP',
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
                filteringAriaLabel="Filter Network Interfaces"
                filteringPlaceholder="Find Network Interfaces"
              />
            }
          />
        </ExpandableSection>

        {/* Elastic IP Address */}
        <ExpandableSection headerText="Elastic IP Addresses" defaultExpanded>
          <Table
            columnDefinitions={[
              {
                id: 'name',
                header: 'Name',
                cell: (e) => e.name,
              },
              {
                id: 'IPv4Address',
                header: 'Allocated IPv4 address',
                cell: (e) => e.IPv4Address,
              },
              { id: 'type', header: 'Type', cell: (e) => e.type },
              {
                id: 'AddressPool',
                header: 'Address pool',
                cell: (e) => e.AddressPool,
              },
              {
                id: 'AllocationID',
                header: 'Allocation ID',
                cell: (e) => e.AllocationID,
              },
            ]}
            items={[]}
            loadingText="Loading resources"
            trackBy="name"
            visibleColumns={[
              'name',
              'IPv4Address',
              'type',
              'AddressPool',
              'AllocationID',
            ]}
            empty={
              <Box textAlign="center" color="inherit">
                <b>No Elastic IP addresses are associated with this instance</b>
              </Box>
            }
            filter={
              <TextFilter
                filteringAriaLabel="Filter Elastic IP addresses"
                filteringPlaceholder="Find Elastic IP addresses"
              />
            }
          />
        </ExpandableSection>
      </SpaceBetween>
    </Container>
  );
}

export function Storage() {
  const [selectedItems, setSelectedItems] = useState([]);
  const isOnlyOneSelected = selectedItems.length === 1;
  const atLeastOneSelected = selectedItems.length > 0;

  return (
    <Container>
      {/* Root device details */}
      <ExpandableSection headerText="Root device details" defaultExpanded>
        <ColumnLayout columns={3} variant="text-grid">
          <FormField label="Root device name">
            <CopyText
              copyText={`/dev/xvda`}
              copyButtonLabel="Copy Root device name"
              successText="Root device name copied"
              errorText="Root device name failed to copy"
            />
          </FormField>
          <FormField label="Root device type">EBS</FormField>
          <FormField label="EBS optimization">disabled</FormField>
        </ColumnLayout>
      </ExpandableSection>

      {/* Block device */}
      <ExpandableSection headerText="Block device" defaultExpanded>
        <Table
          columnDefinitions={[
            {
              id: 'id',
              header: 'Volume ID',
              cell: (e) => <Link href="#">{e.id}</Link>,
            },
            {
              id: 'name',
              header: 'Device name',
              cell: (e) => e.name,
            },
            { id: 'size', header: 'Volume Size', cell: (e) => e.size },
            {
              id: 'status',
              header: 'Attachment status',
              cell: (e) => (
                <StatusIndicator type="success">{e.status}</StatusIndicator>
              ),
            },
            {
              id: 'time',
              header: 'Attachment time',
              cell: (e) => e.time,
            },
            {
              id: 'encrypted',
              header: 'Encrypted',
              cell: (e) => e.encrypted,
            },
            {
              id: 'KMSKeyID',
              header: 'KMS key ID',
              cell: (e) => e.KMSKeyID,
            },
            {
              id: 'DeleteOnTermination',
              header: 'Delete on termination',
              cell: (e) => e.DeleteOnTermination,
            },
          ]}
          items={[
            {
              id: 'vol-01e335501397e7531',
              name: '/dev/xvda',
              size: '8',
              status: 'Attached',
              time: 'Tue Feb 28 2023 04:44:12 GMT-0500 (Eastern Standard Time)	',
              encrypted: 'No',
              KMSKeyID: '-',
              DeleteOnTermination: 'Yes',
            },
          ]}
          loadingText="Loading resources"
          trackBy="name"
          visibleColumns={[
            'id',
            'name',
            'size',
            'status',
            'time',
            'encrypted',
            'KMSKeyID',
            'DeleteOnTermination',
          ]}
          empty={
            <Box textAlign="center" color="inherit">
              <b>No Block devices are associated with this instance</b>
            </Box>
          }
          filter={
            <TextFilter
              filteringAriaLabel="Filter Block devices"
              filteringPlaceholder="Find Block devices"
            />
          }
        />
      </ExpandableSection>

      {/* Recent root volume replacement tasks */}
      <ExpandableSection
        headerText="Recent root volume replacement tasks"
        defaultExpanded
      >
        <Table
          columnDefinitions={[
            {
              id: 'id',
              header: 'Task ID',
              cell: (e) => <Link href="#">{e.id}</Link>,
            },
            {
              id: 'state',
              header: 'Task state',
              cell: (e) => (
                <StatusIndicator type="success">{e.state}</StatusIndicator>
              ),
            },
            {
              id: 'StartTime',
              header: 'Start time',
              cell: (e) => e.StartTime,
            },
            {
              id: 'CompletionTime',
              header: 'Completion time',
              cell: (e) => e.CompletionTime,
            },
            {
              id: 'tags',
              header: 'Tags',
              cell: (e) => e.tags,
            },
          ]}
          items={[]}
          loadingText="Loading resources"
          trackBy="name"
          visibleColumns={[
            'id',
            'state',
            'StartTime',
            'CompletionTime',
            'tags',
          ]}
          empty={
            <Box textAlign="center" color="inherit">
              <b>
                No Recent root volume replacement tasks are associated with this
                instance
              </b>
            </Box>
          }
          filter={
            <TextFilter
              filteringAriaLabel="Filter Recent root volume replacement tasks"
              filteringPlaceholder="Find Recent root volume replacement tasks"
            />
          }
        />
      </ExpandableSection>
    </Container>
  );
}

export function TagsTable({ loadHelpPanelContent }) {
  const [tags, tagsLoading] = useAsyncData(async () => {
    const { ResourceTagMappingList } = await window.FakeServer.GetResources();
    return ResourceTagMappingList.reduce(
      (tags, resourceTagMapping) => [...tags, ...resourceTagMapping.Tags],
      []
    );
  });

  return (
    <Table
      id="tags-panel"
      columnDefinitions={TAGS_COLUMN_DEFINITIONS}
      items={tags}
      loading={tagsLoading}
      loadingText="Loading tags"
      header={
        <Header
          variant="h2"
          info={
            <DashboardHeader
              loadHelpPanelContent={loadHelpPanelContent}
              title="Tags"
              des="Information about tags."
            />
          }
          actions={<Button>Manage tags</Button>}
          description={
            <>
              A tag is a label that you assign to an AWS resource. Each tag
              consists of a key and an optional value. You can use tags to
              search and filter your resources or track your AWS costs.
            </>
          }
        ></Header>
      }
    />
  );
}

/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  AppLayout,
  BreadcrumbGroup,
  SpaceBetween,
  Box,
  Button,
  Header,
  StatusIndicator,
  ColumnLayout,
  ExpandableSection,
  ContentLayout,
  Table,
  RadioGroup,
  Link,
  Alert,
  Container,
  Checkbox,
  AttributeEditor,
  FormField,
  Input,
  Autosuggest,
  Select,
} from '@cloudscape-design/components';
import { AppHeader } from '../common/TopNavigations';
import { AppFooter } from '../common/AppFooter';
import {
  Navigation,
  S3navItems,
  S3Header,
} from '../EC2/commons/common-components';
import { DashboardHeader, HelpPanels } from '../EC2/components/header';
import { appLayoutLabels, paginationLabels } from '../common/labels';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import ObjectsPane from './components/Objects';
import { InfoLink } from '../common/common';
import { BaseNavigationDetail } from '@awsui/components-react/internal/events';

const StorageItems = [
  {
    storageClass: 'Standard',
    designed:
      'Frequently accessed data (more than once a month) with milliseconds access',
    availabilityZones: '≥ 3',
    duration: '-',
    billableSize: '-',
    monitoringFees: '-',
    retrievalFees: '-',
  },
  {
    storageClass: 'Intelligent-Tiering',
    designed: 'Data with changing or unknown access patterns',
    availabilityZones: '≥ 3',
    duration: '-',
    billableSize: '-',
    monitoringFees: 'Per-object fees apply for objects >= 128 KB',
    retrievalFees: '-',
  },
  {
    storageClass: 'Standard-IA',
    designed:
      'Infrequently accessed data (once a month) with milliseconds access',
    availabilityZones: '≥ 3',
    duration: '30 days',
    billableSize: '128 KB',
    monitoringFees: '-',
    retrievalFees: 'Per-GB fees apply',
  },
  {
    storageClass: 'One Zone-IA',
    designed:
      'Recreatable, infrequently accessed data (once a month) stored in a single Availability Zone with milliseconds access',
    availabilityZones: '1',
    duration: '30 days',
    billableSize: '128 KB',
    monitoringFees: '-',
    retrievalFees: 'Per-GB fees apply',
  },
  {
    storageClass: 'Glacier Instant Retrieval',
    designed:
      'Long-lived archive data accessed once a quarter with instant retrieval in milliseconds',
    availabilityZones: '≥ 3',
    duration: '90 days',
    billableSize: '128 KB',
    monitoringFees: '-',
    retrievalFees: 'Per-GB fees apply',
  },
  {
    storageClass: 'Glacier Flexible Retrieval (formerly Glacier)',
    designed:
      'Long-lived archive data accessed once a year with retrieval of minutes to hours',
    availabilityZones: '≥ 3',
    duration: '90 days',
    billableSize: '-',
    monitoringFees: '-',
    retrievalFees: 'Per-GB fees apply',
  },
  {
    storageClass: 'Glacier Deep Archive',
    designed:
      'Long-lived archive data accessed less than once a year with retrieval of hours',
    availabilityZones: '≥ 3',
    duration: '180 days',
    billableSize: '-',
    monitoringFees: '-',
    retrievalFees: 'Per-GB fees apply',
  },
  {
    storageClass: 'Reduced redundancy',
    designed:
      'Noncritical, frequently accessed data with milliseconds access (not recommended as S3 Standard is more cost effective)',
    availabilityZones: '≥ 3',
    duration: '-',
    billableSize: '-',
    monitoringFees: '-',
    retrievalFees: 'Per-GB fees apply',
  },
];

function Upload(props) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [activeHref, setActiveHref] = useState('buckets');
  const [toolsOpen, setToolsOpen] = useState(false);

  const [toolsContent, setToolsContent] = useState(
    <HelpPanels
      title="Upload"
      info="Upload one or more objects (files and folders) to the destination Amazon S3 bucket. To upload objects larger than 160 GB, use the AWS Command Line Interface (AWS CLI), AWS SDKs, or REST API."
      des="You can configure additional permissions and properties for the uploaded objects, including bucket versioning, access control list (ACL) settings, the storage class, server-side encryption settings, tags, and metadata. "
      ul={[
        {
          h5: 'Storage class',
          text: `Storage classes are designed for different data access levels at corresponding rates for the number of Availability Zones, minimum storage duration, and minimum billable object size of the storage class. If you don't know which storage class to use, we recommend S3 Intelligent-Tiering. For a small monthly object monitoring and automation charge, S3 Intelligent-Tiering monitors access patterns and automatically moves objects that have not been accessed to lower-cost access tiers.`,
        },
        {
          h5: 'Server-side encryption',
          text: 'Encrypt your object with Amazon S3–managed keys or AWS Key Management Service (AWS KMS) keys. If the destination bucket policy requires encrypted uploads, you must specify encryption settings for your object. If default encryption is enabled for the destination bucket, the default bucket-encryption settings are used to encrypt objects when they are uploaded. ',
        },
        {
          h5: 'Tags',
          text: 'Enter tags to categorize your objects. Use tags to track costs, manage permissions, lifecycle operations, and other features supported by tagging.',
        },
        {
          h5: 'Metadata',
          text: 'Enter metadata to categorize your objects. You can optionally define your own custom metadata, called user-defined metadata, which you assign to an object using key-value pairs. User-defined metadata is stored with the object and is returned when you download the object.',
        },
      ]}
    />
  );

  const Content = () => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('Disabled');
    const [accessList, setAccessList] = useState('first');
    const [predefined, setPredefined] = useState('first');
    const [checked, setChecked] = useState(false);
    const [selectedItems, setSelectedItems] = useState([
      { storageClass: 'Standard' },
    ]);
    const [SSencryption, setSSEncryption] = useState('first');
    const [EncryptionSettings, setEncryptionSettings] = useState('first');
    const [EncryptionKeyType, setEncryptionKeyType] = useState('first');
    const [KMSKey, setKMSKey] = useState('second');
    const [KMS_ARN, setKMS_ARN] = useState('');
    const [bucketKey, setBucketKey] = useState('second');
    const [checkSum, setCheckSum] = useState('first');
    const [tags, setTags] = useState([]);
    const [metadata, setMetadata] = useState([]);

    const fakeDataFetch = (delay) =>
      new Promise<void>((resolve) => setTimeout(() => resolve(), delay));

    const handleSubmit = async () => {
      setLoading(true);
      await fakeDataFetch(2000);
      setStatus('Enabled');
    };

    return (
      <>
        <SpaceBetween size="m">
          <Alert className="alert-bar">
            Drag and drop files and folders you want to upload here, or choose
            Add files, or Add folders.
          </Alert>
          <ObjectsPane
            title="Files and folders "
            desc="All files and folders in this table will be uploaded."
            upload="true"
          />
          <Container header={<Header variant="h2">Destination</Header>}>
            <SpaceBetween size="s">
              <Box variant="awsui-key-label">Destination</Box>
              <Box>
                <Link fontSize="inherit">
                  s3://amplify-awsui-dev-65008-deployment
                </Link>
              </Box>

              <ExpandableSection
                headerText="Destination Details"
                headerDescription="Bucket settings that impact new objects stored in the specified destination."
                variant="footer"
                headerAriaLabel="expanded-section"
                defaultExpanded
              >
                <SpaceBetween size="xl">
                  <ColumnLayout columns={3} variant="text-grid">
                    <div>
                      <SpaceBetween size="xxs">
                        <Box variant="h4">Bucket Versioning</Box>
                        <Box variant="small">
                          <Box>
                            When enabled, multiple variants of an object can be
                            stored in the bucket to easily recover from
                            unintended user actions and application failures.{' '}
                            <Link fontSize="inherit" external>
                              Learn More
                            </Link>
                          </Box>
                        </Box>
                        <Box>
                          <StatusIndicator
                            type={`${
                              status == 'Disabled' ? 'warning' : 'success'
                            }`}
                          >
                            {status}
                          </StatusIndicator>
                        </Box>
                      </SpaceBetween>
                    </div>
                    <div>
                      <SpaceBetween size="xxs">
                        <Box variant="h4">Default encryption key type</Box>
                        <Box variant="small">
                          <Box>
                            If an encryption key isn't specified, bucket
                            settings for default encryption are used to encrypt
                            objects when storing them in Amazon S3.{' '}
                            <Link fontSize="inherit" external>
                              Learn More
                            </Link>
                          </Box>
                        </Box>
                        <Box display="block" variant="strong">
                          Amazon S3-managed keys (SSE-S3)
                        </Box>
                      </SpaceBetween>
                    </div>
                    <div>
                      <SpaceBetween size="xxs">
                        <Box variant="h4">Object Lock</Box>
                        <Box variant="small">
                          <Box>
                            When enabled, objects in this bucket might be
                            prevented from being deleted or overwritten for a
                            fixed amount of time or indefinitely.{' '}
                            <Link fontSize="inherit" external>
                              Learn More
                            </Link>
                          </Box>
                        </Box>
                        <Box display="block" variant="strong">
                          Disabled
                        </Box>
                      </SpaceBetween>
                    </div>
                  </ColumnLayout>
                  {status == 'Disabled' && (
                    <>
                      <Alert
                        type="warning"
                        statusIconAriaLabel="warning"
                        action={
                          <Button onClick={handleSubmit} loading={loading}>
                            Enable Bucket versioning
                          </Button>
                        }
                      >
                        <Box>
                          We recommend that you enable Bucket Versioning to help
                          protect against unintentionally overwriting or
                          deleting objects.{' '}
                          <Link fontSize="inherit" external>
                            Learn More
                          </Link>
                        </Box>
                      </Alert>
                    </>
                  )}
                </SpaceBetween>
              </ExpandableSection>
            </SpaceBetween>
          </Container>
          <ExpandableSection
            variant="container"
            headingTagOverride="h5"
            headerText="Permissions"
            headerAriaLabel="permissions"
            headerDescription={
              <>
                Grant basic read/write permissions to other AWS accounts.{' '}
                <Link fontSize="inherit" external>
                  Learn more
                </Link>
              </>
            }
            key={2}
          >
            <SpaceBetween size="m">
              <Alert>
                AWS recommends using S3 bucket policies or IAM policies for
                access control. <Link external>Learn More</Link>
              </Alert>
              <Box variant="strong">Access control list (ACL)</Box>
              <RadioGroup
                onChange={({ detail }) => setAccessList(detail.value)}
                value={accessList}
                items={[
                  { value: 'first', label: 'Choose from predefined ACLs' },
                  {
                    value: 'second',
                    label: 'Specify individual ACL permissions',
                  },
                ]}
              />
              {accessList == 'second' ? (
                <SpaceBetween size="m">
                  <ColumnLayout columns={3}>
                    <Box>Grantee</Box>
                    <Box>Objects</Box>
                    <Box>Object ACL</Box>
                  </ColumnLayout>
                </SpaceBetween>
              ) : null}
              <Box variant="strong">Predefined ACLs</Box>
              <RadioGroup
                onChange={({ detail }) => setPredefined(detail.value)}
                value={predefined}
                items={[
                  {
                    value: 'first',
                    label: 'Private (recommended)',
                    description:
                      'Only the object owner will have read and write access.',
                  },
                  {
                    value: 'second',
                    label: 'Grant public-read access',
                    description: (
                      <>
                        Anyone in the world will be able to access the specified
                        objects.The object owner will have read and write
                        access.{' '}
                        <Link fontSize="inherit" external>
                          Learn More
                        </Link>
                      </>
                    ),
                  },
                ]}
              />
              {predefined == 'second' ? (
                <SpaceBetween size="xl">
                  <Alert
                    header={
                      <>
                        <Box variant="strong">
                          Granting public-read access is not recommended.
                        </Box>
                        <Box variant="p">
                          {' '}
                          Anyone in the world will be able to access the
                          specified objects.
                          <Link external fontSize="inherit">
                            Learn More
                          </Link>
                        </Box>
                      </>
                    }
                    statusIconAriaLabel="Warning"
                    type="warning"
                  >
                    <SpaceBetween size="xs">
                      <Box></Box>
                      <Checkbox
                        onChange={({ detail }) => setChecked(detail.checked)}
                        checked={checked}
                      >
                        <>
                          I understand the risk of granting public-read access
                          to the specified objects.
                        </>
                      </Checkbox>
                    </SpaceBetween>
                  </Alert>
                </SpaceBetween>
              ) : null}
            </SpaceBetween>
          </ExpandableSection>
          <ExpandableSection
            headerText="Properties"
            variant="container"
            key={'storage-table-section'}
            headerAriaLabel="storage-table"
            headerDescription="Specify storage class, encryption settings, tags, and more."
          >
            <SpaceBetween size="xl">
              <Container
                key="storage-table"
                fitHeight
                header={
                  <Header
                    variant="h3"
                    description={
                      <>
                        Amazon S3 offers a range of storage classes designed for
                        different use cases.
                        <Link external fontSize="inherit">
                          Learn More
                        </Link>{' '}
                        or see{' '}
                        <Link external fontSize="inherit">
                          Amazon S3 pricing
                        </Link>
                      </>
                    }
                  >
                    Storage Class
                  </Header>
                }
              >
                <Table
                  onSelectionChange={({ detail }) =>
                    setSelectedItems(detail.selectedItems)
                  }
                  selectedItems={selectedItems}
                  ariaLabels={{
                    selectionGroupLabel: 'Items selection',
                    allItemsSelectionLabel: ({ selectedItems }) =>
                      `${selectedItems.length} ${
                        selectedItems.length === 1 ? 'item' : 'items'
                      } selected`,
                    itemSelectionLabel: ({ selectedItems }, item) => {
                      const isItemSelected = selectedItems.filter(
                        (i) => i.storageClass === item.storageClass
                      ).length;
                      return `${item.storageClass} is ${
                        isItemSelected ? '' : 'not'
                      } selected`;
                    },
                  }}
                  columnDefinitions={[
                    {
                      id: 'storageClass',
                      header: 'Storage class',
                      cell: (e) => e.storageClass,
                    },
                    {
                      id: 'designed',
                      header: 'Designed for',
                      cell: (e) => e.designed,
                    },
                    {
                      id: 'availabilityZones',
                      header: 'Availability Zones',
                      cell: (e) => e.availabilityZones,
                    },
                    {
                      id: 'duration',
                      header: 'Min storage duration',
                      cell: (e) => e.duration,
                    },
                    {
                      id: 'billableSize',
                      header: 'Min billable object size',
                      cell: (e) => e.billableSize,
                    },
                    {
                      id: 'monitoringFees',
                      header: 'Monitoring and auto-tiering fees',
                      cell: (e) => e.monitoringFees,
                    },
                    {
                      id: 'retrievalFees',
                      header: 'Retrieval fees',
                      cell: (e) => e.retrievalFees,
                    },
                  ]}
                  items={StorageItems}
                  loadingText="Loading resources"
                  selectionType="single"
                  trackBy="storageClass"
                  variant="embedded"
                  stripedRows
                  visibleColumns={[
                    'storageClass',
                    'designed',
                    'availabilityZones',
                    'duration',
                    'billableSize',
                    'monitoringFees',
                    'retrievalFees',
                  ]}
                  empty={
                    <Box textAlign="center" color="inherit">
                      <b>No resources</b>
                      <Box
                        padding={{ bottom: 's' }}
                        variant="p"
                        color="inherit"
                      >
                        No resources to display.
                      </Box>
                      <Button>Create resource</Button>
                    </Box>
                  }
                />
              </Container>
              <Container
                header={
                  <Header
                    variant="h2"
                    description="Server-side encryption protects data at rest."
                    info={
                      <InfoLink
                        onFollow={function (
                          event: CustomEvent<BaseNavigationDetail>
                        ): void {
                          throw new Error('Function not implemented.');
                        }}
                      />
                    }
                  >
                    Server-side encryption
                  </Header>
                }
              >
                <SpaceBetween size="m">
                  <FormField label="Server-side encryption">
                    <RadioGroup
                      onChange={({ detail }) => setSSEncryption(detail.value)}
                      value={SSencryption}
                      items={[
                        {
                          value: 'first',
                          label: 'Do not specify an encryption key',
                          description:
                            'The bucket settings for default encryption are used to encrypt objects when storing them in Amazon S3.',
                        },
                        {
                          value: 'second',
                          label: 'Specify an encryption key',
                          description:
                            'The specified encryption key is used to encrypt objects before storing them in Amazon S3.',
                        },
                      ]}
                    />
                  </FormField>
                  {SSencryption == 'first' && (
                    <Alert statusIconAriaLabel="warning" type="warning">
                      If your bucket policy requires encrypted uploads, you must
                      specify an encryption key or your upload will fail.
                    </Alert>
                  )}
                  {SSencryption == 'second' && (
                    <SpaceBetween size="m">
                      <FormField label="Encryption Settings">
                        <RadioGroup
                          onChange={({ detail }) =>
                            setEncryptionSettings(detail.value)
                          }
                          value={EncryptionSettings}
                          items={[
                            {
                              value: 'first',
                              label:
                                'Use bucket settings for default encryption',
                            },
                            {
                              value: 'second',
                              label:
                                'Override bucket settings for default encryption',
                            },
                          ]}
                        />
                      </FormField>
                      {EncryptionSettings == 'first' && (
                        <FormField label="Encryption key type">
                          <Box>Amazon S3-managed keys (SSE-S3)</Box>
                        </FormField>
                      )}
                      {EncryptionSettings == 'second' && (
                        <FormField label="Encryption key type">
                          <RadioGroup
                            onChange={({ detail }) =>
                              setEncryptionKeyType(detail.value)
                            }
                            value={EncryptionKeyType}
                            items={[
                              {
                                value: 'first',
                                label: 'Amazon S3-managed keys (SSE-S3)',
                              },
                              {
                                value: 'second',
                                label:
                                  'AWS Key Management Service key (SSE-KMS)',
                              },
                            ]}
                          />
                        </FormField>
                      )}
                      {EncryptionKeyType == 'second' && (
                        <>
                          <FormField label="AWS KMS key">
                            <RadioGroup
                              onChange={({ detail }) => setKMSKey(detail.value)}
                              value={KMSKey}
                              items={[
                                {
                                  value: 'first',
                                  label: 'Choose from your AWS KMS keys',
                                },
                                {
                                  value: 'second',
                                  label: 'Enter AWS KMS key ARN',
                                },
                              ]}
                            />
                          </FormField>

                          <SpaceBetween size="m">
                            {KMSKey == 'second' ? (
                              <FormField
                                secondaryControl={
                                  <Button
                                    ariaLabel="Create KMS Key (opens new tab)"
                                    href="https://example.com"
                                    iconAlign="right"
                                    iconName="external"
                                    target="_blank"
                                  >
                                    Create KMS Key
                                  </Button>
                                }
                                constraintText={
                                  <>
                                    <div>{`Format (using key id): arn:aws:kms:<region>:<account-ID>:key/<key-id>`}</div>
                                    <div>{`(using alias): arn:aws:kms:<region>:<account-ID>:alias/<alias-name>`}</div>
                                  </>
                                }
                              >
                                <Input
                                  onChange={({ detail }) =>
                                    setKMS_ARN(detail.value)
                                  }
                                  value={KMS_ARN}
                                  placeholder="arn:aws:kms:<region>:<account-ID>:key/<key-id>"
                                  type="search"
                                />
                              </FormField>
                            ) : (
                              <>
                                <FormField
                                  secondaryControl={
                                    <SpaceBetween
                                      size="m"
                                      direction="horizontal"
                                    >
                                      <Button iconName="refresh" />
                                      <Button
                                        ariaLabel="Create KMS Key (opens new tab)"
                                        href="https://example.com"
                                        iconAlign="right"
                                        iconName="external"
                                        target="_blank"
                                      >
                                        Create KMS Key
                                      </Button>
                                    </SpaceBetween>
                                  }
                                >
                                  <Autosuggest
                                    onChange={({ detail }) =>
                                      setKMSKey(detail.value)
                                    }
                                    value={KMSKey}
                                    options={[
                                      { value: 'Suggestion 1' },
                                      { value: 'Suggestion 2' },
                                      { value: 'Suggestion 3' },
                                      { value: 'Suggestion 4' },
                                    ]}
                                    enteredTextLabel={(value) =>
                                      `Use: "${value}"`
                                    }
                                    ariaLabel="Autosuggest example with suggestions"
                                    placeholder="Enter value"
                                    empty="No matches found"
                                  />
                                </FormField>
                              </>
                            )}
                            <Alert
                              statusIconAriaLabel="info"
                              header="Bucket Key is enabled for objects uploaded, modified, or copied in this bucket"
                            >
                              <div>
                                Uploaded, modified, or copied objects inherit
                                their Bucket Key settings from the bucket
                                default encryption configuration unless they
                                already have Bucket Key configured.{' '}
                                <Link
                                  external
                                  fontSize="inherit"
                                  href="https://www/aws.com"
                                >
                                  {' '}
                                  Learn more
                                </Link>
                              </div>
                            </Alert>
                            <FormField
                              label="Bucket Key"
                              description={
                                <div>
                                  When KMS encryption is used to encrypt new
                                  objects in this bucket, the bucket key reduces
                                  encryption costs by lowering calls to AWS KMS.{' '}
                                  <Link
                                    external
                                    fontSize="inherit"
                                    href="https://www/aws.com"
                                  >
                                    {' '}
                                    Learn more
                                  </Link>
                                </div>
                              }
                            >
                              <RadioGroup
                                onChange={({ detail }) =>
                                  setBucketKey(detail.value)
                                }
                                value={bucketKey}
                                items={[
                                  {
                                    value: 'first',
                                    label: 'Disable',
                                    disabled: true,
                                  },
                                  {
                                    value: 'second',
                                    label: 'Enable',
                                    disabled: true,
                                  },
                                ]}
                              />
                            </FormField>
                          </SpaceBetween>
                        </>
                      )}
                    </SpaceBetween>
                  )}
                </SpaceBetween>
              </Container>

              {/* Additional checksums */}

              <Container
                header={
                  <Header
                    variant="h2"
                    description={
                      <>
                        Checksum functions are used for additional data
                        integrity verification of new objects.
                        <Link external fontSize="inherit">
                          Learn more
                        </Link>
                      </>
                    }
                    info={
                      <InfoLink
                        onFollow={function (
                          event: CustomEvent<BaseNavigationDetail>
                        ): void {
                          throw new Error('Function not implemented.');
                        }}
                      />
                    }
                  >
                    Additional checksums
                  </Header>
                }
              >
                <SpaceBetween size="m">
                  <FormField label="Additional checksums">
                    <RadioGroup
                      onChange={({ detail }) => setCheckSum(detail.value)}
                      value={checkSum}
                      items={[
                        {
                          value: 'first',
                          label: 'Off',
                          description:
                            'Amazon S3 will use a combination of MD5 checksums and Etags to verify data integrity.',
                        },
                        {
                          value: 'second',
                          label: 'On',
                          description:
                            'Specify a checksum function for additional data integrity validation.',
                        },
                      ]}
                    />
                  </FormField>
                </SpaceBetween>
              </Container>

              {/* Tags - optional */}

              <Container
                header={
                  <Header
                    variant="h2"
                    description={
                      <>
                        You can use object tags to analyze, manage, and specify
                        permissions for objects.
                        <Link external fontSize="inherit">
                          Learn more
                        </Link>
                      </>
                    }
                    info={
                      <InfoLink
                        onFollow={function (
                          event: CustomEvent<BaseNavigationDetail>
                        ): void {
                          throw new Error('Function not implemented.');
                        }}
                      />
                    }
                  >
                    Tags - optional
                  </Header>
                }
              >
                <SpaceBetween size="m">
                  <AttributeEditor
                    onAddButtonClick={() => setTags([...tags, {}])}
                    onRemoveButtonClick={({ detail: { itemIndex } }) => {
                      const tmpItems = [...tags];
                      tmpItems.splice(itemIndex, 1);
                      setTags(tmpItems);
                    }}
                    items={tags}
                    addButtonText="Add Tag"
                    definition={[
                      {
                        label: 'Key',
                        control: (item) => (
                          <Input value={item.key} placeholder="Enter key" />
                        ),
                      },
                      {
                        label: 'Value',
                        control: (item) => (
                          <Input value={item.value} placeholder="Enter value" />
                        ),
                      },
                    ]}
                    removeButtonText="Remove"
                    empty="No items associated with the resource."
                  />
                </SpaceBetween>
              </Container>
              {/* Metadata - optional */}

              <Container
                header={
                  <Header
                    variant="h2"
                    description={
                      <>
                        Metadata is optional information provided as a
                        name-value (key-value) pair.
                        <Link external fontSize="inherit">
                          Learn more
                        </Link>
                      </>
                    }
                    info={
                      <InfoLink
                        onFollow={function (
                          event: CustomEvent<BaseNavigationDetail>
                        ): void {
                          throw new Error('Function not implemented.');
                        }}
                      />
                    }
                  >
                    Metadata - optional
                  </Header>
                }
              >
                <SpaceBetween size="m">
                  <AttributeEditor
                    onAddButtonClick={() => setMetadata([...metadata, {}])}
                    onRemoveButtonClick={({ detail: { itemIndex } }) => {
                      const tmpItems = [...metadata];
                      tmpItems.splice(itemIndex, 1);
                      setMetadata(tmpItems);
                    }}
                    items={metadata}
                    addButtonText="Add Metadata"
                    definition={[
                      {
                        label: 'Type',
                        control: (item) => (
                          <Select
                            selectedOption={item.key}
                            onChange={() => null}
                            placeholder="Enter key"
                            options={[
                              { label: 'System defined', value: '1' },
                              { label: 'User defined', value: '2' },
                            ]}
                            selectedAriaLabel="type"
                          />
                        ),
                      },
                      {
                        label: 'Key',
                        control: (item) => (
                          <Select
                            selectedOption={item.key}
                            placeholder="Enter key"
                            options={[
                              { label: 'Option 1', value: '1' },
                              { label: 'Option 2', value: '2' },
                              { label: 'Option 3', value: '3' },
                              { label: 'Option 4', value: '4' },
                              { label: 'Option 5', value: '5' },
                            ]}
                            selectedAriaLabel="key"
                          />
                        ),
                      },
                      {
                        label: 'Value',
                        control: (item) => (
                          <Input value={item.value} placeholder="Enter value" />
                        ),
                      },
                    ]}
                    removeButtonText="Remove"
                    empty="No items associated with the resource."
                  />
                </SpaceBetween>
              </Container>
            </SpaceBetween>
          </ExpandableSection>
          <SpaceBetween size="l" direction="horizontal" className="btn-right">
            <Button onClick={() => navigate(-1)}>Cancel</Button>
            <Button variant="primary">Upload</Button>
          </SpaceBetween>
        </SpaceBetween>
      </>
    );
  };

  const loadHelpPanelContent = (toolsContent) => {
    setToolsOpen(true);
    setToolsContent(toolsContent);
  };

  useEffect(() => {
    document.title = 'S3 Management Console';
  }, [location]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div id="h" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
        <AppHeader {...props} />
      </div>
      <AppLayout
        headerSelector="#h"
        footerSelector="#f"
        breadcrumbs={
          <BreadcrumbGroup
            items={[
              { text: 'Amazon S3', href: '/S3/home' },
              { text: 'Buckets', href: '/S3/buckets' },
              { text: `${id}`, href: `/S3/buckets/${id}` },
              { text: 'Upload', href: 'upload' },
            ]}
          />
        }
        navigation={
          <Navigation
            activeHref={activeHref}
            onFollow={(event) => {
              if (!event.detail.external) {
                event.preventDefault();
                setActiveHref(event.detail.href);
              }
            }}
            items={S3navItems}
            header={S3Header}
          />
        }
        toolsOpen={toolsOpen}
        tools={toolsContent}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        ariaLabels={appLayoutLabels}
        content={
          <Provider store={store}>
            <SpaceBetween size="xxl" direction="vertical">
              <ContentLayout
                header={
                  <DashboardHeader
                    loadHelpPanelContent={loadHelpPanelContent}
                    title="Upload"
                    description={
                      <>
                        Add the files and folders you want to upload to S3. To
                        upload a file larger than 160GB, use the AWS CLI, AWS
                        SDK or Amazon S3 REST API.
                        <Link external fontSize="inherit">
                          {' '}
                          Learn more
                        </Link>
                      </>
                    }
                    info="Buckets are containers for objects stored in Amazon S3. You can store any number of objects in a bucket and can have up to 100 buckets in your account. To request an increase, visit the Service Quotas Console . You can create, configure, empty, and delete buckets. However, you can only delete an empty bucket."
                    ul={[
                      {
                        h5: 'Manage access',
                        text: `Buckets are private and can only be accessed if you explicitly grant permissions. To review the public access settings for your buckets, make sure that you have the required permissions or you'll get an error. Use bucket policies, IAM policies, access control lists (ACLs), and S3 Access Points to manage access.`,
                      },
                      {
                        h5: 'Configure your bucket',
                        text: 'You can configure your bucket to support your use case. For example, host a static website, use S3 Versioning and replication for disaster recovery, S3 Lifecycle to manage storage costs, and logging to track requests.',
                      },
                      {
                        h5: 'Understand storage usage and activity',
                        text: 'The S3 Storage Lens account snapshot displays your total storage, object count, and average object size for all buckets in the account. View your S3 Storage Lens dashboard to analyze your usage and activity trends by AWS Region, storage class, bucket, or prefix.',
                      },
                    ]}
                  />
                }
              />
              <Content />
            </SpaceBetween>
          </Provider>
        }
      />
      <AppFooter />
    </>
  );
}

export default Upload;

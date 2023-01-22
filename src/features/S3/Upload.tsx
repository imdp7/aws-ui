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
    const [status, setStatus] = useState('Disabled');
    const [accessList, setAccessList] = useState('first');
    const [predefined, setPredefined] = useState('first');
    const [checked, setChecked] = useState(false);

    const fakeDataFetch = (delay) =>
      new Promise<void>((resolve) => setTimeout(() => resolve(), delay));

    const handleSubmit = async () => {
      setLoading(false);
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
            headerDescription="Specify storage class, encryption settings, tags, and more."
          >
            <SpaceBetween size="m">
              <Container
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
              ></Container>
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

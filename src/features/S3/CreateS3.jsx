/* eslint-disable react/prop-types */
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppHeader } from '../common/TopNavigations';
import { AppFooter } from '../common/AppFooter';
import {
  AppLayout,
  Container,
  ContentLayout,
  SpaceBetween,
  Autosuggest,
  Spinner,
  Header,
  Checkbox,
  Box,
  Input,
  Select,
  TextFilter,
  Pagination,
  CollectionPreferences,
  Table,
  TagEditor,
  FormField,
  ColumnLayout,
  BreadcrumbGroup,
  S3ResourceSelector,
  Button,
  RadioGroup,
  Tiles,
  Popover,
  StatusIndicator,
  Link,
  Alert,
  Modal,
  Flashbar,
  ExpandableSection,
} from '@cloudscape-design/components';
import {
  Notifications,
  Navigation,
  S3navItems,
  S3Header,
} from '../EC2/commons/common-components';
import { Provider } from 'react-redux';
import { appLayoutLabels, paginationLabels } from '../common/labels';
import { store } from '../../app/store';
import { DashboardHeader, HelpPanels } from '../EC2/components/header';
import { InfoLink } from '../EC2/commons/common-components';

const regions = [
  {
    label: 'North America',
    options: [
      { value: 'US East (N. Virginia) us-east-1' },
      { value: 'US East (N. Virginia) us-east-1' },
      { value: 'US East (N. Virginia) us-east-1' },
      { value: 'US East (N. Virginia) us-east-1' },
    ],
  },
  {
    label: 'Asia Pacific',
    options: [
      { value: 'US East (N. Virginia) us-east-1' },
      { value: 'US East (N. Virginia) us-east-1' },
      { value: 'US East (N. Virginia) us-east-1' },
      { value: 'US East (N. Virginia) us-east-1' },
    ],
  },
];
const Tags = (props) => {
  return (
    <TagEditor
      i18nStrings={{
        keyPlaceholder: 'Enter key',
        valuePlaceholder: 'Enter value',
        addButton: 'Add new tag',
        removeButton: 'Remove',
        undoButton: 'Undo',
        undoPrompt: 'This tag will be removed upon saving changes',
        loading: 'Loading tags that are associated with this resource',
        keyHeader: 'Key',
        valueHeader: 'Value',
        optional: 'optional',
        keySuggestion: 'Custom tag key',
        valueSuggestion: 'Custom tag value',
        emptyTags: 'No tags associated with the resource.',
        tooManyKeysSuggestion: 'You have more keys than can be displayed',
        tooManyValuesSuggestion: 'You have more values than can be displayed',
        keysSuggestionLoading: 'Loading tag keys',
        keysSuggestionError: 'Tag keys could not be retrieved',
        valuesSuggestionLoading: 'Loading tag values',
        valuesSuggestionError: 'Tag values could not be retrieved',
        emptyKeyError: 'You must specify a tag key',
        maxKeyCharLengthError:
          'The maximum number of characters you can use in a tag key is 128.',
        maxValueCharLengthError:
          'The maximum number of characters you can use in a tag value is 256.',
        duplicateKeyError: 'You must specify a unique tag key.',
        invalidKeyError:
          'Invalid key. Keys can only contain Unicode letters, digits, white space and any of the following: _.:/=+@-',
        invalidValueError:
          'Invalid value. Values can only contain Unicode letters, digits, white space and any of the following: _.:/=+@-',
        awsPrefixError: 'Cannot start with aws:',
        tagLimit: (availableTags, tagLimit) =>
          availableTags === tagLimit
            ? 'You can add up to ' + tagLimit + ' tags.'
            : availableTags === 1
            ? 'You can add up to 1 more tag.'
            : 'You can add up to ' + availableTags + ' more tags.',
        tagLimitReached: (tagLimit) =>
          tagLimit === 1
            ? 'You have reached the limit of 1 tag.'
            : 'You have reached the limit of ' + tagLimit + ' tags.',
        tagLimitExceeded: (tagLimit) =>
          tagLimit === 1
            ? 'You have exceeded the limit of 1 tag.'
            : 'You have exceeded the limit of ' + tagLimit + ' tags.',
        enteredKeyLabel: (key) => 'Use "' + key + '"',
        enteredValueLabel: (value) => 'Use "' + value + '"',
      }}
      tags={props.tags}
      onChange={({ detail }) => setTags(detail.tags)}
      keysRequest={() =>
        Promise.resolve([
          'some-existing-key-3',
          'some-existing-key-4',
          'some-existing-key-5',
        ])
      }
      valuesRequest={(key, value) =>
        key
          ? Promise.resolve(['value 1', 'value-2', 'value-3'])
          : Promise.reject()
      }
    />
  );
};
const Content = ({loadHelpPanelContent},props) => {

  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  const [control, setControl] = useState('first');
  const [ACLEnabled, setACLEnabled] = useState('first');
  const [blocked, setBlocked] = React.useState(true);
  const [confirmBlocked, setConfirmBlocked] = React.useState(false);
  const [bucketVersion, setBucketVersion] = useState('first');
  const [tags, setTags] = React.useState([]);
  const [encryptionKey, setEncryptionKey] = useState('first');
  const [bucketKey, setBucketKey] = useState('second');
  const [advance, setAdvance] = useState('first');
  const [advanceConfirm, setAdvanceConfirm] = useState(false);

  return (
    <SpaceBetween size="m">
      <Container header={<Header variant="h2">General configuration</Header>}>
        <SpaceBetween size="xs">
          <FormField
            label="Bucket Name"
            stretch
            constraintText={
              <>
                Bucket name must be globally unique and must not contain spaces
                or uppercase letters.{' '}
                <Link
                  external
                  href="https://aws.amazon.com/"
                  fontSize="inherit"
                >
                  {' '}
                  See rules for bucket naming{' '}
                </Link>
              </>
            }
          >
            <Input
              value={name}
              onChange={(event) => setName(event.detail.value)}
              placeholder="myawsbucket"
            />
          </FormField>

          <FormField label="AWS Region">
            <Autosuggest
              onChange={({ detail }) => setRegion(detail.value)}
              value={region}
              options={regions}
              enteredTextLabel={(value) => `Use: "${value}"`}
              placeholder={region}
              empty="Select available Region"
            />
          </FormField>
          <FormField
            label="Bucket Name"
            description="Only the bucket settings in the following configuration are copied."
          >
            <Button
              onClick={() => (
                <S3ResourceSelector {...s3ResourceSelectorProps} />
              )}
            >
              Choose Bucket
            </Button>
          </FormField>
        </SpaceBetween>
      </Container>
      <Container header={<Header variant="h2" 
      info={
                <InfoLink
                  id="certificate-method-info-link"
                  onFollow={() =>
                    loadHelpPanelContent(
                      <HelpPanels
                        title="Object Ownership"
                        des="You use Object Ownership to disable access control lists (ACLs) and take ownership of every object in your bucket, simplifying access management for data stored in Amazon S3. A majority of modern use cases in Amazon S3 no longer require the use of ACLs, and we recommend that you disable ACLs except in unusual circumstances where you need to control access for each object individually."
                         ul={[
        {
          h5: 'ACLs disabled (Recommended)',
          text: `Bucket owner enforced – Bucket and object ACLs are disabled, and you, as the bucket owner, automatically own and have full control over every object in the bucket. Access control for your bucket and the objects in it is based on policies, such as IAM policies and S3 bucket policies. Objects can be uploaded to your bucket only if they don't specify an ACL or if they use bucket owner full control ACLs.`,
        },
        {
          h5: 'ACLs enabled',
          text: 'Bucket owner preferred – Bucket and object ACLs are accepted and honored. New objects that are uploaded with the bucket-owner-full-control canned ACL are automatically owned by the bucket owner rather than the object writer. Objects uploaded without this canned ACL are owned by the object writer. All other ACL behaviors remain in place. This setting does not affect ownership of existing objects. To require all Amazon S3 PUT operations to include the bucket-owner-full-control canned ACL, add a bucket policy that only allows object uploads using this ACL.',
        },
        {
          text: `Object writer – Objects are owned by the AWS account that uploads them, even if the object writer is in a different account than the bucket owner. You, as the bucket owner, can't use bucket policies to grant access to objects owned by other AWS accounts. The object writer or you, when you receive appropriate permission from the object writer via object ACL, manage access permissions for these objects in object ACLs.`,
        }
      ]}
                      />
                    )
                  }
                  ariaLabel={'Information about SSL/TLS certificate.'}
                />
              }
              > Object Ownership</Header>}>
        <SpaceBetween size="s">
          <Tiles
            onChange={({ detail }) => setControl(detail.value)}
            value={control}
            ariaRequired
            items={[
              {
                value: 'first',
                label: 'ACLs disabled (recommended)',
                description:
                  'All objects in this bucket are owned by this account. Access to this bucket and its objects is specified using only policies.',
              },
              {
                value: 'second',
                label: 'ACLs enabled',
                description:
                  'Objects in this bucket can be owned by other AWS accounts. Access to this bucket and its objects can be specified using ACLs.',
              },
            ]}
          />
          <Box variant="small" fontSize="heading-s" fontWeight="bold">
            Object Ownership
          </Box>
          {control == 'first' && (
            <SpaceBetween size="xs">
              <Box fontSize="heading-s">Bucket owner enforced</Box>
              <Alert
                header="Upcoming permission changes to disable ACLs"
                statusIconAriaLabel="Info"
              >
                <>
                  Starting in April 2023, to disable ACLs when creating buckets
                  by using the S3 console, you will no longer need the
                  s3:PutBucketOwnershipControls permission.{' '}
                  <Link
                    external
                    href="https://aws.amazon.com/"
                    fontSize="inherit"
                  >
                    Learn More
                  </Link>
                </>
              </Alert>
            </SpaceBetween>
          )}
          {control == 'second' && (
            <SpaceBetween size="xs">
              <RadioGroup
                onChange={({ detail }) => setACLEnabled(detail.value)}
                value={ACLEnabled}
                items={[
                  {
                    value: 'first',
                    label: 'Bucket owner preferred',
                    description:
                      'If new objects written to this bucket specify the bucket-owner-full-control canned ACL, they are owned by the bucket owner. Otherwise, they are owned by the object writer.',
                  },
                  {
                    value: 'second',
                    label: 'Object writer',
                    description: 'The object writer remains the object owner.',
                  },
                ]}
              />
              {ACLEnabled == 'first' && (
                <SpaceBetween size="xs">
                  <Alert statusIconAriaLabel="Info">
                    If you want to enforce object ownership for new objects
                    only, your bucket policy must specify that the
                    bucket-owner-full-control canned ACL is required for object
                    uploads.
                  </Alert>
                  <Alert
                    header="Upcoming permission changes to enable ACLs"
                    statusIconAriaLabel="Info"
                  >
                    <>
                      Starting in April 2023, to enable ACLs when creating
                      buckets by using the S3 console, you must have the
                      s3:PutBucketOwnershipControls permission.{' '}
                      <Link
                        external
                        href="https://aws.amazon.com/"
                        fontSize="inherit"
                      >
                        Learn More
                      </Link>
                    </>
                  </Alert>
                </SpaceBetween>
              )}
            </SpaceBetween>
          )}

          {ACLEnabled == 'second' && (
            <SpaceBetween size="xs">
              <Alert
                header="Upcoming permission changes to enable ACLs"
                statusIconAriaLabel="Info"
              >
                <>
                  Starting in April 2023, to enable ACLs when creating buckets
                  by using the S3 console, you must have the
                  s3:PutBucketOwnershipControls permission.{' '}
                  <Link
                    external
                    href="https://aws.amazon.com/"
                    fontSize="inherit"
                  >
                    Learn More
                  </Link>
                </>
              </Alert>
            </SpaceBetween>
          )}
        </SpaceBetween>
      </Container>
      <Container
        header={
          <Header
            variant="h2"
            description={
              <>
                Public access is granted to buckets and objects through access
                control lists (ACLs), bucket policies, access point policies, or
                all. In order to ensure that public access to this bucket and
                its objects is blocked, turn on Block all public access. These
                settings apply only to this bucket and its access points. AWS
                recommends that you turn on Block all public access, but before
                applying any of these settings, ensure that your applications
                will work correctly without public access. If you require some
                level of public access to this bucket or objects within, you can
                customize the individual settings below to suit your specific
                storage use cases.{' '}
                <Link
                  external
                  href="https://aws.amazon.com/"
                  fontSize="inherit"
                >
                  Learn more
                </Link>
              </>
            }
          >
            Block Public Access settings for this bucket
          </Header>
        }
      >
        <SpaceBetween size="m">
          <Checkbox
            onChange={({ detail }) => setBlocked(detail.checked)}
            checked={blocked}
            description="Turning this setting on is the same as turning on all four settings below. Each of the following settings are independent of one another."
          >
            Block all public access
          </Checkbox>
          {blocked == true && (
            <Alert
              header="Turning off block all public access might result in this bucket and the objects within becoming public"
              statusIconAriaLabel="warning"
            >
              <SpaceBetween size="m">
                <>
                  AWS recommends that you turn on block all public access,
                  unless public access is required for specific and verified use
                  cases such as static website hosting.
                </>
                <Checkbox
                  onChange={({ detail }) => setConfirmBlocked(detail.checked)}
                  checked={confirmBlocked}
                >
                  I acknowledge that the current settings might result in this
                  bucket and the objects within becoming public.
                </Checkbox>
              </SpaceBetween>
            </Alert>
          )}
          <Alert
            header="Upcoming permission changes to enable ACLs"
            statusIconAriaLabel="Info"
          >
            <>
              Starting in April 2023, to enable ACLs when creating buckets by
              using the S3 console, you must have the
              s3:PutBucketOwnershipControls permission.{' '}
              <Link external href="https://aws.amazon.com/" fontSize="inherit">
                Learn More
              </Link>
            </>
          </Alert>
        </SpaceBetween>
      </Container>
      {/* Bucket Versioning */}
      <Container
        header={
          <Header
            variant="h2"
            description={
              <>
                Versioning is a means of keeping multiple variants of an object
                in the same bucket. You can use versioning to preserve,
                retrieve, and restore every version of every object stored in
                your Amazon S3 bucket. With versioning, you can easily recover
                from both unintended user actions and application failures.{' '}
                <Link
                  external
                  href="https://aws.amazon.com/"
                  fontSize="inherit"
                >
                  {' '}
                  Learn more
                </Link>
              </>
            }
          >
            Bucket Versioning
          </Header>
        }
      >
        <FormField label="Bucket Versioning">
          <RadioGroup
            onChange={({ detail }) => setBucketVersion(detail.value)}
            value={bucketVersion}
            items={[
              { value: 'first', label: 'Disabled' },
              { value: 'second', label: 'Enabled' },
            ]}
          />
        </FormField>
      </Container>
      {/* Tags Container */}
      <Container
        header={
          <Header
            variant="h2"
            counter="(0)"
            description={
              <>
                You can use bucket tags to track storage costs and organize
                buckets.{' '}
                <Link href="https://aws.amazon.com/" fontSize="inherit">
                  Learn more
                </Link>
              </>
            }
          >
            Tags
          </Header>
        }
      >
        <Tags tags={tags} />
      </Container>

      {/* Default encryption Container */}
      <Container
        header={
          <Header
            variant="h2"
            description={
              <>
                Server-side encryption is automatically applied to new objects
                stored in this bucket.{' '}
                <Link
                  external
                  href="https://aws.amazon.com/"
                  fontSize="inherit"
                >
                  Learn more
                </Link>
              </>
            }
            info={
                <InfoLink
                  id="certificate-method-info-link"
                  onFollow={() =>
                    loadHelpPanelContent(
                      <HelpPanels
                        title="Default encryption"
                        des="The default encryption configuration of an S3 bucket is always enabled and is at a minimum set to server-side encryption with Amazon S3 managed keys (SSE-S3). With server-side encryption, Amazon S3 encrypts an object before saving it to disk and decrypts it when you download the object. Encryption doesn't change the way that you access data as an authorized user. It only further protects your data."
                        info="You can configure default encryption for a bucket. You can use either server-side encryption with Amazon S3 managed keys (SSE-S3) (the default) or server-side encryption with AWS Key Management Service (AWS KMS) keys (SSE-KMS)."
                      />
                    )
                  }
                  ariaLabel={'Information about SSL/TLS certificate.'}
                />
              }
          >
            Default encryption
          </Header>
        }
      >
        <SpaceBetween size="m">
          <FormField 
              label="Encryption key type" 
              info={
                <InfoLink
                  id="certificate-method-info-link"
                  onFollow={() =>
                    loadHelpPanelContent(
                      <HelpPanels
                        title="Encryption key type"
                        des="You can configure default encryption for an Amazon S3 bucket. You can use either server-side encryption with Amazon S3 managed keys (SSE-S3) (the default) or server-side encryption with AWS Key Management Service (AWS KMS) keys (SSE-KMS)."
                        info="With the default option (SSE-S3), Amazon S3 uses one of the strongest block ciphers—256-bit Advanced Encryption Standard (AES-256) to encrypt each object uploaded to the bucket. With SSE-KMS, you have more control over your key. If you use SSE-KMS, you can choose an AWS KMS customer managed key or use the default AWS managed key (aws/s3). SSE-KMS also provides you with an audit trail that shows when your KMS key was used and by whom. "
                      />
                    )
                  }
                  ariaLabel={'Information about SSL/TLS certificate.'}
                />
              }
              >
            <RadioGroup
              onChange={({ detail }) => setEncryptionKey(detail.value)}
              value={encryptionKey}
              items={[
                { value: 'first', label: 'Amazon S3-managed keys (SSE-S3)' },
                {
                  value: 'second',
                  label: 'AWS Key Management Service key (SSE-KMS)',
                },
              ]}
            />
          </FormField>
          <FormField
            label="Bucket Key"
            info={
                <InfoLink
                  id="certificate-method-info-link"
                  onFollow={() =>
                    loadHelpPanelContent(
                      <HelpPanels
                        title="Bucket Key"
                        des="When KMS encryption is used to encrypt new objects in this bucket, the bucket key reduces encryption costs by lowering calls to AWS KMS."
                      />
                    )
                  }
                  ariaLabel={'Information about SSL/TLS certificate.'}
                />
              }
            description={
              <>
                When KMS encryption is used to encrypt new objects in this
                bucket, the bucket key reduces encryption costs by lowering
                calls to AWS KMS.
                <Link
                  external
                  href="https://aws.amazon.com/"
                  fontSize="inherit"
                >
                  {' '}
                  Learn more
                </Link>
              </>
            }
          >
            <RadioGroup
              onChange={({ detail }) => setBucketKey(detail.value)}
              value={bucketKey}
              items={[
                { value: 'first', label: 'Disable' },
                {
                  value: 'second',
                  label: 'Enable',
                },
              ]}
            />
          </FormField>
        </SpaceBetween>
      </Container>
      <ExpandableSection headerText="Advanced Settings" variant="container">
        <SpaceBetween size="m">
          <FormField
            label="Object Lock"
            description={
              <>
                Store objects using a write-once-read-many (WORM) model to help
                you prevent objects from being deleted or overwritten for a
                fixed amount of time or indefinitely.{' '}
                <Link
                  external
                  href="https://aws.amazon.com/"
                  fontSize="inherit"
                >
                  Learn more
                </Link>
              </>
            }
          >
            <RadioGroup
              onChange={({ detail }) => setAdvance(detail.value)}
              value={advance}
              items={[
                { value: 'first', label: 'Disable' },
                {
                  value: 'second',
                  label: 'Enable',
                  description:
                    'Permanently allows objects in this bucket to be locked. Additional Object Lock configuration is required in bucket details after bucket creation to protect objects in this bucket from being deleted or overwritten.',
                },
              ]}
            />
          </FormField>
          <Alert statusIconAriaLabel="info">
            Object Lock works only in versioned buckets. Enabling Object Lock
            automatically enables Bucket Versioning.
          </Alert>
          {advance == 'second' && (
            <SpaceBetween size="m">
              <Alert
                statusIconAriaLabel="warning"
                type="warning"
                header="Enabling Object Lock will permanently allow objects in this bucket to be locked"
              >
                <>
                  Enable Object Lock only if you need to prevent objects from
                  being deleted to have data integrity and regulatory
                  compliance. After you enable this feature, anyone with the
                  appropriate permissions can put immutable objects in the
                  bucket. You might be blocked from deleting the objects and the
                  bucket. Additional Object Lock configuration is required in
                  bucket details after bucket creation to protect objects in
                  this bucket from being deleted or overwritten. Learn more
                </>

                <Checkbox
                  onChange={({ detail }) => setAdvanceConfirm(detail.checked)}
                  checked={advanceConfirm}
                >
                  I acknowledge that enabling Object Lock will permanently allow
                  objects in this bucket to be locked.
                </Checkbox>
              </Alert>
            </SpaceBetween>
          )}
        </SpaceBetween>
      </ExpandableSection>
      <Alert statusIconAriaLabel="info">
        After creating the bucket you can upload files and folders to the
        bucket, and configure additional bucket settings.
      </Alert>
      <SpaceBetween size="l" direction="horizontal" className="btn-right">
        <Button onClick={() => navigate(-1)}>Cancel</Button>
        <Button variant="primary">Create Bucket</Button>
      </SpaceBetween>
    </SpaceBetween>
  );
};

const CreateS3 = (props) => {
  const [loading, setLoading] = useState(false);
  const [activeHref, setActiveHref] = useState('buckets');
  const [toolsOpen, setToolsOpen] = useState(false);
  const [toolsContent, setToolsContent] = useState(
    <HelpPanels
      title="Create bucket"
      info="When you create a bucket, you choose the bucket name and the AWS Region. Bucket names must be globally unique and follow bucket naming rules . After you create a bucket, you can't change the bucket name or Region. Bucket ownership is not transferable. Buckets also can't be transferred between AWS accounts, so be sure that you are in the correct AWS account when you create a bucket."
      des="When you create a bucket, you can configure bucket properties and permissions. You can copy settings from an existing bucket or configure your bucket to support your use case."
      ul={[
        {
          h5: 'Secure your bucket',
          text: `By default, S3 Block Public Access is turned on to prevent public access to your bucket. Unless your use case requires public access, we recommend that you accept the default settings.`,
        },
        {
          h5: 'Disable access control lists (ACLs)',
          text: 'Apply the bucket owner enforced setting for Object Ownership to disable ACLs and take ownership of every object in your bucket, simplifying access management for your data. After you disable ACLs, access control for your data is based on policies.',
        },
        {
          h5: 'Protect your data and meet compliance requirements',
          text: `To prevent accidental changes to critical data, use S3 Versioning and Object Lock. To preserve every version of the objects in your bucket, enable S3 Versioning. If you enable S3 Versioning, use Object Lock to prevent objects from being deleted or overwritten. You can't disable Object Lock after you create your bucket.`,
        },
        {
          h5: 'Track costs',
          text: `Add bucket tags to track your AWS costs at a detailed level.`,
        },
      ]}
    />
  );

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
    <div>
      <div id="h" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
        <AppHeader {...props} />
      </div>
      <AppLayout
        headerSelector="#h"
        footerSelector="#f"
        contentType="table"
        breadcrumbs={
          <BreadcrumbGroup
            items={[
              { text: 'Amazon S3', href: '/S3/home' },
              { text: 'Buckets', href: '/S3/buckets' },
              { text: 'Create Bucket', href: 'create' },
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
            <SpaceBetween size="l">
              <ContentLayout
                header={
                  <DashboardHeader
                    loadHelpPanelContent={loadHelpPanelContent}
                    title="Create Bucket"
                    description={
                      <>
                        Buckets are containers for data stored in S3.{' '}
                        <Link
                          external
                          href="https://aws.amazon.com/"
                          fontSize="inherit"
                        >
                          Learn more
                        </Link>
                      </>
                    }
                    info="When you create a bucket, you choose the bucket name and the AWS Region. Bucket names must be globally unique and follow bucket naming rules . After you create a bucket, you can't change the bucket name or Region. Bucket ownership is not transferable. Buckets also can't be transferred between AWS accounts, so be sure that you are in the correct AWS account when you create a bucket."
                    des="When you create a bucket, you can configure bucket properties and permissions. You can copy settings from an existing bucket or configure your bucket to support your use case."
                    ul={[
                      {
                        h5: 'Secure your bucket',
                        text: `By default, S3 Block Public Access is turned on to prevent public access to your bucket. Unless your use case requires public access, we recommend that you accept the default settings.`,
                      },
                      {
                        h5: 'Disable access control lists (ACLs)',
                        text: 'Apply the bucket owner enforced setting for Object Ownership to disable ACLs and take ownership of every object in your bucket, simplifying access management for your data. After you disable ACLs, access control for your data is based on policies.',
                      },
                      {
                        h5: 'Protect your data and meet compliance requirements',
                        text: `To prevent accidental changes to critical data, use S3 Versioning and Object Lock. To preserve every version of the objects in your bucket, enable S3 Versioning. If you enable S3 Versioning, use Object Lock to prevent objects from being deleted or overwritten. You can't disable Object Lock after you create your bucket.`,
                      },
                      {
                        h5: 'Track costs',
                        text: `Add bucket tags to track your AWS costs at a detailed level.`,
                      },
                    ]}
                  />
                }
              />
              <Content {...props} loadHelpPanelContent={loadHelpPanelContent} />
            </SpaceBetween>
          </Provider>
        }
      />

      <AppFooter />
    </div>
  );
};

export default CreateS3;

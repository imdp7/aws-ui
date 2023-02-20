import React, { useState } from 'react';
import {
  Container,
  Header,
  SpaceBetween,
  Box,
  Link,
  Button,
  FormField,
  Grid,
  Popover,
  Table,
  Alert,
  Textarea,
  StatusIndicator,
  ExpandableSection,
  Checkbox,
} from '@cloudscape-design/components';
import {useNavigate} from 'react-router-dom';

const Overview = () => {
  const [privateAccess, setPrivateAccess] = useState('Objects can be public');

  return (
    <Container header={<Header variant="h2">Permissions Overview</Header>}>
      <SpaceBetween size="xs" direction="vertical">
        <Box fontSize="heading-s" color="text-body-secondary">
          Access
        </Box>
        <Box fontSize="heading-s" color="text-label">
          <Popover
            header={
              privateAccess == 'Objects can be public'
                ? 'Objects can be public'
                : 'Bucket and objects not public'
            }
            size="medium"
            triggerType="text"
            content={
              <>
                {privateAccess !== 'Objects can be public' ? (
                  'The bucket and objects do not have any public access. Note that this does not evaluate if public access is granted using a Multi-region Access Point.'
                ) : (
                  <div>
                    <div>
                      The bucket is not public but anyone with appropriate
                      permissions can grant public access to objects.
                    </div>
                    <div>
                      You can enable Block Public Access to prevent public
                      access to your objects. <Link external>Learn More</Link>
                    </div>
                  </div>
                )}
              </>
            }
            renderWithPortal={true}
            dismissAriaLabel="Close"
          >
            <Box
              color="text-status-info"
              fontSize="body-s"
              fontWeight="bold"
              data-testid="new-feature-announcement-trigger"
            >
              {privateAccess}
            </Box>
          </Popover>
        </Box>
      </SpaceBetween>
    </Container>
  );
};

const BucketSettings = () => {
	const navigate = useNavigate();

  const [indicator, setIndicator] = useState('Off');
  const [blockedFirst, setBlockedFirst] = useState(false);
  const [blockedSecond, setBlockedSecond] = useState(false);
  const [blockedThird, setBlockedThird] = useState(false);
  const [blockedFourth, setBlockedFourth] = useState(false);

  return (
    <Container
      header={
        <Header
          variant="h2"
          description={
            <>
              Public access is granted to buckets and objects through access
              control lists (ACLs), bucket policies, access point policies, or
              all. In order to ensure that public access to all your S3 buckets
              and objects is blocked, turn on Block all public access. These
              settings apply only to this bucket and its access points. AWS
              recommends that you turn on Block all public access, but before
              applying any of these settings, ensure that your applications will
              work correctly without public access. If you require some level of
              public access to your buckets or objects within, you can customize
              the individual settings below to suit your specific storage use
              cases.{' '}
              <Link external fontSize="inherit">
                Learn more
              </Link>
            </>
          }
          actions={<Button 
          onClick={() =>
                navigate('permissions/bpa/edit', {
                  state: {
                    name: 'Edit Block public access (bucket settings)',
                    head: 'Block public access (bucket settings)',
                    description: 'Public access is granted to buckets and objects through access control lists (ACLs), bucket policies, access point policies, or all. In order to ensure that public access to all your S3 buckets and objects is blocked, turn on Block all public access. These settings apply only to this bucket and its access points. AWS recommends that you turn on Block all public access, but before applying any of these settings, ensure that your applications will work correctly without public access. If you require some level of public access to your buckets or objects within, you can customize the individual settings below to suit your specific storage use cases.',
                    info: `By default, new buckets, access points, and objects don't allow public access. However, you can modify bucket policies, access point policies, or object permissions to allow public access. S3 Block Public Access settings override these policies and permissions so that you can limit public access to these resources.`,
                  },
                })
              }
              >
              Edit
              </Button>
            }
        >
          Block public access (bucket settings)
        </Header>
      }
    >
      <SpaceBetween size="m">
        <SpaceBetween size="xs" direction="vertical">
          <FormField info={<Link>Info</Link>} label="Block all public access">
            <div>
              <StatusIndicator type={indicator === 'Off' ? 'error' : 'success'}>
                {indicator}
              </StatusIndicator>
            </div>
          </FormField>
        </SpaceBetween>
        <SpaceBetween size="xxs">
          <ExpandableSection
            variant="footer"
            headerText="Individual Block Public Access settings for this bucket"
          >
            <>
              <div className="dash">
                <Checkbox
                  onChange={({ detail }) => setBlockedFirst(detail.checked)}
                  checked={blockedFirst}
                  disabled={!blockedFirst}
                  description="S3 will block public access permissions applied to newly added buckets or objects, and prevent the creation of new public access ACLs for existing buckets and objects. This setting doesn’t change any existing permissions that allow public access to S3 resources using ACLs."
                >
                  Block public access to buckets and objects granted through new
                  access control lists (ACLs)
                </Checkbox>
              </div>
              <div className="dash">
                <Checkbox
                  onChange={({ detail }) => {
                    setBlockedSecond(detail.checked);
                  }}
                  checked={blockedSecond}
                  disabled={!blockedSecond}
                  description="TS3 will ignore all ACLs that grant public access to buckets and objects."
                >
                  Block public access to buckets and objects granted through any
                  access control lists (ACLs)
                </Checkbox>
              </div>
              <div className="dash">
                <Checkbox
                  onChange={({ detail }) => setBlockedThird(detail.checked)}
                  checked={blockedThird}
                  disabled={!blockedThird}
                  description="S3 will block new bucket and access point policies that grant public access to buckets and objects. This setting doesn't change any existing policies that allow public access to S3 resources."
                >
                  Block public access to buckets and objects granted through new
                  public bucket or access point policies
                </Checkbox>
              </div>
              <div className="dash">
                <Checkbox
                  onChange={({ detail }) => setBlockedFourth(detail.checked)}
                  checked={blockedFourth}
                  disabled={!blockedFourth}
                  description="S3 will ignore public and cross-account access for buckets or access points with policies that grant public access to buckets and objects."
                >
                  Block public and cross-account access to buckets and objects
                  through any public bucket or access point policies
                </Checkbox>
              </div>
            </>
          </ExpandableSection>
        </SpaceBetween>
      </SpaceBetween>
    </Container>
  );
};

const BucketPolicy = () => {

  const [value, setValue] = useState('');

  return (
    <Container
      header={
        <Header
          variant="h2"
          description={
            <>
              The bucket policy, written in JSON, provides access to the objects
              stored in the bucket. Bucket policies don't apply to objects owned
              by other accounts.{' '}
              <Link external fontSize="inherit">
                Learn more
              </Link>
            </>
          }
          actions={
            <SpaceBetween size="m" direction="horizontal">
              <Button>
              Edit
              </Button>
              <Button disabled>Delete</Button>
            </SpaceBetween>
          }
        >
          Bucket Policy
        </Header>
      }
    >
      <Grid
        gridDefinition={[
          { colspan: { default: 3, xxs: 10 } },
          { colspan: { default: 9, xxs: 2 } },
        ]}
      >
        <Textarea
          onChange={({ detail }) => setValue(detail.value)}
          value={value}
          placeholder="No policy to Display"
          rows={15}
        />
        <Button disabled={value.length == 0} iconName="copy">
          Copy
        </Button>
      </Grid>
    </Container>
  );
};

const Ownership = () => {
	const navigate = useNavigate();
  return (
    <Container
      header={
        <Header 
        variant="h2" 
        description="Control ownership of objects written to this bucket from other AWS accounts and the use of access control lists (ACLs). Object ownership determines who can specify access to objects."
        info={<Link>Info</Link>}
        actions={<Button 
         onClick={() =>
                navigate('permissions/oo/edit', {
                  state: {
                    name: 'Edit Object Ownership',
                    head: 'Object Ownership',
                    description: 'Control ownership of objects written to this bucket from other AWS accounts and the use of access control lists (ACLs). Object ownership determines who can specify access to objects.',
                    info: `You use Object Ownership to disable access control lists (ACLs) and take ownership of every object in your bucket, simplifying access management for data stored in Amazon S3. A majority of modern use cases in Amazon S3 no longer require the use of ACLs, and we recommend that you disable ACLs except in unusual circumstances where you need to control access for each object individually.`,
                  },
                })
              }
              >
              Edit
              </Button>
            }
        >
          Object Ownership
        </Header>
      }
    >
      <SpaceBetween size="xs" direction="vertical">
        <Box fontSize="heading-s" color="text-body-secondary">
          Object Ownership
        </Box>
        <Box fontSize="heading-s" color="text-label">
          Object writer
        </Box>
        <Box fontSize="body-m" color="text-body-secondary" fontWeight="normal">
          ACLs are disabled. All objects in this bucket are owned by this
          account. Access to this bucket and its objects is specified using only
          policies.
        </Box>
      </SpaceBetween>
    </Container>
  );
};

const ACL = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const columnDefinitions = [
    {
      id: 'grantee',
      header: 'Grantee',
      cell: (e) => e.grantee,
      width: 250,
      minWidth: 220,
    },
    {
      id: 'objects',
      header: 'Objects',
      cell: (e) => e.objects,
      width: 80,
      minWidth: 50,
    },
    {
      id: 'bucketACL',
      header: 'Bucket ACL',
      cell: (e) => e.bucketACL,
      width: 80,
      minWidth: 50,
    },
  ];

  const items = [
    {
      grantee: 'Bucket owner (your AWS account)',
      description: 'Canonical ID:',
      objects: 'List, Write',
      bucketACL: 'Read, Write',
    },
    {
      grantee: 'Everyone (public access)',
      description: 'Group:',
      objects: '-',
      bucketACL: '-',
    },
    {
      grantee: 'Authenticated users group (anyone with an AWS account)',
      description: 'Group:',
      objects: '-',
      bucketACL: '-',
    },
    {
      grantee: 'S3 log delivery group',
      description: 'Group:',
      objects: '-',
      bucketACL: '-',
    },
  ];

  return (
    <Container
      header={
        <Header
          variant="h2"
          description={
            <>
              Grant basic read/write permissions to other AWS accounts.{' '}
              <Link external fontSize="inherit">
                Learn more
              </Link>
            </>
          }
          actions={
            <SpaceBetween size="m" direction="horizontal">
              <Button>Edit</Button>
            </SpaceBetween>
          }
        >
          Access control list (ACL)
        </Header>
      }
    >
      <SpaceBetween size="m">
        <Alert
          statusIconAriaLabel="info"
          header="The console displays combined access grants for duplicate grantees"
        >
          To see the full list of ACLs, use the Amazon S3 REST API, AWS CLI, or
          AWS SDKs.
        </Alert>
        <Table
          onChange={({ detail }) => setSelectedItems(detail.value)}
          items={items}
          columnDefinitions={columnDefinitions}
          loadingText="Loading Resources"
          visibleColumns={['grantee', 'objects', 'bucketACL']}
          empty={
            <Box textAlign="center" color="inherit">
              <b>No data events</b>
              <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                No data evenets to display.
              </Box>
              <Button
                ariaLabel="Configure in CloudTrail"
                href="https://www.aws.com"
                iconAlign="right"
                iconName="external"
                target="_blank"
              >
                Configure in CloudTrail
              </Button>
            </Box>
          }
        />
      </SpaceBetween>
    </Container>
  );
};

const CORS = () => {
  const [value, setValue] = useState('');

  return (
    <Container
      header={
        <Header
          variant="h2"
          description={
            <>
              The CORS configuration, written in JSON, defines a way for client
              web applications that are loaded in one domain to interact with
              resources in a different domain.{' '}
              <Link external fontSize="inherit">
                Learn more
              </Link>
            </>
          }
          actions={
            <SpaceBetween size="m" direction="horizontal">
              <Button>Edit</Button>
            </SpaceBetween>
          }
        >
          Cross-origin resource sharing (CORS)
        </Header>
      }
    >
      <Grid
        gridDefinition={[
          { colspan: { default: 3, xxs: 10 } },
          { colspan: { default: 9, xxs: 2 } },
        ]}
      >
        <Textarea
          onChange={({ detail }) => setValue(detail.value)}
          value={value}
          placeholder="No configurations to Display"
          rows={15}
        />
        <Button disabled={value.length == 0} iconName="copy">
          Copy
        </Button>
      </Grid>
    </Container>
  );
};

const Permissions = ({ id }) => {
  return (
    <div>
      <SpaceBetween size="m">
        <Overview />
        <BucketSettings />
        <BucketPolicy />
        <Ownership />
        <ACL />
        <CORS />
      </SpaceBetween>
    </div>
  );
};

export default Permissions;

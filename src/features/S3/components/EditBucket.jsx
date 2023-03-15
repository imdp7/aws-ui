import React, { useRef, useState, useEffect } from 'react';
import {
  SpaceBetween,
  Link,
  Header,
  Container,
  ContentLayout,
  AppLayout,
  BreadcrumbGroup,
  Flashbar,
  Spinner,
  Alert,
  Button,
  Checkbox,
  Box,
  Tiles,
  RadioGroup,
  TagEditor,
  FormField,
  Autosuggest,
  S3ResourceSelector,
} from '@cloudscape-design/components';
import { AppHeader } from '../../common/TopNavigations';
import { AppFooter } from '../../common/AppFooter';
import { Provider } from 'react-redux';
import { appLayoutLabels, paginationLabels } from '../../common/labels';
import { store } from '../../../app/store';
import { DashboardHeader, HelpPanels } from '../../EC2/components/header';
import BUCKETS from '../../resources/s3Bucket';
import {
  Notifications,
  Navigation,
  S3navItems,
  S3Header,
} from '../../EC2/commons/common-components';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const Content = ({ loadHelpPanelContent, state, info, subInfo, id }) => {
  const navigate = useNavigate();

  const Versioning = () => {
    const [value, setValue] = useState('first');
    const [loading, setLoading] = useState(false);

    const handleRefresh = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate(-1);
      }, 1500);
    };
    return (
      <SpaceBetween size="s">
        <FormField label="Bucket Versioning">
          <RadioGroup
            onChange={({ detail }) => setValue(detail.value)}
            value={value}
            items={[
              {
                value: 'first',
                label: 'Suspend',
                description:
                  'This suspends the creation of object versions for all operations but preserves any existing object versions.',
              },
              { value: 'second', label: 'Enable' },
            ]}
          />
        </FormField>
        <SpaceBetween size="xxs">
          <FormField
            label="Multi-factor authentication (MFA) delete"
            description={
              <>
                An additional layer of security that requires multi-factor
                authentication for changing Bucket Versioning settings and
                permanently deleting object versions. To modify MFA delete
                settings, use the AWS CLI, AWS SDK, or the Amazon S3 REST API.{' '}
                <Link external fontSize="inherit">
                  Learn more
                </Link>
              </>
            }
          >
            <Box variant="p">Disabled</Box>
          </FormField>
        </SpaceBetween>
        <SpaceBetween size="l" direction="horizontal" className="btn-right">
          <Button onClick={() => navigate(-1)}>Cancel</Button>
          <Button variant="primary" onClick={handleRefresh} loading={loading}>
            Save changes
          </Button>
        </SpaceBetween>
      </SpaceBetween>
    );
  };

  const Tags = () => {
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleRefresh = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate(-1);
      }, 1500);
    };
    return (
      <SpaceBetween size="s">
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
            tooManyValuesSuggestion:
              'You have more values than can be displayed',
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
          tags={tags}
          onChange={({ detail }) => setTags(detail.tags)}
        />
        <SpaceBetween size="l" direction="horizontal" className="btn-right">
          <Button onClick={() => navigate(-1)}>Cancel</Button>
          <Button variant="primary" onClick={handleRefresh} loading={loading}>
            Save changes
          </Button>
        </SpaceBetween>
      </SpaceBetween>
    );
  };

  const Encryption = () => {
    const [encryptionKey, setEncryptionKey] = useState('first');
    const [bucketKey, setBucketKey] = useState('second');
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRefresh = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate(-1);
      }, 1500);
    };

    return (
      <SpaceBetween size="s">
        <FormField label="Encryption key type" info={<Link>Info</Link>}>
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
        {encryptionKey == 'second' && (
          <SpaceBetween size="m" direction="horizontal">
            <FormField
              label="AWS KMS key ARN"
              constraintText="Format (using key id): arn:aws:kms:<region>:<account-ID>:key/<key-id>
              (using alias): arn:aws:kms:<region>:<account-ID>:alias/<alias-name>"
              secondaryControl={
                <Button iconName="external" iconAlign="right">
                  Create a KMS Key
                </Button>
              }
            >
              <Autosuggest
                onChange={({ detail }) => setValue(detail.value)}
                value={value}
                options={[]}
                enteredTextLabel={(value) => `Use: "${value}"`}
                ariaLabel="arn:aws:kms:<region>:<account-ID>:key/<key-id>"
                placeholder="arn:aws:kms:<region>:<account-ID>:key/<key-id>"
                empty="No matches found"
              />
            </FormField>
          </SpaceBetween>
        )}
        <SpaceBetween size="xxs">
          <FormField
            label="Bucket Key"
            description="When KMS encryption is used to encrypt new objects in this bucket, the bucket key reduces encryption costs by lowering calls to AWS KMS."
          >
            <RadioGroup
              onChange={({ detail }) => setBucketKey(detail.value)}
              value={bucketKey}
              items={[
                { value: 'first', label: 'Disable' },
                { value: 'second', label: 'Enable' },
              ]}
            />
          </FormField>
        </SpaceBetween>
        <SpaceBetween size="l" direction="horizontal" className="btn-right">
          <Button onClick={() => navigate(-1)}>Cancel</Button>
          <Button variant="primary" onClick={handleRefresh} loading={loading}>
            Save changes
          </Button>
        </SpaceBetween>
      </SpaceBetween>
    );
  };

  const Logging = () => {
    const [logging, setLogging] = useState('first');
    const [resource, setResource] = useState({
      uri: '',
    });
    const [loading, setLoading] = useState(false);

    const handleRefresh = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate(-1);
      }, 1500);
    };

    return (
      <SpaceBetween size="s">
        <FormField label="Server access logging" info={<Link>Info</Link>}>
          <RadioGroup
            onChange={({ detail }) => setLogging(detail.value)}
            value={logging}
            items={[
              { value: 'first', label: 'Disable' },
              {
                value: 'second',
                label: 'Enable',
              },
            ]}
          />
        </FormField>
        {logging == 'second' && (
          <SpaceBetween size="m">
            <Alert
              header="Bucket policy will be updated"
              statusIconAriaLabel="info"
              type="warning"
            >
              When you enable server access logging, the S3 console
              automatically updates your bucket policy to include access to the
              S3 log delivery group.
            </Alert>
            <FormField
              label="Target bucket"
              constraintText="Format: s3://bucket/prefix"
            >
              <S3ResourceSelector
                onChange={({ detail }) => setResource(detail.resource)}
                resource={resource}
                objectsIsItemDisabled={(item) => item.IsFolder}
                loading={loading}
                fetchBuckets={
                  () =>
                    Promise.resolve([
                      {
                        Name: 'bucket-fugiat',
                        CreationDate: 'December 27, 2019, 22:16:38 (UTC+01:00)',
                        Region: 'Middle East (Bahrain) me-south-1',
                      },
                      {
                        Name: 'bucket-ut',
                        CreationDate: 'July 06, 2019, 12:41:19 (UTC+02:00)',
                        Region: 'US East (N. Virginia) us-east-1',
                      },
                      {
                        Name: 'bucket-veniam',
                        CreationDate: 'June 13, 2019, 18:32:38 (UTC+02:00)',
                        Region: 'US East (N. Virginia) us-east-1',
                      },
                    ])
                  //   BUCKETS.forEach((item) => [
                  //     {
                  //       Name: item.name,
                  //       createdAt: item.createdAt,
                  //       region: item.region,
                  //     },
                  //   ])
                }
                fetchObjects={() =>
                  Promise.resolve([
                    { Key: 'archive-2019', IsFolder: true },
                    { Key: 'archive-2020', IsFolder: true },
                    {
                      Key: 'black-hole-5ns.zip',
                      LastModified: 'August 03, 2019, 19:26:58 (UTC+02:00)',
                      Size: 66477663816,
                      IsFolder: false,
                    },
                    {
                      Key: 'electron-8h.zip',
                      LastModified: 'November 06, 2019, 14:00:40 (UTC+01:00)',
                      Size: 96909820974,
                      IsFolder: false,
                    },
                    {
                      Key: 'galaxy-11s.zip',
                      LastModified: 'September 01, 2019, 14:55:50 (UTC+02:00)',
                      Size: 71745423926,
                      IsFolder: false,
                    },
                  ])
                }
                i18nStrings={{
                  inContextInputPlaceholder: 's3://bucket/prefix/object',
                  inContextSelectPlaceholder: 'Choose a version',
                  inContextBrowseButton: 'Browse S3',
                  inContextLoadingText: 'Loading resource',
                  inContextUriLabel: 'S3 URI',
                  inContextVersionSelectLabel: 'Object version',
                  modalTitle: 'Choose an archive in S3',
                  modalCancelButton: 'Cancel',
                  modalSubmitButton: 'Choose',
                  modalBreadcrumbRootItem: 'S3 buckets',
                  selectionBuckets: 'Buckets',
                  selectionObjects: 'Objects',
                  selectionBucketsSearchPlaceholder: 'Find bucket',
                  selectionObjectsSearchPlaceholder: 'Find object by prefix',
                  selectionBucketsLoading: 'Loading buckets',
                  selectionBucketsNoItems: 'No buckets',
                  selectionObjectsLoading: 'Loading objects',
                  selectionObjectsNoItems: 'No objects',
                  filteringCounterText: (count) =>
                    '' + count + (count === 1 ? ' match' : ' matches'),
                  filteringNoMatches: 'No matches',
                  filteringCantFindMatch: "We can't find a match.",
                  clearFilterButtonText: 'Clear filter',
                  columnBucketID: 'ID',
                  columnBucketName: 'Name',
                  columnBucketCreationDate: 'Creation date',
                  columnBucketRegion: 'Region',
                  columnBucketAccess: 'Access',
                  columnObjectID: 'ID',
                  columnObjectKey: 'Key',
                  columnObjectLastModified: 'Last modified',
                  columnObjectSize: 'Size',
                  columnVersionID: 'Version ID',
                  columnVersionLastModified: 'Last modified',
                  columnVersionSize: 'Size',
                  validationPathMustBegin: 'The path must begin with s3://',
                  validationBucketLowerCase:
                    'The bucket name must start with a lowercase character or number.',
                  validationBucketMustNotContain:
                    'The bucket name must not contain uppercase characters.',
                  validationBucketMustComplyDns:
                    'The bucket name must comply with DNS naming conventions',
                  validationBucketLength:
                    'The bucket name must be from 3 to 63 characters.',
                  labelSortedDescending: (columnName) =>
                    columnName + ', sorted descending',
                  labelSortedAscending: (columnName) =>
                    columnName + ', sorted ascending',
                  labelNotSorted: (columnName) => columnName + ', not sorted',
                  labelsPagination: {
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: (pageNumber) =>
                      'Page ' + pageNumber + ' of all pages',
                  },
                  labelsBucketsSelection: {
                    itemSelectionLabel: (data, item) => item.Name,
                    selectionGroupLabel: 'Buckets',
                  },
                  labelsObjectsSelection: {
                    itemSelectionLabel: (data, item) => item.Key,
                    selectionGroupLabel: 'Objects',
                  },
                  labelsVersionsSelection: {
                    itemSelectionLabel: (data, item) => item.CreationDate,
                    selectionGroupLabel: 'Versions',
                  },
                  labelFiltering: (itemsType) => 'Find ' + itemsType,
                  labelRefresh: 'Refresh the data',
                  labelAlertDismiss: 'Dismiss the alert',
                  labelModalDismiss: 'Dismiss the modal',
                  labelBreadcrumbs: 'S3 navigation',
                }}
                bucketsVisibleColumns={['Name', 'Region', 'CreationDate']}
                selectableItemsTypes={['buckets', 'objects']}
              />
            </FormField>
          </SpaceBetween>
        )}
        <SpaceBetween size="l" direction="horizontal" className="btn-right">
          <Button onClick={() => navigate(-1)}>Cancel</Button>
          <Button variant="primary" onClick={handleRefresh} loading={loading}>
            Save changes
          </Button>
        </SpaceBetween>
      </SpaceBetween>
    );
  };

  const EventBridge = () => {
    const [notification, setNotification] = useState('first');
    const [loading, setLoading] = useState(false);

    const handleRefresh = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate(-1);
      }, 1500);
    };

    return (
      <SpaceBetween size="s">
        <FormField
          label="Send notifications to Amazon EventBridge for all events in this bucket"
          info={<Link>Info</Link>}
        >
          <RadioGroup
            onChange={({ detail }) => setNotification(detail.value)}
            value={notification}
            items={[
              { value: 'first', label: 'Off' },
              {
                value: 'second',
                label: 'On',
              },
            ]}
          />
        </FormField>
        <SpaceBetween size="l" direction="horizontal" className="btn-right">
          <Button onClick={() => navigate(-1)}>Cancel</Button>
          <Button variant="primary" onClick={handleRefresh} loading={loading}>
            Save changes
          </Button>
        </SpaceBetween>
      </SpaceBetween>
    );
  };

  const Acceleration = () => {
    const [acceleration, setAcceleration] = useState('first');
    const [loading, setLoading] = useState(false);

    const handleRefresh = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate(-1);
      }, 1500);
    };

    return (
      <SpaceBetween size="s">
        <FormField label="Transfer acceleration" info={<Link>Info</Link>}>
          <RadioGroup
            onChange={({ detail }) => setAcceleration(detail.value)}
            value={acceleration}
            items={[
              { value: 'first', label: 'Disable' },
              {
                value: 'second',
                label: 'Enable',
              },
            ]}
          />
        </FormField>
        <SpaceBetween size="l" direction="horizontal" className="btn-right">
          <Button onClick={() => navigate(-1)}>Cancel</Button>
          <Button variant="primary" onClick={handleRefresh} loading={loading}>
            Save changes
          </Button>
        </SpaceBetween>
      </SpaceBetween>
    );
  };

  const Requester = () => {
    const [pays, setPays] = useState('first');
    const [loading, setLoading] = useState(false);

    const handleRefresh = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate(-1);
      }, 1500);
    };

    return (
      <SpaceBetween size="s">
        <FormField label="Requester pays" info={<Link>Info</Link>}>
          <RadioGroup
            onChange={({ detail }) => setPays(detail.value)}
            value={pays}
            items={[
              {
                value: 'first',
                label: 'Disable',
                description:
                  'Bucket owner pays the cost of data requests and downloads from this bucket.',
              },
              {
                value: 'second',
                label: 'Enable',
                description:
                  'Requester will pay for requests and data transfer. While requester pays is enabled, anonymous access to this bucket is disabled.',
              },
            ]}
          />
        </FormField>
        <SpaceBetween size="l" direction="horizontal" className="btn-right">
          <Button onClick={() => navigate(-1)}>Cancel</Button>
          <Button variant="primary" onClick={handleRefresh} loading={loading}>
            Save changes
          </Button>
        </SpaceBetween>
      </SpaceBetween>
    );
  };

  const Website = () => {
    const [hosting, setHosting] = useState('first');
    const [loading, setLoading] = useState(false);

    const handleRefresh = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate(-1);
      }, 1500);
    };

    return (
      <SpaceBetween size="s">
        <FormField label="Static website hosting" info={<Link>Info</Link>}>
          <RadioGroup
            onChange={({ detail }) => setHosting(detail.value)}
            value={hosting}
            items={[
              { value: 'first', label: 'Disable' },
              {
                value: 'second',
                label: 'Enable',
              },
            ]}
          />
        </FormField>
        <SpaceBetween size="l" direction="horizontal" className="btn-right">
          <Button onClick={() => navigate(-1)}>Cancel</Button>
          <Button variant="primary" onClick={handleRefresh} loading={loading}>
            Save changes
          </Button>
        </SpaceBetween>
      </SpaceBetween>
    );
  };

  const Ownership = () => {
    const [ACL, setACL] = useState('first');
    const [acknowledge, setAcknowledge] = useState(false);
    const [ownership, setOwnership] = useState('owner');
    const [loading, setLoading] = useState(false);

    const handleRefresh = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate(-1);
      }, 1500);
    };

    return (
      <SpaceBetween size="s">
        <FormField label="Object Ownership" info={<Link>Info</Link>}>
          <Tiles
            onChange={({ detail }) => setACL(detail.value)}
            value={ACL}
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
        </FormField>
        {ACL == 'first' ? (
          <FormField label="Object Ownership">
            <Box variant="p" fontSize="heading-s">
              Bucket owner enforced
            </Box>
          </FormField>
        ) : (
          <SpaceBetween size="s">
            <Alert
              type="warning"
              header="Enabling ACLs turns off the bucket owner enforced setting for Object Ownership"
            >
              <SpaceBetween size="m">
                Once the bucket owner enforced setting is turned off, access
                control lists (ACLs) and their associated permissions are
                restored. Access to objects that you do not own will be based on
                ACLs and not the bucket policy.
                <Checkbox
                  checked={acknowledge}
                  onChange={({ detail }) => setAcknowledge(detail.checked)}
                >
                  I acknowledge that ACLs will be restored.
                </Checkbox>
              </SpaceBetween>
            </Alert>
            <FormField label="Object Ownership">
              <RadioGroup
                onChange={({ detail }) => setOwnership(detail.value)}
                value={ownership}
                items={[
                  {
                    value: 'owner',
                    label: 'Bucket owner preferred',
                    description:
                      'If new objects written to this bucket specify the bucket-owner-full-control canned ACL, they are owned by the bucket owner. Otherwise, they are owned by the object writer.',
                  },
                  {
                    value: 'writer',
                    label: 'Object writer',
                    description: 'The object writer remains the object owner.',
                  },
                ]}
              />
            </FormField>
            {ownership === 'owner' && (
              <Alert type="info">
                <>
                  If you want to enforce object ownership for new objects only,
                  your bucket policy must specify that the
                  bucket-owner-full-control canned ACL is required for object
                  uploads.{' '}
                  <Link external fontSize="inherit">
                    Learn more
                  </Link>
                </>
              </Alert>
            )}
          </SpaceBetween>
        )}
        <SpaceBetween size="l" direction="horizontal" className="btn-right">
          <Button onClick={() => navigate(-1)}>Cancel</Button>
          <Button variant="primary" onClick={handleRefresh} loading={loading}>
            Save changes
          </Button>
        </SpaceBetween>
      </SpaceBetween>
    );
  };

  const BucketSettings = () => {
    const [blockedAll, setBlockedAll] = useState(true);
    const [blockedFirst, setBlockedFirst] = useState(false);
    const [blockedSecond, setBlockedSecond] = useState(false);
    const [blockedThird, setBlockedThird] = useState(false);
    const [blockedFourth, setBlockedFourth] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleRefresh = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate(-1);
      }, 1500);
    };

    return (
      <SpaceBetween size="m">
        <Checkbox
          onChange={({ detail }) => setBlockedAll(detail.checked)}
          checked={blockedAll}
          description="Turning this setting on is the same as turning on all four settings below. Each of the following settings are independent of one another."
        >
          Block all public access
        </Checkbox>
        <div className="divider">
          <>
            <div className="dash">
              <Checkbox
                onChange={({ detail }) => setBlockedFirst(detail.checked)}
                checked={blockedFirst || blockedAll}
                disabled={blockedAll}
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
                checked={blockedSecond || blockedAll}
                disabled={blockedAll}
                description="TS3 will ignore all ACLs that grant public access to buckets and objects."
              >
                Block public access to buckets and objects granted through any
                access control lists (ACLs)
              </Checkbox>
            </div>
            <div className="dash">
              <Checkbox
                onChange={({ detail }) => setBlockedThird(detail.checked)}
                checked={blockedThird || blockedAll}
                disabled={blockedAll}
                description="S3 will block new bucket and access point policies that grant public access to buckets and objects. This setting doesn't change any existing policies that allow public access to S3 resources."
              >
                Block public access to buckets and objects granted through new
                public bucket or access point policies
              </Checkbox>
            </div>
            <div className="dash">
              <Checkbox
                onChange={({ detail }) => setBlockedFourth(detail.checked)}
                checked={blockedFourth || blockedAll}
                disabled={blockedAll}
                description="S3 will ignore public and cross-account access for buckets or access points with policies that grant public access to buckets and objects."
              >
                Block public and cross-account access to buckets and objects
                through any public bucket or access point policies
              </Checkbox>
            </div>
          </>
        </div>
        <SpaceBetween size="l" direction="horizontal" className="btn-right">
          <Button onClick={() => navigate(-1)}>Cancel</Button>
          <Button variant="primary" onClick={handleRefresh} loading={loading}>
            Save changes
          </Button>
        </SpaceBetween>
      </SpaceBetween>
    );
  };

  return (
    <SpaceBetween size="m">
      <Container
        header={
          <Header
            variant="h2"
            description={
              <>
                {state.description}{' '}
                <Link external fontSize="inherit">
                  {' '}
                  Learn more
                </Link>
              </>
            }
          >
            {state.head}
          </Header>
        }
      >
        {subInfo === 'versioning' && <Versioning />}
        {subInfo === 'tags' && <Tags />}
        {subInfo === 'encryption' && <Encryption />}
        {subInfo === 'logging' && <Logging />}
        {subInfo === 'event_bridge' && <EventBridge />}
        {subInfo === 'acceleration' && <Acceleration />}
        {subInfo === 'rp' && <Requester />}
        {subInfo === 'website' && <Website />}
        {subInfo === 'oo' && <Ownership />}
        {subInfo === 'bpa' && <BucketSettings />}
      </Container>
    </SpaceBetween>
  );
};

const EditBucket = (props) => {
  const { info, id, subInfo } = useParams();
  const { state } = useLocation();
  const appLayout = useRef();
  const [loading, setLoading] = useState(false);
  const [activeHref, setActiveHref] = useState('buckets');
  const [toolsOpen, setToolsOpen] = useState(false);
  const [toolsContent, setToolsContent] = useState(
    <HelpPanels
      title={state.name}
      info={state.info}
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
  );

  const loadHelpPanelContent = (toolsContent) => {
    setToolsOpen(true);
    setToolsContent(toolsContent);
  };

  useEffect(() => {
    document.title = 'S3 Management Console';
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      <div id="h" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
        <AppHeader {...props} />
      </div>
      <AppLayout
        ref={appLayout}
        headerSelector="#h"
        footerSelector="#f"
        contentType="table"
        content={
          <Provider store={store}>
            <SpaceBetween size="l">
              {!loading ? (
                <>
                  <ContentLayout
                    header={
                      <DashboardHeader
                        loadHelpPanelContent={loadHelpPanelContent}
                        title={state.name}
                        info={state.info}
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
                  <Content
                    loadHelpPanelContent={loadHelpPanelContent}
                    state={state}
                    info={info}
                    id={id}
                    subInfo={subInfo}
                  />
                </>
              ) : (
                <Spinner size="large" className="spinner" />
              )}
            </SpaceBetween>
          </Provider>
        }
        breadcrumbs={
          <BreadcrumbGroup
            items={[
              { text: 'Amazon S3', href: '/S3/home' },
              { text: 'Buckets', href: '/s3/buckets' },
              { text: `${id}`, href: `/s3/buckets/${id}` },
              { text: `${state.name}`, href: 'info' },
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
      />
      <AppFooter />
    </>
  );
};

export default EditBucket;

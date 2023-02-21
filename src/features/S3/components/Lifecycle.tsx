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
  Input,
  RadioGroup,
  TagEditor,
  FormField,
  Autosuggest,
  S3ResourceSelector,
} from '@cloudscape-design/components';
import {useParams, useNavigate} from 'react-router-dom'


const Name = () => {

  const [name, setName] = useState('');
  const [rule, setRule] = useState('first')

  return (
     <Container
      header={
        <Header variant="h2">
          Lifecycle rule configuration
        </Header>
      }
    >
     <SpaceBetween size="m">
        <FormField label="Lifecycle rule name"
          constraintText="Up to 255 characters"
         >
        <Input 
          onChange = {({detail}) => setName(detail.value)}
          value={name}
          placeholder="Enter rule name"
          />
        </FormField>
        <FormField label="Choose a rule scope">
          <RadioGroup
            onChange={({ detail }) => setRule(detail.value)}
            value={rule}
            items={[
              {
                value: 'first',
                label: 'Limit the scope of this rule using one or more filters',
              },
              { value: 'second', label: 'Apply to all objects in the bucket' },
            ]}
          />
        </FormField>
        </SpaceBetween>
        </Container>
    );
};

const Scope = () => {

  const [rule, setRule] = useState('first')
  const [prefix, setPrefix] = useState('');
  const [tags, setTags] = useState([]);

  return (
     <Container
      header={
        <Header
          variant="h2"
          description="Specify scope to analyze"
        >
          Configure scope
        </Header>
      }
    >
     <SpaceBetween size="m">
        <FormField label="Choose a rule scope">
          <RadioGroup
            onChange={({ detail }) => setRule(detail.value)}
            value={rule}
            items={[
              {
                value: 'first',
                label: 'Limit the scope of this rule using one or more filters',
              },
              { value: 'second', label: 'Apply to all objects in the bucket' },
            ]}
          />
        </FormField>
        {rule === 'first' && (
          <>
        <Box variant="h3">Filter Type</Box>
        <Box>You can filter objects by prefix, object tags, or a combination both.</Box>
        <FormField label="Prefix" 
          description="Add a filter to limit the scope of this rule to a single prefix."
          constraintText="Don't include the bucket name in the prefix. Using certain characters in key names can cause problems with some applications and protocols."
          >
        <Input 
          onChange = {({detail}) => setPrefix(detail.value)}
          value={prefix}
          placeholder="my_configuration-1.1"
          />
        </FormField>
        <FormField 
          label="Object tags" 
          description="You can limit the scope of this rule to the key value pairs added below."
          >
          <TagEditor
          tags={tags}
          i18nStrings={{
            keyPlaceholder: 'Enter key',
            valuePlaceholder: 'Enter value',
            addButton: 'Add tag',
            removeButton: 'Remove',
            undoButton: 'Undo',
            undoPrompt: 'This tag will be removed upon saving changes',
            loading: 'Loading tags that are associated with this resource',
            keyHeader: 'Key',
            valueHeader: 'Value',
            optional: 'optional',
            keySuggestion: 'Custom tag key',
            valueSuggestion: 'Custom tag value',
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
          onChange={({ detail }) => setTags(detail.tags)}
        />
          </FormField>
          </>
          )}
        </SpaceBetween>
        </Container>
    );
}

const ExportCSV = () => {

  const [exportCSV, setExportCSV] = useState('disable');
  const [destination,setDestination] = useState('first');
  const [resource, setResource] = useState({
      uri: '',
    });
  const [account, setAccount] = useState('');
  const [destination2, setDestination2] = useState('');
  const [loading, setLoading] = useState(false);

    const handleRefresh = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate(-1);
      }, 1500);
    };

  return (
      <Container
      header={
        <Header
          variant="h2"
          description="Specify an S# bucket to store CSV exports. A file will be exported every 24 hours."
        >
          Export CSV
        </Header>
      }
    >
     <SpaceBetween size="m">
        <FormField label="Export CSV">
        <RadioGroup
            onChange={({ detail }) => setExportCSV(detail.value)}
            value={exportCSV}
            items={[
              {
                value: 'disable',
                label: 'Disable',
              },
              { value: 'enable', label: 'Enable' },
            ]}
          />
        </FormField>
        {exportCSV === "enable" && (
          <>
          <FormField label="Destination bucket">
            <RadioGroup
            onChange={({ detail }) => setDestination(detail.value)}
            value={destination}
            items={[
              {
                value: 'first',
                label: 'This account',
              },
              { value: 'second', label: 'A different account' },
            ]}
          />
          </FormField>
          {destination =="second" ? (
            <SpaceBetween size="m">
          <FormField label="Account ID - optional">
            <Input
              onChange={({detail}) => setAccount(detail.value)}
              value={account}
              placeholder="12 digit AWS account ID"
              />
          </FormField>
          <FormField
              label="Destination"
              description="Ensure policies are created to save analysis reports to the destination bucket."
              constraintText="Format: s3://bucket/prefix"
            >
            <Input
              onChange={({detail}) => setDestination2(detail.value)}
              value={destination2}
              placeholder="12 digit AWS account ID"
              />
          </FormField>
          </SpaceBetween>
          ): (
          <FormField
              label="Destination"
              description="Ensure policies are created to save analysis reports to the destination bucket."
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
            )}
          </>
          )}
        </SpaceBetween>
        </Container>
    );
}


const Lifecycle = (props) => {

const navigate = useNavigate();
   const [name, setName] = useState('');
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
          <Name />
          <Scope />
          <ExportCSV />
        <SpaceBetween size="l" direction="horizontal" className="btn-right">
          <Button onClick={() => navigate(-1)}>Cancel</Button>
          <Button variant="primary" onClick={handleRefresh} loading={loading}>
            Save changes
          </Button>
        </SpaceBetween>
      </SpaceBetween>
    );
}

export default Lifecycle;

/* eslint-disable react/no-unescaped-entities */
import React, { useRef, useState, useEffect } from 'react';
import {
  SpaceBetween,
  Link,
  Header,
  Container,
  Spinner,
  Button,
  Checkbox,
  AttributeEditor,
  Box,
  Input,
  RadioGroup,
  TagEditor,
  FormField,
  ColumnLayout,
  Select,
} from '@cloudscape-design/components';
import { useParams, useNavigate } from 'react-router-dom';

const Lifecycle = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [current, setCurrent] = useState(false);
  const [nonCurrent, setNonCurrent] = useState(false);
  const [expire, setExpire] = useState(false);
  const [permanent, setPermanent] = useState(false);
  const [marker, setMarker] = useState(false);
  const [error, setError] = useState(false);
  const [deleteExpired, setDeleteExpired] = useState(false);
  const [deleteIncomplete, setDeleteIncomplete] = useState(false);
  const [incompleteDays, setIncompleteDays] = useState(0);

  const handleRefresh = () => {
    setError(true);
    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    //   navigate(-1);
    // }, 1500);
  };
  const Configuration = () => {
    const [name, setName] = useState('');
    const [rule, setRule] = useState('first');
    const [prefix, setPrefix] = useState('');
    const [tags, setTags] = useState([]);
    const [sizeMin, setSizeMin] = useState(false);
    const [sizeMax, setSizeMax] = useState(false);

    return (
      <Container
        header={<Header variant="h2">Lifecycle rule configuration</Header>}
      >
        <SpaceBetween size="m">
          <FormField
            label="Lifecycle rule name"
            constraintText="Up to 255 characters"
            errorText={
              name.length < 3 && error == true
                ? 'Lifecycle rule name is required'
                : null
            }
          >
            <Input
              onChange={({ detail }) => setName(detail.value)}
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
                  label:
                    'Limit the scope of this rule using one or more filters',
                },
                {
                  value: 'second',
                  label: 'Apply to all objects in the bucket',
                },
              ]}
            />
          </FormField>
          <FormField label="Choose a rule scope">
            <RadioGroup
              onChange={({ detail }) => setRule(detail.value)}
              value={rule}
              items={[
                {
                  value: 'first',
                  label:
                    'Limit the scope of this rule using one or more filters',
                },
                {
                  value: 'second',
                  label: 'Apply to all objects in the bucket',
                },
              ]}
            />
          </FormField>
          {rule === 'first' && (
            <>
              <Box variant="awsui-key-label">Filter Type</Box>
              <Box>
                You can filter objects by prefix, object tags, or a combination
                both.
              </Box>
              <FormField
                label="Prefix"
                description="Add a filter to limit the scope of this rule to a single prefix."
                constraintText="Don't include the bucket name in the prefix. Using certain characters in key names can cause problems with some applications and protocols."
                errorText={
                  error == true
                    ? 'When limiting the rule scope, you must specify a prefix or another filter.'
                    : null
                }
              >
                <Input
                  onChange={({ detail }) => setPrefix(detail.value)}
                  value={prefix}
                  placeholder="my_configuration-1.1"
                />
              </FormField>
              <FormField
                label="Object tags"
                description="You can limit the scope of this rule to the key value pairs added below."
                errorText={
                  error == true
                    ? 'When limiting the rule scope, you must specify an object tag or another filter.'
                    : null
                }
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
                    loading:
                      'Loading tags that are associated with this resource',
                    keyHeader: 'Key',
                    valueHeader: 'Value',
                    optional: 'optional',
                    keySuggestion: 'Custom tag key',
                    valueSuggestion: 'Custom tag value',
                    tooManyKeysSuggestion:
                      'You have more keys than can be displayed',
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
                        : 'You have reached the limit of ' +
                          tagLimit +
                          ' tags.',
                    tagLimitExceeded: (tagLimit) =>
                      tagLimit === 1
                        ? 'You have exceeded the limit of 1 tag.'
                        : 'You have exceeded the limit of ' +
                          tagLimit +
                          ' tags.',
                    enteredKeyLabel: (key) => 'Use "' + key + '"',
                    enteredValueLabel: (value) => 'Use "' + value + '"',
                  }}
                  onChange={({ detail }) => setTags(detail.tags)}
                />
              </FormField>
              <FormField
                label="Object Tags"
                description="You can limit the scope of this rule to apply to objects based on their size. For example, you can filter out objects that might not be cost effective to transition to Glacier Flexible Retrieval (formerly Glacier) because of per-object fees."
              >
                <SpaceBetween size="xxs">
                  <Checkbox
                    checked={sizeMin}
                    onChange={({ detail }) => setSizeMin(detail.checked)}
                  >
                    Specify minimum object size
                  </Checkbox>
                  <Checkbox
                    checked={sizeMax}
                    onChange={({ detail }) => setSizeMax(detail.checked)}
                  >
                    Specify maximum object size
                  </Checkbox>
                </SpaceBetween>
              </FormField>
            </>
          )}
        </SpaceBetween>
      </Container>
    );
  };

  const Actions = () => {
    const navigate = useNavigate();

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
            description={
              <>
                Choose the actions you want this rule to perform. Per-request
                fees apply. <Link external>Learn more </Link> or see{' '}
                <Link external>Amazon S3 pricing</Link>{' '}
              </>
            }
          >
            Lifecycle rule actions
          </Header>
        }
      >
        <SpaceBetween size="xxs">
          <Checkbox
            checked={current}
            onChange={({ detail }) => setCurrent(detail.checked)}
          >
            Move current versions of objects between storage classes
          </Checkbox>
          <Checkbox
            checked={nonCurrent}
            onChange={({ detail }) => setNonCurrent(detail.checked)}
          >
            Move noncurrent versions of objects between storage classes
          </Checkbox>
          <Checkbox
            checked={expire}
            onChange={({ detail }) => setExpire(detail.checked)}
          >
            Expire current versions of objects
          </Checkbox>
          <Checkbox
            checked={permanent}
            onChange={({ detail }) => setPermanent(detail.checked)}
          >
            Permanently delete noncurrent versions of objects
          </Checkbox>
          <Checkbox
            checked={marker}
            onChange={({ detail }) => setMarker(detail.checked)}
            description="These actions are not supported when filtering by object tags or object size."
          >
            Delete expired object delete markers or incomplete multipart uploads
          </Checkbox>
        </SpaceBetween>
      </Container>
    );
  };

  const Review = () => {
    const [daysAfter, setDaysAfter] = useState('');
    const [items, setItems] = useState([
      {
        // key: 'Standard-IA',
        type: { label: 'Standard-IA', value: 'stdIA' },
        value: '',
      },
    ]);
    const [transitionDays, setTransitionDays] = useState('');

    return (
      <SpaceBetween size="xs">
        {current == true && (
          <SpaceBetween size="s">
            <Container
              header={
                <Header
                  variant="h2"
                  description={
                    <>
                      Choose transitions to move current versions of objects
                      between storage classes based on your use case scenario
                      and performance access requirements. These transitions
                      start from when the objects are created and are
                      consecutively applied. <Link external>Learn more</Link>
                    </>
                  }
                >
                  Transition current versions of objects between storage classes
                </Header>
              }
            >
              <SpaceBetween size="m">
                <AttributeEditor
                  onAddButtonClick={() => setItems([...items, {}])}
                  onRemoveButtonClick={({ detail: { itemIndex } }) => {
                    const tmpItems = [...items];
                    tmpItems.splice(itemIndex, 1);
                    setItems(tmpItems);
                  }}
                  items={items}
                  addButtonText="Add new item"
                  definition={[
                    {
                      label: 'Choose storage class transitions',
                      control: (item) => (
                        <Select
                          selectedOption={item.type}
                          // onChange={({ detail }) =>
                          //   setItems(detail.selectedOption)
                          // }
                          options={[
                            { label: 'Standard-IA', value: 'stdIA' },
                            { label: 'Intelligent Tiering', value: 'intt' },
                            { label: 'One Zone-IA', value: 'oneIA' },
                            {
                              label: 'Glacier Instant Retrieval',
                              value: 'gir',
                            },
                            {
                              label: 'Glacier Flexible Retrieval',
                              value: 'gfr',
                            },
                            { label: 'Deep Glacier Archive', value: 'dga' },
                          ]}
                        />
                      ),
                    },
                    {
                      label: 'Days after object creation',
                      control: (item) => (
                        //<Input value={item.value} placeholder="Enter value" />
                        <Input
                          // onChange={({ detail }) => setDaysAfter(detail.value)}
                          value={item.value}
                          placeholder="Enter number in days"
                          inputMode="numeric"
                          ariaRequired
                          ariaLabel="days-after"
                        />
                      ),
                    },
                  ]}
                  removeButtonText="Remove"
                  empty="No items associated with the resource."
                  disableAddButton={items.length == 6}
                />
                {/* <ColumnLayout columns={2}>
                  <FormField label="Choose storage class transitions">
                     <Select
                      selectedOption={transitionClass}
                      selectedAriaLabel="selected"
                      onChange={({ detail }) =>
                        setTransitionClass(detail.selectedOption)
                      }
                      options={[
                        { label: 'Standard-IA', value: 'stdID' },
                        { label: 'Intelligent Tiering', value: 'intt' },
                        { label: 'One Zone-IA', value: 'oneIA' },
                        { label: 'Glacier Instant Retrieval', value: 'gir' },
                        { label: 'Glacier Flexible Retrieval', value: 'gfr' },
                        { label: 'Deep Glacier Archive', value: 'dga' },
                      ]}
                    />
                  </FormField>
                  <FormField
                    label="Days after object creation"
                    constraintText="A valid integer value is required."
                  >
                    <Input
                      onChange={({ detail }) => setDaysAfter(detail.value)}
                      value={daysAfter}
                      placeholder="Enter number in days"
                      inputMode="numeric"
                      ariaRequired
                      ariaLabel="days-after"
                    />
                  </FormField>
                </ColumnLayout> */}
              </SpaceBetween>
            </Container>
          </SpaceBetween>
        )}
        {nonCurrent == true && (
          <SpaceBetween size="s">
            <Container
              header={
                <Header
                  variant="h2"
                  description={
                    <>
                      Choose transitions to move noncurrent versions of objects
                      between storage classes based on your use case scenario
                      and performance access requirements. These transitions
                      start from when the objects become noncurrent and are
                      consecutively applied. <Link external>Learn more</Link>
                    </>
                  }
                >
                  Transition noncurrent versions of objects between storage
                  classes
                </Header>
              }
            >
              <SpaceBetween size="m">
                <AttributeEditor
                  onAddButtonClick={() => setItems([...items, {}])}
                  onRemoveButtonClick={({ detail: { itemIndex } }) => {
                    const tmpItems = [...items];
                    tmpItems.splice(itemIndex, 1);
                    setItems(tmpItems);
                  }}
                  items={items}
                  addButtonText="Add new item"
                  definition={[
                    {
                      label: 'Choose storage class transitions',
                      control: (item) => (
                        <Select
                          selectedOption={item.type}
                          // onChange={({ detail }) =>
                          //   setItems(detail.selectedOption)
                          // }
                          options={[
                            { label: 'Standard-IA', value: 'stdIA' },
                            { label: 'Intelligent Tiering', value: 'intt' },
                            { label: 'One Zone-IA', value: 'oneIA' },
                            {
                              label: 'Glacier Instant Retrieval',
                              value: 'gir',
                            },
                            {
                              label: 'Glacier Flexible Retrieval',
                              value: 'gfr',
                            },
                            { label: 'Deep Glacier Archive', value: 'dga' },
                          ]}
                        />
                      ),
                    },
                    {
                      label: 'Days after objects become noncurrent',
                      control: (item) => (
                        //<Input value={item.value} placeholder="Enter value" />
                        <Input
                          // onChange={({ detail }) => setDaysAfter(detail.value)}
                          value={item.value}
                          placeholder="Enter number in days"
                          inputMode="numeric"
                          ariaRequired
                          ariaLabel="days-after"
                        />
                      ),
                      constraintText: (item, index) => {
                        index === items.length - 1
                          ? 'Can be up to 100 versions. All other noncurrent versions will be moved.'
                          : null;
                      },
                    },
                  ]}
                  removeButtonText="Remove"
                  empty="No items associated with the resource."
                  disableAddButton={items.length == 6}
                />
              </SpaceBetween>
            </Container>
          </SpaceBetween>
        )}
        {permanent == true && (
          <SpaceBetween size="s">
            <Container
              header={
                <Header
                  variant="h2"
                  description={
                    <>
                      Choose when Amazon S3 permanently deletes specified
                      noncurrent versions of objects.{' '}
                      <Link external>Learn more</Link>
                    </>
                  }
                >
                  Permanently delete noncurrent versions of objects
                </Header>
              }
            >
              <SpaceBetween size="m">
                <AttributeEditor
                  onAddButtonClick={() => setItems([...items, {}])}
                  onRemoveButtonClick={({ detail: { itemIndex } }) => {
                    const tmpItems = [...items];
                    tmpItems.splice(itemIndex, 1);
                    setItems(tmpItems);
                  }}
                  items={items}
                  addButtonText="Add new item"
                  definition={[
                    {
                      label: 'Days after objects become noncurrent',
                      control: (item) => (
                        <Input
                          // onChange={({ detail }) => setDaysAfter(detail.value)}
                          value={item.value}
                          placeholder="Enter number in days"
                          inputMode="numeric"
                          ariaRequired
                          ariaLabel="days-after"
                        />
                      ),
                    },
                    {
                      label: 'Number of newer versions to retain - Optional',
                      control: (item) => (
                        //<Input value={item.value} placeholder="Enter value" />
                        <Input
                          // onChange={({ detail }) => setDaysAfter(detail.value)}
                          value={item.value}
                          placeholder="Enter number in days"
                          inputMode="numeric"
                          ariaRequired
                          ariaLabel="days-after"
                        />
                      ),
                      constraintText: (item, index) => {
                        index === items.length - 1
                          ? 'Can be up to 100 versions. All other noncurrent versions will be moved.'
                          : null;
                      },
                    },
                  ]}
                  removeButtonText="Remove"
                  empty="No items associated with the resource."
                  disableAddButton={items.length == 6}
                />
              </SpaceBetween>
            </Container>
          </SpaceBetween>
        )}
        {marker == true && (
          <SpaceBetween size="s">
            <Container
              header={
                <Header variant="h2">
                  Delete expired object delete markers or incomplete multipart
                  uploads
                </Header>
              }
            >
              <SpaceBetween size="m">
                <FormField
                  label="Expired object delete markers"
                  description={
                    <>
                      This action will remove expired object delete markers and
                      may improve performance. An expired object delete marker
                      is removed if all noncurrent versions of an object expire
                      after deleting a versioned object. This action is not
                      available when "Expire current versions of objects" is
                      selected.
                    </>
                  }
                >
                  <Checkbox
                    checked={deleteExpired}
                    onChange={({ detail }) => setDeleteExpired(detail.checked)}
                  >
                    Delete expired object delete markers
                  </Checkbox>
                </FormField>
                <FormField
                  label="Incomplete multipart uploads"
                  description={
                    <>
                      This action will stop all incomplete multipart uploads,
                      and the parts associated with the multipart upload will be
                      deleted.
                    </>
                  }
                >
                  <Checkbox
                    checked={deleteIncomplete}
                    onChange={({ detail }) =>
                      setDeleteIncomplete(detail.checked)
                    }
                  >
                    Delete incomplete multipart uploads
                  </Checkbox>
                </FormField>
                {deleteIncomplete == true && (
                  <FormField
                    label="Number of days"
                    constraintText="Integer must be greater than 0."
                  >
                    <Input
                      value={incompleteDays}
                      onChange={({ detail }) => setIncompleteDays(detail.value)}
                      inputMode="numeric"
                    />
                  </FormField>
                )}
              </SpaceBetween>
            </Container>
          </SpaceBetween>
        )}
        {expire == true && (
          <SpaceBetween size="s">
            <Container
              header={
                <Header
                  variant="h2"
                  description={
                    <>
                      For version-enabled buckets, Amazon S3 adds a delete
                      marker and the current version of an object is retained as
                      a noncurrent version. For non-versioned buckets, Amazon S3
                      permanently removes the object.{' '}
                      <Link external>Learn more</Link>
                    </>
                  }
                >
                  Expire current version of objects
                </Header>
              }
            >
              <SpaceBetween size="m">
                <FormField
                  label="Days after object creation"
                  constraintText="Expiration is required for the selected action. Enter a value or deselect the action."
                >
                  <Input
                    onChange={({ detail }) => setDaysAfter(detail.value)}
                    value={daysAfter}
                    placeholder="Enter number in days"
                    inputMode="numeric"
                    ariaRequired
                    ariaLabel="days-after"
                  />
                </FormField>
              </SpaceBetween>
            </Container>
          </SpaceBetween>
        )}
        <Container
          header={
            <Header variant="h2">
              Review transition and expiration actions
            </Header>
          }
        >
          <ColumnLayout columns={2} variant="text-grid">
            <div>
              <SpaceBetween size="xxs">
                <Box variant="h4">Current version actions</Box>
                <Box>Day 0</Box>
                {expire == true ? (
                  <SpaceBetween size="s">
                    <ul>
                      <li>Objects uploaded</li>
                    </ul>
                    <Box>Day {daysAfter || '--'}</Box>
                    <ul>
                      <li>Objects expire</li>
                    </ul>
                  </SpaceBetween>
                ) : (
                  <Box>No actions defined.</Box>
                )}
              </SpaceBetween>
            </div>
            <div>
              <SpaceBetween size="m">
                <Box variant="h4">Noncurrent versions actions</Box>
                <Box>Day 0</Box>
                <Box>No actions defined.</Box>
              </SpaceBetween>
            </div>
          </ColumnLayout>
        </Container>
      </SpaceBetween>
    );
  };

  return (
    <SpaceBetween size="m">
      <Configuration />
      <Actions />
      <Review />
      <SpaceBetween size="l" direction="horizontal" className="btn-right">
        <Button onClick={() => navigate(-1)}>Cancel</Button>
        <Button variant="primary" onClick={handleRefresh} loading={loading}>
          Create rule
        </Button>
      </SpaceBetween>
    </SpaceBetween>
  );
};

export default Lifecycle;

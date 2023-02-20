import React, { useRef, useState, useEffect } from 'react';
import {
  SpaceBetween,
  Link,
  Header,
  Container,
  ContentLayout,
  AppLayout,
  Checkbox,
  BreadcrumbGroup,
  Flashbar,
  Alert,
  Button,
  ColumnLayout,
  Box,
  Select,
  RadioGroup,
  TagEditor,
  FormField,
  Autosuggest,
  S3ResourceSelector,
  Spinner,
  Input,
} from '@cloudscape-design/components';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const Notification = (props) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [prefix, setPrefix] = useState('');
  const [suffix, setSufffix] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(-1);
    }, 1500);
  };

  const ObjectCreate = () => {
    const [AllObjects, setAllObjects] = useState(false);
    const [put, setPut] = useState(false);
    const [post, setPost] = useState(false);
    const [copy, setCopy] = useState(false);
    const [multipart, setMultipart] = useState(false);
    return (
      <SpaceBetween size="s">
        <Box variant="h1" fontSize="heading-m">
          Object Creation
        </Box>
        <ColumnLayout columns={2} variant="text-grid">
          <div>
            <Checkbox
              checked={AllObjects}
              onChange={({ detail }) => setAllObjects(detail.checked)}
              description="s3:ObjectCreated:*"
            >
              All Object create event
            </Checkbox>
          </div>
          <div>
            <Checkbox
              checked={put}
              onChange={({ detail }) => setPut(detail.checked)}
              description="s3:ObjectCreated:Put"
            >
              Put
            </Checkbox>
            <Checkbox
              checked={post}
              onChange={({ detail }) => setPost(detail.checked)}
              description="s3:ObjectCreated:Post"
            >
              Post
            </Checkbox>
            <Checkbox
              checked={copy}
              onChange={({ detail }) => setCopy(detail.checked)}
              description="s3:ObjectCreated:Copy"
            >
              Copy
            </Checkbox>
            <Checkbox
              checked={multipart}
              onChange={({ detail }) => setMultipart(detail.checked)}
              description="s3:ObjectCreated:CompleteMultipartUpload"
            >
              Multipart upload completed
            </Checkbox>
          </div>
        </ColumnLayout>
      </SpaceBetween>
    );
  };

  const ObjectRemoval = () => {
    const [AllObjects, setAllObjects] = useState(false);
    const [permanent, setPermanent] = useState(false);
    const [marker, setMarker] = useState(false);

    return (
      <SpaceBetween size="s">
        <Box variant="h1" fontSize="heading-m">
          Object Removal
        </Box>
        <ColumnLayout columns={2} variant="text-grid">
          <div>
            <Checkbox
              checked={AllObjects}
              onChange={({ detail }) => setAllObjects(detail.checked)}
              description="s3:ObjectRemoved:*"
            >
              All Object removal events
            </Checkbox>
          </div>
          <div>
            <Checkbox
              checked={permanent}
              onChange={({ detail }) => setPermanent(detail.checked)}
              description="s3:ObjectRemoved:Delete"
            >
              Permanently deleted
            </Checkbox>
            <Checkbox
              checked={marker}
              onChange={({ detail }) => setMarker(detail.checked)}
              description="s3:ObjectRemoved:DeleteMarkerCreated"
            >
              Delete marker created
            </Checkbox>
          </div>
        </ColumnLayout>
      </SpaceBetween>
    );
  };

  const ObjectRestore = () => {
    const [AllObjects, setAllObjects] = useState(false);
    const [initiate, setInitiate] = useState(false);
    const [complete, setComplete] = useState(false);
    const [expired, setExpired] = useState(false);

    return (
      <SpaceBetween size="s">
        <Box variant="h1" fontSize="heading-m">
          Object Restore
        </Box>
        <ColumnLayout columns={2} variant="text-grid">
          <div>
            <Checkbox
              checked={AllObjects}
              onChange={({ detail }) => setAllObjects(detail.checked)}
              description="s3:ObjectRestore:*"
            >
              All restore object events
            </Checkbox>
          </div>
          <div>
            <Checkbox
              checked={initiate}
              onChange={({ detail }) => setInitiate(detail.checked)}
              description="s3:ObjectRestore:Post"
            >
              Restore initiated
            </Checkbox>
            <Checkbox
              checked={complete}
              onChange={({ detail }) => setComplete(detail.checked)}
              description="s3:ObjectRestore:Completed"
            >
              Restore completed
            </Checkbox>
            <Checkbox
              checked={expired}
              onChange={({ detail }) => setExpired(detail.checked)}
              description="s3:ObjectRestore:Delete"
            >
              Restored object expired
            </Checkbox>
          </div>
        </ColumnLayout>
      </SpaceBetween>
    );
  };

  const ObjectACL = () => {
    const [acl, setACL] = useState(false);

    return (
      <SpaceBetween size="s">
        <Box variant="h1" fontSize="heading-m">
          Object ACL
        </Box>
        <ColumnLayout columns={2} variant="text-grid">
          <div>
            <Checkbox
              checked={acl}
              onChange={({ detail }) => setACL(detail.checked)}
              description="s3:ObjectAcl:Put"
            >
              Object ACL events
            </Checkbox>
          </div>
          <div></div>
        </ColumnLayout>
      </SpaceBetween>
    );
  };

  const ObjectTagging = () => {
    const [AllObjects, setAllObjects] = useState(false);
    const [added, setAdded] = useState(false);
    const [deleted, setDeleted] = useState(false);

    return (
      <SpaceBetween size="m">
        <Box variant="h1" fontSize="heading-m">
          Object Restore
        </Box>
        <ColumnLayout columns={2} variant="text-grid">
          <div>
            <Checkbox
              checked={AllObjects}
              onChange={({ detail }) => setAllObjects(detail.checked)}
              description="s3:ObjectTagging:*"
            >
              All object tagging events
            </Checkbox>
          </div>
          <div>
            <Checkbox
              checked={added}
              onChange={({ detail }) => setAdded(detail.checked)}
              description="s3:ObjectTagging:Put"
            >
              Object tags added
            </Checkbox>
            <Checkbox
              checked={deleted}
              onChange={({ detail }) => setDeleted(detail.checked)}
              description="s3:ObjectTagging:Delete"
            >
              Object tags deleted
            </Checkbox>
          </div>
        </ColumnLayout>
      </SpaceBetween>
    );
  };

  const Redundancy = () => {
    const [rrs, setRRS] = useState(false);

    return (
      <SpaceBetween size="s">
        <Box variant="h1" fontSize="heading-m">
          Reduced Redundancy Storage
        </Box>
        <ColumnLayout columns={2} variant="text-grid">
          <div>
            <Checkbox
              checked={rrs}
              onChange={({ detail }) => setRRS(detail.checked)}
              description="s3:ReducedRedundancyLostObject"
            >
              Reduced Redundancy Storage (RRS) object
            </Checkbox>
          </div>
          <div></div>
        </ColumnLayout>
      </SpaceBetween>
    );
  };

  const Replication = () => {
    const [AllObjects, setAllObjects] = useState(false);
    const [exceed, setExceed] = useState(false);
    const [replicated, setReplicated] = useState(false);
    const [notTracked, setNotTracked] = useState(false);
    const [failed, setFailed] = useState(false);

    return (
      <SpaceBetween size="s">
        <Box variant="h1" fontSize="heading-m">
          Replication
        </Box>
        <ColumnLayout columns={2} variant="text-grid">
          <div>
            <Checkbox
              checked={AllObjects}
              onChange={({ detail }) => setAllObjects(detail.checked)}
              description="s3:Replication:*"
            >
              All replication events
            </Checkbox>
          </div>
          <div>
            <Checkbox
              checked={exceed}
              onChange={({ detail }) => setExceed(detail.checked)}
              description="s3:Replication:OperationMissedThreshold"
            >
              Replication Time Control: Object exceeded 15 minute threshold
            </Checkbox>
            <Checkbox
              checked={replicated}
              onChange={({ detail }) => setReplicated(detail.checked)}
              description="s3:Replication:OperationReplicatedAfterThreshold"
            >
              Replication Time Control: Object replicated after 15 minute
              threshold
            </Checkbox>
            <Checkbox
              checked={notTracked}
              onChange={({ detail }) => setNotTracked(detail.checked)}
              description="s3:Replication:OperationNotTracked"
            >
              Object not tracked by replication
            </Checkbox>
            <Checkbox
              checked={failed}
              onChange={({ detail }) => setFailed(detail.checked)}
              description="s3:Replication:OperationFailedReplication"
            >
              Object failed to replicate
            </Checkbox>
          </div>
        </ColumnLayout>
      </SpaceBetween>
    );
  };

  const Lifecycle = () => {
    const [lifecycle, setLifecycle] = useState(false);
    const [Alllifecycle, setALLlifecycle] = useState(false);
    const [expired, setExpired] = useState(false);
    const [marker, setMarker] = useState(false);

    return (
      <SpaceBetween size="s">
        <Box variant="h1" fontSize="heading-m">
          Lifecycle
        </Box>
        <ColumnLayout columns={2} variant="text-grid">
          <div>
            <Checkbox
              checked={lifecycle}
              onChange={({ detail }) => setLifecycle(detail.checked)}
              description="s3:LifecycleTransition"
            >
              Lifecycle transition events
            </Checkbox>
            <Checkbox
              checked={Alllifecycle}
              onChange={({ detail }) => setALLlifecycle(detail.checked)}
              description="s3:LifecycleExpiration:*"
            >
              All lifecycle expiration events
            </Checkbox>
          </div>
          <div>
            <div> </div>
            <Checkbox
              checked={expired}
              onChange={({ detail }) => setExpired(detail.checked)}
              description="s3:LifecycleExpiration:Delete"
            >
              Object expired
            </Checkbox>
            <Checkbox
              checked={marker}
              onChange={({ detail }) => setMarker(detail.checked)}
              description="s3:LifecycleExpiration:DeleteMarkerCreated"
            >
              Delete marker added by Lifecycle for a versioned object
            </Checkbox>
          </div>
        </ColumnLayout>
      </SpaceBetween>
    );
  };

  const IntelligentTiering = () => {
    const [AllObjects, setAllObjects] = useState(false);

    return (
      <SpaceBetween size="s">
        <Box variant="h1" fontSize="heading-m">
          Intelligent-Tiering
        </Box>
        <ColumnLayout columns={2} variant="text-grid">
          <div>
            <Checkbox
              checked={AllObjects}
              onChange={({ detail }) => setAllObjects(detail.checked)}
              description="s3:IntelligentTiering"
            >
              Intelligent-Tiering archive events
            </Checkbox>
          </div>
          <div></div>
        </ColumnLayout>
      </SpaceBetween>
    );
  };

  const Destination = () => {
    const [value, setValue] = useState('first');
    const [specify, setSpecify] = useState('choose');
    const [selectedOption, setSelectedOption] = useState(null);
    const [enter, setEnter] = useState('');

    return (
      <SpaceBetween size="m">
        <Alert type="info">
          <>
            Before Amazon S3 can publish messages to a destination, you must
            grant the Amazon S3 principal the necessary permissions to call the
            relevant API to publish messages to an SNS topic, an SQS queue, or a
            Lambda function.{' '}
            <Link external fontSize="inherit">
              Learn more{' '}
            </Link>
          </>
        </Alert>
        <FormField
          label="Destination"
          description="Choose a destination to publish the event."
        >
          <RadioGroup
            value={value}
            items={[
              {
                value: 'first',
                label: 'Lambda Function',
                description: 'Run a Lambda function script based on S3 events.',
              },
              {
                value: 'second',
                label: 'SNS Topic',
                description:
                  'Fanout messages to systems for parallel processing or directly to people.',
              },
              {
                value: 'third',
                label: 'SQS queue',
                description:
                  'Send notifications to an SQS queue to be read by a server.',
              },
            ]}
            onChange={({ detail }) => setValue(detail.value)}
          />
          {value == 'first' && (
            <FormField label="Specify Lambda function">
              <SpaceBetween size="s">
                <RadioGroup
                  value={specify}
                  items={[
                    { value: 'choose', label: 'Choose Lambda Functions' },
                    { value: 'enter', label: 'Enter Lambda function ARN' },
                  ]}
                  onChange={({ detail }) => setSpecify(detail.value)}
                />
                <FormField label="Lambda function">
                  {specify == 'choose' ? (
                    <Select
                      selectedOption={selectedOption}
                      placeholder="Choose Lambda function"
                      options={[
                        { label: 'Option 1', value: '1' },
                        { label: 'Option 2', value: '2' },
                        { label: 'Option 3', value: '3' },
                      ]}
                      onChange={({ detail }) =>
                        setSelectedOption(detail.selectedOption)
                      }
                      selectedAriaLabel="Selected"
                    />
                  ) : (
                    <Input
                      value={enter}
                      onChange={({ detail }) => setEnter(detail.value)}
                      placeholder="Enter ARN"
                    />
                  )}
                </FormField>
              </SpaceBetween>
            </FormField>
          )}

          {/*SNS*/}
          {value == 'second' && (
            <FormField label="Specify SNS topic">
              <SpaceBetween size="s">
                <RadioGroup
                  value={specify}
                  items={[
                    { value: 'choose', label: 'Choose from your SNS topics' },
                    { value: 'enter', label: 'Enter SNS topic ARN' },
                  ]}
                  onChange={({ detail }) => setSpecify(detail.value)}
                />
                <FormField label="SNS topic">
                  {specify == 'choose' ? (
                    <Select
                      selectedOption={selectedOption}
                      placeholder="Choose SNS topic"
                      options={[
                        { label: 'Option 1', value: '1' },
                        { label: 'Option 2', value: '2' },
                        { label: 'Option 3', value: '3' },
                      ]}
                      onChange={({ detail }) =>
                        setSelectedOption(detail.selectedOption)
                      }
                      selectedAriaLabel="Selected"
                    />
                  ) : (
                    <Input
                      value={enter}
                      onChange={({ detail }) => setEnter(detail.value)}
                      placeholder="Enter SNS topic"
                    />
                  )}
                </FormField>
              </SpaceBetween>
            </FormField>
          )}

          {/*SQS*/}
          {value == 'third' && (
            <FormField label="Specify SQS queue">
              <SpaceBetween size="s">
                <RadioGroup
                  value={specify}
                  items={[
                    { value: 'choose', label: 'Choose from your SQS queues' },
                    { value: 'enter', label: 'Enter SQS queues ARN' },
                  ]}
                  onChange={({ detail }) => setSpecify(detail.value)}
                />
                <FormField label="SQS queue">
                  {specify == 'choose' ? (
                    <Select
                      selectedOption={selectedOption}
                      placeholder="Choose SQS queue"
                      options={[
                        { label: 'Option 1', value: '1' },
                        { label: 'Option 2', value: '2' },
                        { label: 'Option 3', value: '3' },
                      ]}
                      onChange={({ detail }) =>
                        setSelectedOption(detail.selectedOption)
                      }
                      selectedAriaLabel="Selected"
                    />
                  ) : (
                    <Input
                      value={enter}
                      onChange={({ detail }) => setEnter(detail.value)}
                      placeholder="Enter SQS queue"
                    />
                  )}
                </FormField>
              </SpaceBetween>
            </FormField>
          )}
        </FormField>
      </SpaceBetween>
    );
  };

  return (
    <SpaceBetween size="s">
      <Container
        header={
          <Header
            variant="h2"
            description={
              <>
                {props.state.description && (
                  <>
                    {props.state.description}{' '}
                    <Link external fontSize="inherit">
                      {' '}
                      Learn more
                    </Link>
                  </>
                )}
              </>
            }
          >
            {props.state.head}
          </Header>
        }
      >
        <FormField
          label="Event name"
          constraintText="Event name can contain up to 255 characters."
        >
          <Input
            placeholder="Event name"
            value={name}
            onChange={({ detail }) => setName(detail.value)}
          />
        </FormField>
        <FormField
          label={
            <span>
              Prefix <i>- optional</i>{' '}
            </span>
          }
          description="Limit the notifications to objects with key starting with specified characters."
        >
          <Input
            placeholder="images/"
            value={prefix}
            onChange={({ detail }) => setPrefix(detail.value)}
          />
        </FormField>
        <FormField
          label={
            <span>
              Suffix <i>- optional</i>{' '}
            </span>
          }
          description="Limit the notifications to objects with key ending with specified characters."
        >
          <Input
            placeholder=".jpg"
            value={suffix}
            onChange={({ detail }) => setSuffix(detail.value)}
          />
        </FormField>
      </Container>
      <Container
        header={
          <Header
            variant="h2"
            description={
              <>
                Specify at least one event for which you want to receive
                notifications. For each group, you can choose an event type for
                all events, or you can choose one or more individual events.{' '}
                <Link external fontSize="inherit">
                  {' '}
                  Learn more
                </Link>
              </>
            }
          >
            Event types
          </Header>
        }
      >
        <SpaceBetween size="s">
          <ObjectCreate />
          <ObjectRemoval />
          <ObjectRestore />
          <ObjectACL />
          <ObjectTagging />
          <Redundancy />
          <Replication />
          <Lifecycle />
          <IntelligentTiering />
        </SpaceBetween>
      </Container>
      <Container
        header={
          <Header
            variant="h2"
            description={
              <>
                {props.state.description && (
                  <>
                    {props.state.description}{' '}
                    <Link external fontSize="inherit">
                      {' '}
                      Learn more
                    </Link>
                  </>
                )}
              </>
            }
          >
            Destination
          </Header>
        }
      >
        <Destination />
      </Container>
      <SpaceBetween size="l" direction="horizontal" className="btn-right">
        <Button onClick={() => navigate(-1)}>Cancel</Button>
        <Button variant="primary" onClick={handleRefresh} loading={loading}>
          Save changes
        </Button>
      </SpaceBetween>
    </SpaceBetween>
  );
};

export default Notification;

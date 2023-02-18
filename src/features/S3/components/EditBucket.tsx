import React, {useRef,useState,useEffect} from 'react'
import {SpaceBetween, Link, Header, Container,ContentLayout, AppLayout,BreadcrumbGroup, Flashbar,Alert, Button, Box, RadioGroup, TagEditor, FormField} from "@cloudscape-design/components";
import { AppHeader } from '../../common/TopNavigations';
import { AppFooter } from '../../common/AppFooter';
import { Provider } from 'react-redux';
import { appLayoutLabels, paginationLabels } from '../../common/labels';
import { store } from '../../../app/store';
import { DashboardHeader, HelpPanels } from '../../EC2/components/header';
import {
  Notifications,
  TableEmptyState,
  TableHeader,
  TableNoMatchState,
  Navigation,
  S3navItems,
  S3Header,
} from '../../EC2/commons/common-components';
import {useParams, useLocation, useNavigate} from 'react-router-dom'

const Content = ({loadHelpPanelContent, state, info, subInfo, id}) => {
	console.log(info)
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);

	const handleRefresh = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			navigate(-1);
		},1500)
	}

	const Versioning = () => {
		const [value, setValue] = useState("first");
		return (
			<SpaceBetween size="s">
				<Box variant="awsui-key-label">
				Bucket Versioning
				</Box>
				<RadioGroup 
					onChange={({detail}) => setValue(detail.value)}
					value={value}
					items={[
					{value: 'first', label: 'Suspend', description: 'This suspends the creation of object versions for all operations but preserves any existing object versions.'},
					{value: 'second', label: 'Enable'},
						]}

				/>
				<SpaceBetween size="xxs">
				<Box variant="text-body-secondary" fontSize="heading-m">Multi-factor authentication (MFA) delete</Box>
				<Box variant="body-s" fontWeight="light">An additional layer of security that requires multi-factor authentication for changing Bucket Versioning settings and permanently deleting object 
				versions. To modify MFA delete settings, use the AWS CLI, AWS SDK, or the Amazon S3 REST API.</Box>
				</SpaceBetween>
				<Box variant="awsui-key-label">Disabled</Box>
			</SpaceBetween>
			);
	}

const Tags = () => {
		  const [tags, setTags] = React.useState([]);
		return (
			<SpaceBetween size="s">
				    <TagEditor
      i18nStrings={{
        keyPlaceholder: "Enter key",
        valuePlaceholder: "Enter value",
        addButton: "Add new tag",
        removeButton: "Remove",
        undoButton: "Undo",
        undoPrompt:
          "This tag will be removed upon saving changes",
        loading:
          "Loading tags that are associated with this resource",
        keyHeader: "Key",
        valueHeader: "Value",
        optional: "optional",
        keySuggestion: "Custom tag key",
        valueSuggestion: "Custom tag value",
        emptyTags:
          "No tags associated with the resource.",
        tooManyKeysSuggestion:
          "You have more keys than can be displayed",
        tooManyValuesSuggestion:
          "You have more values than can be displayed",
        keysSuggestionLoading: "Loading tag keys",
        keysSuggestionError:
          "Tag keys could not be retrieved",
        valuesSuggestionLoading: "Loading tag values",
        valuesSuggestionError:
          "Tag values could not be retrieved",
        emptyKeyError: "You must specify a tag key",
        maxKeyCharLengthError:
          "The maximum number of characters you can use in a tag key is 128.",
        maxValueCharLengthError:
          "The maximum number of characters you can use in a tag value is 256.",
        duplicateKeyError:
          "You must specify a unique tag key.",
        invalidKeyError:
          "Invalid key. Keys can only contain Unicode letters, digits, white space and any of the following: _.:/=+@-",
        invalidValueError:
          "Invalid value. Values can only contain Unicode letters, digits, white space and any of the following: _.:/=+@-",
        awsPrefixError: "Cannot start with aws:",
        tagLimit: (availableTags, tagLimit) =>
          availableTags === tagLimit
            ? "You can add up to " + tagLimit + " tags."
            : availableTags === 1
            ? "You can add up to 1 more tag."
            : "You can add up to " +
              availableTags +
              " more tags.",
        tagLimitReached: tagLimit =>
          tagLimit === 1
            ? "You have reached the limit of 1 tag."
            : "You have reached the limit of " +
              tagLimit +
              " tags.",
        tagLimitExceeded: tagLimit =>
          tagLimit === 1
            ? "You have exceeded the limit of 1 tag."
            : "You have exceeded the limit of " +
              tagLimit +
              " tags.",
        enteredKeyLabel: key => 'Use "' + key + '"',
        enteredValueLabel: value => 'Use "' + value + '"'
      }}
      tags={tags}
      onChange={({ detail }) => setTags(detail.tags)}
    />
			</SpaceBetween>
			);
	}

	const Encryption = () => {
		const [encryptionKey, setEncryptionKey] = useState("first");
		const [bucketKey, setBucketKey] = useState("second")
		return (
			<SpaceBetween size="s">
				<FormField label="Encryption key type" info={<Link>Info</Link>}>
				<RadioGroup 
					onChange={({detail}) => setEncryptionKey(detail.value)}
					value={encryptionKey}
					items={[
					{value: 'first', label: 'Amazon S3-managed keys (SSE-S3)'},
					{value: 'second', label: 'AWS Key Management Service key (SSE-KMS)'},
						]}

				/>
				</FormField>
				<SpaceBetween size="xxs">
				<FormField label="Bucket Key" 
				description="When KMS encryption is used to encrypt new objects in this bucket, the bucket key reduces encryption costs by lowering calls to AWS KMS."
				>
				<RadioGroup 
					onChange={({detail}) => setBucketKey(detail.value)}
					value={bucketKey}
					items={[
					{value: 'first', label: 'Disable'},
					{value: 'second', label: 'Enable'},
						]}

				/>
				</FormField>
				</SpaceBetween>
			</SpaceBetween>
			);
	}


	return (
		<SpaceBetween size="m">
		<Container header={
			<Header variant='h2' description={
			<>
			{state.description} {" "}
			 <Link external fontSize="inherit"> Learn more</Link>
			</>
		}
		>
		{state.head}
		</Header>}
		>
		{subInfo === "versioning" && (<Versioning />)}
		{subInfo === "tags" && (<Tags />)}
		{subInfo === "encryption" && (<Encryption />)}
		</Container>
		<SpaceBetween size="l" direction="horizontal" className="btn-right">
        <Button onClick={() => navigate(-1)}>Cancel</Button>
        <Button variant="primary" onClick={handleRefresh} loading={loading} >
          Save changes
        </Button>
        </SpaceBetween>
    </SpaceBetween>
		);
}

const EditBucket = (props) => {

	const {info ,id, subInfo} = useParams();
	const {state} = useLocation();
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
                  <Content loadHelpPanelContent={loadHelpPanelContent} state={state} info={info} id={id} subInfo={subInfo} />
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
}

export default EditBucket;
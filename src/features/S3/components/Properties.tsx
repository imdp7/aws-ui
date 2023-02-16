import React, {useState, useEffect} from 'react'
import {Container, Header, SpaceBetween, Box, ColumnLayout, Link, Button, TagEditor, FormField, Table, TextFilter, Alert} from '@cloudscape-design/components'
import CopyText from '../../EC2/commons/copy-text'

const Overview = () => {
	return (
		<Container
			 header={
				<Header variant="h2">Bucket Overview</Header>
			}>
			<ColumnLayout columns={3}>
			<SpaceBetween size="xs" direction="vertical">
			<Box fontSize="heading-s" color="text-body-secondary">AWS Region</Box>
			<Box fontSize="heading-s" color="text-label">US East (N. Virginia) us-east-1</Box>
			</SpaceBetween>
			<SpaceBetween size="xs">
			<Box fontSize="heading-s" color="text-body-secondary">Amazon Resource Name (ARN)</Box>
			<Box fontSize="heading-s" color="text-label">
        	<CopyText
          	copyText={"arn:aws:s3:::dp-njit-cs-643"}
          	copyButtonLabel="Copy ARN"
          	successText="ARN copied"
          	errorText="ARN failed to copy"
        	/>
      		</Box>
			</SpaceBetween>
			<SpaceBetween size="xs">
			<Box fontSize="heading-s" color="text-body-secondary">Creation Date</Box>
			<Box fontSize="heading-s" color="text-label">June 23, 2022, 01:40:14 (UTC-04:00)</Box>
			</SpaceBetween>
			</ColumnLayout>
			</Container>
		);
}

const Versioning = () => {
	return (
		<Container 
			header={
				<Header variant="h2" description={
					<>
					Versioning is a means of keeping multiple variants of an object in the same bucket. You can use versioning 
				fo preserve, retrieve, and restore every version of every object stored in your Amazon S3 bucket. With versioning you can easily 
				recover from both unintended user actions and application failures.{" "}
				<Link external fontSize="inherit">Learn more</Link>
				</>
			}
			actions={<Button>Edit</Button>}
			> 
			Bucket Versioning
			</Header>
			}
			>
			<SpaceBetween size="m">
			<SpaceBetween size="xs" direction="vertical">
			<FormField info={<Link>Info</Link>} label="Bucket Versioning">
			<Box fontSize="heading-s" color="text-label">Disabled</Box>
			</FormField>
			</SpaceBetween>
			<SpaceBetween size="xxs">
			<FormField info={<Link>Info</Link>} label="Multi-factor authentication (MFA) delete">
			<Box fontSize="body-m" color="text-body-secondary">
			An additional layer of security that requires multi-factor authentication for changing Bucket Versioning settings 
			and permanently deleting object versions. To modify MFA delete settings, use the AWS CLI, AWS SDK, or the Amazon S3 REST API.        	
      		</Box>
      		<Box fontSize="heading-s" color="text-label">Disabled</Box>
      		</FormField>
			</SpaceBetween>
			</SpaceBetween>
			</Container>
		);
}

const Tags = () => {
	const [tags, setTags] = useState([])
	return (
		<Container 
			header={
				<Header variant="h2" description={
					<>
					You can use bucket tags to track storage costs and organize buckets.{" "}
				<Link external fontSize="inherit">Learn more</Link>
				</>
			}
			actions={<Button>Edit</Button>}
			>
			Tags
			</Header>
			}>
			<SpaceBetween size="m">
			<TagEditor
			 tags={tags}
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
			/>
			</SpaceBetween>
			</Container>
		);
}

const Encryption = () => {
	return (
		<Container 
			header={
				<Header variant="h2" description={
					<>
					Server-side encryption is automatically applied to new objects stored in this bucket.{" "}
				<Link external fontSize="inherit">Learn more</Link>
				</>
			}
			actions={<Button>Edit</Button>}
			> 
			Default Encryption
			</Header>
			}
			>
			<SpaceBetween size="m">
			<SpaceBetween size="xs" direction="vertical">
			<FormField info={<Link>Info</Link>} label="Encryption key type">
			<Box fontSize="heading-s" color="text-label">Disabled</Box>
			</FormField>
			</SpaceBetween>
			<SpaceBetween size="xxs">
			<FormField info={<Link>Info</Link>} label="Bucket Key">
			<Box fontSize="body-m" color="text-body-secondary">
			<>
			When KMS encryption is used to encrypt new objects in this bucket, the bucket key reduces encryption 
			costs by lowering calls to AWS KMS.</>{" "}<Link external fontSize="inherit">Learn more</Link>        	
      		</Box>
      		<Box fontSize="heading-s" color="text-label">Disabled</Box>
      		</FormField>
			</SpaceBetween>
			</SpaceBetween>
			</Container>
		);
}

const IntelligentTiering = () => {

	const [selectedItems, setSelectedItems] = useState([]);

	const columnDefinitions = [
	{
		id: "name",
		header: "Name",
		cell: e => e.name,
	},
	{
		id: "status",
		header: "Status",
		cell: e => e.status,
	},
	{
		id: "scope",
		header: "Scope",
		cell: e => e.scope,
	},
	{
		id: "daysArchieveAccess",
		header: "Days untill transition to Archieve Access tier",
		cell: e => e.daysArchieveAccess,
	},
	{
		id: "daysDeepArchieveAccess",
		header: "Days untill transition to Deep Archieve Access tier",
		cell: e => e.daysDeepArchieveAccess,
	},
	]

	return (
		<Container 
			header={
				<Header variant="h2" description={
					<>
					Enable objects stored in the Intelligent-Tiering storage class to tier-down to the Archive Access tier or the Deep Archive Access
					tier which are optimized for objects that will be rarely accessed for long periods of time.{" "}
				<Link external fontSize="inherit">Learn more</Link>
				</>
			}
			counter="(0)"
			actions={
				<SpaceBetween size="m" direction="horizontal">
				<Button disabled>View Details</Button>
				<Button disabled>Edit</Button>
				<Button disabled>Delete</Button>
				<Button>Create Configuration</Button>
				</SpaceBetween>
			}
			> 
			Intelligent-Tiering Archive configurations
			</Header>
			}
			>
			<SpaceBetween size="m">
				<Table 
				onSelectionChange={({detail}) => setSelectedItems(detail.selectedItems)}
				selectedItems={selectedItems}
				columnDefinitions={columnDefinitions}
				loadingText="Loading resources"
				variant="embedded"
				selectionType="single"
				trackBy="name"
				visibleColumns={["name","status","scope","daysArchieveAccess","daysDeepArchieveAccess"]}
				empty={
					<Box textAlign="center" color="inherit">
					<b>No archive configurations</b>
					<Box 
					padding={{bottom: "s"}}
					variant="p"
					color="inherit"
					>
					No configurations to display.
					</Box>
					<Button>Create Configuration</Button>
					</Box>
				}
				filter={
				<TextFilter 
					filterPlaceholder="Find Intelligent-Tiering Archive Configurations" 
					filteringText=""
					/>
				}
				/>
			</SpaceBetween>
			</Container>
		);
}

const Logging = () => {
	return (
		<Container 
			header={
				<Header variant="h2" description={
					<>
					Log requests for access to your bucket.{" "}
				<Link external fontSize="inherit">Learn more</Link>
				</>
			}
			actions={<Button>Edit</Button>}
			> 
			Server access logging
			</Header>
			}
			>
			<SpaceBetween size="m">
			<SpaceBetween size="xs" direction="vertical">
			<FormField info={<Link>Info</Link>} label="Server access logging">
			<Box fontSize="heading-s" color="text-label">Disabled</Box>
			</FormField>
			</SpaceBetween>
			</SpaceBetween>
			</Container>
		);
}

const CloudTrail = () => {

	const [selectedItems, setSelectedItems] = useState([]);

	const columnDefinitions = [
	{
		id: "name",
		header: "Name",
		cell: e => e.name,
		sortingField: "alt"
	},
	{
		id: "access",
		header: "Access",
		cell: e => e.access,
		sortingField: "access"
	},
	]

	return (
		<Container 
			header={
				<Header variant="h2" description={
					<>
					Configure CloudTrail data events to log Amazon S3 object-level API operations in the CloudTrail console.{" "}
				<Link external fontSize="inherit">Learn more</Link>
				</>
			}
			actions={<Button>Create Configuration</Button>}
			> 
			AWS CloudTrail data events
			</Header>
			}
			>
			<SpaceBetween size="m">
				<Table 
				onSelectionChange={({detail}) => setSelectedItems(detail.selectedItems)}
				selectedItems={selectedItems}
				columnDefinitions={columnDefinitions}
				loadingText="Loading resources"
				variant="embedded"
				selectionType="single"
				trackBy="name"
				visibleColumns={["name","access"]}
				empty={
					<Box textAlign="center" color="inherit">
					<b>No data events</b>
					<Box 
					padding={{bottom: "s"}}
					variant="p"
					color="inherit"
					>
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
}

const Notifications = () => {
	const [selectedItems, setSelectedItems] = useState([]);

	const columnDefinitions = [
	{
		id: "name",
		header: "Name",
		cell: e => e.name,
	},
	{
		id: "eventTypes",
		header: "Event Types",
		cell: e => e.eventTypes,
	},
	{
		id: "filters",
		header: "Filters",
		cell: e => e.filters,
	},
	{
		id: "destinationType",
		header: "Destination Type",
		cell: e => e.destinationType,
	},
	{
		id: "destination",
		header: "Destination",
		cell: e => e.destination,
	},
	]

	return (
		<Container 
			header={
				<Header variant="h2" description={
					<>
					Send a notification when specific events occur in your bucket.{" "}
				<Link external fontSize="inherit">Learn more</Link>
				</>
			}
			counter="(0)"
			actions={
				<SpaceBetween size="m" direction="horizontal">
				<Button disabled>Edit</Button>
				<Button disabled>Delete</Button>
				<Button>Create event Notification</Button>
				</SpaceBetween>
			}
			> 
			Event notifications
			</Header>
			}
			>
			<SpaceBetween size="m">
				<Table 
				onSelectionChange={({detail}) => setSelectedItems(detail.selectedItems)}
				selectedItems={selectedItems}
				columnDefinitions={columnDefinitions}
				loadingText="Loading resources"
				variant="embedded"
				selectionType="multi"
				trackBy="name"
				visibleColumns={["name","eventTypes","filters","destinationType","destination"]}
				empty={
					<Box textAlign="center" color="inherit">
					<b>No event notifications</b>
					<Box 
					padding={{bottom: "s"}}
					variant="p"
					color="inherit"
					>
					Choose Create event notification to be notified when a specific event occurs.
					</Box>
					<Button>
					 	Create event notification
					 </Button>
					</Box>
				}
				/>
			</SpaceBetween>
			</Container>
		);
}

const EventBridge = () => {
	return (
		<Container 
			header={
				<Header variant="h2" description={
					<>
					For additional capabilities, use Amazon EventBridge to build event-driven applications at scale using S3 event notifications.{" "}
				<Link external fontSize="inherit">Learn more</Link> {" "} or <Link external fontSize="inherit">see EventBridge pricing</Link>
				</>
			}
			actions={<Button>Edit</Button>}
			> 
			Amazon EventBridge
			</Header>
			}
			>
			<SpaceBetween size="xs" direction="vertical">
			<FormField info={<Link>Info</Link>} label="Send notifications to Amazon EventBridge for all events in this bucket">
			<Box fontSize="heading-s" color="text-label">Disabled</Box>
			</FormField>
			</SpaceBetween>
			</Container>
		);
}

const Acceleration = () => {
	return (
		<Container 
			header={
				<Header variant="h2" description={
					<>
					Use an accelerated endpoint for fater data tranfers.{" "}
				<Link external fontSize="inherit">Learn more</Link> {" "}
				</>
			}
			actions={<Button>Edit</Button>}
			> 
			Transfer Acceleration
			</Header>
			}
			>
			<SpaceBetween size="xs" direction="vertical">
			<FormField info={<Link>Info</Link>} label="Transfer Acceleration">
			<Box fontSize="heading-s" color="text-label">Disabled</Box>
			</FormField>
			</SpaceBetween>
			</Container>
		);
}

const ObjectLock = () => {
	return (
		<Container 
			header={
				<Header variant="h2" description={
					<>
					Store objects using a write-once-read-many (WORM) model to help you prevent 
					objects from being deleted or overwritten for a fixed amount of time or indefinitely.{" "}
				<Link external fontSize="inherit">Learn more</Link> {" "}
				</>
			}
			actions={<Button>Edit</Button>}
			> 
			Object Lock
			</Header>
			}
			>
			<SpaceBetween size="m" direction="vertical">
			<FormField info={<Link>Info</Link>} label="Object Lock">
			<Box fontSize="heading-s" color="text-label">Disabled</Box>
			</FormField>
			<Alert statusIconAriaLabel="info">Amazon S3 currently does not support enabling Object Lock after a bucket has been created. 
			To enable Object Lock for this bucket, contact {" "}<Link external> Customer Support</Link>
			</Alert>
			</SpaceBetween>
			</Container>
		);
}

const Requester = () => {
	return (
		<Container 
			header={
				<Header variant="h2" description={
					<>
					When enabled, the requester pays for requests and data transfer costs, and anonymous access to this bucket is disabled.{" "}
				<Link external fontSize="inherit">Learn more</Link> {" "}
				</>
			}
			actions={<Button>Edit</Button>}
			> 
			Requester pays
			</Header>
			}
			>
			<SpaceBetween size="xs" direction="vertical">
			<FormField info={<Link>Info</Link>} label="Requester pays">
			<Box fontSize="heading-s" color="text-label">Disabled</Box>
			</FormField>
			</SpaceBetween>
			</Container>
		);
}

const StaticWebsite = () => {
	return (
		<Container 
			header={
				<Header variant="h2" description={
					<>
					Use this bucket to host a website or redirect requests.{" "}
				<Link external fontSize="inherit">Learn more</Link> {" "}
				</>
			}
			actions={<Button>Edit</Button>}
			> 
			Static Website Hosting
			</Header>
			}
			>
			<SpaceBetween size="xs" direction="vertical">
			<FormField info={<Link>Info</Link>} label="Static Website Hosting">
			<Box fontSize="heading-s" color="text-label">Disabled</Box>
			</FormField>
			</SpaceBetween>
			</Container>
		);
}

const Properties = () => {
	return (
		<div>
			<SpaceBetween size="m">
			<Overview />
			<Versioning />
			<Tags />
			<Encryption />
			<IntelligentTiering />
			<Logging />
			<CloudTrail />
			<Notifications />
			<EventBridge />
			<Acceleration />
			<ObjectLock />
			<Requester />
			<StaticWebsite />
			</SpaceBetween>
		</div>
		);
}

export default Properties;
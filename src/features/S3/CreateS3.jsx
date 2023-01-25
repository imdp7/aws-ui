/* eslint-disable react/prop-types */
import React, { useState, useEffect, useLayoutEffect } from 'react';
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
  Box,
  Input,
  Select,
  TextFilter,
  Pagination,
  CollectionPreferences,
  Table,
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
} from '@cloudscape-design/components';
import {
  CustomAppLayout,
  Notifications,
  TableEmptyState,
  TableHeader,
  TableNoMatchState,
  Navigation,
  S3navItems,
  S3Header,
} from '../EC2/commons/common-components';
import { Provider } from 'react-redux';
import { appLayoutLabels, paginationLabels } from '../common/labels';
import { store } from '../../app/store';
import { DashboardHeader, HelpPanels } from '../EC2/components/header';

const regions = [
	{
	label: "Noth America",
	options: [
		{value:"US East (N. Virginia) us-east-1"},
		{value:"US East (N. Virginia) us-east-1"},
		{value:"US East (N. Virginia) us-east-1"},
		{value:"US East (N. Virginia) us-east-1"}
		]
},
{
	label: "Asia Pacific",
	options: [
		{value:"US East (N. Virginia) us-east-1"},
		{value:"US East (N. Virginia) us-east-1"},
		{value:"US East (N. Virginia) us-east-1"},
		{value:"US East (N. Virginia) us-east-1"}
		]
}

];

const Content = (props) => {
	const [name, setName] = useState('');
	const [region, setRegion] = useState("");
	const [control, setControl] = useState("first");
	const [ACLEnabled, setACLACLEnabled] = useState('first');


	return (
		<SpaceBetween size="m">
			<Container 
			header={ <Header variant="h2">General configuration</Header> }
			>
			<SpaceBetween size="xs">
			<FormField label="Bucket Name"
			stretch
			constraintText = {
				<>
				Bucket name must be globally unique and must not contain spaces or uppercase letters. {' '}
				<Link external fontSize="inherit"> See rules for bucket naming </Link>
				</>
				}
			>
			<Input 
			value = {name}
			onChange = {event => setName(event.detail.value)}
			placeholder="myawsbucket"
			/>
			</FormField>

			<FormField label="AWS Region">
			<Autosuggest 
			onChange={({detail}) => setRegion(detail.value)}
			value={region}
			options={regions}
			enteredTextLabel={value => `Use: "${value}"`}
			placeholder={region}
			empty="Select available Region"
			/>
			</FormField>
			<FormField label="Bucket Name"
			description = "Only the bucket settings in the following configuration are copied."
			>
				<Button onClick={() => <S3ResourceSelector {...s3ResourceSelectorProps} />}>Choose Bucket</Button>
			</FormField>
			</SpaceBetween>
			</Container>

			<Container
			 header={ <Header variant="h2">Object Ownership</Header> }
			 >
			 <SpaceBetween size="s">
			 <Tiles
			 onChange={({detail}) => setControl(detail.value)}
			 value={control}
			 ariaRequired
			 items={[
			 {
			 	value:'first',
			 	label:'ACLs disabled (recommended)',
			 	description:"All objects in this bucket are owned by this account. Access to this bucket and its objects is specified using only policies." 
			 },
			 {
			 	value:'second',
			 	label:'ACLs enabled',
			 	description:"Objects in this bucket can be owned by other AWS accounts. Access to this bucket and its objects can be specified using ACLs." 
			 },
			 ]}
			 />
			 <Box variant="small" fontSize="heading-s" fontWeight="bold">Object Ownership</Box>
			 {control == 'first' && (
			 	<SpaceBetween size="xs">
			 	<Box fontSize="heading-s">Bucket owner enforced</Box>
			 	<Alert
			 	header="Upcoming permission changes to disable ACLs"
			 	statusIconAriaLabel="Info">
			 	<>
			 		Starting in April 2023, to disable ACLs when creating buckets by using the S3 console, you will no longer need the s3:PutBucketOwnershipControls permission.
			 		{' '}
			 		<Link external fontSize="inherit">Learn More</Link>
			 	</>
			 	</Alert>
			 	</SpaceBetween>
			 	)}
			 {control == 'second' && (
			 	<SpaceBetween size="xs">
			 	<RadioGroup 
			 		onChange={({detail}) => setACLEnabled(detail.value)}
			 		value={ACLEnabled}
			 		items={[
			 		{
			 			value: 'first',
			 			label: 'Bucket owner preferred',
			 			description: 'If new objects written to this bucket specify the bucket-owner-full-control canned ACL, they are owned by the bucket owner. Otherwise, they are owned by the object writer.'
			 		},
			 		{
			 			value: 'second',
			 			label: 'Object writer',
			 			description: 'The object writer remains the object owner.'
			 		}
			 		]}
			 	/>
			 	{ACLEnabled == 'first' && (
			 		<SpaceBetween size="xs">
			 		<Alert
			 	statusIconAriaLabel="Info">
			 	If you want to enforce object ownership for new objects only, your bucket policy must specify that the bucket-owner-full-control canned ACL is required for object uploads.
			 	</Alert>
			 	<Alert
			 	header="Upcoming permission changes to enable ACLs"
			 	statusIconAriaLabel="Info">
			 	<>
			 		Starting in April 2023, to enable ACLs when creating buckets by using the S3 console, you must have the s3:PutBucketOwnershipControls permission.
			 		{' '}
			 		<Link external fontSize="inherit">Learn More</Link>
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
			 	statusIconAriaLabel="Info">
			 	<>
			 		Starting in April 2023, to enable ACLs when creating buckets by using the S3 console, you must have the s3:PutBucketOwnershipControls permission.
			 		{' '}
			 		<Link external fontSize="inherit">Learn More</Link>
			 	</>
			 	</Alert>
			 	</SpaceBetween>
			 	)}
			 </SpaceBetween>
		</Container>
		<Container
		header={<Header variant="h2" description={
			<>
		Public access is granted to buckets and objects through access control lists (ACLs), bucket policies, access point policies, or all. In order to ensure that public access to this bucket and its objects is blocked, turn on Block all public access. These settings apply only to this bucket and its access points. AWS recommends that you turn on Block all public access, but before applying any of these settings, ensure that your applications will work correctly without public access. If you require some level of public access to this bucket or objects within, you can customize the individual settings below to suit your specific storage use cases. {' '}
		 <Link external fontSize="inherit">Learn more</Link>
		 </>
		}>Block Public Access settings for this bucket</Header>}>

		</Container>
		</SpaceBetween>
		);
}

const CreateS3 = (props) => {

	 const [loading, setLoading] = useState(false);
  const [activeHref, setActiveHref] = useState('buckets');
  const [toolsOpen, setToolsOpen] = useState(false);
  const [toolsContent, setToolsContent] = useState(
    <HelpPanels
      title="Buckets"
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
                    description={<>
                    Buckets are containers for data stored in S3. {' '}
                    <Link external fontSize="inherit">Learn more</Link>
                    </>
                }
                    info="When you create a bucket, you choose the bucket name and the AWS Region. Bucket names must be globally unique and follow bucket naming rules . After you create a bucket, you can't change the bucket name or Region. Bucket ownership is not transferable. Buckets also can't be transferred between AWS accounts, so be sure that you are in the correct AWS account when you create a bucket."
                    des="When you create a bucket, you can configure bucket properties and permissions. You can copy settings from an existing bucket or configure your bucket to support your use case. "
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
                    ]}
                  />
                }
              />
              <Content {...props} />
            </SpaceBetween>
          </Provider>
        }

        />

			<AppFooter />
		</div>
	);
}

export default CreateS3;

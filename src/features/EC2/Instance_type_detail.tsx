import React, { createRef, useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  AppLayout,
  Button,
  Container,
  Header,
  Pagination,
  FormField,
  Box,
  Alert,
  ExpandableSection,
  ColumnLayout,
  ButtonDropdown,
  SpaceBetween,
  BreadcrumbGroup,
  Icon,
  Flashbar,
  Link,
  Modal,
  Tabs,
  TextFilter,
  ContentLayout,
  Spinner,
} from '@cloudscape-design/components';
import CopyText from './commons/copy-text';
import {
  Storage,
  Breadcrumbs,
  StatusCheck,
  Networking,
  Tags,
  SettingsDetails,
} from './commons/detail-common.jsx';
import {
  Navigation,
  ec2navItems,
  EC2Header,
} from './commons/common-components';
import { appLayoutLabels } from '../../features/common/labels';
import { HelpPanels, DashboardHeader } from './components/header';
import useNotifications from './commons/use-notifications';
import { AppHeader } from '../common/TopNavigations';
import { AppFooter } from '../common/AppFooter';
import { ItemState } from './components/item-state';

const Details = (props) => {
  return (
    <Container header={<Header variant="h3">Details</Header>}>
      <DetailComp {...props} />
    </Container>
  );
};

const DetailComp = (props) => {
  return (
    <SpaceBetween size="m">
      <ColumnLayout columns={4}>
        <FormField label="Instance type">
          <CopyText
            copyText={`${props.type}`}
            copyButtonLabel="Copy Instance type"
            successText="Instance type copied"
            errorText="Instance type failed to copy"
          />
        </FormField>
      </ColumnLayout>
    </SpaceBetween>
  );
};
const Compute = (props) => {
  return (
    <Container header={<Header variant="h3">Compute</Header>}>
      <ComputeComp {...props} />
    </Container>
  );
};

const ComputeComp = (props) => {
  return (
    <SpaceBetween size="m">
      <ColumnLayout columns={4}>
        <FormField label="Instance type">
          <CopyText
            copyText={`${props.type}`}
            copyButtonLabel="Copy Instance type"
            successText="Instance type copied"
            errorText="Instance type failed to copy"
          />
        </FormField>
      </ColumnLayout>
    </SpaceBetween>
  );
};

export const TabsContent = (props) => {
  const tabs = [
    {
      label: 'Details',
      id: 'details',
      content: <DetailComp {...props} />,
    },
    {
      label: 'Security',
      id: 'security',
      content: <ComputeComp {...props} />,
    },
  ];
  return <Tabs tabs={tabs} ariaLabel="Resource details" />;
};

function Instance_type_detail(props) {
  const { type } = useParams();
  const [toolsOpen, setToolsOpen] = useState(false);
  const [toolsIndex, setToolsIndex] = useState(0);
  const { notifications, notifyInProgress } = useNotifications({
    resourceName: 'instance',
  });
  const [loading, setLoading] = useState(true);

  const [toolsContent, setToolsContent] = useState(
    <HelpPanels
      title={type}
      des="Amazon Elastic Compute Cloud (Amazon EC2) is a web service that provtypees
        resizeable computing capacity&mdash;literally, servers in Amazon's data
        centers&mdash;that you use to build and host your software systems."
    />
  );

  useEffect(() => {
    document.title = `${type}`;
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const loadHelpPanelContent = (toolsContent) => {
    setToolsOpen(true);
    setToolsContent(toolsContent);
  };
  return (
    <>
      <div id="h" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
        <AppHeader {...props} />
      </div>
      <AppLayout
        content={
          <>
            {!loading ? (
              <SpaceBetween size="s">
                <ContentLayout
                  header={
                    <DashboardHeader
                      loadHelpPanelContent={loadHelpPanelContent}
                      title={type}
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
                <Details type={type} />
                <Compute type={type} />
              </SpaceBetween>
            ) : (
              <Spinner size="large" className="spinner" />
            )}
          </>
        }
        headerSelector="#h"
        breadcrumbs={
          <BreadcrumbGroup
            items={[
              { text: 'EC2', href: '/ec2_instance/dashboard' },
              { text: 'Instance Types', href: '/ec2_instance/InstanceTypes' },
              { text: `${type}`, href: '#' },
            ]}
            expandAriaLabel="Show path"
            ariaLabel="Breadcrumbs"
          />
        }
        navigation={
          <Navigation
            activeHref="InstanceTypes"
            header={EC2Header}
            items={ec2navItems}
          />
        }
        tools={toolsContent}
        toolsOpen={toolsOpen}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        ariaLabels={appLayoutLabels}
        notifications={<Flashbar items={notifications} stackItems />}
        contentType="wizard"
      />
      <AppFooter />
    </>
  );
}

export default Instance_type_detail;
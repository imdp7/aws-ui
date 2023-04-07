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

const split = (item, index) => {
  const name = item.split('.');
  return name[index];
};

const Details = (props) => {
  return (
    <Container header={<Header variant="h2">Details</Header>}>
      {/* <DetailComp {...props} /> */}
    </Container>
  );
};

const DetailComp = (props) => {
  const { type, hypervisor, freeTier, bareMetal } = props?.item;
  return (
    <Container>
      <SpaceBetween size="m">
        <ColumnLayout columns={4}>
          <FormField label="Instance type">
            <CopyText
              copyText={`${type}`}
              copyButtonLabel="Copy Instance type"
              successText="Instance type copied"
              errorText="Instance type failed to copy"
            />
          </FormField>
          <FormField label="Instance family">
            <CopyText
              copyText={split(type, 0)}
              copyButtonLabel="Copy Instance family"
              successText="Instance family copied"
              errorText="Instance family failed to copy"
            />
          </FormField>
          <FormField label="Instance size">
            <CopyText
              copyText={split(type, 1)}
              copyButtonLabel="Copy Instance size"
              successText="Instance size copied"
              errorText="Instance size failed to copy"
            />
          </FormField>
          <FormField label="Hypervisor">
            <CopyText
              copyText={`${hypervisor}`}
              copyButtonLabel="Copy Hypervisor"
              successText="Hypervisor copied"
              errorText="Hypervisor failed to copy"
            />
          </FormField>
          <FormField label="Auto Recovery support">
            <CopyText
              copyText={`${freeTier}`}
              copyButtonLabel="Copy Auto Recovery support"
              successText="Auto Recovery support copied"
              errorText="Auto Recovery support failed to copy"
            />
          </FormField>
          <FormField label="Supported root device types">
            <CopyText
              copyText={`${bareMetal}`}
              copyButtonLabel="Copy Auto Recovery support"
              successText="Auto Recovery support copied"
              errorText="Auto Recovery support failed to copy"
            />
          </FormField>
          <FormField label="Dedicated Host support">
            <Box>-</Box>
          </FormField>
          <FormField label="On-Demand Hibernation support">
            <Box>-</Box>
          </FormField>
          <FormField label="Burstable Performance support">
            <Box>-</Box>
          </FormField>
        </ColumnLayout>
      </SpaceBetween>
    </Container>
  );
};
const Compute = (props) => {
  return (
    <Container header={<Header variant="h2">Compute</Header>}>
      {/* <ComputeComp {...props} /> */}
    </Container>
  );
};

const ComputeComp = (props) => {
  const { type } = props?.item;
  return (
    <Container>
      <SpaceBetween size="m">
        <ColumnLayout columns={4}>
          <FormField label="Instance type">
            <CopyText
              copyText={`${type}`}
              copyButtonLabel="Copy Instance type"
              successText="Instance type copied"
              errorText="Instance type failed to copy"
            />
          </FormField>
        </ColumnLayout>
      </SpaceBetween>
    </Container>
  );
};
const Pricing = (props) => {
  return (
    <Container header={<Header variant="h2">Compute</Header>}>
      <PricingComp {...props} />
    </Container>
  );
};

const PricingComp = (props) => {
  return (
    <Container>
      <SpaceBetween size="m">
        <ColumnLayout columns={4}>
          <FormField label="On-Demand Linux pricing">
            <CopyText
              copyText={'0.0832 USD per Hour'}
              copyButtonLabel="Copy On-Demand Linux pricing"
              successText="On-Demand Linux pricing copied"
              errorText="On-Demand Linux pricing failed to copy"
            />
          </FormField>
          <FormField label="On-Demand Windows pricing">
            <CopyText
              copyText={'0.1108 USD per Hour'}
              copyButtonLabel="Copy On-Demand Windows pricing"
              successText="On-Demand Windows pricing copied"
              errorText="On-Demand Windows pricing failed to copy"
            />
          </FormField>
        </ColumnLayout>
      </SpaceBetween>
    </Container>
  );
};
const Accelerators = (props) => {
  return (
    <Container header={<Header variant="h2">Accelerators</Header>}>
      <AcceleratorsComp {...props} />
    </Container>
  );
};

const AcceleratorsComp = (props) => {
  return (
    <Container>
      <SpaceBetween size="m">
        <ColumnLayout columns={4}>
          <FormField label="GPUs">
            <Box>-</Box>
          </FormField>
          <FormField label="GPU memory (GiB)">
            <Box>-</Box>
          </FormField>
          <FormField label="GPU manufacturer">
            <Box>-</Box>
          </FormField>
          <FormField label="GPU name">
            <Box>-</Box>
          </FormField>
          <FormField label="FPGAs">
            <Box>-</Box>
          </FormField>
          <FormField label="FPGA memory (GiB)">
            <Box>-</Box>
          </FormField>
          <FormField label="FPGA manufacturer">
            <Box>-</Box>
          </FormField>
          <FormField label="FPGA name">
            <Box>-</Box>
          </FormField>
        </ColumnLayout>
      </SpaceBetween>
    </Container>
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
      label: 'Compute',
      id: 'compute',
      content: <ComputeComp {...props} />,
    },
    {
      label: 'Networking',
      id: 'networking',
      content: <ComputeComp {...props} />,
    },
    {
      label: 'Storage',
      id: 'storage',
      content: <ComputeComp {...props} />,
    },
    {
      label: 'Accelerators',
      id: 'Accelerators',
      content: <AcceleratorsComp {...props} />,
    },
    {
      label: 'Pricing',
      id: 'pricing',
      content: <PricingComp {...props} />,
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
                {/* <Details type={type} /> */}
                {/* <Compute type={type} /> */}
                <Accelerators type={type} />
                <Pricing type={type} />
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
        contentType="table"
      />
      <AppFooter />
    </>
  );
}

export default Instance_type_detail;

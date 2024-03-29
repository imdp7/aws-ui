import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  AppLayout,
  BreadcrumbGroup,
  SpaceBetween,
  ContentLayout,
  Tabs,
} from '@cloudscape-design/components';
import { AppHeader } from '../common/TopNavigations';
import { AppFooter } from '../common/AppFooter';
import {
  Navigation,
  S3navItems,
  S3Header,
} from '../EC2/commons/common-components';
import { DashboardHeader, HelpPanels } from '../EC2/components/header';
import { appLayoutLabels, paginationLabels } from '../common/labels';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import ObjectsPane from './components/Objects';
import Properties from './components/Properties';
import Permissions from './components/Permissions';
import Metrics from './components/Metrics';
import Management from './components/Management';
import { dataBucketFiles } from '../resources/s3Bucket';

function BucketDetail(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeHref, setActiveHref] = useState('buckets');
  const [activeTabId, setActiveTabId] = useState('objects');
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

  const tabs = [
    {
      label: 'Objects',
      id: 'objects',
      content: <ObjectsPane id={id} />,
    },
    {
      label: 'Properties',
      id: 'properties',
      content: <Properties id={id} />,
    },
    {
      label: 'Permissions',
      id: 'permissions',
      content: <Permissions id={id} />,
    },
    {
      label: 'Metrics',
      id: 'metrics',
      content: <Metrics id={id} />,
    },
    {
      label: 'Management',
      id: 'management',
      content: <Management id={id} />,
    },
    {
      label: 'Access Points',
      id: 'accessPoints',
      content: <div>Tags</div>,
    },
  ];

  const loadHelpPanelContent = (toolsContent) => {
    setToolsOpen(true);
    setToolsContent(toolsContent);
  };

  useEffect(() => {
    document.title = `${id} - S3 Bucket`;
    navigate(`?tabs=${activeTabId}`, { replace: true });
  }, [id, activeTabId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div id="h" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
        <AppHeader {...props} />
      </div>
      <AppLayout
        headerSelector="#h"
        footerSelector="#f"
        breadcrumbs={
          <BreadcrumbGroup
            items={[
              { text: 'Amazon S3', href: '/S3/home' },
              { text: 'Buckets', href: '/S3/buckets' },
              { text: `${id}`, href: `${id}` },
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
                    title={id}
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
              <Tabs
                tabs={tabs}
                ariaLabel="Resource details"
                id={id}
                activeTabTd={activeTabId}
                onChange={({ detail }) => setActiveTabId(detail.activeTabId)}
              />
            </SpaceBetween>
          </Provider>
        }
      />
      <AppFooter />
    </>
  );
}

export default BucketDetail;

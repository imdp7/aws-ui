import React, { useRef, useState, useEffect } from 'react';
import {
  SpaceBetween,
  ContentLayout,
  AppLayout,
  BreadcrumbGroup,
  Spinner,
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
import Notification from './Notification';
import IntelligentTiering from './IntelligentTiering';
import StorageConfigure from './StorageConfigure';
import Lifecycle from './Lifecycle';

const Content = ({ loadHelpPanelContent, state, info, subInfo, id }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${id}`;
  }, []);

  return (
    <SpaceBetween size="m">
      {subInfo == 'notification' && (
        <Notification
          loadHelpPanelContent={loadHelpPanelContent}
          state={state}
          info={info}
          id={id}
          subInfo={subInfo}
        />
      )}
      {subInfo == 'int_tiering_config' && (
        <IntelligentTiering
          loadHelpPanelContent={loadHelpPanelContent}
          state={state}
          info={info}
          id={id}
          subInfo={subInfo}
        />
      )}
      {subInfo == 'storage_class_analysis' && (
        <StorageConfigure
          loadHelpPanelContent={loadHelpPanelContent}
          state={state}
          info={info}
          id={id}
          subInfo={subInfo}
        />
      )}
      {subInfo == 'lifecycle' && (
        <Lifecycle
          loadHelpPanelContent={loadHelpPanelContent}
          state={state}
          info={info}
          id={id}
          subInfo={subInfo}
        />
      )}
    </SpaceBetween>
  );
};

const CreateComponent = (props) => {
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
      des={state.description}
      //       ul={[
      //         {
      //           h5: 'Manage access',
      //           text: `Buckets are private and can only be accessed if you explicitly grant permissions. To review the public access settings for your buckets, make sure that you have the required permissions or you'll get an error. Use bucket policies, IAM policies, access control lists (ACLs), and S3 Access Points to manage access.`,
      //         },
      //         {
      //           h5: 'Configure your bucket',
      //           text: 'You can configure your bucket to support your use case. For example, host a static website, use S3 Versioning and replication for disaster recovery, S3 Lifecycle to manage storage costs, and logging to track requests.',
      //         },
      //         {
      //           h5: 'Understand storage usage and activity',
      //           text: 'The S3 Storage Lens account snapshot displays your total storage, object count, and average object size for all buckets in the account. View your S3 Storage Lens dashboard to analyze your usage and activity trends by AWS Region, storage class, bucket, or prefix.',
      //         },
      //       ]}
    />
  );

  const loadHelpPanelContent = (toolsContent) => {
    setToolsOpen(true);
    setToolsContent(toolsContent);
  };
  const capital = (text) => {
    return text[0].toUpperCase() + text.slice(1);
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
                        des={state.description}
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
              { text: capital(`${id}`), href: `/s3/buckets/${id}` },
              { text: capital(`${info}`), href: `/s3/buckets/${id}` },
              {
                text: capital(`${state.title}`),
                href: `/s3/buckets/${id}/${info}/${subInfo}`,
              },
              { text: capital(`${state.name}`), href: 'info' },
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

export default CreateComponent;
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
  Alert,
  Button,
  Box,
  RadioGroup,
  TagEditor,
  FormField,
  Autosuggest,
  S3ResourceSelector,
  Spinner,
  Input,
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

  return (
    <SpaceBetween size="m">
      <Container
        header={
          <Header
            variant="h2"
            description={
              <>
                {props.state.description}{' '}
                <Link external fontSize="inherit">
                  {' '}
                  Learn more
                </Link>
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
      <SpaceBetween size="l" direction="horizontal" className="btn-right">
        <Button onClick={() => navigate(-1)}>Cancel</Button>
        <Button variant="primary" onClick={handleRefresh} loading={loading}>
          Save changes
        </Button>
      </SpaceBetween>
    </SpaceBetween>
  );
};

const Content = ({ loadHelpPanelContent, state, info, subInfo, id }) => {
  console.log(info);
  const navigate = useNavigate();

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
};

export default CreateComponent;

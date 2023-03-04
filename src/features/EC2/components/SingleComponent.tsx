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
import { DashboardHeader, HelpPanels } from './header';
import INSTANCES from '../../resources/s3Bucket';
import {
  Notifications,
  Navigation,
  ec2navItems,
  EC2Header,
} from '../commons/common-components';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import ManageState from './ManageState';
import ConnectInstance from './ConnectInstance';

const Content = ({ loadHelpPanelContent, state, info, subInfo, id }) => {
  const navigate = useNavigate();

  return (
    <SpaceBetween size="m">
      {info == 'ManageInstanceState' && <ManageState id={id} state={state} />}
      {info == 'connect' && <ConnectInstance id={id} state={state} />}
    </SpaceBetween>
  );
};

const SingleComponent = (props) => {
  const { info, id, subInfo } = useParams();
  const { state } = useLocation();
  const appLayout = useRef();
  const [loading, setLoading] = useState(false);
  const [activeHref, setActiveHref] = useState('instances');
  const [toolsOpen, setToolsOpen] = useState(false);
  const [toolsContent, setToolsContent] = useState(
    <HelpPanels
      title={state?.name}
      info={state?.info}
      des={state?.description}
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
    document.title = 'Manage instance state | EC2 Management Console';
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
                        title={state?.name}
                        info={state?.info}
                        des={state?.description}
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
              { text: 'EC2', href: '/EC2/home' },
              { text: 'Instances', href: '/ec2_instance/instances' },
              { text: capital(`${id}`), href: `/ec2_instance/${id}` },
              // { text: capital(`${info}`), href: `/ec2_instance/${id}` },
              // {
              //   text: capital(`${state.title}`),
              //   href: `/ec2_instance/${id}/${info}/${subInfo}`,
              // },
              { text: capital(`${info}`), href: `${info}` },
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
            items={ec2navItems}
            header={EC2Header}
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

export default SingleComponent;

/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { AppFooter } from '../features/common/AppFooter';
import { AppHeader } from '../features/common/TopNavigations';
import {
  AppLayout,
  Button,
  Container,
  ContentLayout,
  Header,
  BreadcrumbGroup,
  SpaceBetween,
  ExpandableSection,
  Spinner,
} from '@cloudscape-design/components';
import { DashboardHeader, HelpPanels } from '../features/EC2/components/header';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { appLayoutLabels } from '../features/common/labels';
import { Breadcrumbs } from '../features/EC2/common-components';

const Profiler = (props) => {
  return (
    <>
      <SpaceBetween size="m">
        <ExpandableSection
          headerAriaLabel="Account Settings"
          variant="container"
          headerText="Account Settings"
          defaultExpanded
          header={
            <DashboardHeader
              loadHelpPanelContent={props.loadHelpPanelContent}
              title="Account Settings"
              des="Amazon Elastic Compute Cloud (Amazon EC2) is a web service that provides
                         resizeable computing capacity&mdash;literally, servers in Amazon's data
                         centers&mdash;that you use to build and host your software systems."
            />
          }
        ></ExpandableSection>
        <ExpandableSection
          headerAriaLabel="Contact Information"
          variant="container"
          headerText="Contact Information"
          headerDescription="Please note that updating your contact information on this page will not update the information displayed on your PDF Invoices. If you wish to update the billing address information associated with your Invoice, please edit it through the Payment Methods page, located here."
          defaultExpanded
          header={
            <DashboardHeader
              loadHelpPanelContent={props.loadHelpPanelContent}
              title="Contact Information"
              des="Amazon Elastic Compute Cloud (Amazon EC2) is a web service that provides
                         resizeable computing capacity&mdash;literally, servers in Amazon's data
                         centers&mdash;that you use to build and host your software systems."
            />
          }
        />
      </SpaceBetween>
    </>
  );
};

function Profile(props) {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [activeHref, setActiveHref] = React.useState('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const [toolsContent, setToolsContent] = useState(
    <HelpPanels
      title="EC2 Instances"
      des="Amazon Elastic Compute Cloud (Amazon EC2) is a web service that provides
        resizeable computing capacity&mdash;literally, servers in Amazon's data
        centers&mdash;that you use to build and host your software systems."
    />
  );

  const loadHelpPanelContent = (toolsContent) => {
    setToolsOpen(true);
    setToolsContent(toolsContent);
  };
  useEffect(() => {
    document.title = 'AWS Console Profile';
  }, [location]);

  return (
    <>
      <div id="h" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
        <AppHeader {...props} />
      </div>
      <AppLayout
        content={
          <Provider store={store}>
            {!loading ? (
              <ContentLayout
                header={
                  <DashboardHeader
                    loadHelpPanelContent={loadHelpPanelContent}
                    title="Profile"
                    des="Amazon Elastic Compute Cloud (Amazon EC2) is a web service that provides
                         resizeable computing capacity&mdash;literally, servers in Amazon's data
                         centers&mdash;that you use to build and host your software systems."
                  />
                }
              >
                <SpaceBetween size={'m'}>
                  <Profiler loadHelpPanelContent={loadHelpPanelContent} />
                </SpaceBetween>
              </ContentLayout>
            ) : (
              <Spinner size="large" className="spinner" />
            )}
          </Provider>
        }
        headerSelector="#h"
        footerSelector="#f"
        // navigation={
        //   <Navigation
        //     activeHref={activeHref}
        //     onFollow={(event) => {
        //       if (!event.detail.external) {
        //         event.preventDefault();
        //         setActiveHref(event.detail.href);
        //       }
        //     }}
        //     items={ec2navItems}
        //   />
        // }
        tools={toolsContent}
        toolsOpen={toolsOpen}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        ariaLabels={appLayoutLabels}
        contentType="wizard"
        breadcrumbs={
          <BreadcrumbGroup
            items={[
              { text: 'Account', href: '/account' },
              { text: 'Profile', href: 'profile' },
            ]}
          />
        }
        //notifications={<Flashbar items={notifications} />}
      />
      <AppFooter />
    </>
  );
}

export default Profile;

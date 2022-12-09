/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { AppHeader } from '../../common/TopNavigations';
import { AppFooter } from '../../common/AppFooter';
import '../../../App.css';
import {
  AppLayout,
  Grid,
  ContentLayout,
  BreadcrumbGroup,
  SpaceBetween,
  Container,
  Header,
  Link,
  Flashbar,
  Button,
} from '@cloudscape-design/components';
import { DashboardHeader, HelpPanels } from '../components/header';
import { appLayoutLabels } from '../../common/labels';
import { navHeader, Notifications } from '../commons/common-components';
import Panel1 from './Panel1';
import Panel2 from './Panel2';
import { Navigation } from '../commons/common-components';

function Breadcrumbs() {
  const breadcrumbItems = [
    {
      text: 'EC2',
      href: 'dashboard',
    },
    {
      text: 'Instances',
      href: 'instances',
    },
    {
      text: 'Launch an instance',
      href: '/',
    },
  ];

  return (
    <BreadcrumbGroup
      items={breadcrumbItems}
      expandAriaLabel="Show path"
      ariaLabel="Breadcrumbs"
    />
  );
}

const Content = ({ loadHelpPanelContent }) => {
  return (
    <Grid
      gridDefinition={[
        { colspan: { default: 12, xxs: 8 } },
        { colspan: { default: 12, xxs: 4 } },
      ]}
    >
      {/* Main Panel */}
      <div>
        <Panel1 loadHelpPanelContent={loadHelpPanelContent} />
      </div>
      <div>
        {/* Summary Panel */}

        <Panel2 createInstance={createInstance} />
      </div>
    </Grid>
  );
};
const createInstance = () => {
  const [items, setItems] = React.useState([
    {
      type: 'success',
      content: 'This is a success flash message.',
      action: <Button>View instance</Button>,
      dismissible: true,
      dismissLabel: 'Dismiss message',
      onDismiss: () => setItems([]),
      id: 'message_1',
    },
  ]);
  return <Flashbar items={items} />;
};

function LaunchEC2() {
  const [openNavigation, setOpenNavigation] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [toolsContent, setToolsContent] = useState(
    <HelpPanels
      title="Launch an instance"
      info="Welcome to the new and improved launch experience - a quicker and easier way to launch an instance. We’d appreciate your feedback on this early release. We’ll use your feedback to continue improving the experience over the next few months."
      des="Amazon EC2 allows you to create virtual machines, or instances, that run on the AWS Cloud. Quickly get started by following the simple steps below."
      ul={[
        {
          text: 'Single page layout with summary side panel. Quickly get up and running with our new one-page design. See all your settings in one location. No need to navigate back and forth between steps to ensure your configuration is correct. Use the Summary panel for an overview and to easily navigate the page.',
        },
        {
          text: 'Improved AMI selector. New users: use the Quick Start AMI selector to select an operating system so that you can quickly launch an instance. Experienced users: the AMI selector displays your recently used AMIs and the AMIs that you own so that you can select the AMIs that you care about quickly and easily. You can still browse the full catalog to find new AMIs.',
        },
      ]}
      h5="Current improvements"
    />
  );
  const loadHelpPanelContent = (toolsContent) => {
    setToolsOpen(true);
    setToolsContent(toolsContent);
    appLayout.current?.focusToolsClose();
  };

  return (
    <>
      <AppHeader />
      <AppLayout
        content={
          <SpaceBetween size="l">
            <ContentLayout
              header={
                <DashboardHeader
                  loadHelpPanelContent={loadHelpPanelContent}
                  title="Launch an instance"
                  info="Welcome to the new and improved launch experience - a quicker and easier way to launch an instance. We’d appreciate your feedback on this early release. We’ll use your feedback to continue improving the experience over the next few months."
                  des="Amazon EC2 allows you to create virtual machines, or instances, that run on the AWS Cloud. Quickly get started by following the simple steps below."
                  ul={[
                    {
                      text: 'Single page layout with summary side panel. Quickly get up and running with our new one-page design. See all your settings in one location. No need to navigate back and forth between steps to ensure your configuration is correct. Use the Summary panel for an overview and to easily navigate the page.',
                    },
                    {
                      text: 'Improved AMI selector. New users: use the Quick Start AMI selector to select an operating system so that you can quickly launch an instance. Experienced users: the AMI selector displays your recently used AMIs and the AMIs that you own so that you can select the AMIs that you care about quickly and easily. You can still browse the full catalog to find new AMIs.',
                    },
                  ]}
                  h5="Current improvements"
                />
              }
            />
            <Content loadHelpPanelContent={loadHelpPanelContent} />
          </SpaceBetween>
        }
        loadHelpPanelContent={() => {
          setToolsOpen(true);
          appLayout.current?.focusToolsClose();
        }}
        breadcrumbs={<Breadcrumbs />}
        navigation={<Navigation activeHref="launchEC2" />}
        toolsOpen={toolsOpen}
        tools={toolsContent}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        ariaLabels={appLayoutLabels}
        notifications={<Notifications />}
        contentType="wizard"
        disableBodyScroll={true}
      />
      <AppFooter />
    </>
  );
}

export default LaunchEC2;

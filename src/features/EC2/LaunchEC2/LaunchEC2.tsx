/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from 'react';
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
import useNotifications from '../commons/use-notifications';
import { Spinner } from '@cloudscape-design/components';

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
    <SpaceBetween size="xxs" direction="horizontal">
      <Grid
        style={{ position: 'relative' }}
        gridDefinition={[
          { colspan: { l: 8, m: 8, default: 12 } },
          { colspan: { l: 4, m: 4, default: 12 } },
        ]}
      >
        {/* Main Panel */}
        <div>
          <Panel1 loadHelpPanelContent={loadHelpPanelContent} />
        </div>
        <div style={{ position: 'sticky', top: '70px' }}>
          {/* Summary Panel */}

          <Panel2 createInstance={createInstance} />
        </div>
      </Grid>
    </SpaceBetween>
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
  return <Flashbar items={[]} />;
};

function LaunchEC2(props): JSX.Element {
  const appLayout = useRef();

  const [openNavigation, setOpenNavigation] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const { notifications, notifyInProgress } = useNotifications({
    resourceName: 'instance',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
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
  };

  useEffect(() => {
    document.title = 'Launch an EC2';
  }, []);

  return (
    <>
      <div id="h" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
        <AppHeader {...props} />
      </div>
      <AppLayout
        content={
          <>
            {!loading ? (
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
            ) : (
              <Spinner size="large" className="spinner" />
            )}
          </>
        }
        breadcrumbs={<Breadcrumbs />}
        navigation={<Navigation activeHref="launchEC2" />}
        toolsOpen={toolsOpen}
        tools={toolsContent}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        ariaLabels={appLayoutLabels}
        notifications={<Flashbar items={notifications} />}
        contentType="wizard"
        headerSelector="#h"
      />
      <AppFooter />
    </>
  );
}

export default LaunchEC2;

import React, { createRef, useState, useRef, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  AppLayout,
  Button,
  Container,
  ContentLayout,
  Header,
  Pagination,
  StatusIndicator,
  SpaceBetween,
  Table,
  BreadcrumbGroup,
  FormField,
  CollectionPreferences,
  Box,
  Icon,
  Alert,
  ExpandableSection,
  ColumnLayout,
  ButtonDropdown,
  Flashbar,
  Grid,
  Link,
  Modal,
  Tabs,
  TextFilter,
  Spinner,
} from '@cloudscape-design/components';
import {
  Navigation,
  ec2navItems,
  EC2Header,
} from '../commons/common-components';
import { appLayoutLabels } from '../../common/labels';
// import './styles/base.scss';
import { DashboardHeader, HelpPanels } from './header';
import useNotifications from '../commons/use-notifications';
import { AppHeader } from '../../common/TopNavigations';
import { AppFooter } from '../../common/AppFooter';
import LaunchTemplatePane1 from '../LaunchEC2/LaunchTemplatePane1';
import Panel2 from '../LaunchEC2/Panel2';
import Panel1 from '../LaunchEC2/Panel1';

const Content = ({ state, loadHelpPanelContent }) => {
  return (
    <SpaceBetween size="xxs" direction="horizontal">
      <Grid
        gridDefinition={[
          { colspan: { l: 8, m: 8, default: 12 } },
          { colspan: { l: 4, m: 4, default: 12 } },
        ]}
      >
        {/* Main Panel */}
        <div>
          <Panel1 state={state} loadHelpPanelContent={loadHelpPanelContent} />
        </div>
        <div style={{ position: 'sticky', top: '70px' }}>
          {/* Summary Panel */}

          <Panel2 state={state} />
        </div>
      </Grid>
    </SpaceBetween>
  );
};

function LaunchTemplate(props) {
  const { id } = useParams();
  const { state } = useLocation();
  const [toolsOpen, setToolsOpen] = useState(false);
  const [toolsIndex, setToolsIndex] = useState(0);
  const { notifications, notifyInProgress } = useNotifications({
    resourceName: 'instance',
  });
  const [loading, setLoading] = useState(true);

  const [toolsContent, setToolsContent] = useState(
    <HelpPanels
      title={id}
      des="Amazon Elastic Compute Cloud (Amazon EC2) is a web service that provides
        resizeable computing capacity&mdash;literally, servers in Amazon's data
        centers&mdash;that you use to build and host your software systems."
    />
  );
  useEffect(() => {
    document.title = 'Create launch template';
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
                      title="Create launch template"
                      des="Creating a launch template allows you to create a saved instance configuration that can be reused, shared and launched at a later time. Templates can have multiple versions."
                      info="Creating a launch template allows you to create a saved instance configuration that can be reused, shared and launched at a later time. Templates can have multiple versions."
                    />
                  }
                />
                <Content
                  state={state}
                  loadHelpPanelContent={loadHelpPanelContent}
                />
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
              { text: 'Instances', href: '/ec2_instance/Launch template/home' },
              { text: 'Create launch template', href: '#' },
            ]}
            expandAriaLabel="Show path"
            ariaLabel="Breadcrumbs"
          />
        }
        navigation={
          <Navigation
            activeHref="/ec2_instance/LaunchInstanceFromTemplate"
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

export default LaunchTemplate;

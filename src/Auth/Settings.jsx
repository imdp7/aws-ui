import React, { useEffect, useState } from 'react';
import { AppHeader } from '../features/common/TopNavigations';
import {
  AppLayout,
  SpaceBetween,
  Container,
  Box,
  Header,
  Link,
  Button,
  ColumnLayout,
  Popover,
  Spinner,
} from '@cloudscape-design/components';
import { AppFooter } from '../features/common/AppFooter';

const Content = () => {
  return (
    <SpaceBetween size="m">
      <Box
        margin={{ bottom: 's' }}
        padding={{ horizontal: 'l', vertical: 'l' }}
      >
        <Header
          variant="awsui-h1-sticky"
          info={<Link>Info</Link>}
          description="Manage settings for the current user. These settings do not apply to other IAM users or accounts."
          actions={<Button>Reset all</Button>}
        >
          Unified Settings
        </Header>
      </Box>
      <Container
        header={
          <Header
            description="Choose the language and locale settings in the AWS Management Console, and control which Region is active when you sign in."
            actions={<Button>Edit</Button>}
          >
            Localization and default Region
          </Header>
        }
      >
        <ColumnLayout columns={2} variant="text-grid">
          <SpaceBetween size="xxs" direction="vertical">
            <Box color="text-body-secondary" fontWeight="bold">
              Language
            </Box>
            <Box>Browser Default</Box>
          </SpaceBetween>
          <SpaceBetween size="xxs" direction="vertical">
            <Box color="text-body-secondary" fontWeight="bold">
              Default Region
            </Box>
            <Box>US East (N. Virginia) us-east-1</Box>
          </SpaceBetween>
        </ColumnLayout>
      </Container>
      <Container
        header={
          <Header
            description="Customize the appearance of AWS Management Console elements."
            actions={<Button>Edit</Button>}
          >
            Display
          </Header>
        }
      >
        <ColumnLayout columns={3} variant="text-grid">
          <SpaceBetween size="xxs" direction="vertical">
            <SpaceBetween size="xxs" direction="horizontal">
              <Box color="text-body-secondary" fontWeight="bold">
                Visual mode
              </Box>
              <Popover
                dismissButton={true}
                position="right"
                size="small"
                triggerType="text"
                content={
                  <Box>
                    Choose your preferred visual mode. Dark mode might not apply
                    across all AWS service consoles.
                  </Box>
                }
              >
                <Box
                  color="text-status-info"
                  fontSize="body-s"
                  data-testid="new-feature-announcement-trigger"
                >
                  Beta
                </Box>
              </Popover>
            </SpaceBetween>
            <Box>Light</Box>
          </SpaceBetween>
          <SpaceBetween size="xxs" direction="vertical">
            <Box color="text-body-secondary" fontWeight="bold">
              Favorites bar display
            </Box>
            <Box>Service name and icon</Box>
          </SpaceBetween>
          <SpaceBetween size="xxs" direction="vertical">
            <Box color="text-body-secondary" fontWeight="bold">
              Favorites bar icon size
            </Box>
            <Box>Large</Box>
          </SpaceBetween>
        </ColumnLayout>
      </Container>
      <Container
        header={
          <Header
            description="Decide if the AWS Management Console remembers your activity."
            actions={<Button>Edit</Button>}
          >
            Settings management
          </Header>
        }
      >
        <ColumnLayout columns={2} variant="text-grid">
          <SpaceBetween size="xxs" direction="vertical">
            <Box color="text-body-secondary" fontWeight="bold">
              Remember recently visited services
            </Box>
            <Box>Yes</Box>
          </SpaceBetween>
        </ColumnLayout>
      </Container>
    </SpaceBetween>
  );
};

function Settings(props) {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadHelpPanelContent = (toolsContent) => {
    setToolsOpen(true);
  };

  useEffect(() => {
    document.title = 'Unified Settings';
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
        navigationHide={true}
        content={
          !loading ? <Content /> : <Spinner size="large" className="spinner" />
        }
        stickyNotifications={true}
        headerSelector="#h"
        // disableContentPaddings={true}
        toolsOpen={toolsOpen}
        contentType="table"
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        footerSelector="#f"
      />
      <AppFooter />
    </>
  );
}

export default Settings;

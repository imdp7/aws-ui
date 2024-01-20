/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Box,
  ColumnLayout,
  Container,
  Header,
  Link,
  SpaceBetween,
  AppLayout,
  Autosuggest,
} from '@cloudscape-design/components';
import { AppHeader } from '../common/TopNavigations';
import { InfoLink } from '../EC2/commons/common-components';
import { HelpPanels } from '../EC2/components/header';
import classes from '../../app.module.scss';
import { appLayoutLabels } from '../common/labels';
import { AppFooter } from '../common/AppFooter';
import { getServicesCache } from '../common/utils/Cache';

const HomeHeader = ({ loadHelpPanelContent }): JSX.Element => {
  return (
    <SpaceBetween size="m">
      <Box
        margin={{ bottom: 'l' }}
        padding={{ horizontal: 'xxxl', vertical: 'l' }}
      >
        <Header
          variant="h1"
          info={
            <InfoLink
              onFollow={() =>
                loadHelpPanelContent(
                  <HelpPanels
                    title="All Services"
                    info="Console Home displays widgets with important information about your AWS environment."
                    des="Amazon EC2 allows you to create virtual machines, or instances, that run on the AWS Cloud. Quickly get started by following the simple steps below."
                    ul={[
                      {
                        h5: 'Customize your Console Home',
                        text: 'You can add a widget from the actions menu, change its size from the widget menu, or drag and drop it to change its position. Changes you make do not affect others using your shared account.',
                      },
                      {
                        h5: 'Change the language of the console',
                        text: 'You can now change the display language for the AWS Management Console in the Unified Settings page. For more information, see Changing the language of the AWS Management Console.',
                      },
                    ]}
                  />
                )
              }
            />
          }
        >
          All Services
        </Header>
        <Box
          variant="p"
          fontWeight="light"
          color="inherit"
          className={classes.home_header_secondary}
        >
          Descriptive information about all services by AWS
        </Box>
      </Box>
    </SpaceBetween>
  );
};

const Content = ({ loadHelpPanelContent }): JSX.Element => {
  const [services, setServices] = React.useState([]);
  const [search, setSearch] = React.useState('');

  useEffect(() => {
    const getCacheData = async () => {
      const data = await getServicesCache();
      setServices(data);
    };
    getCacheData();
  }, []);

  const filteredServices = services.filter((option) =>
    Object.values(option).join(' ').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SpaceBetween size="l">
      <HomeHeader loadHelpPanelContent={loadHelpPanelContent} />
      <Container
        header={
          <Header
            variant="h2"
            actions={
              <Autosuggest
                value={search}
                options={filteredServices.map((option) => ({
                  value: option.title,
                  label: option.title,
                  iconUrl: option.img,
                  link: option.link,
                }))}
                onChange={({ detail }) => setSearch(detail.value)}
                ariaLabel="Search services"
                placeholder="Search services"
                empty="No matches found"
              />
            }
            info={
              <InfoLink
                onFollow={() =>
                  loadHelpPanelContent(
                    <HelpPanels
                      title="Services by category"
                      des="Jump in where you left off and navigate to the AWS services you most recently worked with."
                      h5="To view all AWS services choose View all AWS services at the bottom of the widget."
                    />
                  )
                }
              />
            }
          >
            Services by category
          </Header>
        }
      >
        <ColumnLayout columns={3}>
          {filteredServices.map((d) => (
            <div key={d?._id}>
              <Container
                header={
                  <Header>
                    <SpaceBetween size="m" direction="horizontal">
                      <img src={d?.img} height={40} width={40} />
                      <Link variant="secondary" href={`${d?.link}`}>
                        <Box variant="h2">{d?.title}</Box>
                      </Link>
                    </SpaceBetween>
                  </Header>
                }
              >
                <Box variant="p">{d?.description}</Box>
              </Container>
            </div>
          ))}
        </ColumnLayout>
      </Container>
    </SpaceBetween>
  );
};

function AllServices(props): JSX.Element {
  const [toolsOpen, setToolsOpen] = useState<boolean>(false);
  const [toolsContent, setToolsContent] = useState(
    <HelpPanels
      title="All Services"
      info="Console Home displays widgets with important information about your AWS environment."
      des="Amazon EC2 allows you to create virtual machines, or instances, that run on the AWS Cloud. Quickly get started by following the simple steps below."
      ul={[
        {
          h5: 'Customize your Console Home',
          text: 'You can add a widget from the actions menu, change its size from the widget menu, or drag and drop it to change its position. Changes you make do not affect others using your shared account.',
        },
        {
          h5: 'Change the language of the console',
          text: 'You can now change the display language for the AWS Management Console in the Unified Settings page. For more information, see Changing the language of the AWS Management Console.',
        },
      ]}
    />
  );
  const loadHelpPanelContent = (toolsContent) => {
    setToolsOpen(true);
    setToolsContent(toolsContent);
  };

  useEffect(() => {
    document.title = 'AWS Services';
  }, []);

  return (
    <>
      <div id="h" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
        <AppHeader {...props} />
      </div>
      <AppLayout
        navigationHide={true}
        content={<Content loadHelpPanelContent={loadHelpPanelContent} />}
        stickyNotifications={true}
        headerSelector="#h"
        // disableContentPaddings={true}
        toolsOpen={toolsOpen}
        tools={toolsContent}
        contentType="table"
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        ariaLabels={appLayoutLabels}
        footerSelector="#f"
      />
      <AppFooter />
    </>
  );
}

export default AllServices;

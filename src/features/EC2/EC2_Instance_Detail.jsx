/* eslint-disable react/prop-types */
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { createRef, useState, useRef } from 'react';
import { useNavigation, useParams } from 'react-router-dom';
import {
  AppLayout,
  Button,
  Container,
  ContentLayout,
  Header,
  Pagination,
  SpaceBetween,
  Table,
  Box,
  Alert,
  Flashbar,
  Link,
  Modal,
  Tabs,
  TextFilter,
} from '@cloudscape-design/components';
import { useCollection } from '@cloudscape-design/collection-hooks';
import { useAsyncData } from './commons/use-async-data';
import DataProvider from './commons/data-provider';
import {
  INSTANCE_DROPDOWN_ITEMS,
  LOGS_COLUMN_DEFINITIONS,
  INVALIDATIONS_COLUMN_DEFINITIONS,
} from './commons/details-config.jsx';
import {
  BehaviorsTable,
  Breadcrumbs,
  EmptyTable,
  GeneralConfig,
  OriginsTable,
  PageHeader,
  SettingsDetails,
  TagsTable,
} from './commons/detail-common.jsx';
import {
  Navigation,
  TableEmptyState,
  TableNoMatchState,
  TableHeader,
} from './commons/common-components';
import {
  appLayoutLabels,
  logsSelectionLabels,
  paginationLabels,
} from '../../features/common/labels';
import { getFilterCounterText } from '../../features/common/tableCounterStrings';
import ToolsContent from './components/tools-content';
// import './styles/base.scss';
import { DashboardHeader } from './components/header';
import useNotifications from './commons/use-notifications';
import { AppHeader } from '../common/TopNavigations';
import { AppFooter } from '../common/AppFooter';

const Details = ({ loadHelpPanelContent, id }) => (
  <Container
    header={
      <Header
        variant="h2"
        info={
          <DashboardHeader
            loadHelpPanelContent={loadHelpPanelContent}
            title="Details"
            des="Amazon Elastic Compute Cloud (Amazon EC2) is a web service that provides
                         resizeable computing capacity&mdash;literally, servers in Amazon's data
                         centers&mdash;that you use to build and host your software systems."
          />
        }
        actions={<Button>Edit</Button>}
      />
    }
  >
    <SettingsDetails id={id} isInProgress={false} />
  </Container>
);

function LogsTable() {
  const [logs, logsLoading] = useAsyncData(() =>
    new DataProvider().getData('logs')
  );
  const [selectedItems, setSelectedItems] = useState([]);
  const isOnlyOneSelected = selectedItems.length === 1;
  const atLeastOneSelected = selectedItems.length > 0;
  const {
    items,
    actions,
    filteredItemsCount,
    collectionProps,
    filterProps,
    paginationProps,
  } = useCollection(logs, {
    filtering: {
      empty: <TableEmptyState resourceName="Log" />,
      noMatch: (
        <TableNoMatchState onClearFilter={() => actions.setFiltering('')} />
      ),
    },
    pagination: { pageSize: 10 },
  });

  return (
    <Table
      className="logs-table"
      {...collectionProps}
      loading={logsLoading}
      loadingText="Loading logs"
      columnDefinitions={LOGS_COLUMN_DEFINITIONS}
      items={items}
      ariaLabels={logsSelectionLabels}
      selectionType="multi"
      selectedItems={selectedItems}
      resizableColumns
      onSelectionChange={(evt) => setSelectedItems(evt.detail.selectedItems)}
      header={
        <TableHeader
          title="Logs"
          selectedItems={selectedItems}
          totalItems={logs}
          actionButtons={
            <SpaceBetween direction="horizontal" size="xs">
              <Button disabled={!isOnlyOneSelected}>View</Button>
              <Button disabled={!atLeastOneSelected}>Watch</Button>
              <Button disabled={!atLeastOneSelected}>Download</Button>
            </SpaceBetween>
          }
        />
      }
      filter={
        <TextFilter
          {...filterProps}
          filteringAriaLabel="Find logs"
          filteringPlaceholder="Find logs"
          countText={getFilterCounterText(filteredItemsCount)}
        />
      }
      pagination={
        <Pagination {...paginationProps} ariaLabels={paginationLabels} />
      }
    />
  );
}

function DeleteModal({ distributions, visible, onDiscard, onDelete }) {
  const isMultiple = distributions.length > 1;
  return (
    <Modal
      visible={visible}
      onDismiss={onDiscard}
      header={isMultiple ? 'Delete distributions' : 'Delete distribution'}
      closeAriaLabel="Close dialog"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={onDiscard}>
              Cancel
            </Button>
            <Button variant="primary" onClick={onDelete}>
              Delete
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      {distributions.length > 0 && (
        <SpaceBetween size="m">
          {isMultiple ? (
            <Box variant="span">
              Delete{' '}
              <Box variant="span" fontWeight="bold">
                {distributions.length} distributions
              </Box>{' '}
              permanently? This action cannot be undone.
            </Box>
          ) : (
            <Box variant="span">
              Delete distribution{' '}
              <Box variant="span" fontWeight="bold">
                {distributions[0].id}
              </Box>{' '}
              permanently? This action cannot be undone.
            </Box>
          )}

          <Alert statusIconAriaLabel="Info">
            Proceeding with this action will delete distribution(s) with all
            content and can impact related resources.{' '}
            <Link external={true} href="#">
              Learn more
            </Link>
          </Alert>
        </SpaceBetween>
      )}
    </Modal>
  );
}

export function EC2_Instances_Detail(props) {
  const { id } = useParams();
  const [toolsOpen, setToolsOpen] = useState(false);
  const [toolsIndex, setToolsIndex] = useState(0);
  const { notifications, notifyInProgress } = useNotifications({
    resourceName: 'instance',
  });

  const loadHelpPanelContent = (toolsContent) => {
    setToolsOpen(true);
    setToolsContent(toolsContent);
  };

  const tabs = [
    {
      label: 'Details',
      id: 'details',
      content: <Details id={id} loadHelpPanelContent={loadHelpPanelContent} />,
    },
    {
      label: 'Logs',
      id: 'logs',
      content: <LogsTable />,
    },
    {
      label: 'Origins',
      id: 'origins',
      content: <OriginsTable />,
    },
    {
      label: 'Behaviors',
      id: 'behaviors',
      content: <BehaviorsTable />,
    },
    {
      label: 'Invalidations',
      id: 'invalidations',
      content: (
        <EmptyTable
          title="Invalidation"
          columnDefinitions={INVALIDATIONS_COLUMN_DEFINITIONS}
        />
      ),
    },
    {
      label: 'Tags',
      id: 'tags',
      content: <TagsTable loadHelpPanelContent={loadHelpPanelContent} />,
    },
  ];

  return (
    <>
      <div id="h" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
        <AppHeader {...props} />
      </div>

      <AppLayout
        content={
          <ContentLayout
            header={
              <PageHeader
                id={id}
                buttons={[
                  { text: 'Actions', items: INSTANCE_DROPDOWN_ITEMS },
                  { text: 'Edit' },
                  { text: 'Delete' },
                ]}
              />
            }
          >
            <SpaceBetween size="l">
              <GeneralConfig />
              <Tabs tabs={tabs} ariaLabel="Resource details" />
            </SpaceBetween>
          </ContentLayout>
        }
        headerSelector="#h"
        breadcrumbs={<Breadcrumbs id={id} />}
        navigation={<Navigation activeHref="instances" />}
        tools={ToolsContent[toolsIndex]}
        toolsOpen={toolsOpen}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        ariaLabels={appLayoutLabels}
        notifications={<Flashbar items={notifications} />}
        contentType="wizard"
      />
      <AppFooter />
    </>
  );
}

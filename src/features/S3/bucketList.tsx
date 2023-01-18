/* eslint-disable react/prop-types */
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Content } from '../EC2/commons/Home';
import { AppHeader } from '../common/TopNavigations';
import { AppFooter } from '../common/AppFooter';
import {
  COLUMN_DEFINITIONS,
  VISIBLE_CONTENT_OPTIONS,
  PAGE_SIZE_OPTIONS,
  SEARCHABLE_COLUMNS,
} from './components/table-select-filter-config';
import {
  AppLayout,
  Container,
  ContentLayout,
  SpaceBetween,
  Spinner,
  Header,
  Box,
  Input,
  Select,
  TextFilter,
  Pagination,
  CollectionPreferences,
  Table,
  BreadcrumbGroup,
  Button,
} from '@cloudscape-design/components';
import {
  CustomAppLayout,
  Notifications,
  TableEmptyState,
  TableHeader,
  TableNoMatchState,
} from '../EC2/commons/common-components';
import DATA from '../resources/s3Bucket';
import { useColumnWidths } from '../EC2/commons/use-column-widths';
import { Provider } from 'react-redux';
import { appLayoutLabels, paginationLabels } from '../common/labels';
import { store } from '../../app/store';
import {
  Navigation,
  S3navItems,
  S3Header,
} from '../EC2/commons/common-components';
import { DashboardHeader, HelpPanels } from '../EC2/components/header';
import { useCollection } from '@cloudscape-design/collection-hooks';
import { useLocalStorage } from '../common/localStorage';

const defaultEngine = { value: '0', label: 'Any Engine' };
const defaultClass = { value: '0', label: 'Any Class' };
const selectEngineOptions = prepareSelectOptions('engine', defaultEngine);
const selectClassOptions = prepareSelectOptions('class', defaultClass);


function prepareSelectOptions(field, defaultOption) {
  const optionSet = [];
  // Building a non redundant list of the field passed as parameter.

  DATA.forEach(item => {
    if (optionSet.indexOf(item[field]) === -1) {
      optionSet.push(item[field]);
    }
  });
  optionSet.sort();

  // The first element is the default one.
  const options = [defaultOption];

  // Adding the other element ot the list.
  optionSet.forEach((item, index) => options.push({ label: item, value: (index + 1).toString() }));
  return options;
}

function matchesEngine(item, selectedEngine) {
  return selectedEngine === defaultEngine || item.engine === selectedEngine.label;
}

function matchesClass(item, selectedClass) {
  return selectedClass === defaultClass || item.class === selectedClass.label;
}


const TableContent = ({ loadHelpPanelContent }) => {
  const [loading, setLoading] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState([]);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };


  const [columnDefinitions, saveWidths] = useColumnWidths('React-TableSelectFilter-Widths', COLUMN_DEFINITIONS);
  const [engine, setEngine] = useState(defaultEngine);
  const [instanceClass, setInstanceClass] = useState(defaultClass);
  const [preferences, setPreferences] = useLocalStorage('React-DBInstancesTable-Preferences', {
    pageSize: 10,
    visibleContent: ['name', 'awsRegion', 'privateAccess', 'createdAt'],
    wrapLines: false,
    stripedRows: true,
    custom: 'table',
  });
  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(DATA, {
    filtering: {
      empty: <TableEmptyState resourceName="Instance" />,
      noMatch: <TableNoMatchState onClearFilter={clearFilter} />,
      filteringFunction: (item, filteringText) => {
        if (!matchesEngine(item, engine)) {
          return false;
        }
        if (!matchesClass(item, instanceClass)) {
          return false;
        }
        const filteringTextLowerCase = filteringText.toLowerCase();

        return SEARCHABLE_COLUMNS.map(key => item[key]).some(
          value => typeof value === 'string' && value.toLowerCase().indexOf(filteringTextLowerCase) > -1
        );
      },
    },
    pagination: { pageSize: preferences.pageSize },
    sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
    selection: {},
  });
  useLayoutEffect(() => {
    collectionProps.ref.current?.scrollToTop();
  }, [instanceClass, engine, collectionProps.ref, filterProps.filteringText]);

  function clearFilter() {
    actions.setFiltering('');
    setEngine(defaultEngine);
    setInstanceClass(defaultClass);
  }


  return (
    <SpaceBetween size="xxs">
     {/* <Table
        {...collectionProps}
        onSelectionChange={({ detail }) =>
          setSelectedItems(detail.selectedItems)
        }
        wrapLines={preferences.wrapLines}
        stripedRows={preferences.stripedRows}
        variant="container"
        selectedItems={selectedItems}
        ariaLabels={{
          selectionGroupLabel: 'Items selection',
          allItemsSelectionLabel: ({ selectedItems }) =>
            `${selectedItems.length} ${
              selectedItems.length === 1 ? 'item' : 'items'
            } selected`,
          itemSelectionLabel: ({ selectedItems }, item) => {
            const isItemSelected = selectedItems.filter(
              (i) => i.name === item.name
            ).length;
            return `${item.name} is ${isItemSelected ? '' : 'not'} selected`;
          },
        }}
        columnDefinitions={[
          {
            id: 'name',
            header: 'Name',
            cell: (e) => e.name,
            sortingField: 'name',
          },
          {
            id: 'awsRegion',
            header: 'AWS Region',
            cell: (e) => e.awsRegion,
            sortingField: 'awsRegion',
          },
          {
            id: 'access',
            header: 'Access',
            cell: (e) => e.privateAccess,
            sortingField: 'PrivateAccess',
          },
          {
            id: 'version',
            header: 'Version Controlling',
            cell: (e) => e.version,
            sortingField: 'version',
          },
          {
            id: 'createdAt',
            header: 'Creation Date',
            cell: (e) => e.createdAt,
            sortingField: 'createdAt',
          },
        ]}
        items={items}

        loadingText="Loading resources"
        selectionType="single"
        trackBy="name"
        visibleColumns={preferences.visibleContentPreference}
        empty={
          <Box textAlign="center" color="inherit">
            <b>No resources</b>
            <Box padding={{ bottom: 's' }} variant="p" color="inherit">
              No resources to display.
            </Box>
            <Button>Create resource</Button>
          </Box>
        }
        filter={
          <TextFilter
            filteringPlaceholder="Find buckets by name"
            filteringText=""
          />
        }
        header={
          // <Header
          //   description="Buckets are containers for data stored in S3"
          //   counter={
          //     selectedItems.length
          //       ? '(' + selectedItems.length + '/10)'
          //       : '(10)'
          //   }
          //   actions={
          //     <SpaceBetween size="m" direction="horizontal">
          //       <Button
          //         ariaExpanded
          //         loading={loading}
          //         iconName="refresh"
          //         onClick={handleRefresh}
          //       />
          //       <Button iconName="copy" disabled>
          //         Copy ARN
          //       </Button>
          //       <Button disabled>Empty</Button>
          //       <Button disabled={collectionProps.selectedItems.length === 0}>Delete</Button>
          //       <Button variant="primary">Create Bucket</Button>
          //     </SpaceBetween>
          //   }
          // >
          //   Buckets
          // </Header>
          <TableHeader
          title="Buckets"
          variant="awsui-h1-sticky"
          selectedItems={collectionProps.selectedItems}
          totalItems={DATA}
          loadHelpPanelContent={loadHelpPanelContent}
          actionButtons={
            <SpaceBetween size="xs" direction="horizontal">
            <Button
                  ariaExpanded
                  loading={loading}
                  iconName="refresh"
                  onClick={handleRefresh}
                />
              <Button iconName="copy" disabled>
                Copy ARN
              </Button>
              <Button disabled>Empty</Button>
              <Button disabled={collectionProps.selectedItems.length === 0}>Delete</Button>
              <Button variant="primary">Create Bucket</Button>
            </SpaceBetween>
          }
        />
        }
        pagination={<Pagination {...paginationProps} ariaLabels={paginationLabels} />}
        preferences={
          <CollectionPreferences
            title="Preferences"
            confirmLabel="Confirm"
            cancelLabel="Cancel"
            preferences={preferences}
            onConfirm={({ detail }) => setPreferences(detail)}
            pageSizePreference={{
              title: 'Select page size',
              options: [
                { value: 100, label: '100 buckets' },
              ],
            }}
            wrapLinesPreference={{
              label: "Wrap lines",
              description: "Wrap lines description"
            }}
            stripedRowsPreference={{
              label: "Strip Rows",
              description: "Striped Rows description"
            }}
            visibleContentPreference={{
              title: 'Select visible content',
              options: [
                {
                  label: 'Main distribution properties',
                  options: [
                    {
                      id: 'name',
                      label: 'Name',
                      editable: false,
                    },
                    { id: 'awsRegion', label: 'AWS Region' },
                    { id: 'privateAccess', label: 'Access' },
                    { id: 'version', label: 'Version Controlling'},
                    {
                      id: 'createdAt',
                      label: 'Created At',
                    },

                  ],
                },
              ],
            }}
          />
        }
      />*/}
    <Table
      {...collectionProps}
      columnDefinitions={columnDefinitions}
      visibleColumns={preferences.visibleContent}
      items={items}
      variant="container"
      resizableColumns={true}
      onColumnWidthsChange={saveWidths}
      wrapLines={preferences.wrapLines}
      stripedRows={preferences.stripedRows}
      selectionType="single"
      ariaLabels={{
        itemSelectionLabel: (data, row) => `Select DB instance ${row.id}`,
        allItemsSelectionLabel: () => 'Select all DB instances',
        selectionGroupLabel: 'Instances selection',
      }}
      header={
        <TableHeader
          title="Buckets"
          variant="awsui-h1-sticky"
          selectedItems={collectionProps.selectedItems}
          totalItems={DATA}
          loadHelpPanelContent={loadHelpPanelContent}
          actionButtons={
            <SpaceBetween size="m" direction="horizontal">
                <Button
                  ariaExpanded
                  loading={loading}
                  iconName="refresh"
                  onClick={handleRefresh}
                />
                <Button iconName="copy" disabled>
                  Copy ARN
                </Button>
                <Button disabled>Empty</Button>
                <Button disabled={collectionProps.selectedItems.length === 0}>Delete</Button>
                <Button variant="primary">Create Bucket</Button>
              </SpaceBetween>
          }
        />
      }
      filter={
          <TextFilter
            filteringPlaceholder="Find buckets by name"
            value={filterProps.filteringText}
              onChange={event => {
                actions.setFiltering(event.detail.value);
              }}
              placeholder="Find Buckets"
              label="Find Buckets"
              ariaDescribedby={null}
          />
        }
      // filter={
      //   <div className="input-container">
      //     <div className="input-filter">
      //       <Input
      //         data-testid="input-filter"
      //         type="search"
      //         value={filterProps.filteringText}
      //         onChange={event => {
      //           actions.setFiltering(event.detail.value);
      //         }}
      //         placeholder="Find instances"
      //         label="Find instances"
      //         ariaDescribedby={null}
      //       />
      //     </div>
      //     <div className="select-filter">
      //       <Select
      //         data-testid="engine-filter"
      //         options={selectEngineOptions}
      //         selectedAriaLabel="Selected"
      //         selectedOption={engine}
      //         onChange={event => {
      //           setEngine(event.detail.selectedOption);
      //         }}
      //         ariaDescribedby={null}
      //         expandToViewport={true}
      //       />
      //     </div>
      //     <div className="select-filter">
      //       <Select
      //         data-testid="class-filter"
      //         options={selectClassOptions}
      //         selectedAriaLabel="Selected"
      //         selectedOption={instanceClass}
      //         onChange={event => {
      //           setInstanceClass(event.detail.selectedOption);
      //         }}
      //         ariaDescribedby={null}
      //         expandToViewport={true}
      //       />
      //     </div>
      //     {(filterProps.filteringText || engine !== defaultEngine || instanceClass !== defaultClass) && (
      //       <span className="filtering-results">{getFilterCounterText(filteredItemsCount)}</span>
      //     )}
      //   </div>
      // }
      pagination={<Pagination {...paginationProps} ariaLabels={paginationLabels} />}
      preferences={
        <CollectionPreferences
          title="Preferences"
          confirmLabel="Confirm"
          cancelLabel="Cancel"
          preferences={preferences}
          onConfirm={({ detail }) => setPreferences(detail)}
          pageSizePreference={{
            title: 'Page size',
            options: PAGE_SIZE_OPTIONS,
          }}
          wrapLinesPreference={{
            label: 'Wrap lines',
            description: 'Check to see all the text and wrap the lines',
          }}
          stripedRowsPreference={{
            label: 'Striped rows',
            description: 'Check to add alternating shaded rows',
          }}
          visibleContentPreference={{
            title: 'Select visible columns',
            options: VISIBLE_CONTENT_OPTIONS,
          }}
        />
      }
    />
    </SpaceBetween>
  );
};

export default function BucketList(props) {
  const [loading, setLoading] = useState(false);
  const [activeHref, setActiveHref] = useState('buckets');
  const [toolsOpen, setToolsOpen] = useState(false);
  const [toolsContent, setToolsContent] = useState(
    <HelpPanels
      title="Buckets"
      info="Buckets are containers for objects stored in Amazon S3. You can store any number of objects in a bucket and can have up to 100 buckets in your account. To request an increase, visit the Service Quotas Console . You can create, configure, empty, and delete buckets. However, you can only delete an empty bucket."
      ul={[
        {
          h5: 'Manage access',
          text: `Buckets are private and can only be accessed if you explicitly grant permissions. To review the public access settings for your buckets, make sure that you have the required permissions or you'll get an error. Use bucket policies, IAM policies, access control lists (ACLs), and S3 Access Points to manage access.`,
        },
        {
          h5: 'Configure your bucket',
          text: 'You can configure your bucket to support your use case. For example, host a static website, use S3 Versioning and replication for disaster recovery, S3 Lifecycle to manage storage costs, and logging to track requests.',
        },
        {
          h5: 'Understand storage usage and activity',
          text: 'The S3 Storage Lens account snapshot displays your total storage, object count, and average object size for all buckets in the account. View your S3 Storage Lens dashboard to analyze your usage and activity trends by AWS Region, storage class, bucket, or prefix.',
        },
      ]}
    />
  );
  const loadHelpPanelContent = (toolsContent) => {
    setToolsOpen(true);
    setToolsContent(toolsContent);
  };

  useEffect(() => {
    document.title = 'S3 Management Console';
  }, [location]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
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
        headerSelector="#h"
        footerSelector="#f"
        contentType="wizard"
        breadcrumbs={
          <BreadcrumbGroup
            items={[
              { text: 'Amazon S3', href: 'home' },
              { text: 'Buckets', href: 'bucket' },
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
        content={
          <SpaceBetween size="l">
            <ContentLayout
              header={
                <DashboardHeader
                  loadHelpPanelContent={loadHelpPanelContent}
                  title="Buckets"
                  info="Buckets are containers for objects stored in Amazon S3. You can store any number of objects in a bucket and can have up to 100 buckets in your account. To request an increase, visit the Service Quotas Console . You can create, configure, empty, and delete buckets. However, you can only delete an empty bucket."
                  ul={[
                    {
                      h5: 'Manage access',
                      text: `Buckets are private and can only be accessed if you explicitly grant permissions. To review the public access settings for your buckets, make sure that you have the required permissions or you'll get an error. Use bucket policies, IAM policies, access control lists (ACLs), and S3 Access Points to manage access.`,
                    },
                    {
                      h5: 'Configure your bucket',
                      text: 'You can configure your bucket to support your use case. For example, host a static website, use S3 Versioning and replication for disaster recovery, S3 Lifecycle to manage storage costs, and logging to track requests.',
                    },
                    {
                      h5: 'Understand storage usage and activity',
                      text: 'The S3 Storage Lens account snapshot displays your total storage, object count, and average object size for all buckets in the account. View your S3 Storage Lens dashboard to analyze your usage and activity trends by AWS Region, storage class, bucket, or prefix.',
                    },
                  ]}
                />
              }
            />
            <TableContent loadHelpPanelContent={loadHelpPanelContent} />
          </SpaceBetween>
        }
      />
      <AppFooter />
    </>
  );
}

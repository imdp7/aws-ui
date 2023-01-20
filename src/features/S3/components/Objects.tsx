import React, { useState } from 'react';
import {
  Container,
  SpaceBetween,
  Box,
  Button,
  TextFilter,
  Pagination,
  Table,
  Header,
  CollectionPreferences,
  Link,
} from '@cloudscape-design/components';
import { useLocalStorage } from '../../common/localStorage';

const visibleContent = ['name', 'awsRegion', 'privateAccess', 'createdAt'];

export const ObjectsPane = (props) => {
  const data = [{ title: 'Objects' }];

  const [selectedItems, setSelectedItems] = React.useState([]);

  const [preferences, setPreferences] = useLocalStorage(
    'React-DBInstancesTable-Preferences',
    {
      pageSize: 10,
      visibleContent: [{ visibleContent }],
      wrapLines: true,
      stripedRows: true,
      custom: 'table',
    }
  );

  return (
    <Table
      onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
      variant="stacked"
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
          id: 'variable',
          header: 'Variable name',
          cell: (e) => e.name,
          sortingField: 'name',
        },
        {
          id: 'value',
          header: 'Text value',
          cell: (e) => e.alt,
          sortingField: 'alt',
        },
        { id: 'type', header: 'Type', cell: (e) => e.type },
        {
          id: 'description',
          header: 'Description',
          cell: (e) => e.description,
        },
      ]}
      items={[]}
      loadingText="Loading resources"
      selectionType="multi"
      trackBy="name"
      visibleColumns={['variable', 'value', 'type', 'description']}
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
          filteringPlaceholder="Find objects by prefix"
          filteringText=""
        />
      }
      header={
        <Header
          description={
            <>
              {props.desc ? (
                props.desc
              ) : (
                <>
                  Objects are the fundamental entities stored in Amazon S3. You
                  can use {''}
                  <Link
                    external
                    externalIconAriaLabel="Opens in a new tab"
                    href="https://docs.aws.amazon.com/console/s3/inventory"
                  >
                    Amazon S3 inventory{' '}
                  </Link>{' '}
                  to get a list of all objects in your bucket. For others to
                  access your objects, you’ll need to explicitly grant them
                  permissions.{' '}
                  <Link
                    external
                    externalIconAriaLabel="Opens in a new tab"
                    href="https://docs.aws.amazon.com/console/s3/inventory"
                  >
                    {' '}
                    Learn more
                  </Link>{' '}
                </>
              )}
            </>
          }
          counter={
            selectedItems.length ? '(' + selectedItems.length + '/10)' : '(10)'
          }
          info={<Link variant="info">Info</Link>}
          actions={
            <>
              {props.upload !== 'true' ? (
                <SpaceBetween size="xs" direction="horizontal">
                  <Button iconName="refresh" />
                  <Button iconName="copy" disabled={selectedItems.length === 0}>
                    Copy S3 URI
                  </Button>
                  <Button iconName="copy" disabled={selectedItems.length === 0}>
                    S3 URL
                  </Button>
                  <Button
                    iconName="download"
                    disabled={selectedItems.length === 0}
                  >
                    Download
                  </Button>
                  <Button
                    iconName="external"
                    iconAlign="right"
                    disabled={selectedItems.length === 0}
                  >
                    Open
                  </Button>
                  <Button disabled={selectedItems.length === 0}>Delete</Button>
                  <Button iconName="caret-down" iconAlign="right">
                    Actions
                  </Button>
                  <Button>Create Folder</Button>
                  <Button
                    iconName="upload"
                    variant="primary"
                    onClick={() =>
                      (window.location.href = `${props.id}/upload`)
                    }
                  >
                    Upload
                  </Button>
                </SpaceBetween>
              ) : (
                <SpaceBetween size="xs" direction="horizontal">
                  <Button
                    iconName="remove"
                    disabled={selectedItems.length === 0}
                  >
                    Remove
                  </Button>
                  <Button iconName="file">Add Files</Button>
                  <Button iconName="folder">Add Folder</Button>
                </SpaceBetween>
              )}
            </>
          }
        >
          {props.title ? props.title : data[0].title}
        </Header>
      }
      pagination={
        <Pagination
          currentPageIndex={1}
          pagesCount={2}
          ariaLabels={{
            nextPageLabel: 'Next page',
            previousPageLabel: 'Previous page',
            pageLabel: (pageNumber) => `Page ${pageNumber} of all pages`,
          }}
        />
      }
      preferences={
        <CollectionPreferences
          title="Preferences"
          confirmLabel="Confirm"
          cancelLabel="Cancel"
          preferences={preferences}
          pageSizePreference={{
            title: 'Select page size',
            options: [
              { value: 10, label: '10 resources' },
              { value: 20, label: '20 resources' },
            ],
          }}
          visibleContentPreference={{
            title: 'Select visible content',
            options: [
              {
                label: 'Main distribution properties',
                options: [
                  {
                    id: 'variable',
                    label: 'Variable name',
                    editable: false,
                  },
                  { id: 'value', label: 'Text value' },
                  { id: 'type', label: 'Type' },
                  {
                    id: 'description',
                    label: 'Description',
                  },
                ],
              },
            ],
          }}
        />
      }
    />
  );
};

export default ObjectsPane;

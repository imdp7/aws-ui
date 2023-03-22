import React from 'react';
import {
  Table,
  Box,
  Button,
  TextFilter,
  Header,
  Link,
  Pagination,
  CollectionPreferences,
  SpaceBetween,
} from '@awsui/components-react';

function CustomDashboard() {
  const [selectedItems, setSelectedItems] = React.useState([]);
  return (
    <>
      <Table
        onSelectionChange={({ detail }) =>
          setSelectedItems(detail.selectedItems)
        }
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
            id: 'sharing',
            header: 'Sharing',
            cell: (e) => e.sharing,
            sortingField: 'sharing',
          },
          {
            id: 'favorite',
            header: 'Favorite',
            cell: (e) => e.favorite,
            sortingField: 'sharing',
          },
          {
            id: 'lastUpdated',
            header: 'Last Updated (UTC)',
            cell: (e) => e.lastUpdated,
            sortingField: 'lastUpdated',
          },
        ]}
        items={[]}
        loadingText="Loading resources"
        selectionType="single"
        trackBy="name"
        visibleColumns={['name', 'sharing', 'favorite', 'lastUpdated']}
        empty={
          <Box textAlign="center" color="inherit">
            <b>No dashboards</b>
            <Box variant="p" color="inherit">
              You have not created any dashboards.
            </Box>
            <Box padding={{ bottom: 's' }}>
              <Link>Read more about Dashboards</Link>
            </Box>
            <Button>Create Dashboard</Button>
          </Box>
        }
        filter={
          <TextFilter
            filteringPlaceholder="Filter dashboards"
            filteringText=""
          />
        }
        header={
          <Header
            counter={
              selectedItems.length ? '(' + selectedItems.length + '/10)' : '(0)'
            }
            actions={
              <SpaceBetween size="s" direction="horizontal">
                <Button disabled={selectedItems.length === 0}>
                  Share dashboard
                </Button>
                <Button disabled={selectedItems.length === 0}>Delete</Button>
                <Button variant="primary">Create dashboard</Button>
              </SpaceBetween>
            }
          >
            Custom Dashboards
          </Header>
        }
        pagination={
          <Pagination
            currentPageIndex={1}
            pagesCount={1}
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
            pageSizePreference={{
              title: 'Page size',
              options: [
                { value: 10, label: '10 resources' },
                { value: 20, label: '20 resources' },
              ],
            }}
            wrapLinesPreference={{
              label: 'Wrap lines',
              description: 'Select to see all the text and wrap the lines',
            }}
            stripedRowsPreference={{
              label: 'Striped rows',
              description: 'Select to add alternating shaded rows',
            }}
            contentDensityPreference={{
              label: 'Compact mode',
              description:
                'Select to display content in a denser, more compact mode',
            }}
          />
        }
      />
    </>
  );
}

export default CustomDashboard;

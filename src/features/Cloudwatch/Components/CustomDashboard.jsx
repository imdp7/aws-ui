import React from 'react';
import {
  Table,
  Box,
  Button,
  TextFilter,
  Header,
  Link,
  Modal,
  Pagination,
  CollectionPreferences,
  SpaceBetween,
  Input,
  Icon,
  FormField,
  Badge,
} from '@cloudscape-design/components';
import { InfoLink, ValueWithLabel } from '../../common/common';
import { HelpPanels } from '../../EC2/components/header';
function CustomDashboard({ loadHelpPanelContent }) {
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [name, setName] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleClick = () => {
    setVisible(true);
  };
  const handleSubmit = () => {
    if (!name) {
      setErrorMessage('Dashboard name is required');
      return;
    }
    setVisible(false);
  };
  const handleCancel = () => {
    setErrorMessage('');
    setName('');
    setVisible(false);
  };

  return (
    <>
      <Modal
        onDismiss={() => {
          setVisible(false);
          setErrorMessage('');
          setName('');
        }}
        visible={visible}
        closeAriaLabel="Close modal"
        footer={
          <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="link" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Create dashboard
              </Button>
            </SpaceBetween>
          </Box>
        }
        header="Create new dashboard"
      >
        <FormField
          label="Dashboard name"
          constraintText='Valid characters in dashboard names include "0-9A-Za-z-_".'
          errorText={
            errorMessage &&
            errorMessage.includes('Dashboard name') &&
            errorMessage
          }
        >
          <Input
            value={name}
            onChange={({ detail }) => setName(detail.value)}
          />
        </FormField>
      </Modal>
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
            cell: (e) =>
              e.favorite === true ? <Icon name="heart" size="medium" /> : null,
            sortingField: 'sharing',
          },
          {
            id: 'lastUpdated',
            header: 'Last Updated (UTC)',
            cell: (e) => e.lastUpdated,
            sortingField: 'lastUpdated',
          },
        ]}
        items={[
          {
            name: 'test-1',
            sharing: 'true',
            favorite: true,
            lastUpdated: 'n/a',
          },
        ]}
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
            <Button onClick={handleClick}>Create Dashboard</Button>
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
            info={
              <InfoLink
                onFollow={() =>
                  loadHelpPanelContent(
                    <HelpPanels
                      title="Dashboards"
                      info="Amazon CloudWatch dashboards are customizable home pages in the CloudWatch console that you can use to monitor your resources in a single view, even those resources that are spread across different Regions. You can use CloudWatch dashboards to create customized views of the metrics and alarms for your AWS resources."
                      des="To get started with CloudWatch dashboards, you must first create a dashboard. You can create multiple dashboards. There is no limit on the number of CloudWatch dashboards in your AWS account. All dashboards are global and can contain metrics from all Regions."
                    />
                  )
                }
              />
            }
            actions={
              <SpaceBetween size="s" direction="horizontal">
                <Button disabled={selectedItems.length === 0}>
                  Share dashboard
                </Button>
                <Button disabled={selectedItems.length === 0}>Delete</Button>
                <Button variant="primary" onClick={handleClick}>
                  Create dashboard
                </Button>
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
          />
        }
      />
    </>
  );
}

export default CustomDashboard;

import React from 'react';
import {
  Table,
  Box,
  Button,
  TextFilter,
  Input,
  Header,
  Link,
  Pagination,
  Select,
  CollectionPreferences,
  SpaceBetween,
} from '@cloudscape-design/components';
import { InfoLink, ValueWithLabel } from '../../common/common';
import { HelpPanels } from '../../EC2/components/header';
function AutomaticDashboards({ loadHelpPanelContent }) {
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [resourceGroup, setResourceGroup] = React.useState([]);
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
            id: 'inAlarm',
            header: 'In alarm',
            cell: (e) => e.inAlarm,
            sortingField: 'inAlarm',
          },
          {
            id: 'favorite',
            header: 'Favorite',
            cell: (e) => e.favorite,
            sortingField: 'sharing',
          },
        ]}
        items={[]}
        loadingText="Loading resources"
        selectionType="single"
        trackBy="name"
        visibleColumns={['name', 'inAlarm', 'favorite']}
        empty={
          <Box textAlign="center" color="inherit">
            <b>No automatic dashboards</b>
            <Box variant="p" color="inherit">
              You don't have any services running.
            </Box>
            <Box padding={{ bottom: 's' }}>
              <Link>Read more about Automatic Dashboards</Link>
            </Box>
          </Box>
        }
        filter={
          <div className="input-container">
            <div className="input-filter">
              <Input
                data-testid="input-filter"
                type="search"
                // value={filterProps.filteringText}
                // onChange={(event) => {
                //   actions.setFiltering(event.detail.value);
                // }}
                placeholder="Filter dashboards"
                label="Filter dashboards"
                ariaDescribedby={null}
              />
            </div>
            <div className="select-filter">
              <Select
                data-testid="engine-filter"
                options={[{ label: '-', value: '1' }]}
                selectedAriaLabel="Selected"
                selectedOption={resourceGroup}
                onChange={(event) => {
                  setResourceGroup(event.detail.selectedOption);
                }}
                ariaDescribedby={null}
                expandToViewport={true}
                placeholder="Filter by resource group"
              />
            </div>
          </div>
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
                      title="Automatic dashboards"
                      info="Use automatic dashboards to focus on metrics and alarms for a single AWS service. You can drill down further in that AWS service by also focusing on one resource group."
                      ul={[
                        {
                          h5: 'To focus on a single service',
                          text: 'Choose the service name from the table. The dashboard opens, with graphs of key metrics from that service. To see the alarms for the service, choose the *In Alarm* check box near the top of the screen, below the dashboard selector.',
                        },
                        {
                          h5: 'To focus on a Resource Group',
                          text: 'You can focus the view on metrics and alarms from a single resource group. The view changes to show only the services that have resources that are tagged as part of this resource group. You can drill down further by focusing on both a single resource group and a single service at the same time.',
                        },
                      ]}
                    />
                  )
                }
              />
            }
          >
            Automatic Dashboards
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

export default AutomaticDashboards;

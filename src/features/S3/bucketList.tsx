/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Content } from '../EC2/commons/Home';
import { AppHeader } from '../common/TopNavigations';
import { AppFooter } from '../common/AppFooter';
import {
  AppLayout,
  Container,
  ContentLayout,
  SpaceBetween,
  Spinner,
  Header,
  Box,
  TextFilter,
  Pagination,
  CollectionPreferences,
  Table,
  BreadcrumbGroup,
  Button,
} from '@cloudscape-design/components';
import { Provider } from 'react-redux';
import { appLayoutLabels } from '../common/labels';
import { store } from '../../app/store';
import {
  Navigation,
  S3navItems,
  S3Header,
} from '../EC2/commons/common-components';

const TableContent = () => {
	  const [
    selectedItems,
    setSelectedItems
  ] = React.useState([]);
	return (
		<SpaceBetween size="m">
		    <Table
      onSelectionChange={({ detail }) =>
        setSelectedItems(detail.selectedItems)
      }
      stripedRows
      variant="full-page"
      selectedItems={selectedItems}
      ariaLabels={{
        selectionGroupLabel: "Items selection",
        allItemsSelectionLabel: ({ selectedItems }) =>
          `${selectedItems.length} ${
            selectedItems.length === 1 ? "item" : "items"
          } selected`,
        itemSelectionLabel: ({ selectedItems }, item) => {
          const isItemSelected = selectedItems.filter(
            i => i.name === item.name
          ).length;
          return `${item.name} is ${
            isItemSelected ? "" : "not"
          } selected`;
        }
      }}
      columnDefinitions={[
        {
          id: "name",
          header: "Name",
          cell: e => e.name,
          sortingField: "name"
        },
        {
          id: "aws-region",
          header: "AWS Region",
          cell: e => e.alt,
          sortingField: "alt"
        },
        {
          id: "access",
          header: "Access",
          cell: e => e.type,
          sortingField: "description"
        },
        {
          id: "createdAt",
          header: "Creation Date",
          cell: e => e.description,
          sortingField: "alt"
        }
      ]}
      items={[
        {
          name: "Item 1",
          alt: "First",
          description: "This is the first item",
          type: "1A",
          size: "Small"
        },
        {
          name: "Item 2",
          alt: "Second",
          description: "This is the second item",
          type: "1B",
          size: "Large"
        },
        {
          name: "Item 3",
          alt: "Third",
          description: "-",
          type: "1A",
          size: "Large"
        },
        {
          name: "Item 4",
          alt: "Fourth",
          description: "This is the fourth item",
          type: "2A",
          size: "Small"
        },
        {
          name: "Item 5",
          alt: "-",
          description:
            "This is the fifth item with a longer description",
          type: "2A",
          size: "Large"
        },
        {
          name: "Item 6",
          alt: "Sixth",
          description: "This is the sixth item",
          type: "1A",
          size: "Small"
        }
      ]}
      loadingText="Loading resources"
      selectionType="multi"
      trackBy="name"
      visibleColumns={[
        "name",
        "aws-region",
        "access",
        "createdAt"
      ]}
      empty={
        <Box textAlign="center" color="inherit">
          <b>No resources</b>
          <Box
            padding={{ bottom: "s" }}
            variant="p"
            color="inherit"
          >
            No resources to display.
          </Box>
          <Button>Create resource</Button>
        </Box>
      }
      filter={
        <TextFilter
          filteringPlaceholder="Find resources"
          filteringText=""
        />
      }
      header={
        <Header
        description="Buckets are containers for data stored in S3"
          counter={
            selectedItems.length
              ? "(" + selectedItems.length + "/10)"
              : "(10)"
          }
          actions={
          	<SpaceBetween size="m" direction="horizontal">
          	<Button iconName="refresh" />
          	<Button iconName="copy" disabled>Copy ARN</Button>
          	<Button disabled>Empty</Button>
          	<Button>Delete</Button>
          	<Button variant="primary">Create Bucket</Button>
          	</SpaceBetween>
          }
        >
        	Buckets
        </Header>
      }
      pagination={
        <Pagination
          currentPageIndex={1}
          pagesCount={2}
          ariaLabels={{
            nextPageLabel: "Next page",
            previousPageLabel: "Previous page",
            pageLabel: pageNumber =>
              `Page ${pageNumber} of all pages`
          }}
        />
      }
      preferences={
        <CollectionPreferences
          title="Preferences"
          confirmLabel="Confirm"
          cancelLabel="Cancel"
          preferences={{
            pageSize: 10,
            visibleContent: [
              "name",
              "aws-region",
              "access",
              "createdAt"
            ]
          }}
          pageSizePreference={{
            title: "Select page size",
            options: [
              { value: 10, label: "10 resources" },
              { value: 20, label: "20 resources" }
            ]
          }}
          visibleContentPreference={{
            title: "Select visible content",
            options: [
              {
                label: "Main distribution properties",
                options: [
                  {
                    id: "name",
                    label: "Name",
                    editable: false
                  },
                  { id: "aws-region", label: "AWS Region" },
                  { id: "access", label: "Access" },
                  {
                    id: "createdAt",
                    label: "Created At"
                  }
                ]
              }
            ]
          }}
        />
      }
    />
    </SpaceBetween>
		);

}


export default function BucketList (props) {

	 const [loading, setLoading] = useState(false);
  const [activeHref, setActiveHref] = useState('buckets');

  useEffect(() => {
    document.title = 'S3 Management Console';
  }, [location]);
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
        breadcrumbs={<BreadcrumbGroup items={[{"text":'Amazon S3',"href":"home"},{"text":'Buckets',"href":"bucket"}]} />}
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
        content={
        	<SpaceBetween size="m" direction="vertical">
        	<TableContent />
        	</SpaceBetween>
        }
        />
         <AppFooter />
			</>
		);
}
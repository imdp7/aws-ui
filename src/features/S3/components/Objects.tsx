/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useRef } from 'react';
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
import { useNavigate, useLocation } from 'react-router-dom';
import { dataBucketFiles } from '../../resources/s3Bucket';
import fs from 'fs';

export const ObjectsPane = (props) => {
  const data = [{ title: 'Objects' }];
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [error, setError] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [preferences, setPreferences] = useLocalStorage(
    'React-DBInstancesTable-Preferences',
    {
      pageSize: 10,
      visibleContent: ['name', 'type', 'lastModified', 'size'],
      wrapLines: true,
      stripedRows: true,
      custom: 'table',
    }
  );
  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);

  const handleClickFiles = () => {
    fileInputRef.current.click();
  };

  const handleChange = (event) => {
    const files = event.target.files;
    // Iterate over the files and do something with them, such as uploading them to a server
    if (!files || files.length === 0) {
      setError('No folders were selected');
      return;
    }

    setError(null);
    const newFolders: string[] = Array.from(files);
    setSelectedFiles([...selectedFiles, ...newFolders]);
    //addData(selectedFiles);

    const folders = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      folders.push(selectedFiles[i]);
    }
  };

  // function addData(newData){
  //   fs.writeFileSync('NewData.js',`const myArray = ${ Json.stringify(newData)}; export default myArray;`)
  //   dataBucketFiles.push(newData);
  //   console.log("data uploaded", dataBucketFiles)
  // }
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <Table
      variant="stacked"
      trackBy="name"
      onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
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
          cell: (e) => e.name || '-',
        },
        {
          id: 'type',
          header: 'Type',
          cell: (e) => e.type || '-',
        },
        {
          id: 'version',
          header: 'Version ID',
          cell: (e) => e.version || 'null',
        },
        {
          id: 'lastModified',
          header: 'Last modified',
          cell: (e) => e.lastModified || '-',
        },
        { id: 'size', header: 'Size', cell: (e) => e.size || '-' },
        {
          id: 'storageClass',
          header: 'Storage Class',
          cell: (e) => e.storageClass || '-',
        },
      ]}
      // items={[
      //   {
      //     name: 'Item 1',
      //     alt: 'First',
      //     version: 'This is the first item',
      //     type: '1A',
      //     lastModified: 'Small',
      //     storageClass: 'Glacier',
      //     size: '2C',
      //   },
      //   {
      //     name: 'Item 2',
      //     alt: 'Second',
      //     version: 'This is the Seoncd item',
      //     type: '1V',
      //     lastModified: 'Small',
      //     storageClass: 'Glacier',
      //     size: 'B',
      //   },
      //   {
      //     name: 'Item 3',
      //     alt: 'Third',
      //     version: 'This is the third item',
      //     type: '1R',
      //     lastModified: 'Small',
      //     storageClass: 'Glacier',
      //     size: '23',
      //   },
      // ]}
      items={selectedFiles}
      loadingText="Loading resources"
      selectionType="multi"
      resizableColumns
      visibleColumns={preferences.visibleContent}
      wrapLines={preferences.wrapLines}
      stripedRows={preferences.stripedRows}
      empty={
        <>
          <Box textAlign="center" color="inherit">
            <b>No files or folders</b>
            {location.pathname.includes('upload') ? (
              <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                You have not chosen any files or folders to upload.
              </Box>
            ) : (
              <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                You don't have any objects in this bucket.
              </Box>
            )}
            {!location.pathname.includes('upload') ? (
              <Button iconName="upload" onClick={() => navigate('upload')}>
                Upload
              </Button>
            ) : null}
          </Box>
        </>
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
                  <Button
                    iconName="refresh"
                    ariaLabel="Refresh"
                    loading={loading}
                    onClick={handleRefresh}
                  />
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
                    onClick={() => navigate('upload')}
                  >
                    Upload
                  </Button>
                </SpaceBetween>
              ) : (
                <SpaceBetween size="xs" direction="horizontal">
                  <Button
                    iconName="remove"
                    disabled={selectedItems.length === 0}
                    // onClick={handleRemove}
                  >
                    Remove
                  </Button>
                  <Button iconName="file" onClick={handleClickFiles}>
                    Add Files
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                    multiple
                  />
                  <Button iconName="folder" onClick={handleClickFiles}>
                    Add Folder
                  </Button>
                  <input
                    type="file"
                    ref={folderInputRef}
                    webkitdirectory
                    directory="true"
                    multiple
                    onChange={handleChange}
                    style={{ display: 'none' }}
                  />
                  {/* {selectedFolders.length > 0 && (
                    <ul>
                      {selectedFolders.map((folder) => (
                        <li key={folder.name}>{folder.name}</li>
                      ))}
                    </ul>
                  )} */}
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
          onConfirm={({ detail }) => setPreferences(detail)}
          stripedRowsPreference={{
            label: 'Striped rows',
            description: 'Check to add alternating shaded rows',
          }}
          wrapLinesPreference={{
            label: 'Wrap lines',
            description: 'Check to see all the text and wrap the lines',
          }}
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
                    id: 'name',
                    label: 'Name',
                    editable: false,
                  },
                  { id: 'type', label: 'Type' },
                  { id: 'version', label: 'Version ID' },
                  {
                    id: 'lastModified',
                    label: 'Last Modified',
                  },
                  { id: 'size', label: 'Size' },
                  { id: 'storageClass', label: 'Storage Class' },
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

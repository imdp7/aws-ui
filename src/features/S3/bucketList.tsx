/* eslint-disable react/prop-types */
import React, { useState, useEffect, useLayoutEffect } from 'react';
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
  ExpandableSection,
  Header,
  Box,
  Input,
  Select,
  TextFilter,
  Pagination,
  CollectionPreferences,
  Table,
  FormField,
  ColumnLayout,
  BreadcrumbGroup,
  Button,
  Popover,
  StatusIndicator,
  Link,
  Alert,
  Modal,
  Flashbar,
} from '@cloudscape-design/components';
import {
  CustomAppLayout,
  Notifications,
  TableEmptyState,
  TableHeader,
  TableNoMatchState,
  Navigation,
  S3navItems,
  S3Header,
} from '../EC2/commons/common-components';
import { getFilterCounterText } from '../common/tableCounterStrings';
import BUCKETS from '../resources/s3Bucket';
import { useColumnWidths } from '../EC2/commons/use-column-widths';
import { Provider } from 'react-redux';
import { appLayoutLabels, paginationLabels } from '../common/labels';
import { store } from '../../app/store';
import { DashboardHeader, HelpPanels } from '../EC2/components/header';
import { useCollection } from '@cloudscape-design/collection-hooks';
import { useLocalStorage } from '../common/localStorage';
import useLocationHash from '../EC2/components/use-location-hash';
import useNotifications from '../EC2/commons/use-notifications';

const defaultEngine = { value: '0', label: 'Any Region' };
const defaultClass = { value: '0', label: 'Any Version Control' };
const defaultPlatform = { value: '0', label: 'Any Platform' };

const selectEngineOptions = prepareSelectOptions('awsRegion', defaultEngine);
const selectClassOptions = prepareSelectOptions('version', defaultClass);
const selectPlatformOptions = prepareSelectOptions(
  'platformDetails',
  defaultPlatform
);

function prepareSelectOptions(field, defaultOption) {
  const optionSet = [];
  // Building a non redundant list of the field passed as parameter.

  BUCKETS.forEach((item) => {
    if (optionSet.indexOf(item[field]) === -1) {
      optionSet.push(item[field]);
    }
  });
  optionSet.sort();

  // The first element is the default one.
  const options = [defaultOption];

  // Adding the other element ot the list.
  optionSet.forEach((item, index) =>
    options.push({ label: item, value: (index + 1).toString() })
  );
  return options;
}

function matchesEngine(item, selectedEngine) {
  return (
    selectedEngine === defaultEngine || item.awsRegion === selectedEngine.label
  );
}

function matchesClass(item, selectedClass) {
  return selectedClass === defaultClass || item.version === selectedClass.label;
}

function matchesPlatform(item, selectedPlatform) {
  return (
    selectedPlatform === defaultPlatform ||
    item.platformDetails === selectedPlatform.label
  );
}

const TableContent = ({ loadHelpPanelContent }) => {
  const [buckets, setBuckets] = useState(BUCKETS);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [deletedTotal, setDeletedTotal] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const locationHash = useLocationHash();
  const locationInstance = buckets.find((it) => it.id === locationHash);
  const { notifications, notifyInProgress } = useNotifications({
    deletedTotal,
    resourceName: 'buckets',
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const onDeleteInit = () => setShowDeleteModal(true);
  const onDeleteDiscard = () => setShowDeleteModal(false);
  const onDeleteConfirm = () => {
    const deleted = locationInstance
      ? [locationInstance]
      : collectionProps.selectedItems;

    const updated = buckets.map((it) =>
      deleted.includes(it) ? { ...it, timestamp: Date.now() } : it
    );
    setBuckets(updated);
    setSelectedItems([]);
    setShowDeleteModal(false);
  };

  useEffect(() => {
    setSelectedItems([]);
  }, [locationHash]);

  useEffect(() => {
    setDeletedTotal(BUCKETS.length - buckets.length);
    notifyInProgress(buckets.filter((it) => it).length);
  }, [buckets, notifyInProgress]);

  useEffect(() => {
    setInterval(() => {
      setBuckets((buckets) =>
        buckets.filter((it) => Date.now() - it.timestamp < 5000)
      );
    }, 5000);
  }, []);

  const handleRefresh = () => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  };

  const [columnDefinitions, saveWidths] = useColumnWidths(
    'React-TableSelectFilter-Widths',
    COLUMN_DEFINITIONS
  );
  const [engine, setEngine] = useState(defaultEngine);
  const [instanceClass, setInstanceClass] = useState(defaultClass);
  const [platform, setPlatform] = useState(defaultPlatform);
  const [preferences, setPreferences] = useLocalStorage(
    'React-DBInstancesTable-Preferences',
    {
      pageSize: 10,
      visibleContent: [
        'name',
        'awsRegion',
        'privateAccess',
        'platformDetails',
        'createdAt',
      ],
      wrapLines: false,
      stripedRows: true,
      custom: 'table',
    }
  );
  const {
    items,
    actions,
    filteredItemsCount,
    collectionProps,
    filterProps,
    paginationProps,
  } = useCollection(BUCKETS, {
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
        if (!matchesPlatform(item, platform)) {
          return false;
        }
        const filteringTextLowerCase = filteringText.toLowerCase();

        return SEARCHABLE_COLUMNS.map((key) => item[key]).some(
          (value) =>
            typeof value === 'string' &&
            value.toLowerCase().indexOf(filteringTextLowerCase) > -1
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
  const CopyARN = (props) => {
    const [copy, setCopy] = useState(false);

    const handleClick = async () => {
      try {
        await navigator.clipboard.writeText(props.selectedItems[0].arn);
        setCopy(true);
      } catch (err) {
        console.error('Failed to Bucket ARN: ', err);
      }
    };

    return (
      <Box margin={{ right: 'xxs' }} display="inline-block">
        <Popover
          size="small"
          position="top"
          dismissButton={false}
          triggerType="custom"
          content={
            <StatusIndicator type={'success'}>ARN Copied</StatusIndicator>
          }
        >
          <Button
            iconName="copy"
            onClick={handleClick}
            disabled={props.selectedItems.length === 0}
          >
            Copy ARN
          </Button>
        </Popover>
      </Box>
    );
  };

  return (
    <>
      <SpaceBetween size="xxs">
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
              totalItems={BUCKETS}
              loadHelpPanelContent={loadHelpPanelContent}
              actionButtons={
                <SpaceBetween size="m" direction="horizontal">
                  <Button
                    ariaExpanded
                    loading={loading}
                    iconName="refresh"
                    onClick={handleRefresh}
                  />
                  <CopyARN {...collectionProps} />
                  <Button disabled={collectionProps.selectedItems.length === 0}>
                    Empty
                  </Button>
                  <Button
                    disabled={collectionProps.selectedItems.length === 0}
                    onClick={onDeleteInit}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() =>
                      (window.location.href = '/S3/buckets/create')
                    }
                  >
                    Create Bucket
                  </Button>
                </SpaceBetween>
              }
            />
          }
          filter={
            <div className="input-container">
              <div className="input-filter">
                <Input
                  data-testid="input-filter"
                  type="search"
                  value={filterProps.filteringText}
                  onChange={(event) => {
                    actions.setFiltering(event.detail.value);
                  }}
                  placeholder="Find instances"
                  label="Find instances"
                  ariaDescribedby={null}
                />
              </div>
              {preferences.visibleContent.includes('awsRegion') && (
                <div className="select-filter">
                  <Select
                    data-testid="engine-filter"
                    options={selectEngineOptions}
                    selectedAriaLabel="Selected"
                    selectedOption={engine}
                    onChange={(event) => {
                      setEngine(event.detail.selectedOption);
                    }}
                    ariaDescribedby={null}
                    expandToViewport={true}
                  />
                </div>
              )}
              {preferences.visibleContent.includes('version') && (
                <div className="select-filter">
                  <Select
                    data-testid="class-filter"
                    options={selectClassOptions}
                    selectedAriaLabel="Selected"
                    selectedOption={instanceClass}
                    onChange={(event) => {
                      setInstanceClass(event.detail.selectedOption);
                    }}
                    ariaDescribedby={null}
                    expandToViewport={true}
                  />
                </div>
              )}
              {preferences.visibleContent.includes('platformDetails') && (
                <div className="select-filter">
                  <Select
                    data-testid="class-filter"
                    options={selectPlatformOptions}
                    selectedAriaLabel="Selected"
                    selectedOption={platform}
                    onChange={(event) => {
                      setPlatform(event.detail.selectedOption);
                    }}
                    ariaDescribedby={null}
                    expandToViewport={true}
                  />
                </div>
              )}
              {(filterProps.filteringText ||
                engine !== defaultEngine ||
                instanceClass !== defaultClass ||
                platform != defaultPlatform) && (
                <span className="filtering-results">
                  {getFilterCounterText(filteredItemsCount)}
                </span>
              )}
            </div>
          }
          pagination={
            <Pagination {...paginationProps} ariaLabels={paginationLabels} />
          }
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

      <DeleteModal
        visible={showDeleteModal}
        onDiscard={onDeleteDiscard}
        onDelete={onDeleteConfirm}
        buckets={
          locationInstance ? [locationInstance] : collectionProps.selectedItems
        }
      />
    </>
  );
};

function DeleteModal({ buckets, visible, onDiscard, onDelete }) {
  const deleteConsentText = 'delete';

  const [deleteInputText, setDeleteInputText] = useState('');
  useEffect(() => {
    setDeleteInputText('');
  }, [visible]);

  const handleDeleteSubmit = (event) => {
    event.preventDefault();
    if (inputMatchesConsentText) {
      onDelete();
    }
  };

  const inputMatchesConsentText =
    deleteInputText.toLowerCase() === deleteConsentText;

  return (
    <Modal
      visible={visible}
      onDismiss={onDiscard}
      header={'Delete Bucket'}
      closeAriaLabel="Close dialog"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={onDiscard}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={onDelete}
              disabled={!inputMatchesConsentText}
            >
              Delete
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      {buckets.length > 0 && (
        <SpaceBetween size="m">
          <Box variant="span">
            Delete instance{' '}
            <Box variant="span" fontWeight="bold">
              {buckets[0].id}
            </Box>{' '}
            permanently? This action cannot be undone.
          </Box>

          <Alert type="warning" statusIconAriaLabel="Warning">
            Proceeding with this action will delete bucket with all content and
            can impact related resources.{' '}
            <Link external={true} href="#">
              Learn more
            </Link>
          </Alert>

          <Box>
            To avoid accidental deletions we ask you to provide additional
            written consent.
          </Box>

          <ColumnLayout columns={2}>
            <form onSubmit={handleDeleteSubmit}>
              <FormField label={`Type "${deleteConsentText}" to agree.`}>
                <Input
                  placeholder={deleteConsentText}
                  onChange={(event) => setDeleteInputText(event.detail.value)}
                  value={deleteInputText}
                  ariaRequired={true}
                />
              </FormField>
            </form>
          </ColumnLayout>
        </SpaceBetween>
      )}
    </Modal>
  );
}

const AccountSnapshot = () => {
  const [loading, setLoading] = useState(false);

const handleRefresh = () => {
    const timer = setTimeout(() => (
      setLoading(true)
      ),2000)
    return clearTimeout(timer);
}
  

  return (
    
      <ExpandableSection variant="container" headerText="Account snapshot"
        description= {
          <>
            Storage lens provides visibility into storage usage and activity trends.{' '}
            <Link external fontSize="inherit">Learn more</Link> 
          </>
        }
      >
      <SpaceBetween size="m">
        <Alert header="Use an IAM User or IAM Role to access Storage Lens dashboards" statusAriaLabel="info" type="error"
        action={
          <Button onClick={handleRefresh} loading={loading}>
          Refresh
          </Button>
      }
        >
        <div>
          You can’t use your account’s root user credentials to view Amazon S3 Storage Lens dashboards. To access S3 Storage Lens dashboards, you must grant the requisite IAM permissions to a new or existing IAM user. Then, sign in with those user credentials to access S3 Storage Lens dashboards. {' '}
          </div>
          <Link external fontSize="inherit">Learn more </Link>
          <Box>
          <div>Permissions required: </div>
          <ul>
          <li >s3:ListStorageLensConfigurations</li>
          <li>s3:GetStorageLensConfiguration</li>
          <li>s3:GetStorageLensDashboard</li>
          </ul>
          </Box>
          <Box variant="strong">
             After you obtain the necessary permissions, sign in with those user credentials to access Storage Lens dashboards. 
          </Box>
          <ExpandableSection headerText="API Response" variant="footer">
          User: arn:aws:iam::610741917922:root is not authorized to perform: s3:GetStorageLensDashboard on resource: arn:aws:s3:us-east-1:610741917922:storage-lens/default-account-dashboard
          </ExpandableSection>
        </Alert>
      </SpaceBetween>
      </ExpandableSection>
    
    );
}

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
  const { notifications, notifyInProgress } = useNotifications({
    resourceName: 'bucket',
  });

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
        contentType="table"
        breadcrumbs={
          <BreadcrumbGroup
            items={[
              { text: 'Amazon S3', href: '/S3/home' },
              { text: 'Buckets', href: 'buckets' },
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
        notifications={<Flashbar items={notifications} />}
        content={
          <Provider store={store}>
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
              <AccountSnapshot/>
              <TableContent loadHelpPanelContent={loadHelpPanelContent} />
            </SpaceBetween>
          </Provider>
        }
      />
      <AppFooter />
    </>
  );
}

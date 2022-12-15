import React, { useEffect, useRef, useState } from 'react';
import {
  AppLayout,
  Table,
  Pagination,
  SplitPanel,
  TextFilter,
} from '@cloudscape-design/components';
import { useCollection } from '@cloudscape-design/collection-hooks';
import { appLayoutLabels } from '../common/labels';
import { getFilterCounterText } from '../common/tableCounterStrings';
import {
  Navigation,
  ec2NavItems,
  Notifications,
  TableEmptyState,
  TableNoMatchState,
} from './commons/common-components.jsx';
import { paginationLabels } from '../common/labels';
import { useLocalStorage } from '../common/localStorage';
import { EC2ToolsContent, FullPageHeader } from './common-components';
import INSTANCES from '../resources/ec2-instances';
import {
  COLUMN_DEFINITIONS_MAIN,
  SELECTION_LABELS,
  DEFAULT_PREFERENCES,
  EC2Preferences,
} from './table-config';
import { getPanelContent, Breadcrumbs, useSplitPanel } from './utils';
import { SPLIT_PANEL_I18NSTRINGS } from './split-panel-config';
import { InfoLink, ValueWithLabel } from '../common/common';
import { AppHeader } from '../common/TopNavigations';

function EC2_Instances_List() {
  const [preferences, setPreferences] = useLocalStorage(
    'React-InstancesTable-Preferences',
    DEFAULT_PREFERENCES
  );
  const {
    items,
    actions,
    filteredItemsCount,
    collectionProps,
    filterProps,
    paginationProps,
  } = useCollection(INSTANCES, {
    filtering: {
      empty: <TableEmptyState resourceName="Instance" />,
      noMatch: (
        <TableNoMatchState onClearFilter={() => actions.setFiltering('')} />
      ),
    },
    pagination: { pageSize: preferences.pageSize },
    selection: {},
  });
  const { header: panelHeader, body: panelBody } = getPanelContent(
    collectionProps.selectedItems,
    'multiple'
  );
  const [toolsOpen, setToolsOpen] = useState(false);
  const {
    splitPanelOpen,
    onSplitPanelToggle,
    splitPanelSize,
    onSplitPanelResize,
  } = useSplitPanel(collectionProps.selectedItems);
  const appLayout = useRef();

  useEffect(() => {
    document.title = 'EC2 Instances Console';
  }, []);

  return (
    <>
      <AppHeader />
      <AppLayout
        ref={appLayout}
        headerSelector="#header"
        navigation={<Navigation activeHref="instances" />}
        breadcrumbs={<Breadcrumbs />}
        notifications={<Notifications successNotification={true} />}
        tools={<EC2ToolsContent />}
        toolsOpen={toolsOpen}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        disableBodyScroll={true}
        contentType="cards"
        splitPanelOpen={splitPanelOpen}
        onSplitPanelToggle={onSplitPanelToggle}
        splitPanelSize={splitPanelSize}
        onSplitPanelResize={onSplitPanelResize}
        splitPanel={
          <SplitPanel
            header={panelHeader}
            i18nStrings={SPLIT_PANEL_I18NSTRINGS}
          >
            {panelBody}
          </SplitPanel>
        }
        content={
          <Table
            {...collectionProps}
            header={
              <FullPageHeader
                resourceName="Instances"
                createButtonText="Create instance"
                link="/ec2_instance/launchEC2"
                selectedItems={collectionProps.selectedItems}
                totalItems={INSTANCES}
                loadHelpPanelContent={() => {
                  setToolsOpen(true);
                  appLayout.current?.focusToolsClose();
                }}
              />
            }
            variant="full-page"
            stickyHeader={true}
            columnDefinitions={COLUMN_DEFINITIONS_MAIN}
            items={items}
            selectionType="multi"
            ariaLabels={SELECTION_LABELS}
            filter={
              <TextFilter
                {...filterProps}
                filteringAriaLabel="Filter instances"
                filteringPlaceholder="Find instances"
                countText={getFilterCounterText(filteredItemsCount)}
              />
            }
            wrapLines={preferences.wrapLines}
            pagination={
              <Pagination {...paginationProps} ariaLabels={paginationLabels} />
            }
            preferences={
              <EC2Preferences
                preferences={preferences}
                setPreferences={setPreferences}
              />
            }
          />
        }
        ariaLabels={appLayoutLabels}
      />
    </>
  );
}

export default EC2_Instances_List;

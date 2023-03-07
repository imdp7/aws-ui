/* eslint-disable react/prop-types */
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState, useEffect } from 'react';
import {
  Alert,
  AppLayout,
  Box,
  BreadcrumbGroup,
  Button,
  ColumnLayout,
  Container,
  ContentLayout,
  Flashbar,
  FormField,
  Header,
  Input,
  Link,
  Modal,
  SpaceBetween,
  Spinner,
  SplitPanel,
} from '@cloudscape-design/components';
import {
  ec2navItems,
  Navigation,
  EC2Header,
} from './commons/common-components';
import { appLayoutLabels } from '../common/labels';
import INSTANCES_TYPES from '../resources/ec2-instance-list';
import './styles/base.scss';
import useLocationHash from './components/use-location-hash';
import useNotifications from './commons/use-notifications';
import InstancesTypes from './components/Instance-types';
import { AppHeader } from '../common/TopNavigations';
import { AppFooter } from '../common/AppFooter';
import { getPanelContent, useSplitPanel } from './utils';
import { SPLIT_PANEL_I18NSTRINGS } from './split-panel-config';

function EC2TypesList(props) {
  const [instances, setInstances] = useState(INSTANCES_TYPES);
  const [selectedItems, setSelectedItems] = useState([]);
  const [deletedTotal, setDeletedTotal] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const locationHash = useLocationHash();
  const locationInstance = instances.find((it) => it.id === locationHash);
  const { notifications, notifyInProgress } = useNotifications({
    deletedTotal,
    resourceName: 'instance',
  });

  const onDeleteInit = () => setShowDeleteModal(true);
  const onDeleteDiscard = () => setShowDeleteModal(false);
  const onDeleteConfirm = () => {
    const deleted = locationInstance ? [locationInstance] : selectedItems;
    const updated = instances.map((it) =>
      deleted.includes(it)
        ? { ...it, state: 'deleting', timestamp: Date.now() }
        : it
    );
    setInstances(updated);
    setSelectedItems([]);
    setShowDeleteModal(false);
  };

  useEffect(() => {
    setSelectedItems([]);
  }, [locationHash]);

  useEffect(() => {
    setDeletedTotal(INSTANCES_TYPES.length - instances.length);
    notifyInProgress(instances.filter((it) => it.state === 'deleting').length);
  }, [instances, notifyInProgress]);

  useEffect(() => {
    setInterval(() => {
      setInstances((instances) =>
        instances.filter(
          (it) => it.state !== 'deleting' || Date.now() - it.timestamp < 5000
        )
      );
    }, 5000);
  }, []);

  return (
    <>
      {locationInstance ? (
        <InstanceDetailsPage
          instance={locationInstance}
          onDeleteInit={onDeleteInit}
          notifications={notifications}
        />
      ) : (
        <InstancesPage
          instances={instances}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          onDeleteInit={onDeleteInit}
          notifications={notifications}
          user={props.user}
          signOut={props.signOut}
          loading={loading}
        />
      )}

      <DeleteModal
        visible={showDeleteModal}
        onDiscard={onDeleteDiscard}
        onDelete={onDeleteConfirm}
        instances={locationInstance ? [locationInstance] : selectedItems}
      />
    </>
  );
}

function InstancesPage({
  instances,
  selectedItems,
  setSelectedItems,
  onDeleteInit,
  notifications,
  user,
  signOut,
}) {
  const [loading, setLoading] = useState(true);

  const { header: panelHeader, body: panelBody } = getPanelContent(
    selectedItems,
    'comparision'
  );
  const {
    splitPanelOpen,
    onSplitPanelToggle,
    splitPanelSize,
    onSplitPanelResize,
  } = useSplitPanel(selectedItems);

  useEffect(() => {
    document.title = 'Instance Types | AWS EC2 management console';
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div id="h" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
        <AppHeader user={user} signOut={signOut} />
      </div>
      <AppLayout
        content={
          <>
            {!loading ? (
              <InstancesTypes
                instances={instances}
                selectedItems={selectedItems}
                onSelectionChange={(event) =>
                  setSelectedItems(event.detail.selectedItems)
                }
                onDelete={onDeleteInit}
                loading={loading}
              />
            ) : (
              <Spinner size="large" className="spinner" />
            )}
          </>
        }
        headerSelector="#h"
        footerSelector="#f"
        splitPanel={
          <SplitPanel
            header={panelHeader}
            i18nStrings={SPLIT_PANEL_I18NSTRINGS}
          >
            {panelBody}
          </SplitPanel>
        }
        splitPanelOpen={splitPanelOpen}
        splitPanelSize={splitPanelSize}
        onSplitPanelToggle={onSplitPanelToggle}
        onSplitPanelResize={onSplitPanelResize}
        breadcrumbs={
          <BreadcrumbGroup
            items={[
              { text: 'EC2', href: '/ec2_instance/dashboard' },
              { text: 'Instance Types', href: '#' },
            ]}
            expandAriaLabel="Show path"
            ariaLabel="Breadcrumbs"
          />
        }
        notifications={<Flashbar items={notifications} stackItems />}
        navigation={
          <Navigation
            activeHref="InstanceTypes"
            header={EC2Header}
            items={ec2navItems}
          />
        }
        ariaLabels={appLayoutLabels}
        contentType="wizard"
        toolsHide="true"
      />
      <AppFooter />
    </>
  );
}

function DeleteModal({ instances, visible, onDiscard, onDelete }) {
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

  const isMultiple = instances.length > 1;
  return (
    <Modal
      visible={visible}
      onDismiss={onDiscard}
      header={isMultiple ? 'Delete instances' : 'Delete instance'}
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
      {instances.length > 0 && (
        <SpaceBetween size="m">
          {isMultiple ? (
            <Box variant="span">
              Delete{' '}
              <Box variant="span" fontWeight="bold">
                {instances.length} instances
              </Box>{' '}
              permanently? This action cannot be undone.
            </Box>
          ) : (
            <Box variant="span">
              Delete instance{' '}
              <Box variant="span" fontWeight="bold">
                {instances[0].id}
              </Box>{' '}
              permanently? This action cannot be undone.
            </Box>
          )}

          <Alert type="warning" statusIconAriaLabel="Warning">
            Proceeding with this action will delete instance(s) with all content
            and can impact related resources.{' '}
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

export default EC2TypesList;

/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import {
  TopNavigation,
  Input,
  Box,
  Toggle,
  FormField,
  ColumnLayout,
  SpaceBetween,
  Modal,
} from '@cloudscape-design/components';
import '../../App.css';
import classes from '../../app.module.scss';
import {
  applyMode,
  Mode,
  Density,
  applyDensity,
  disableMotion,
} from '@awsui/global-styles';
import { useNavigate } from 'react-router-dom';

interface State {
  user: string;
  signOut: () => void;
}

export const AppHeader = (props: State): JSX.Element => {
  const [mode, setMode] = useState(false);
  const [density, setDensity] = useState(true);
  const [motion, setMotion] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [redirectURL, setRedirectURL] = useState('');
  const [visible, setVisible] = React.useState(false);
  const [selection, setSelection] = React.useState([
    {
      id: 'US East (N. Virginia)',
      text: 'US East (N. Virginia)',
    },
  ]);

  const navigate = useNavigate();

  if (redirectURL == 'signout') {
    navigate('/');
    props.signOut();
  } else if (redirectURL == 'profile') {
    navigate('/account/profile');
  }

  const onFollowHandler = (e) => {
    e.preventDefault();
    e.detail.id === 'preferences' ? setVisible(true) : null;
  };

  return (
    <>
      <div id="h" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
        <Modal
          onDismiss={() => setVisible(false)}
          visible={visible}
          closeAriaLabel="Close modal"
          header="Preferences"
          size="medium"
        >
          <SpaceBetween size="s" direction="vertical">
            <ColumnLayout columns={3}>
              <FormField description="Light or Dark." label="Theme Mode">
                <Toggle
                  onChange={({ detail }) => {
                    setMode(detail.checked);
                    applyMode(detail.checked ? Mode.Dark : Mode.Light);
                  }}
                  checked={mode}
                  className={classes.app_header_footer}
                >
                  <Box>{mode ? 'Dark' : 'Light'}</Box>
                </Toggle>
              </FormField>
              <FormField description="Comfort or Compact." label="Density">
                <Toggle
                  onChange={({ detail }) => {
                    setDensity(detail.checked);
                    applyDensity(
                      detail.checked ? Density.Comfortable : Density.Compact
                    );
                    disableMotion(density ? true : false);
                  }}
                  checked={density}
                  className={classes.app_header_footer}
                >
                  <Box>{density ? 'Comfort' : 'Compact'}</Box>
                </Toggle>
              </FormField>
              <FormField description="True or False." label="Motion">
                <Toggle
                  onChange={({ detail }) => {
                    setMotion(detail.checked);
                    disableMotion(motion ? true : false);
                  }}
                  checked={motion}
                  className={classes.app_header_footer}
                >
                  <Box>{motion ? 'True' : 'False'}</Box>
                </Toggle>
              </FormField>
            </ColumnLayout>
          </SpaceBetween>
        </Modal>
        <TopNavigation
          identity={{
            href: '/',
            logo: {
              src: 'https://www.tamr.com/wp-content/uploads/2020/07/Logo-AWS.png',
              alt: 'Service',
            },
          }}
          utilities={[
            {
              type: 'button',
              text: 'Link',
              href: 'https://example.com/',
              external: true,
              externalIconAriaLabel: ' (opens in a new tab)',
            },
            {
              type: 'button',
              iconName: 'notification',
              title: 'Notifications',
              ariaLabel: 'Notifications (unread)',
              badge: true,
              disableUtilityCollapse: false,
            },
            {
              type: 'menu-dropdown',
              iconName: 'settings',
              ariaLabel: 'Settings',
              title: 'Settings',
              onItemClick: (evt) => {
                onFollowHandler(evt);
              },
              items: [
                {
                  id: 'settings-org',
                  text: 'Organizational settings',
                },
                {
                  id: 'settings-project',
                  text: 'Project settings',
                },
                {
                  id: 'preferences',
                  text: 'Preferences',
                },
              ],
            },
            {
              type: 'menu-dropdown',
              ariaLabel: 'Available Zones',
              text: `${selection[0].text || selection}`,
              title: 'Zones',
              onItemClick: (evt) => {
                evt.preventDefault();
                console.log(evt.detail);
                setSelection(evt.detail.id);
              },
              items: [
                {
                  id: 'north',
                  items: [
                    {
                      id: 'US East (N. Virginia)',
                      text: 'US East (N. Virginia)',
                    },
                    {
                      id: 'US East Ohio)',
                      text: 'US East Ohio)',
                    },
                    {
                      id: 'US West (N. California)',
                      text: 'US West (N. California)',
                    },
                    {
                      id: 'US West (Oregon)',
                      text: 'US West (Oregon)',
                    },
                  ],
                },
                {
                  id: 'asia',
                  items: [
                    {
                      id: 'Asia Pacific (Mumbai)',
                      text: 'Asia Pacific (Mumbai)',
                    },
                    {
                      id: 'Asia Pacific (Osaka)',
                      text: 'Asia Pacific (Osaka)',
                    },
                    {
                      id: 'Asia Pacific (Seoul)',
                      text: 'Asia Pacific (Seoul)',
                    },
                    {
                      id: 'Asia Pacific (Seoul)',
                      text: 'Asia Pacific (Seoul)',
                    },
                    {
                      id: 'Asia Pacific (Sydney)',
                      text: 'Asia Pacific (Sydney)',
                    },
                    {
                      id: 'Asia Pacific (Tokyo)',
                      text: 'Asia Pacific (Tokyo)',
                    },
                  ],
                },
                {
                  id: 'central',
                  items: [
                    {
                      id: 'Canada (Central)',
                      text: 'Canada (Central)',
                    },
                  ],
                },
                {
                  id: 'europe',
                  items: [
                    {
                      id: 'Europe (Frankfurt)',
                      text: 'Europe (Frankfurt)',
                    },
                    {
                      id: 'Europe (Ireland)',
                      text: 'Europe (Ireland)',
                    },
                    {
                      id: 'Europe (London)',
                      text: 'Europe (London)',
                    },
                    {
                      id: 'Europe (Paris)',
                      text: 'Europe (Paris)',
                    },
                    {
                      id: 'Europe (Stockholm)',
                      text: 'Europe (Stockholm)',
                    },
                  ],
                },
                {
                  id: 'south',
                  items: [
                    {
                      id: 'South America (Sao Paulo)',
                      text: 'South America (Sao Paulo)',
                    },
                  ],
                },
              ],
            },
            {
              type: 'menu-dropdown',
              text: `${props.user}`,
              iconName: 'user-profile',
              onItemClick: (evt) => {
                setRedirectURL(evt.detail.id);
              },
              items: [
                {
                  id: 'account',
                  disabled: true,
                  items: [
                    {
                      id: 'accountID',
                      text: 'Account ID: 6107-4191-7922',
                    },
                  ],
                },
                { id: 'profile', text: 'Profile' },
                { id: 'preferences', text: 'Preferences' },
                { id: 'security', text: 'Security' },
                {
                  id: 'support-group',
                  text: 'Support',
                  items: [
                    {
                      id: 'documentation',
                      text: 'Documentation',
                      href: '#',
                      external: true,
                      externalIconAriaLabel: ' (opens in new tab)',
                    },
                    { id: 'support', text: 'Support' },
                    {
                      id: 'feedback',
                      text: 'Feedback',
                      href: '#',
                      external: true,
                      externalIconAriaLabel: ' (opens in new tab)',
                    },
                  ],
                },
                {
                  id: 'signout',
                  text: 'Sign out',
                },
              ],
            },
          ]}
          i18nStrings={{
            searchIconAriaLabel: 'Search',
            searchDismissIconAriaLabel: 'Close search',
            overflowMenuTriggerText: 'More',
            overflowMenuTitleText: 'All',
            overflowMenuBackIconAriaLabel: 'Back',
            overflowMenuDismissIconAriaLabel: 'Close menu',
          }}
          search={
            <Input
              ariaLabel="Input field"
              value={searchValue}
              type="search"
              placeholder="Search"
              onChange={({ detail }) => setSearchValue(detail.value)}
            />
          }
        />
      </div>
    </>
  );
};
